import { Link } from '../lib/router';
import { ProviderCard } from '../components/ProviderCard';
import { getNeedRoute, listNeedRoutes, listProviders, matchedExperiences } from '../db/repository';
import { CONCIERGE_LOOP, CONVERSION_PATHS, MATCH_TARGETS } from '../architecture/wfd';

export function NeedsPage() {
  const routes = listNeedRoutes();
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Experiences</p>
          <h1>Start with what you need.</h1>
          <p className="lede">
            Stress, pain, energy, detox, sleep, or connection — then matching San Diego experiences and practitioners.
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
        <h1>Need not found</h1>
        <Link to="/needs">All needs</Link>
      </section>
    );
  }
  const providers = listProviders({ clientNeed: route.slug });
  return (
    <section className="section page">
      <p className="kicker">Client need</p>
      <h1>{route.name}</h1>
      <dl className="intent-grid">
        <div><dt>Intent</dt><dd>{route.intent}</dd></div>
        <div><dt>Primary desire</dt><dd>{route.primary_desire}</dd></div>
        <div><dt>Secondary desire</dt><dd>{route.secondary_desire || 'Open'}</dd></div>
        <div><dt>Location</dt><dd>San Diego</dd></div>
      </dl>
      <p className="muted">
        {CONCIERGE_LOOP.join(' → ')} → {MATCH_TARGETS.join(' / ')} → {CONVERSION_PATHS.join(' / ')}
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
        {providers.length} local listings whose documented modalities include those experiences. Needs were not written
        onto provider records.
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
