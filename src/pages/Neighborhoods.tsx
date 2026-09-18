import { NEIGHBORHOOD_SPOTS, TemplateBoard } from '../components/TemplateBoard';
import { listTaxonomy } from '../db/repository';
import { ExplorePage } from './Explore';

export function NeighborhoodsPage() {
  return (
    <TemplateBoard
      src="/brand/pages/neighborhoods.jpg"
      alt="Find wellness near you across San Diego neighborhoods."
      spots={NEIGHBORHOOD_SPOTS}
    />
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
