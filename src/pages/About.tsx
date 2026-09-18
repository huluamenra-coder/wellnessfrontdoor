import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const PILLARS = [
  { name: 'People', summary: 'The practitioners, shops, and communities on the path.' },
  { name: 'Places', summary: 'Neighborhoods and spaces — starting in San Diego, designed for more cities later.' },
  { name: 'Practitioners', summary: 'Trusted local offerings, each with a distinct practice.' },
  { name: 'Experiences', summary: 'Start with what you need, then find the right next step.' },
  { name: 'Events', summary: 'Gatherings appear when they are documented — never invented.' },
  { name: 'Possibilities', summary: 'A map of healing arts, not a medical diagnosis and not a booking marketplace.' },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Why Wellness Front Door exists."
        lede="The wellness ecosystem is full of possibilities, but discovering the right path can be difficult. Wellness Front Door is a map and navigation layer for wellness and healing arts."
      />
      <section className="section">
        <h2>What WFD is</h2>
        <p className="lede">
          A front door into people, places, practitioners, experiences, events, and possibilities. San Diego is the
          first market. The brand is not locked to one city forever.
        </p>
        <div className="card-grid">
          {PILLARS.map((item) => (
            <article key={item.name} className="category-card">
              <p className="kicker">The map</p>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section copy-narrow">
        <h2>How it works</h2>
        <p>
          Search or start with a need. Open a listing. Visit or book on the provider’s own site. We do not replace
          their systems, diagnose conditions, or invent reviews.
        </p>
        <h2>The Intelligent Concierge</h2>
        <p>
          The concierge is the future intelligence layer: listen, clarify, understand, and guide. It is part of the
          platform vision — not a live agent on this website. What is live is the discovery layer you can use now.
        </p>
        <div className="hero-actions">
          <Link to="/how-it-works" className="button gold">
            How it works
          </Link>
          <Link to="/benefits" className="button outline">
            For seekers
          </Link>
        </div>
      </section>
      <CtaBand
        title="Walk through the door."
        lede="Explore the San Diego map, or list a business."
        actionTo="/explore"
        actionLabel="Explore"
      />
    </>
  );
}
