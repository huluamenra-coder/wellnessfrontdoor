import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CtaBand, NeedIcon, PageHero } from '../components/Brand';
import { Filters, NeighborhoodFilters } from '../components/Filters';
import { ProviderCard } from '../components/ProviderCard';
import { SearchBar } from '../components/SearchBar';
import { Link, getSearchParams, useRouter } from '../lib/router';
import { listNeedRoutes, listProviders, listTaxonomy } from '../db/repository';
import { FEATURED_CATEGORY_SLUGS } from '../architecture/wfd';
import type { DirectoryFilters } from '../db/types';

const AREA_SEARCHES = ['La Jolla', 'North Park', 'Downtown', 'Pacific Beach', 'Mission Bay'];

export function ExplorePage({
  preset,
  heading,
}: {
  preset?: Partial<DirectoryFilters>;
  heading?: { kicker: string; title: string; lede: string };
}) {
  const { route } = useRouter();
  const params = getSearchParams();
  const [filters, setFilters] = useState<DirectoryFilters>({
    query: params.get('q') || preset?.query,
    category: params.get('category') || preset?.category,
    modality: params.get('modality') || preset?.modality,
    neighborhood: params.get('neighborhood') || preset?.neighborhood,
    clientNeed: params.get('need') || preset?.clientNeed,
    experienceType: params.get('experience') || preset?.experienceType,
  });

  useEffect(() => {
    const next = new URLSearchParams(route.search);
    setFilters((current) => ({
      ...current,
      query: next.get('q') || preset?.query,
      category: next.get('category') || preset?.category || current.category,
      neighborhood: next.get('neighborhood') || preset?.neighborhood || current.neighborhood,
      clientNeed: next.get('need') || preset?.clientNeed || current.clientNeed,
    }));
  }, [route.search, preset?.query, preset?.category, preset?.neighborhood, preset?.clientNeed]);

  const providers = useMemo(
    () =>
      listProviders(filters)
        .slice()
        .sort((a, b) =>
          (a.business_name || '').localeCompare(b.business_name || '', undefined, { sensitivity: 'base' })
        ),
    [filters]
  );
  const experienceOptions = listNeedRoutes().map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: null,
    created_at: null,
    updated_at: null,
  }));
  const isMainExplore = !heading;
  const featuredCategories = listTaxonomy('categories').filter((item) =>
    FEATURED_CATEGORY_SLUGS.includes(item.slug as (typeof FEATURED_CATEGORY_SLUGS)[number])
  );
  const neighborhoods = listTaxonomy('neighborhoods');

  return (
    <>
      {isMainExplore && (
        <PageHero
          kicker="Explore"
          title="People, places, and experiences."
          lede="Discover the many paths to wellness across San Diego. Search by service, modality, category, neighborhood, or experience."
          visual="panorama"
        />
      )}
      <section className="section page explore-page">
      {!isMainExplore && (
        <div className="section-heading">
          <div>
            <p className="kicker">{heading?.kicker}</p>
            <h1>{heading?.title}</h1>
            <p className="lede">{heading?.lede}</p>
          </div>
        </div>
      )}
      <SearchBar initial={filters.query || ''} placeholder="Search wellness, yoga, massage, Encinitas…" />
      <NeighborhoodFilters
        neighborhoods={neighborhoods}
        active={filters.neighborhood}
        onSelect={(slug) => setFilters((current) => ({ ...current, neighborhood: slug }))}
      />
      <Filters
        filters={filters}
        onChange={setFilters}
        configs={[
          { id: 'category', label: 'Category', options: listTaxonomy('categories') },
          { id: 'modality', label: 'Modality', options: listTaxonomy('modalities') },
          { id: 'clientNeed', label: 'Need', options: experienceOptions },
          { id: 'experienceType', label: 'Experience type', options: listTaxonomy('experience_types') },
        ]}
      />

      {isMainExplore && !filters.query && (
        <>
          <div className="section-heading">
            <div>
              <p className="kicker">Browse by category</p>
              <h2>Start with a path.</h2>
            </div>
            <Link to="/categories" className="text-link">
              View all categories <ArrowRight size={14} />
            </Link>
          </div>
          <div className="icon-path-row">
            {featuredCategories.map((category) => (
              <Link key={category.id} to={`/categories/${category.slug}`} className="icon-path">
                <span className="need-icon" aria-hidden="true">
                  <NeedIcon slug={category.slug} />
                </span>
                <strong>{category.name}</strong>
              </Link>
            ))}
          </div>
          <div className="section-heading">
            <div>
              <p className="kicker">Featured areas</p>
              <h2>Explore by neighborhood.</h2>
            </div>
            <Link to="/neighborhoods" className="text-link">
              View all neighborhoods <ArrowRight size={14} />
            </Link>
          </div>
          <div className="card-grid">
            {neighborhoods.map((place) => (
              <Link key={place.id} to={`/neighborhoods/${place.slug}`} className="category-card">
                <p className="kicker">Neighborhood</p>
                <h3>{place.name}</h3>
                <p>{listProviders({ neighborhood: place.slug }).length} listings</p>
              </Link>
            ))}
          </div>
          <p className="result-meta">Also search these areas in the directory:</p>
          <div className="chip-row">
            {AREA_SEARCHES.map((area) => (
              <Link key={area} to={`/explore?q=${encodeURIComponent(area)}`} className="chip">
                {area}
              </Link>
            ))}
          </div>
        </>
      )}

      <p className="result-meta">
        {providers.length} {providers.length === 1 ? 'listing' : 'listings'}
      </p>
      {providers.length ? (
        <div className="card-grid providers">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No listings match these filters yet.</p>
          <Link to="/explore" className="text-link">
            Clear and explore all
          </Link>
        </div>
      )}

      </section>
      {isMainExplore && (
        <CtaBand
          kicker="Not just services"
          title="Many unique paths into wellness."
          lede="Practitioners, services, experiences, shops, products, education, and community — all in one place."
          actionTo="/needs"
          actionLabel="Start with a need"
        />
      )}
    </>
  );
}
