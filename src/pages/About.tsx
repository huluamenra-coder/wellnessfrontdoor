import { Link } from '../lib/router';

const PILLARS = [
  { name: 'People', summary: 'The practitioners, shops, and communities on the path.' },
  { name: 'Places', summary: 'Neighborhoods and spaces across San Diego.' },
  { name: 'Practitioners', summary: 'Trusted local offerings, each with a distinct practice.' },
  { name: 'Experiences', summary: 'Start with what you need — then find the right next step.' },
];

export function AboutPage() {
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Wellness Front Door</p>
          <h1>The intelligent concierge for wellness.</h1>
          <p className="lede">
            One front door for people, places, practitioners, and experiences in San Diego. Find the right offering,
            then visit or book on the provider’s own site.
          </p>
        </div>
      </div>

      <div className="card-grid">
        {PILLARS.map((item) => (
          <article key={item.name} className="category-card">
            <p className="kicker">The map</p>
            <h3>{item.name}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>

      <div className="about-grid">
        <img src="/brand/i-we.jpg" alt="Wellness as a shared path — from I to We." />
        <div>
          <h2>What is live</h2>
          <p>
            The San Diego directory is open: search, categories, neighborhoods, profiles, and links out to each
            business. Nothing here replaces a provider’s booking system.
          </p>
          <h2>What comes next</h2>
          <p>
            The intelligent concierge will listen, clarify, understand, and guide. For now, start with a need or
            explore the directory.
          </p>
          <div className="close-actions">
            <Link to="/explore" className="button gold">
              Explore
            </Link>
            <Link to="/join" className="button outline">
              Join
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
