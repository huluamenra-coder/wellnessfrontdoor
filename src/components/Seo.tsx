import { useEffect } from 'react';
import { getNeedRoute, getProvider, getEvent, listProviders, listTaxonomy } from '../db/repository';
import { KEYWORD_STRING, SITE, absoluteUrl } from '../lib/site';
import { useRouter, type Route } from '../lib/router';

type SeoDoc = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  jsonLd: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function orgJsonLd() {
  return {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE.name,
    alternateName: SITE.tagline,
    url: SITE.origin,
    logo: absoluteUrl('/brand/logo-mark.jpg'),
    image: absoluteUrl(SITE.imagePath),
    description: SITE.description,
    areaServed: {
      '@type': 'City',
      name: SITE.city,
      containedInPlace: { '@type': 'State', name: SITE.region },
    },
    knowsAbout: [...SITE.keywords],
  };
}

function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE.name,
    url: SITE.origin,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': absoluteUrl('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.origin}/explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function graph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [orgJsonLd(), websiteJsonLd(), ...nodes],
  };
}

function pageNode(name: string, description: string, path: string, extra: Record<string, unknown> = {}) {
  return {
    '@type': 'WebPage',
    '@id': absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': absoluteUrl('/#website') },
    about: { '@id': absoluteUrl('/#organization') },
    inLanguage: 'en-US',
    ...extra,
  };
}

