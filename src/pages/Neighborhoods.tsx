import { ArrowRight, MapPin } from 'lucide-react';
import { CtaBand, PageHero } from '../components/Brand';
import { listProviders, listTaxonomy } from '../db/repository';
import { ExplorePage } from './Explore';
import { Link } from '../lib/router';

export function NeighborhoodsPage() {
  const neighborhoods = listTaxonomy('neighborhoods');
  const citywide = listProviders().filter((provider) => !provider.neighborhood_id).length;
  return (
    <>
      <PageHero
        kicker="Neighborhoods"
        title="Find wellness near you."
        lede="Explore by neighborhood and discover what is close to home. Cards show real listings from the Wellness Front Door map — not stock photos of streets."
      />
      <section className="section">
        <div className="card-grid">
          {neighborhoods.map((neighborhood) => {
            const count = listProviders({ neighborhood: neighborhood.slug }).length;
            return (
              <Link key={neighborhood.id} to={`/neighborhoods/${neighborhood.slug}`} className="neighborhood-card">
                <MapPin size={18} aria-hidden="true" />
                <h3>{neighborhood.name}</h3>
                <p>{count} {count === 1 ? 'listing' : 'listings'}</p>
                <span className="need-meta">
                  View listings <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
          <article className="neighborhood-card">
            <MapPin size={18} aria-hidden="true" />
            <h3>San Diego at large</h3>
            <p>{citywide} listings across the city</p>
            <Link to="/explore" className="need-meta">
              Explore all <ArrowRight size={14} />
            </Link>
          </article>
        </div>
      </section>
      <CtaBand
        title="Discover your neighborhood."
        lede="Each community has its own path into wellness."
        actionTo="/explore"
        actionLabel="Explore the directory"
      />
    </>
  );
}

export function NeighborhoodDetailPage({ slug }: { slug: string }) {
  const neighborhood = listTaxonomy('neighborhoods').find((item) => item.slug === slug);
  if (!neighborhood) {
    return (
      <section className="section page">
        <p className="kicker">Places</p>
        <h1>Place not found</h1>
        <p className="lede">Try another San Diego neighborhood.</p>
      </section>
    );
  }
  return (
    <ExplorePage
      preset={{ neighborhood: slug }}
      heading={{
        kicker: 'Places',
        title: `Wellness in ${neighborhood.name}`,
        lede: `Practitioners, shops, and experiences in ${neighborhood.name}, San Diego.`,
      }}
    />
  );
}
