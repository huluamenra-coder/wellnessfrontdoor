import { ArrowRight } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProviderCard } from '../components/ProviderCard';
import { CategoryCard } from '../components/CategoryCard';
import { Link } from '../lib/router';
import { listNeedRoutes, listProviders, listTaxonomy, offeringPath } from '../db/repository';
import { ECOSYSTEM_PATHS } from '../architecture/wfd';

const PILLARS = ['People', 'Places', 'Experiences', 'Practitioners'];

export function HomePage() {
  const categories = listTaxonomy('categories');
  const providers = listProviders();
  const needRoutes = listNeedRoutes();
  const categoryCounts = categories
    .map((category) => ({
      category,
      count: listProviders({ category: category.slug }).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const pathGroups = ECOSYSTEM_PATHS.map((path) => ({
    path,
    listings: providers.filter((provider) => offeringPath(provider).id === path.id).slice(0, 3),
  }));

  return (
    <>
      <section className="hero">
        <img
          src="/brand/hero-doorway.jpg"
          alt="Wellness Front Door in San Diego: Discover, Connect, Heal, Belong — the intelligent concierge for people, places, practitioners, and experiences."
          className="hero-image"
        />
        <div className="hero-overlay">
          <p className="kicker gold-glow">Wellness has a front door.</p>
          <h1>
            Find the right wellness experience
            <em>for where you are.</em>
          </h1>
          <p className="lede">
            San Diego’s wellness directory for people, places, practitioners, and experiences — massage, yoga,
            acupuncture, float, spas, crystal shops, herbal shops, and more. Visit or book on the provider’s own site.
          </p>
          <SearchBar placeholder="Yoga, Encinitas, massage…" />
          <div className="pillars">
            {PILLARS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section path-band">
        <div className="section-heading">
          <div>
            <p className="kicker">Not just services</p>
            <h2>Many unique paths to healing.</h2>
            <p className="lede">
              {providers.length} official local businesses — practitioners, shops, and supporting spaces, each with a
              distinct offering.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {pathGroups.map(({ path, listings }) => (
            <Link key={path.id} to={path.href} className="category-card">
              <p className="kicker">{listings.length} listings</p>
              <h3>{path.name}</h3>
              <p>{path.summary}</p>
              <p className="muted">{listings.map((item) => item.business_name).filter(Boolean).join(' · ')}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Experiences</p>
            <h2>Start with what you need.</h2>
          </div>
          <Link to="/needs" className="text-link">
            All experiences
          </Link>
        </div>
        <div className="card-grid">
          {needRoutes.map((route) => (
            <Link key={route.id} to={`/needs/${route.slug}`} className="category-card">
              <p className="kicker">{route.intent}</p>
              <h3>{route.name}</h3>
              <p>{route.primary_desire} · {route.secondary_desire}</p>
              <div className="chip-row">
                {route.experience_tokens.map((token) => (
                  <span key={token} className="chip">
                    {token}
                  </span>
                ))}
              </div>
              <p>{listProviders({ clientNeed: route.slug }).length} matching listings</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Discover · Connect · Heal · Belong</p>
            <h2>A clearer path into local wellness.</h2>
          </div>
          <Link to="/explore" className="button outline">
            Explore the directory <ArrowRight size={16} />
          </Link>
        </div>
        <div className="split-compare">
          <img src="/brand/compare.jpg" alt="Wellness Front Door compared with fragmented search" />
          <div>
            <h3>Not another generic listing site.</h3>
            <p>
              Each business here was chosen for a unique offering — a service, a product, or a supporting space on the
              path to healing. Search, then visit or book on their own website.
            </p>
            <p>The intelligent concierge comes later. The directory is live now.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Categories</p>
            <h2>Start with the kind of care you want.</h2>
          </div>
          <Link to="/categories" className="text-link">
            All categories
          </Link>
        </div>
        <div className="card-grid">
          {categoryCounts.map(({ category, count }) => (
            <CategoryCard key={category.id} term={category} count={count} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">San Diego directory</p>
            <h2>Unique local offerings.</h2>
          </div>
          <Link to="/explore" className="text-link">
            View all
          </Link>
        </div>
        <div className="card-grid providers">
          {providers.slice(0, 6).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="section close-band">
        <div className="section-heading">
          <div>
            <p className="kicker">Discover · Connect · Heal · Belong</p>
            <h2>A healthier you. A brighter tomorrow.</h2>
            <p className="lede">The directory is live now. The intelligent concierge comes later.</p>
          </div>
        </div>
        <div className="close-actions">
          <Link to="/explore" className="button gold">
            Explore
          </Link>
          <Link to="/join" className="button outline light">
            Join
          </Link>
        </div>
      </section>
    </>
  );
}
