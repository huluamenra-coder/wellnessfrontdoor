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
  {
    id: 'future-intelligence',
    name: 'MIM / LMS / H.E.A.R.T.',
    status: 'future',
    summary: 'Only after enough interaction data exists.',
  },
];

export const CONCIERGE_LOOP = ['Listen', 'Clarify', 'Understand', 'Guide'] as const;

export const MATCH_TARGETS = ['Practitioners', 'Services', 'Events'] as const;

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
    match_targets: ['Practitioners', 'Services', 'Events'],
    conversion: 'Book',
  },
];

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
  {
    version: 'V4',
    status: 'future',
    items: ['MIM as an intelligence layer after interaction data exists'],
  },
];

export function modalityMatchesToken(modalityName: string, token: string) {
  const name = modalityName.toLowerCase();
  const needle = token.toLowerCase();
  return name === needle || name.includes(needle) || needle.includes(name);
}
