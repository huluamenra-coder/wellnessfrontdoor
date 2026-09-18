export type LayerStatus = 'live' | 'data-foundation' | 'future';

export type ProductLayer = {
  id: string;
  name: string;
  status: LayerStatus;
  summary: string;
};

export const PRODUCT_LAYERS: ProductLayer[] = [
  {
    id: 'discovery',
    name: 'Discovery Layer',
    status: 'live',
    summary: 'San Diego directory: practitioners, categories, search, profiles, events, outbound booking links.',
  },
  {
    id: 'concierge',
    name: 'Intelligent Concierge',
    status: 'future',
    summary: 'Listen, clarify, understand, and guide. Not live in V1.',
  },
  {
    id: 'intake',
    name: 'Intake / Routing',
    status: 'data-foundation',
    summary: 'Structured intent → needs → experiences → practitioners / services / events.',
  },
  {
    id: 'provider-concierge',
    name: 'Provider Concierge',
    status: 'future',
    summary: 'Phone, chat, and SMS over business knowledge. Not built yet.',
  },
  {
    id: 'experience',
    name: 'Experience',
    status: 'live',
    summary: 'Right experience, then book / buy / join on the provider’s own systems.',
  },
];

export const CONCIERGE_LOOP = ['Listen', 'Clarify', 'Understand', 'Guide'] as const;

export const MATCH_TARGETS = ['Practitioners', 'Services', 'Products', 'Events'] as const;

export const ECOSYSTEM_PATHS = [
  {
    id: 'services',
    name: 'Services & experiences',
    summary: 'Practitioners, treatments, movement, and sessions you can book.',
    href: '/categories',
  },
  {
    id: 'crystal-shops',
    name: 'Crystal shops',
    summary: 'Crystal stores and vibrational wellness tools.',
    href: '/categories/crystals',
  },
  {
    id: 'herbal-shops',
    name: 'Herbal shops',
    summary: 'Herb shops and plant-based wellness products.',
    href: '/categories/herbal-wellness',
  },
  {
    id: 'products',
    name: 'Wellness shops',
    summary: 'Other shops and tools that support the path.',
    href: '/categories/shop',
  },
  {
    id: 'supporting',
    name: 'Supporting businesses',
    summary: 'Communities, collectives, education, and membership spaces.',
    href: '/explore',
  },
] as const;

export const CONVERSION_PATHS = ['Book', 'Buy', 'Join'] as const;

export const ORCHESTRATOR = {
  name: 'WFD Orchestrator',
  principle: 'The product is the system that knows what needs to be done, not a single model.',
  agents: [
    { id: 'research', name: 'Research AI', job: 'Find practitioners, events, businesses, and information.' },
    { id: 'reasoning', name: 'Reasoning AI', job: 'Analyze complicated requests and match.' },
    { id: 'content', name: 'Content AI', job: 'Write local guides and practitioner profiles.' },
    { id: 'location', name: 'Location intelligence', job: 'Neighborhoods, distance, and geography.' },
    { id: 'data', name: 'Data AI', job: 'Organize practitioner information and identify patterns.' },
    { id: 'conversation', name: 'Conversational AI', job: 'Talk with the visitor. V2: Ask Wellness Front Door.' },
  ],
  live: false,
};

export const PROVIDER_CONCIERGE = {
  name: 'Provider Concierge',
  status: 'future' as LayerStatus,
  live: false,
  channels: ['Phone', 'Chat', 'SMS'] as const,
  pipeline: ['Phone / Chat / SMS', 'Business knowledge', 'Service / Practitioner', 'Booking'] as const,
  summary:
    'One interface for a spa, clinic, or wellness center. Inbound phone, chat, and SMS use that business’s knowledge to route to the right service or practitioner, then book on the provider’s existing system.',
};

export type IntakeIntent = {
  intent: string | null;
  primary_desire: string | null;
  secondary_desire: string | null;
  experience: string | null;
  time: string | null;
  location: string | null;
  budget: string | null;
  modality_preference: string | null;
  urgency: string | null;
};

export const INTENT_EXAMPLE: IntakeIntent = {
  intent: 'Stress / restoration',
  primary_desire: 'Relaxation',
  secondary_desire: 'Physical unwinding',
  experience: 'Private',
  time: '90 minutes',
  location: 'San Diego',
  budget: 'Unknown',
  modality_preference: 'Open',
  urgency: 'This week',
};

export type ClientNeedRoute = {
  id: string;
  name: string;
  slug: string;
  intent: string;
  primary_desire: string;
  secondary_desire: string | null;
  experience_tokens: string[];
  match_targets: typeof MATCH_TARGETS[number][];
  conversion: typeof CONVERSION_PATHS[number];
};

