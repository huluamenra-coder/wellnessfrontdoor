import { ArrowRight } from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { CtaBand, PageHero } from '../components/Brand';
import { listProviders, listTaxonomy } from '../db/repository';
import { CATEGORY_BLURBS, FEATURED_CATEGORY_SLUGS } from '../architecture/wfd';
import { ExplorePage } from './Explore';
import { Link } from '../lib/router';

export function CategoriesPage() {
  const categories = listTaxonomy('categories')
    .map((category) => ({
      category,
      count: listProviders({ category: category.slug }).length,
    }))
    .filter((item) => item.count > 0);
  const featuredSlugs = new Set<string>(FEATURED_CATEGORY_SLUGS);
  const featured = FEATURED_CATEGORY_SLUGS.map((slug) => categories.find((item) => item.category.slug === slug)).filter(
    Boolean
  ) as typeof categories;
  const rest = categories.filter((item) => !featuredSlugs.has(item.category.slug));

  return (
    <>
      <PageHero
        kicker="Categories"
        title="Explore by category."
        lede="Browse wellness services, practitioners, shops, and experiences across San Diego. Find what supports you."
      />
      <section className="section">
        <div className="card-grid">
          {featured.map(({ category, count }) => (
            <Link key={category.id} to={`/categories/${category.slug}`} className="category-card feature-cat">
              <h3>{category.name}</h3>
              <p>{CATEGORY_BLURBS[category.slug] || category.description || 'Unique local offerings.'}</p>
              <span className="need-meta">
                {count} {count === 1 ? 'listing' : 'listings'} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      {rest.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>All categories with listings</h2>
          </div>
          <div className="card-grid">
            {rest.map(({ category, count }) => (
              <CategoryCard key={category.id} term={category} count={count} />
            ))}
          </div>
        </section>
      )}
      <CtaBand
        kicker="Go deeper"
        title="Not sure where to start?"
        lede="Explore by need and find experiences aligned with your goals."
        actionTo="/needs"
        actionLabel="Start with a need"
      />
    </>
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
