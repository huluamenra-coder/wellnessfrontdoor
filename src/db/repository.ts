import snapshotData from '../../data/snapshot.json';
import { CLIENT_NEED_ROUTES, ECOSYSTEM_PATHS, modalityMatchesToken, type ClientNeedRoute } from '../architecture/wfd';
import { readOverlay, updateOverlay, type Overlay } from './overlay';
import type {
  DirectoryFilters,
  EventRecord,
  EventView,
  ListingSubmission,
  ProviderRecord,
  ProviderView,
  Snapshot,
  TaxonomyKind,
  TaxonomyTerm,
  VerificationStatus,
} from './types';

const snapshot = snapshotData as Snapshot;

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

function mergeTaxonomy(kind: TaxonomyKind, overlay: Overlay): TaxonomyTerm[] {
  return [...snapshot[kind], ...(overlay.taxonomyAdds[kind] ?? [])];
}

function byId(items: TaxonomyTerm[]) {
  return new Map(items.map((item) => [item.id, item]));
}

function matchesQuery(view: ProviderView, query: string) {
  const haystack = [
    view.business_name,
    view.practitioner_name,
    view.city,
    view.neighborhood?.name,
    ...view.categories.map((item) => item.name),
    ...view.modalities.map((item) => item.name),
    ...view.services.map((item) => item.name),
    ...view.client_needs.map((item) => item.name),
    ...view.experience_types.map((item) => item.name),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function getMeta() {
  return snapshot.meta;
}

export function getRoutingGoldStandard() {
  return snapshot.routing_gold_standard;
}

export function getVerificationCounts() {
  const providers = listProviders({ verification: 'all' }, { includeUnverified: true });
  return providers.reduce(
    (counts, provider) => {
      counts[provider.verification_status] += 1;
      return counts;
    },
    {
      verified: 0,
      needs_verification: 0,
      claimed: 0,
      suspended: 0,
    } as Record<VerificationStatus, number>
  );
}

export function listNeedRoutes() {
  return CLIENT_NEED_ROUTES;
}

export function getNeedRoute(slug: string) {
  return CLIENT_NEED_ROUTES.find((route) => route.slug === slug || route.id === slug) ?? null;
}

export function needRouteTerms(): TaxonomyTerm[] {
  return CLIENT_NEED_ROUTES.map((route) => ({
    id: route.id,
    name: route.name,
    slug: route.slug,
    description: route.intent,
    created_at: null,
    updated_at: null,
  }));
}

export function providerMatchesNeed(provider: ProviderView, route: ClientNeedRoute) {
  const names = [...provider.modalities, ...provider.services, ...provider.categories].map((item) => item.name);
  return route.experience_tokens.some((token) => names.some((name) => modalityMatchesToken(name, token)));
}

export function matchedExperiences(provider: ProviderView, route: ClientNeedRoute) {
  const names = [...provider.modalities, ...provider.services, ...provider.categories];
  return route.experience_tokens.filter((token) => names.some((item) => modalityMatchesToken(item.name, token)));
}

export function listTaxonomy(kind: TaxonomyKind) {
  if (kind === 'client_needs') {
    const imported = mergeTaxonomy(kind, readOverlay());
    const routed = needRouteTerms().filter((term) => !imported.some((item) => item.slug === term.slug));
    return [...imported, ...routed].sort((a, b) => a.name.localeCompare(b.name));
  }
  return mergeTaxonomy(kind, readOverlay()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getProviderViews(overlay = readOverlay()): ProviderView[] {
  const categories = byId(mergeTaxonomy('categories', overlay));
  const modalities = byId(mergeTaxonomy('modalities', overlay));
  const services = byId(mergeTaxonomy('services', overlay));
  const needs = byId(mergeTaxonomy('client_needs', overlay));
  const experiences = byId(mergeTaxonomy('experience_types', overlay));
  const neighborhoods = byId(mergeTaxonomy('neighborhoods', overlay));
  const events = [...snapshot.events, ...overlay.events];

  const categoryJoins = [...snapshot.provider_categories, ...overlay.providerCategoryAdds];
  const modalityJoins = [...snapshot.provider_modalities, ...overlay.providerModalityAdds];
  const serviceJoins = [...snapshot.provider_services, ...overlay.providerServiceAdds];
  const needJoins = [...snapshot.provider_client_needs, ...overlay.providerNeedAdds];
  const experienceJoins = [...snapshot.provider_experience_types, ...overlay.providerExperienceAdds];

  return snapshot.providers.map((provider) => {
    const patched = {
      ...provider,
      ...(overlay.providerPatches[provider.id] ?? {}),
    } as ProviderRecord;
    const providerCategories = categoryJoins
      .filter((join) => join.provider_id === patched.id)
      .map((join) => categories.get(join.category_id))
      .filter((item): item is TaxonomyTerm => Boolean(item));
    const primary = patched.primary_category_id
      ? categories.get(patched.primary_category_id) ?? providerCategories[0] ?? null
      : providerCategories[0] ?? null;
    return {
      ...patched,
      primary_category: primary,
      categories: providerCategories,
      modalities: modalityJoins
        .filter((join) => join.provider_id === patched.id)
        .map((join) => modalities.get(join.modality_id))
        .filter((item): item is TaxonomyTerm => Boolean(item)),
      services: serviceJoins
        .filter((join) => join.provider_id === patched.id)
        .map((join) => services.get(join.service_id))
        .filter((item): item is TaxonomyTerm => Boolean(item)),
      client_needs: needJoins
        .filter((join) => join.provider_id === patched.id)
        .map((join) => needs.get(join.client_need_id))
        .filter((item): item is TaxonomyTerm => Boolean(item)),
      experience_types: experienceJoins
        .filter((join) => join.provider_id === patched.id)
        .map((join) => experiences.get(join.experience_type_id))
        .filter((item): item is TaxonomyTerm => Boolean(item)),
      neighborhood: patched.neighborhood_id ? neighborhoods.get(patched.neighborhood_id) ?? null : null,
      events: events.filter((event) => event.organizer_id === patched.id && event.event_name),
    };
  });
}

export function listProviders(
  filters: DirectoryFilters = {},
  options: { includeUnverified?: boolean } = {}
) {
  const includeUnverified = options.includeUnverified ?? true;
  return getProviderViews().filter((provider) => {
    if (!includeUnverified && provider.verification_status !== 'verified') return false;
    if (filters.verification && filters.verification !== 'all' && provider.verification_status !== filters.verification) {
      return false;
    }
    if (filters.category && !provider.categories.some((item) => item.slug === filters.category || item.id === filters.category)) {
      return false;
    }
    if (filters.modality && !provider.modalities.some((item) => item.slug === filters.modality || item.id === filters.modality)) {
      return false;
    }
    if (filters.clientNeed) {
      const route = getNeedRoute(filters.clientNeed);
      const importedNeed = provider.client_needs.some(
        (item) => item.slug === filters.clientNeed || item.id === filters.clientNeed
      );
      if (route) {
        if (!providerMatchesNeed(provider, route) && !importedNeed) return false;
      } else if (!importedNeed) {
        return false;
      }
    }
    if (filters.neighborhood && provider.neighborhood?.slug !== filters.neighborhood && provider.neighborhood?.id !== filters.neighborhood) {
      return false;
    }
    if (
      filters.experienceType &&
      !provider.experience_types.some((item) => item.slug === filters.experienceType || item.id === filters.experienceType)
    ) {
      return false;
    }
    if (filters.query && !matchesQuery(provider, filters.query)) return false;
    return true;
  });
}

export function getProvider(id: string) {
  return getProviderViews().find((provider) => provider.id === id || provider.record_id.toLowerCase() === id.toLowerCase()) ?? null;
}

export function getEvent(slug: string) {
  return listEvents().find(
    (item) => item.id === slug || (item.event_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  ) ?? null;
}

export function listEvents(): EventView[] {
  const overlay = readOverlay();
  const providers = getProviderViews(overlay);
  const categories = byId(mergeTaxonomy('categories', overlay));
  const modalities = byId(mergeTaxonomy('modalities', overlay));
  const events = [...snapshot.events, ...overlay.events].filter((event) => event.event_name);
  const eventModalityJoins = [...snapshot.event_modalities, ...overlay.eventModalityAdds];
  return events.map((event) => ({
    ...event,
    organizer: event.organizer_id ? providers.find((provider) => provider.id === event.organizer_id) ?? null : null,
    category: event.category_id ? categories.get(event.category_id) ?? null : null,
    modalities: eventModalityJoins
      .filter((join) => join.event_id === event.id)
      .map((join) => modalities.get(join.modality_id))
      .filter((item): item is TaxonomyTerm => Boolean(item)),
  }));
}

export function listSubmissions() {
  return readOverlay().submissions.slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function addSubmission(input: Omit<ListingSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: ListingSubmission['status'] }) {
  const now = new Date().toISOString();
  const submission: ListingSubmission = {
    ...input,
    id: `sub-${Date.now()}`,
    status: input.status ?? 'pending_review',
    created_at: now,
    updated_at: now,
  };
  updateOverlay((overlay) => ({ ...overlay, submissions: [submission, ...overlay.submissions] }));
  return submission;
}

export function updateSubmissionStatus(id: string, status: ListingSubmission['status']) {
  updateOverlay((overlay) => ({
    ...overlay,
    submissions: overlay.submissions.map((item) =>
      item.id === id ? { ...item, status, updated_at: new Date().toISOString() } : item
    ),
  }));
}

export function patchProvider(id: string, patch: Partial<ProviderRecord>) {
  updateOverlay((overlay) => ({
    ...overlay,
    providerPatches: {
      ...overlay.providerPatches,
      [id]: {
        ...(overlay.providerPatches[id] ?? {}),
        ...patch,
        updated_at: new Date().toISOString(),
      },
    },
  }));
}

export function addTaxonomyTerm(kind: TaxonomyKind, name: string) {
  const term: TaxonomyTerm = {
    id: `${kind.slice(0, 3)}-${Date.now()}`,
    name: name.trim(),
    slug: slugify(name),
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  updateOverlay((overlay) => ({
    ...overlay,
    taxonomyAdds: {
      ...overlay.taxonomyAdds,
      [kind]: [...(overlay.taxonomyAdds[kind] ?? []), term],
    },
  }));
  return term;
}

export function linkProviderTaxonomy(providerId: string, kind: TaxonomyKind, termId: string) {
  updateOverlay((overlay) => {
    if (kind === 'categories') {
      return { ...overlay, providerCategoryAdds: [...overlay.providerCategoryAdds, { provider_id: providerId, category_id: termId, is_primary: false }] };
    }
    if (kind === 'modalities') {
      return { ...overlay, providerModalityAdds: [...overlay.providerModalityAdds, { provider_id: providerId, modality_id: termId }] };
    }
    if (kind === 'services') {
      return { ...overlay, providerServiceAdds: [...overlay.providerServiceAdds, { provider_id: providerId, service_id: termId }] };
    }
    if (kind === 'client_needs') {
      return { ...overlay, providerNeedAdds: [...overlay.providerNeedAdds, { provider_id: providerId, client_need_id: termId }] };
    }
    if (kind === 'experience_types') {
      return { ...overlay, providerExperienceAdds: [...overlay.providerExperienceAdds, { provider_id: providerId, experience_type_id: termId }] };
    }
    return overlay;
  });
}

export function addEvent(input: Omit<EventRecord, 'id' | 'created_at' | 'updated_at' | 'is_demo'> & { is_demo?: boolean }) {
  const now = new Date().toISOString();
  const event: EventRecord = {
    ...input,
    id: `evt-${Date.now()}`,
    is_demo: input.is_demo ?? false,
    created_at: now,
    updated_at: now,
  };
  updateOverlay((overlay) => ({ ...overlay, events: [event, ...overlay.events] }));
  return event;
}

export function isVerified(status: VerificationStatus) {
  return status === 'verified';
}

export function verificationLabel(status: VerificationStatus) {
  if (status === 'verified') return 'Verified provider';
  if (status === 'claimed') return 'Claimed — in review';
  if (status === 'suspended') return 'Suspended';
  return 'Needs verification';
}

export type OfferingPathId = (typeof ECOSYSTEM_PATHS)[number]['id'];

const CRYSTAL_SHOP_SLUGS = new Set(['crystals', 'crystal-shops']);
const HERBAL_SHOP_SLUGS = new Set(['herbal-wellness', 'herbal-shops']);
const PRODUCT_SLUGS = new Set(['shop']);
const SUPPORTING_SLUGS = new Set(['community', 'collective', 'healing-collective', 'education', 'membership']);

export function offeringPath(provider: ProviderView) {
  const slugs = [provider.primary_category?.slug, ...provider.categories.map((item) => item.slug)].filter(Boolean);
  const id: OfferingPathId = slugs.some((slug) => CRYSTAL_SHOP_SLUGS.has(slug as string))
    ? 'crystal-shops'
    : slugs.some((slug) => HERBAL_SHOP_SLUGS.has(slug as string))
      ? 'herbal-shops'
      : slugs.some((slug) => PRODUCT_SLUGS.has(slug as string))
        ? 'products'
        : slugs.some((slug) => SUPPORTING_SLUGS.has(slug as string))
          ? 'supporting'
          : 'services';
  return ECOSYSTEM_PATHS.find((path) => path.id === id) ?? ECOSYSTEM_PATHS[0];
}

export function uniqueOfferings(provider: ProviderView, limit = 4) {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const item of [...provider.services, ...provider.modalities]) {
    const key = item.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    names.push(item.name);
    if (names.length >= limit) break;
  }
  return names;
}
