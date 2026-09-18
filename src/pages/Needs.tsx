import { Link } from '../lib/router';
import { ProviderCard } from '../components/ProviderCard';
import { getNeedRoute, listNeedRoutes, listProviders, matchedExperiences } from '../db/repository';

export function NeedsPage() {
  const routes = listNeedRoutes();
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Experiences</p>
          <h1>Start with what you need.</h1>
          <p className="lede">
            Stress, pain, energy, detox, sleep, connection, beauty, or movement — then matching San Diego experiences
            and practitioners.
          </p>
        </div>
      </div>
      <div className="card-grid">
        {routes.map((route) => {
          const count = listProviders({ clientNeed: route.slug }).length;
          return (
            <Link key={route.id} to={`/needs/${route.slug}`} className="category-card">
              <p className="kicker">{route.intent}</p>
              <h3>{route.name}</h3>
              <p>{route.primary_desire}</p>
              <div className="chip-row">
                {route.experience_tokens.map((token) => (
                  <span key={token} className="chip">
                    {token}
                  </span>
                ))}
              </div>
              <p>{count} matching listings</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function NeedDetailPage({ slug }: { slug: string }) {
  const route = getNeedRoute(slug);
  if (!route) {
    return (
      <section className="section page">
        <p className="kicker">Experiences</p>
        <h1>Experience not found</h1>
        <Link to="/needs" className="text-link">
          All experiences
        </Link>
      </section>
    );
  }
  const providers = listProviders({ clientNeed: route.slug });
  return (
    <section className="section page">
      <p className="kicker">Experiences</p>
      <h1>{route.name}</h1>
      <p className="lede">
        {route.primary_desire}
        {route.secondary_desire ? ` · ${route.secondary_desire}` : ''} in San Diego.
      </p>
      <h2>Possible experiences</h2>
      <div className="chip-row">
        {route.experience_tokens.map((token) => (
          <span key={token} className="chip">
            {token}
          </span>
        ))}
      </div>
      <p className="result-meta">
        {providers.length} {providers.length === 1 ? 'listing' : 'listings'} that offer these experiences.
      </p>
      <div className="card-grid providers">
        {providers.map((provider) => (
          <div key={provider.id}>
            <ProviderCard provider={provider} />
            <p className="match-why">Matches: {matchedExperiences(provider, route).join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
