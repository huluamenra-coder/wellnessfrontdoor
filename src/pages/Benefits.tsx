import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';
import { listProviders, listTaxonomy } from '../db/repository';

const SEEKER = [
  { title: 'Discover curated options', body: 'Find listed wellness providers, services, shops, and documented events in one map.' },
  { title: 'Start with what you need', body: 'From stress to sleep to movement, follow a need into matching listings.' },
  { title: 'Find local', body: 'Search San Diego, then visit or book on each provider’s own site.' },
  { title: 'No invented reviews', body: 'Listings use public information. We do not invent testimonials or medical claims.' },
];

const PROVIDER = [
  { title: 'Increase visibility', body: 'Reach people already looking for wellness in San Diego.' },
  { title: 'Keep your systems', body: 'Outbound links to your website and booking. We are not a booking engine.' },
  { title: 'A structured listing', body: 'Categories, modalities, neighborhood tags, and a profile people can trust.' },
  { title: 'Join the map', body: 'Stand with other practitioners and shops on one front door.' },
];

export function BenefitsPage() {
  const listings = listProviders().length;
  const neighborhoods = listTaxonomy('neighborhoods').length;
  return (
    <>
      <PageHero
        kicker="Benefits"
        title="Wellness works better together."
        lede="Wellness Front Door connects people and providers through a shared map — healthier lives, stronger communities, and a clearer path into local wellness."
      >
        <div className="hero-actions">
          <Link to="/explore" className="button gold">
            Explore the directory
          </Link>
          <Link to="/join" className="button outline">
            List a business
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="card-grid">
          <article className="category-card">
            <p className="kicker">For seekers</p>
            <h2>Benefits for you</h2>
            {SEEKER.map((item) => (
              <p key={item.title}>
                <strong>{item.title}. </strong>
                {item.body}
              </p>
            ))}
            <Link to="/explore" className="button gold">
              Start exploring
            </Link>
          </article>
          <article className="category-card">
            <p className="kicker">For providers</p>
            <h2>Benefits for your business</h2>
            {PROVIDER.map((item) => (
              <p key={item.title}>
                <strong>{item.title}. </strong>
                {item.body}
              </p>
            ))}
            <Link to="/join" className="button gold">
              List your business
            </Link>
          </article>
        </div>
      </section>
      <section className="section">
        <p className="kicker">On the map now</p>
        <div className="stat-grid">
          <article>
            <span>Listings</span>
            <strong>{listings}</strong>
          </article>
          <article>
            <span>Neighborhoods</span>
            <strong>{neighborhoods}</strong>
          </article>
          <article>
            <span>First city</span>
            <strong>San Diego</strong>
          </article>
        </div>
      </section>
      <CtaBand
        kicker="Be part of something bigger"
        title="Wellness for a brighter tomorrow."
        lede="Whether you are seeking support or offering it, you belong here."
        actionTo="/join"
        actionLabel="Join Wellness Front Door"
      />
    </>
  );
}
