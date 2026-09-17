import { CategoryCard } from '../components/CategoryCard';
import { listProviders, listTaxonomy } from '../db/repository';
import { ExplorePage } from './Explore';

export function CategoriesPage() {
  const categories = listTaxonomy('categories');
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Taxonomy</p>
          <h1>Categories</h1>
          <p className="lede">
            Normalized from the source Category field. Additional taxonomies can be added in admin without rebuilding the app.
          </p>
        </div>
      </div>
      <div className="card-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            term={category}
            count={listProviders({ category: category.slug }).length}
          />
        ))}
      </div>
    </section>
  );
}

export function CategoryDetailPage({ slug }: { slug: string }) {
  const category = listTaxonomy('categories').find((item) => item.slug === slug);
  if (!category) {
    return (
      <section className="section page">
        <h1>Category not found</h1>
      </section>
    );
  }
  return <ExplorePage preset={{ category: slug }} />;
}
