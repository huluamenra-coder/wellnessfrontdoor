import { ArrowRight } from 'lucide-react';
import { Breadcrumbs, CtaBand, NeedCard, PageHero } from '../components/Brand';
import { ProviderCard } from '../components/ProviderCard';
import { Link } from '../lib/router';
import { getNeedRoute, listNeedRoutes, listProviders, matchedExperiences } from '../db/repository';

export function NeedsPage() {
  const routes = listNeedRoutes();
  return (
    <>
      <PageHero
        kicker="Experiences"
        title="Start with what you need."
        lede="Find wellness experiences in San Diego aligned with rest, movement, connection, restoration, beauty, and more. You do not have to know the modality first."
      />
      <section className="section">
        <div className="need-detail-grid">
          {routes.map((route) => {
            const count = listProviders({ clientNeed: route.slug }).length;
            return <NeedCard key={route.id} route={route} count={count} />;
          })}
        </div>
      </section>
      <CtaBand
        kicker="Next step"
        title="Explore the full directory."
        lede="Search practitioners, shops, and supporting spaces across San Diego."
        actionTo="/explore"
        actionLabel="Explore the directory"
      />
    </>
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
      <Breadcrumbs
        items={[
          { to: '/', label: 'Home' },
          { to: '/needs', label: 'Needs' },
          { label: route.name },
        ]}
      />
      <p className="kicker">{route.intent}</p>
      <h1>{route.name}</h1>
      <p className="lede">
        {route.primary_desire}
        {route.secondary_desire ? ` · ${route.secondary_desire}` : ''}
      </p>
      <h2>Possible experiences</h2>
      <div className="chip-row">
        {route.experience_tokens.map((token) => (
          <Link key={token} to={`/explore?q=${encodeURIComponent(token)}`} className="chip">
            {token}
          </Link>
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
      <p className="pathway-note">Need → Experience → Practitioner → Book on their site.</p>
      <Link to="/explore" className="text-link">
        Explore all listings <ArrowRight size={14} />
      </Link>
    </section>
  );
}
