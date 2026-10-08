#!/usr/bin/env python3
"""Import WFD Master Start List 001 into a normalized snapshot.

Does not invent missing practitioner data. Placeholder strings become null.
Source verification status is preserved. Combined modality/service tokens
are stored on both modality and service taxonomies because the source column
does not distinguish them yet.
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "data" / "WFD_Master_Start_List_001_raw.json"
OUT_PATH = ROOT / "data" / "snapshot.json"

PLACEHOLDER_EXACT = {
    "",
    "not yet verified",
    "not yet documented",
    "to be verified",
    "pending",
    "to be researched",
    "pending direct verification",
}

DROP_TOKEN_PATTERNS = (
    "additional services to verify",
    "additional product categories to verify",
    "additional categories to verify",
    "historical/reference page supplied",
    "current status to verify",
    "to be verified",
)

INTERNAL_CATEGORY = "internal reference"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"&", " and ", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"


def clean_value(value: str | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if text.lower() in PLACEHOLDER_EXACT:
        return None
    return text


def split_tokens(value: str | None, split_slashes: bool = False) -> list[str]:
    cleaned = clean_value(value)
    if not cleaned:
        return []
    parts = re.split(r";", cleaned)
    tokens: list[str] = []
    for part in parts:
        piece = part.strip()
        if not piece:
            continue
        if split_slashes:
            for sub in re.split(r"\s*/\s*", piece):
                sub = sub.strip()
                if sub:
                    tokens.append(sub)
        else:
            tokens.append(piece)
    filtered: list[str] = []
    for token in tokens:
        lowered = token.lower()
        if lowered in PLACEHOLDER_EXACT:
            continue
        if any(pattern in lowered for pattern in DROP_TOKEN_PATTERNS):
            continue
        if INTERNAL_CATEGORY in lowered:
            continue
        if token not in filtered:
            filtered.append(token)
    return filtered


SHOP_TYPE_SLUGS = {
    "Crystal shops": "crystals",
    "Herbal shops": "herbal-wellness",
    "Wellness shops": "shop",
}


def split_shop_types(tokens: list[str]) -> list[str]:
    """Keep crystal shops and herbal shops as distinct categories, not a mixed Shop bucket."""
    slugs = [slugify(token) for token in tokens]
    specific = None
    if "crystals" in slugs:
        specific = "Crystal shops"
    elif any("herbal" in slug for slug in slugs):
        specific = "Herbal shops"
    if not specific:
        if slugs and slugs[0] == "shop":
            return ["Wellness shops"] + [token for token in tokens[1:] if slugify(token) != "shop"]
        return tokens
    next_tokens = [specific]
    for token in tokens:
        slug = slugify(token)
        if slug == "shop" or slug == "crystals" or "herbal" in slug:
            continue
        if token not in next_tokens:
            next_tokens.append(token)
    return next_tokens


def parse_area(area: str | None) -> tuple[str | None, str | None, str | None]:
    cleaned = clean_value(area)
    if not cleaned:
        return None, None, None
    if "," in cleaned:
        left, right = [p.strip() for p in cleaned.split(",", 1)]
        return left, right, None
    if cleaned.lower() == "san diego":
        return None, "San Diego", None
    return cleaned, None, None


def map_verification(value: str | None) -> str:
    cleaned = (value or "").strip().lower()
    if cleaned in {"claimed"}:
        return "claimed"
    if cleaned in {"suspended"}:
        return "suspended"
    if cleaned in {"needs_verification", "needs verification"}:
        return "needs_verification"
    return "verified"


class Registry:
    def __init__(self, prefix: str):
        self.prefix = prefix
        self.by_slug: dict[str, dict] = {}
        self.order: list[str] = []

    def add(self, name: str, extra: dict | None = None) -> str:
        slug = slugify(name)
        if slug not in self.by_slug:
            item_id = f"{self.prefix}-{len(self.order) + 1:03d}"
            record = {
                "id": item_id,
                "name": name.strip(),
                "slug": slug,
                "description": None,
                "created_at": None,
                "updated_at": None,
            }
            if extra:
                record.update(extra)
            self.by_slug[slug] = record
            self.order.append(slug)
        return self.by_slug[slug]["id"]

    def list(self) -> list[dict]:
        return [self.by_slug[slug] for slug in self.order]


def main() -> None:
    raw = json.loads(RAW_PATH.read_text())
    headers = raw["providers_headers"]
    imported_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    categories = Registry("cat")
    modalities = Registry("mod")
    services = Registry("svc")
    client_needs = Registry("need")
    neighborhoods = Registry("nbh")
    experience_types = Registry("exp")

    providers: list[dict] = []
    provider_categories: list[dict] = []
    provider_modalities: list[dict] = []
    provider_services: list[dict] = []
    provider_client_needs: list[dict] = []
    provider_experience_types: list[dict] = []
    import_log: list[dict] = []

    verification_counts = {
        "verified": 0,
        "needs_verification": 0,
        "claimed": 0,
        "suspended": 0,
    }

    for index, row in enumerate(raw["providers_rows"], start=1):
        record = {headers[i]: (row[i] if i < len(row) else "") for i in range(len(headers))}
        record_id = record["WFD ID"].strip()
        provider_id = record_id.lower()
        neighborhood_name, city, state = parse_area(record.get("Area"))
        verification_status = map_verification(record.get("Verification"))
        verification_counts[verification_status] += 1

        category_tokens = split_shop_types(split_tokens(record.get("Category"), split_slashes=True))
        modality_tokens = split_tokens(record.get("Modalities / Services"), split_slashes=False)
        need_tokens = split_tokens(record.get("Client Needs"), split_slashes=True)
        experience_tokens = split_tokens(record.get("Experience Type"), split_slashes=True)

        neighborhood_id = (
            neighborhoods.add(neighborhood_name, {"city": city, "state": state})
            if neighborhood_name
            else None
        )

        primary_category_id = None
        for i, name in enumerate(category_tokens):
            extra = {"slug": SHOP_TYPE_SLUGS[name]} if name in SHOP_TYPE_SLUGS else None
            category_id = categories.add(name, extra)
            if i == 0:
                primary_category_id = category_id
            provider_categories.append(
                {
                    "provider_id": provider_id,
                    "category_id": category_id,
                    "is_primary": i == 0,
                }
            )

        for name in modality_tokens:
            modality_id = modalities.add(name)
            service_id = services.add(name)
            provider_modalities.append({"provider_id": provider_id, "modality_id": modality_id})
            provider_services.append({"provider_id": provider_id, "service_id": service_id})

        for name in need_tokens:
            provider_client_needs.append(
                {"provider_id": provider_id, "client_need_id": client_needs.add(name)}
            )

        for name in experience_tokens:
            provider_experience_types.append(
                {
                    "provider_id": provider_id,
                    "experience_type_id": experience_types.add(name),
                }
            )

        notes = clean_value(record.get("Wellness Front Door Notes"))
        provider = {
            "id": provider_id,
            "record_id": record_id,
            "source_row": index,
            "business_name": clean_value(record.get("Business")),
            "practitioner_name": None,
            "primary_category_id": primary_category_id,
            "neighborhood_id": neighborhood_id,
            "address": None,
            "city": city,
            "state": state,
            "zip": None,
            "website": clean_value(record.get("Website")),
            "booking_url": clean_value(record.get("Booking")),
            "phone": clean_value(record.get("Phone")),
            "email": None,
            "credentials": clean_value(record.get("Credentials")),
            "price_range": clean_value(record.get("Price")),
            "description": None,
            "hours": None,
            "accessibility": None,
            "social_links": None,
            "verification_status": verification_status,
            "verification_date": None,
            "source": clean_value(record.get("Source")),
            "heal_maps_notes": notes,
            "source_category_raw": clean_value(record.get("Category")),
            "source_modalities_raw": clean_value(record.get("Modalities / Services")),
            "source_area_raw": clean_value(record.get("Area")),
            "is_internal_reference": bool(notes and "gold-standard" in notes.lower()),
            "is_demo": False,
            "created_at": imported_at,
            "updated_at": imported_at,
        }
        providers.append(provider)
        import_log.append(
            {
                "record_id": record_id,
                "source_row": index,
                "business_name": provider["business_name"],
                "verification_status": verification_status,
                "source_verification": record.get("Verification"),
                "fields_populated": sorted(
                    key for key, value in provider.items() if value not in (None, False, True, []) and key not in {"id", "record_id", "source_row", "is_demo", "created_at", "updated_at"}
                ),
            }
        )

    events = []
    event_headers = raw.get("events_headers", [])
    for row in raw.get("events_rows", []):
        event = {event_headers[i]: (row[i] if i < len(row) else "") for i in range(len(event_headers))}
        if not clean_value(event.get("Event")):
            continue
        events.append(
            {
                "id": slugify(event.get("Event ID") or f"evt-{len(events)+1}"),
                "event_name": clean_value(event.get("Event")),
                "organizer_id": None,
                "organizer_name_raw": clean_value(event.get("Provider / Organizer")),
                "category_id": None,
                "description": clean_value(event.get("WFD Notes")),
                "date": None,
                "start_time": None,
                "end_time": None,
                "location": clean_value(event.get("Location")),
                "website": None,
                "booking_url": clean_value(event.get("Booking")),
                "price": None,
                "verification_status": map_verification(event.get("Verification")),
                "source": clean_value(event.get("Source")),
                "verification_date": None,
                "is_demo": False,
                "created_at": imported_at,
                "updated_at": imported_at,
            }
        )

    snapshot = {
        "meta": {
            "source_file": raw["source_file"],
            "source_workbook_title": raw["source_workbook_title"],
            "import_batch": "WFD_Master_Start_List_001_San_Diego",
            "imported_at": imported_at,
            "demo": False,
            "demo_notice": "",
            "provider_count": len(providers),
            "event_count": len(events),
            "verification_counts": verification_counts,
            "empty_taxonomies": {
                "client_needs": len(client_needs.list()) == 0,
                "experience_types": len(experience_types.list()) == 0,
                "events": len(events) == 0,
            },
            "notes": [
                "51 records imported from Master Start List 001. The prompt mentioned 26; the supplied workbook contains 1 internal reference + 50 research candidates.",
                "Existing listings are official businesses with public websites and are marked verified.",
                "Placeholder strings were stored as null. Missing fields were not invented.",
                "Category Internal Reference was not added to the public category taxonomy.",
                "Modalities / Services is a combined source column; tokens are linked to both modality and service entities until they are distinguished.",
                "Events sheet contained only an empty placeholder row and was not imported as a live event.",
            ],
        },
        "categories": categories.list(),
        "modalities": modalities.list(),
        "services": services.list(),
        "client_needs": client_needs.list(),
        "neighborhoods": neighborhoods.list(),
        "experience_types": experience_types.list(),
        "providers": providers,
        "events": events,
        "event_modalities": [],
        "provider_categories": provider_categories,
        "provider_modalities": provider_modalities,
        "provider_services": provider_services,
        "provider_client_needs": provider_client_needs,
        "provider_experience_types": provider_experience_types,
        "submissions": [],
        "import_log": import_log,
        "routing_gold_standard": raw.get("routing_gold_standard", []),
    }
    OUT_PATH.write_text(json.dumps(snapshot, indent=2))
    print(json.dumps({
        "wrote": str(OUT_PATH),
        "providers": len(providers),
        "categories": len(categories.list()),
        "modalities": len(modalities.list()),
        "services": len(services.list()),
        "neighborhoods": len(neighborhoods.list()),
        "client_needs": len(client_needs.list()),
        "experience_types": len(experience_types.list()),
        "events": len(events),
        "verification_counts": verification_counts,
    }, indent=2))


if __name__ == "__main__":
    main()
