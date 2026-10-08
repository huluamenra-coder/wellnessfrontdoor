import { CtaBand, NeedIcon, PageHero } from '../components/Brand';
import { listProviders, listTaxonomy } from '../db/repository';
import { CATEGORY_BLURBS, FEATURED_CATEGORY_SLUGS } from '../architecture/wfd';
import { Link } from '../lib/router';
import { ExplorePage } from './Explore';

export function CategoriesPage() {
  const featured = listTaxonomy('categories').filter((item) =>
    FEATURED_CATEGORY_SLUGS.includes(item.slug as (typeof FEATURED_CATEGORY_SLUGS)[number])
  );
  return (
    <>
      <PageHero
        kicker="Categories"
        title="Explore by category."
        lede="Browse wellness services, practitioners, shops, and experiences across San Diego. Find what inspires and supports you."
      />
      <section className="section">
        <div className="need-grid landing">
          {featured.map((category) => {
            const count = listProviders({ category: category.slug }).length;
            return (
              <Link key={category.id} to={`/categories/${category.slug}`} className="need-card detailed">
                <span className="need-icon" aria-hidden="true">
                  <NeedIcon slug={category.slug} />
                </span>
                <h3>{category.name}</h3>
                <p>{CATEGORY_BLURBS[category.slug] || `Listings in ${category.name.toLowerCase()}.`}</p>
                <span className="need-meta">
                  {count} {count === 1 ? 'listing' : 'listings'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
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
