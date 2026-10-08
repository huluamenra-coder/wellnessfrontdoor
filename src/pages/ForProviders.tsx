import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const PILLARS = [
  { title: 'Reach more clients', body: 'Show up where people in San Diego are already looking for wellness.' },
  { title: 'Be easy to find', body: 'A structured listing with your website and booking link, not a locked-in marketplace.' },
  { title: 'Stay on your systems', body: 'Visitors visit or book on your site. We do not replace your calendar or checkout.' },
  { title: 'Join the map', body: 'Stand with other practitioners, shops, and supporting businesses on one front door.' },
];

const BENEFITS = [
  {
    title: 'Increased visibility',
    body: 'Get discovered by people actively seeking wellness services in San Diego.',
  },
  {
    title: 'Showcase your offerings',
    body: 'Highlight services, modalities, and the path you actually walk — without invented reviews.',
  },
  {
    title: 'Outbound booking',
    body: 'Keep booking, payments, and client relationships on the systems you already use.',
  },
  {
    title: 'A place in the neighborhood map',
    body: 'Appear in search, categories, needs, and — when tagged — neighborhood pages.',
  },
];

export function ForProvidersPage() {
  return (
    <>
      <PageHero
        kicker="For wellness professionals"
        title="Grow your impact. We’ll open the door."
        lede="Get discovered. Get connected. Wellness Front Door gives you visibility in the San Diego wellness map so you can focus on the work."
      >
        <div className="hero-actions">
          <Link to="/join" className="button gold">
            List your business
          </Link>
          <Link to="/how-it-works" className="button outline">
            How it works
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="card-grid">
          {PILLARS.map((item) => (
            <article key={item.title} className="category-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <p className="kicker">Key benefits</p>
        <h2>Built for wellness businesses and healers.</h2>
        <p className="lede">
          Whether you run a wellness center, private practice, studio, shop, or supporting space, the directory is the
          live product today.
        </p>
        <div className="card-grid">
          {BENEFITS.map((item) => (
            <article key={item.title} className="category-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        kicker="Let’s grow wellness together"
        title="List your business today."
        lede="Join a trusted map. Reach more people. Nothing is published until it is reviewed."
        actionTo="/join"
        actionLabel="Get started"
      />
    </>
  );
}
