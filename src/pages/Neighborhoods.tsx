import { CategoryCard } from '../components/CategoryCard';
import { listProviders, listTaxonomy } from '../db/repository';
import { ExplorePage } from './Explore';

export function NeighborhoodsPage() {
  const neighborhoods = listTaxonomy('neighborhoods');
  const citywide = listProviders().filter((provider) => !provider.neighborhood_id).length;
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Places</p>
          <h1>Wellness in San Diego neighborhoods</h1>
          <p className="lede">
            Encinitas, Little Italy, Ocean Beach, and citywide San Diego listings — find practitioners and shops by place.
          </p>
        </div>
      </div>
      <div className="card-grid">
        {neighborhoods.map((neighborhood) => (
          <CategoryCard
            key={neighborhood.id}
            term={neighborhood}
            count={listProviders({ neighborhood: neighborhood.slug }).length}
            href={`/neighborhoods/${neighborhood.slug}`}
          />
        ))}
        <article className="category-card">
          <h3>San Diego citywide</h3>
          <p>{citywide} listings without a more specific neighborhood in the source file</p>
        </article>
      </div>
    </section>
  );
}

export function NeighborhoodDetailPage({ slug }: { slug: string }) {
  const neighborhood = listTaxonomy('neighborhoods').find((item) => item.slug === slug);
  if (!neighborhood) {
    return (
      <section className="section page">
        <h1>Neighborhood not found</h1>
      </section>
    );
  }
  return <ExplorePage preset={{ neighborhood: slug }} />;
}
