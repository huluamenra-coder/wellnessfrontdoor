import { CategoryCard } from '../components/CategoryCard';
import { listProviders, listTaxonomy } from '../db/repository';
import { ExplorePage } from './Explore';

export function CategoriesPage() {
  const categories = listTaxonomy('categories');
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Practitioners</p>
          <h1>San Diego wellness categories</h1>
          <p className="lede">
            Massage, yoga, acupuncture, float, spas, crystal shops, herbal shops, and more — each listed as its own path.
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