function resolveSeo(route: Route): SeoDoc {
  const path = route.path || '/';
  const canonical = absoluteUrl(path === '/' ? '/' : path);
  const indexable = { robots: 'index, follow, max-image-preview:large' as const };
  const noindex = { robots: 'noindex, nofollow' as const };

  if (route.name === 'home') {
    return {
      title: 'Wellness Front Door | San Diego Wellness & Healing Arts',
      description: SITE.description,
      canonical: absoluteUrl('/'),
      ...indexable,
      jsonLd: graph([
        pageNode(SITE.name, SITE.description, '/', {
          '@type': ['WebPage', 'CollectionPage'],
          keywords: KEYWORD_STRING,
        }),
      ]),
    };
  }

  if (route.name === 'explore') {
    const query = new URLSearchParams(route.search).get('q');
    const title = query
      ? `${query} in San Diego`
      : 'Explore San Diego Wellness Providers & Experiences';
    const description = query
      ? `Search results for ${query} in the San Diego wellness directory — people, places, practitioners, and experiences.`
      : 'Explore San Diego wellness providers, practitioners, places, modalities, and experiences by need, category, neighborhood, and more.';
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'needs') {
    const title = 'Find Wellness Experiences by What You Need';
    const description =
      'Start with what you need. Explore wellness experiences and local providers across San Diego for rest, movement, connection, restoration, beauty, and more.';
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([
        pageNode(title, description, path, {
          '@type': ['WebPage', 'CollectionPage'],
        }),
      ]),
    };
  }

  if (route.name === 'need') {
    const need = getNeedRoute(route.params.slug);
    if (!need) {
      return {
        title: `Experience not found | ${SITE.name}`,
        description: SITE.description,
        canonical,
        ...noindex,
        jsonLd: graph([]),
      };
    }
    const title = `${need.name} in San Diego | Wellness Experiences`;
    const description = `${need.primary_desire} in San Diego through ${need.experience_tokens.join(', ')}. Find matching practitioners and book on their own sites.`;
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'categories') {
    const title = 'San Diego Wellness Categories & Modalities';
    const description =
      'Browse San Diego wellness categories: massage, yoga, acupuncture, float, crystal shops, herbal shops, spas, recovery, and more.';
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'category') {
    const category = listTaxonomy('categories').find((item) => item.slug === route.params.slug);
    if (!category) {
      return {
        title: `Category not found | ${SITE.name}`,
        description: SITE.description,
        canonical,
        ...noindex,
        jsonLd: graph([]),
      };
    }
    const count = listProviders({ category: category.slug }).length;
    const title = `${category.name} in San Diego`;
    const description = `${count} ${category.name.toLowerCase()} listings in the San Diego wellness directory. Discover people, places, and practitioners, then visit or book on their site.`;
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'neighborhoods') {
    const title = 'San Diego Wellness by Neighborhood';
    const description =
      'Discover wellness providers, experiences, and events by neighborhood across San Diego.';
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'neighborhood') {
    const neighborhood = listTaxonomy('neighborhoods').find((item) => item.slug === route.params.slug);
    if (!neighborhood) {
      return {
        title: `Place not found | ${SITE.name}`,
        description: SITE.description,
        canonical,
        ...noindex,
        jsonLd: graph([]),
      };
    }
    const title = `${neighborhood.name} wellness | San Diego`;
    const description = `Wellness practitioners, shops, and experiences in ${neighborhood.name}, San Diego. Search the local directory, then visit or book on the provider’s own site.`;
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'provider') {
    const provider = getProvider(route.params.id);
    if (!provider) {
      return {
        title: `Listing not found | ${SITE.name}`,
        description: SITE.description,
        canonical,
        ...noindex,
        jsonLd: graph([]),
      };
    }
    const place = provider.neighborhood?.name || provider.city || SITE.city;
    const offerings = [...provider.modalities, ...provider.services]
      .map((item) => item.name)
      .slice(0, 6)
      .join(', ');
    const title = `${provider.business_name} | ${place} wellness`;
    const description = offerings
      ? `${provider.business_name} in ${place}: ${offerings}. Listed in the Wellness Front Door San Diego directory.`
      : `${provider.business_name} is a San Diego wellness listing on Wellness Front Door. Visit or book on their own site.`;
    const localBusiness: Record<string, unknown> = {
      '@type': 'LocalBusiness',
      '@id': absoluteUrl(`${path}#business`),
      name: provider.business_name,
      url: provider.website || canonical,
      image: absoluteUrl(SITE.imagePath),
      address: {
        '@type': 'PostalAddress',
        addressLocality: provider.city || SITE.city,
        addressRegion: 'CA',
        addressCountry: 'US',
        streetAddress: provider.address || undefined,
        postalCode: provider.zip || undefined,
      },
      areaServed: place,
      ...(provider.phone ? { telephone: provider.phone } : {}),
      ...(offerings ? { knowsAbout: offerings.split(', ') } : {}),
    };
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path), localBusiness]),
    };
  }

  if (route.name === 'events') {
    const title = 'Wellness Events, Retreats & Gatherings';
    const description =
      'Return to Source and other documented wellness retreats, workshops, and gatherings. Dates and prices come from the organizer. Book on their site.';
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'submit') {
    const title = 'List Your Wellness Business in San Diego';
    const description =
      'List or claim your San Diego wellness business on Wellness Front Door. Reach people looking for practitioners, shops, and experiences. Nothing is auto-published.';
    return {
      title,
      description,
      canonical: absoluteUrl('/join'),
      ...indexable,
      jsonLd: graph([pageNode(title, description, '/join')]),
    };
  }

  if (route.name === 'about') {
    const title = 'About Wellness Front Door | The San Diego Wellness & Healing Arts Map';
    const description =
      'Wellness Front Door is a map and navigation layer for wellness and healing arts. San Diego is the first market. The Intelligent Concierge is the future intelligence layer.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path, { '@type': 'AboutPage' })]),
    };
  }

  if (route.name === 'how-it-works') {
    const title = 'How Wellness Front Door Works | Discover Local Wellness';
    const description =
      'See how Wellness Front Door helps you go from a question to a real local wellness experience in San Diego — then visit or book on the provider’s own site.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'benefits') {
    const title = 'Wellness Front Door for Wellness Seekers | Discover Local Wellness';
    const description =
      'Discover local providers, explore by need, find experiences and neighborhoods, and connect directly — without a live AI chatbot promising to know you.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'for-providers') {
    const title = 'For Wellness Professionals & Healers | Wellness Front Door';
    const description =
      'Visibility, structured listings, and a place in the San Diego wellness map for practitioners, studios, shops, and supporting businesses.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'your-concierge') {
    const title = 'Intelligent Concierge for Wellness Businesses | Wellness Front Door';
    const description =
      'A business-specific concierge is the product we are building. Today, list your San Diego wellness business in the live directory.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path)]),
    };
  }

  if (route.name === 'contact') {
    const title = 'Contact Wellness Front Door';
    const description = 'Contact Wellness Front Door about the San Diego wellness directory, listings, or the platform.';
    return {
      title,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([pageNode(title, description, path, { '@type': 'ContactPage' })]),
    };
  }

  if (route.name === 'event') {
    const event = getEvent(route.params.slug);
    if (!event) {
      return {
        title: `Event not found | ${SITE.name}`,
        description: 'No verified event matches this page.',
        canonical,
        ...noindex,
        jsonLd: graph([]),
      };
    }
    const title = event.event_name || 'Event';
    const description =
      event.description ||
      `${title}${event.date ? ` · ${event.date}` : ''}. Register on the organizer site.`;
    return {
      title: `${title} | ${SITE.name}`,
      description,
      canonical,
      ...indexable,
      jsonLd: graph([
        pageNode(title, description, path, { '@type': 'Event' }),
        {
          '@type': 'Event',
          name: title,
          description,
          startDate: event.date,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: event.location
            ? { '@type': 'Place', name: event.location }
            : undefined,
          organizer: {
            '@type': 'Organization',
            name: event.organizer_name_raw || event.organizer?.business_name || SITE.name,
            url: event.website || event.booking_url || SITE.origin,
          },
          offers: event.price
            ? {
                '@type': 'Offer',
                price: event.price.replace(/[^0-9.]/g, ''),
                priceCurrency: 'USD',
                url: event.booking_url || event.website,
              }
            : undefined,
          url: canonical,
        },
      ]),
    };
  }

  if (route.name === 'admin' || route.name === 'admin-provider') {
    return {
      title: `Admin | ${SITE.name}`,
      description: 'Private data review for Wellness Front Door.',
      canonical,
      ...noindex,
      jsonLd: graph([]),
    };
  }

  return {
    title: `Page not found | ${SITE.name}`,
    description: SITE.description,
    canonical,
    ...noindex,
    jsonLd: graph([]),
  };
}

export function Seo() {
  const { route } = useRouter();
  const spec = resolveSeo(route);
  const image = absoluteUrl(SITE.imagePath);

  useEffect(() => {
    document.title = spec.title;
    upsertMeta('name', 'description', spec.description);
    upsertMeta('name', 'keywords', KEYWORD_STRING);
    upsertMeta('name', 'robots', spec.robots);
    upsertMeta('name', 'author', SITE.name);
    upsertLink('canonical', spec.canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:locale', SITE.locale);
    upsertMeta('property', 'og:title', spec.title);
    upsertMeta('property', 'og:description', spec.description);
    upsertMeta('property', 'og:url', spec.canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', `${SITE.name} — ${SITE.tagline}`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', spec.title);
    upsertMeta('name', 'twitter:description', spec.description);
    upsertMeta('name', 'twitter:image', image);
  }, [spec.title, spec.description, spec.canonical, spec.robots, image]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(spec.jsonLd) }}
    />
  );
}
