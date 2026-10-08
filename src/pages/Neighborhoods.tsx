import { CtaBand, PageHero } from '../components/Brand';
import { listProviders, listTaxonomy } from '../db/repository';
import { Link } from '../lib/router';
import { ExplorePage } from './Explore';

const PLACE_NOTES: Record<string, string> = {
  'ocean-beach': 'Creative. Relaxed. Coastal.',
  encinitas: 'Wellness minded. Laid back. Inspired.',
  'little-italy': 'Culture. Connection. Wellbeing.',
};

const AREA_SEARCHES = [
  { name: 'La Jolla', query: 'La Jolla' },
  { name: 'North Park', query: 'North Park' },
  { name: 'Downtown', query: 'Downtown' },
  { name: 'Pacific Beach', query: 'Pacific Beach' },
  { name: 'Mission Bay', query: 'Mission Bay' },
];

export function NeighborhoodsPage() {
  const neighborhoods = listTaxonomy('neighborhoods');
  const total = listProviders().length;
  return (
    <>
      <PageHero
        kicker="Neighborhoods"
        title="Find wellness near you."
        lede="Explore by neighborhood and discover what’s close to home. San Diego is the first map."
      />
      <section className="section">
        <div className="card-grid">
          {neighborhoods.map((place) => {
            const count = listProviders({ neighborhood: place.slug }).length;
            return (
              <Link key={place.id} to={`/neighborhoods/${place.slug}`} className="category-card">
                <p className="kicker">Neighborhood</p>
                <h3>{place.name}</h3>
                <p>{PLACE_NOTES[place.slug] || 'San Diego wellness close to home.'}</p>
                <p className="need-meta">
                  {count} {count === 1 ? 'listing' : 'listings'} with this neighborhood tag
                </p>
              </Link>
            );
          })}
          <Link to="/explore" className="category-card">
            <p className="kicker">Citywide</p>
            <h3>All of San Diego</h3>
            <p>Explore every listing in the directory.</p>
            <p className="need-meta">
              {total} {total === 1 ? 'listing' : 'listings'}
            </p>
          </Link>
        </div>
        <p className="lede area-search-note">
          Other areas can be searched in the directory. They are not separate neighborhood records yet.
        </p>
        <div className="chip-row">
          {AREA_SEARCHES.map((area) => (
            <Link key={area.name} to={`/explore?q=${encodeURIComponent(area.query)}`} className="chip">
              {area.name}
            </Link>
          ))}
        </div>
      </section>
      <CtaBand
        kicker="Explore further"
        title="Discover your neighborhood."
        lede="Each community has its own unique path to wellness."
        actionTo="/explore"
        actionLabel="View the directory"
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
