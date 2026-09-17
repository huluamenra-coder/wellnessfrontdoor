export const SITE = {
  name: 'Wellness Front Door',
  tagline: 'The Intelligent Concierge',
  origin: 'https://wellnessfrontdoor.com',
  locale: 'en_US',
  city: 'San Diego',
  region: 'California',
  country: 'US',
  email: '',
  description:
    'Wellness Front Door is the San Diego wellness directory and intelligent concierge for people, places, practitioners, and experiences. Find massage, yoga, acupuncture, float, spas, crystal shops, herbal shops, and more — then visit or book on the provider’s own site.',
  imagePath: '/brand/hero-doorway.jpg',
  keywords: [
    'Wellness Front Door',
    'intelligent concierge',
    'San Diego wellness',
    'San Diego wellness directory',
    'wellness practitioners San Diego',
    'holistic wellness San Diego',
    'healing arts San Diego',
    'massage San Diego',
    'yoga Encinitas',
    'acupuncture San Diego',
    'float spa San Diego',
    'sound healing San Diego',
    'breathwork San Diego',
    'spa Little Italy',
    'Ocean Beach wellness',
    'crystal shops San Diego',
    'herbal shops San Diego',
    'sauna San Diego',
    'cold plunge San Diego',
    'meditation San Diego',
    'reiki San Diego',
    'chiropractic San Diego',
    'Ayurveda San Diego',
    'energy work',
    'wellness events San Diego',
    'people places practitioners experiences',
  ],
} as const;

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export const KEYWORD_STRING = SITE.keywords.join(', ');