export const CLIENT_NEED_ROUTES: ClientNeedRoute[] = [
  {
    id: 'need-001',
    name: 'Stress / Overwhelm',
    slug: 'stress-overwhelm',
    intent: 'Stress / restoration',
    primary_desire: 'Relaxation',
    secondary_desire: 'Physical unwinding',
    experience_tokens: ['Meditation', 'Breathwork', 'Massage', 'Sound', 'Yoga', 'Sauna'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-002',
    name: 'Pain / Discomfort',
    slug: 'pain-discomfort',
    intent: 'Relief / body',
    primary_desire: 'Ease pain',
    secondary_desire: 'Restore mobility',
    experience_tokens: ['Massage', 'Bodywork', 'Chiropractic', 'Acupuncture', 'Physical Therapy', 'Stretching'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-003',
    name: 'Energize / Restore',
    slug: 'energize-restore',
    intent: 'Vitality / reset',
    primary_desire: 'More energy',
    secondary_desire: 'Nervous system reset',
    experience_tokens: ['Breathwork', 'Yoga', 'Cold Plunge', 'Cryotherapy', 'Light', 'Sauna'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-004',
    name: 'Detox / Rejuvenate',
    slug: 'detox-rejuvenate',
    intent: 'Cleanse / renew',
    primary_desire: 'Clear the system',
    secondary_desire: 'Skin and body renewal',
    experience_tokens: ['Sauna', 'Float', 'Ayurveda', 'Herbalism', 'Hydrotherapy', 'Cold Plunge'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-005',
    name: 'Sleep / Rest',
    slug: 'sleep-rest',
    intent: 'Rest / recovery',
    primary_desire: 'Deeper rest',
    secondary_desire: 'Quiet the mind',
    experience_tokens: ['Meditation', 'Sound', 'Float', 'Yoga', 'Massage'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-006',
    name: 'Connect / Belong',
    slug: 'connect-belong',
    intent: 'Community / meaning',
    primary_desire: 'Feel connected',
    secondary_desire: 'Shared practice',
    experience_tokens: ['Community', 'Collective', 'Yoga', 'Sound', 'Meditation', 'Circles'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Join',
  },
  {
    id: 'need-007',
    name: 'Beauty / Skin',
    slug: 'beauty-skin',
    intent: 'Glow / renew',
    primary_desire: 'Clearer, calmer skin',
    secondary_desire: 'Feel at home in your body',
    experience_tokens: ['Facials', 'Skincare', 'Massage', 'Spa', 'Waxing'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
  {
    id: 'need-008',
    name: 'Movement / Flow',
    slug: 'movement-flow',
    intent: 'Move / strengthen',
    primary_desire: 'Move with more ease',
    secondary_desire: 'Build strength and presence',
    experience_tokens: ['Yoga', 'Fitness', 'Stretching', 'Breathwork', 'Movement'],
    match_targets: ['Practitioners', 'Services', 'Products', 'Events'],
    conversion: 'Book',
  },
];

export const FEATURED_CATEGORY_SLUGS = [
  'recovery',
  'wellness',
  'movement',
  'community',
  'energy',
  'holistic',
  'spa',
  'beauty',
] as const;

export const NEED_VISUALS: Record<string, { icon: string; blurb: string }> = {
  'stress-overwhelm': { icon: 'flower', blurb: 'Relaxation · Physical unwinding' },
  'pain-discomfort': { icon: 'waves', blurb: 'Ease pain · Restore mobility' },
  'energize-restore': { icon: 'sun', blurb: 'More energy · Nervous system reset' },
  'detox-rejuvenate': { icon: 'leaf', blurb: 'Clear the system · Skin and body renewal' },
  'sleep-rest': { icon: 'moon', blurb: 'Deeper rest · Quiet the mind' },
  'connect-belong': { icon: 'users', blurb: 'Feel connected · Shared practice' },
  'beauty-skin': { icon: 'sparkles', blurb: 'Clearer, calmer skin' },
  'movement-flow': { icon: 'move', blurb: 'Move with more ease' },
};

export const CATEGORY_BLURBS: Record<string, string> = {
  recovery: 'Support for healing, balance, and renewal.',
  wellness: 'Whole-person care for a healthier, more vibrant you.',
  movement: 'Build strength, flexibility, and ease.',
  community: 'Classes, gatherings, and shared experiences.',
  energy: 'Reset your energy and support your nervous system.',
  holistic: 'Integrative approaches for mind, body, and spirit.',
  spa: 'Relax, restore, and feel renewed.',
  beauty: 'Skincare, facials, and aesthetic wellness.',
};

export const ROADMAP = [
  {
    version: 'V1',
    status: 'live',
    items: ['Website', 'San Diego knowledge base', 'Curated practitioners', 'Categories', 'Search', 'Profiles', 'Events', 'Outbound booking links'],
  },
  {
    version: 'V2',
    status: 'future',
    items: ['Ask Wellness Front Door', 'Conversational search translated into structured filters'],
  },
  {
    version: 'V3',
    status: 'future',
    items: ['Personalized map', 'Goals, preferences, budget, history'],
  },
];

export function modalityMatchesToken(modalityName: string, token: string) {
  const name = modalityName.toLowerCase();
  const needle = token.toLowerCase();
  return name === needle || name.includes(needle) || needle.includes(name);
}
