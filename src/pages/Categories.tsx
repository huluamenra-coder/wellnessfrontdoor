import { CATEGORY_SPOTS, TemplateBoard } from '../components/TemplateBoard';
import { listTaxonomy } from '../db/repository';
import { CATEGORY_BLURBS } from '../architecture/wfd';
import { ExplorePage } from './Explore';

export function CategoriesPage() {
  return (
    <TemplateBoard
      src="/brand/pages/categories.jpg"
      alt="Explore wellness by category: recovery, wellness, movement, community, energy, holistic, spa, and beauty."
      spots={CATEGORY_SPOTS}
    />
  );
}

export function CategoryDetailPage({ slug }: { slug: string }) {
  const category = listTaxonomy('categories').find((item) => item.slug === slug);
  if (!category) {
    return (
      <section className="section page">
        <p className="kicker">Categories</p>
        <h1>Category not found</h1>
        <p className="lede">Browse the directory for another path.</p>
      </section>
    );
  }
  return (
    <ExplorePage
      preset={{ category: slug }}
      heading={{
        kicker: 'Categories',
        title: `${category.name} in San Diego`,
        lede: CATEGORY_BLURBS[category.slug] || `Listings in ${category.name.toLowerCase()} — visit or book on each provider’s own site.`,
      }}
    />
  );
}
