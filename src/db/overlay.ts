import type { ListingSubmission, Snapshot, TaxonomyKind, TaxonomyTerm } from './types';

const KEY = 'wfd-v1-overlay-verified';

export type Overlay = {
  providerPatches: Record<string, Record<string, unknown>>;
  taxonomyAdds: Partial<Record<TaxonomyKind, TaxonomyTerm[]>>;
  providerCategoryAdds: { provider_id: string; category_id: string; is_primary: boolean }[];
  providerModalityAdds: { provider_id: string; modality_id: string }[];
  providerServiceAdds: { provider_id: string; service_id: string }[];
  providerNeedAdds: { provider_id: string; client_need_id: string }[];
  providerExperienceAdds: { provider_id: string; experience_type_id: string }[];
  events: Snapshot['events'];
  eventModalityAdds: { event_id: string; modality_id: string }[];
  submissions: ListingSubmission[];
};

const empty = (): Overlay => ({
  providerPatches: {},
  taxonomyAdds: {},
  providerCategoryAdds: [],
  providerModalityAdds: [],
  providerServiceAdds: [],
  providerNeedAdds: [],
  providerExperienceAdds: [],
  events: [],
  eventModalityAdds: [],
  submissions: [],
});

export function readOverlay(): Overlay {
  if (typeof localStorage === 'undefined') return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}

export function writeOverlay(overlay: Overlay) {
  localStorage.setItem(KEY, JSON.stringify(overlay));
}

export function updateOverlay(mutator: (current: Overlay) => Overlay) {
  const next = mutator(readOverlay());
  writeOverlay(next);
  return next;
}
