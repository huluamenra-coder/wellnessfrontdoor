import { SearchBar } from '../components/SearchBar';
import { ProviderCard } from '../components/ProviderCard';
import { CtaBand, EntryPaths, NeedCard } from '../components/Brand';
import { Link } from '../lib/router';
import { getProvider, listNeedRoutes, listProviders, offeringPath } from '../db/repository';
import { ECOSYSTEM_PATHS, FEATURED_PRACTITIONERS } from '../architecture/wfd';

export function HomePage() {
  const providers = listProviders();
  const needRoutes = listNeedRoutes();
  const featuredPractitioners = FEATURED_PRACTITIONERS.map((id) => getProvider(id)).filter(
    (provider): provider is NonNullable<ReturnType<typeof getProvider>> => Boolean(provider)
  );
  const pathGroups = ECOSYSTEM_PATHS.map((path) => ({
    path,
    count: providers.filter((provider) => offeringPath(provider).id === path.id).length,
  }));

  return (
    <>
      <section className="hero">
        <img src="/brand/hero-doorway.jpg" alt="" className="hero-backdrop" aria-hidden="true" />
        <div className="hero-frame">
          <img
            src="/brand/hero-doorway.jpg"
            alt="Open golden doors looking out to a San Diego sunrise. Wellness has a front door."
            className="hero-image"
          />
          <div className="hero-search">
            <h1 className="visually-hidden">Wellness has a front door. Find the right wellness experience for where you are.</h1>
            <SearchBar placeholder="Yoga, Encinitas, massage…" />
          </div>
        </div>
      </section>

      <section className="section home-intro">
        <EntryPaths />
        <p className="pillar-line">People · Places · Experiences · Practitioners · Community</p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Experiences</p>
            <h2>Start with what you need.</h2>
          </div>
          <Link to="/needs" className="text-link">
            View all needs
          </Link>
        </div>
        <div className="need-grid">
          {needRoutes.map((route) => (
            <NeedCard key={route.id} route={route} compact />
          ))}
        </div>
      </section>

      {featuredPractitioners.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="kicker">Practitioners</p>
              <h2>Guides on the path.</h2>
              <p className="lede">
                Highlighted San Diego practitioners. Visit or book on their own sites.
              </p>
            </div>
            <Link to="/explore" className="text-link">
              Explore the directory
            </Link>
          </div>
          <div className="card-grid providers featured-practitioners">
            {featuredPractitioners.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} featured />
            ))}
          </div>
        </section>
      )}

      <section className="section path-band">
        <div className="section-heading">
          <div>
            <p className="kicker">Not just services</p>
            <h2>Many unique paths into wellness.</h2>
            <p className="lede">
              Explore {providers.length} local businesses, practitioners, shops, and supporting spaces across San Diego.
            </p>
          </div>
          <Link to="/explore" className="button outline light">
            Explore the directory
          </Link>
        </div>
        <div className="card-grid paths">
          {pathGroups.map(({ path, count }) => (
            <Link key={path.id} to={path.href} className="category-card">
              <p className="kicker">{count} {count === 1 ? 'listing' : 'listings'}</p>
              <h3>{path.name}</h3>
              <p>{path.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Unique local offerings</p>
            <h2>A few places to begin.</h2>
          </div>
          <Link to="/explore" className="text-link">
            View all
          </Link>
        </div>
        <div className="card-grid providers">
          {providers.slice(0, 4).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <CtaBand
        kicker="Join"
        title="List your wellness business."
        lede="Reach people looking for practitioners, shops, and experiences. Nothing is published until it is reviewed."
        actionTo="/join"
        actionLabel="For providers"
      />
    </>
  );
}
