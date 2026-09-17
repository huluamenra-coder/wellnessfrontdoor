# Wellness Front Door

Curated local wellness discovery for San Diego. V1 is the directory and data foundation — not the AI concierge, payments, or booking engine.

## Run

```bash
npm install
npm run import:data
npm run dev
```

Open `http://localhost:4175`.

## Architecture

The existing Hulu Amen Ra storefront is a static Vite + React + TypeScript app with no database. WFD is a **separate project** that reuses that stack instead of introducing a new framework.

```
Vite + React + TypeScript
        │
        ▼
Repository layer (src/db/repository.ts)
        │
        ├── JSON snapshot (data/snapshot.json)  ← V1 source of truth
        └── localStorage overlay                ← admin edits + submissions
                │
                ▼ later
        Postgres using schema/001_init.sql
```

Why JSON now: there is no server or database in the current tooling, Netlify-style static hosting stays simple, and the snapshot matches the relational schema so it can be replaced without rewriting pages.

## Schema

Relational entities live in `schema/001_init.sql`:

- `providers`
- `categories`, `modalities`, `services`, `client_needs`, `neighborhoods`, `experience_types`
- join tables for provider ↔ taxonomy
- `events` + `event_modalities`
- `listing_submissions`
- verification enum: `verified | needs_verification | claimed | suspended`

Future routing can query **client needs → modalities/services → providers/events**. That query path is not implemented as AI.

## Import

Source workbook: `data/WFD_Master_Start_List_001_San_Diego.xlsx`  
Importer: `scripts/import-master-list.py`

The prompt mentioned 26 records. The supplied file contains **51** (1 internal reference + 50 research candidates). All 51 were imported. Placeholder strings (`Not yet verified`, `Not yet documented`, `To be verified`) were stored as `null`. No phone numbers, prices, credentials, addresses, or booking URLs were invented.

## Verification counts (imported snapshot)

| Status | Count |
| --- | --- |
| verified | 0 |
| needs_verification | 51 |
| claimed | 0 |
| suspended | 0 |

Public pages never show a “Verified provider” badge unless `verification_status = verified`. Credentials display only on verified records.

## V1 surfaces

- Home, Explore, Categories, Neighborhoods, Provider profile, Events, Submit/Claim, About, Admin
- Structured search and filters
- Outbound website / booking / call CTAs
- Submissions enter a review queue and are not auto-published
