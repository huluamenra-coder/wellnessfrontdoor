import { ArrowRight } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProviderCard } from '../components/ProviderCard';
import { CategoryCard } from '../components/CategoryCard';
import { Link } from '../lib/router';
import { getMeta, listNeedRoutes, listProviders, listTaxonomy } from '../db/repository';
import { CONCIERGE_LOOP, CONVERSION_PATHS, MATCH_TARGETS, PRODUCT_LAYERS } from '../architecture/wfd';

const PILLARS = ['People', 'Places', 'Practitioners', 'Experiences', 'Possibilities'];

export function HomePage() {
  const meta = getMeta();
  const categories = listTaxonomy('categories');
  const providers = listProviders();
  const featured = providers.slice(0, 6);
  const needRoutes = listNeedRoutes();
  const categoryCounts = categories
    .map((category) => ({
      category,
      count: listProviders({ category: category.slug }).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <section className="hero">
        <img src="/brand/hero-banner.jpg" alt="" className="hero-image" />
        <div className="hero-overlay">
          <p className="kicker gold-glow">Wellness has a front door.</p>
          <h1>
            Find the right wellness experience
            <em>for where you are.</em>
          </h1>
          <p className="lede">
            A curated San Diego directory for practitioners, places, and experiences.
            Wellness begins with knowing what you need.
          </p>
          <SearchBar />
          <div className="pillars">
            {PILLARS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section notice-band">
        <p>
          {meta.provider_count} imported research listings · {meta.verification_counts.verified} verified ·{' '}
          {meta.verification_counts.needs_verification} need verification. This is demo/research data, not an endorsement.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="kicker">Client need → experience → practitioner → book</p>
            <h2>Start with what you need.</h2>
          </div>
          <Link to="/needs" className="text-link">
            All need routes
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
              The long-term product is an intelligent concierge that can help someone describe what they are seeking
              and route them to an appropriate experience. V1 is the data foundation: structured providers, taxonomies,
              verification, and outbound booking links.
            </p>
            <p>The concierge, payments, and booking engine are not live yet. The directory is.</p>
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
            <p className="kicker">San Diego research set</p>
            <h2>Imported listings, clearly marked.</h2>
          </div>
          <Link to="/explore" className="text-link">
            View all
          </Link>
        </div>
        <div className="card-grid providers">
          {featured.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="section journey">
        <div className="section-heading">
          <div>
            <p className="kicker">The wellness & healing arts map</p>
            <h2>Discovery now. Concierge later.</h2>
          </div>
        </div>
        <ol className="stack-list">
          {PRODUCT_LAYERS.map((layer) => (
            <li key={layer.id}>
              <strong>{layer.name}</strong>
              <span className="badge gold">{layer.status}</span>
              <p>{layer.summary}</p>
            </li>
          ))}
        </ol>
        <p>
          {CONCIERGE_LOOP.join(' → ')} → {MATCH_TARGETS.join(' / ')} → {CONVERSION_PATHS.join(' / ')}
        </p>
      </section>

      <section className="section cta-split">
        <article>
          <p className="kicker">For providers</p>
          <h2>Submit or claim a listing.</h2>
          <p>V1 is submit or claim a listing. Later: Phone, Chat, and SMS over your business knowledge, then book on your existing system.</p>
          <Link to="/submit" className="button gold">
            Join as a provider <ArrowRight size={16} />
          </Link>
        </article>
        <article>
          <p className="kicker">For seekers</p>
          <h2>A healthier you. A brighter tomorrow.</h2>
          <p>Search by modality, neighborhood, and category. Book on the provider’s own site when a booking URL exists.</p>
          <Link to="/explore" className="button outline">
            Step through the door <ArrowRight size={16} />
          </Link>
        </article>
      </section>
    </>
  );
}
