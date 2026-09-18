import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Brand';
import { TemplateBoard, NEEDS_SPOTS } from '../components/TemplateBoard';
import { ProviderCard } from '../components/ProviderCard';
import { Link } from '../lib/router';
import { getNeedRoute, listProviders, matchedExperiences } from '../db/repository';

export function NeedsPage() {
  return (
    <TemplateBoard
      src="/brand/pages/needs.jpg"
      alt="Start with what you need. Stress, pain, energy, sleep, beauty, movement, and more."
      spots={NEEDS_SPOTS}
    />
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
