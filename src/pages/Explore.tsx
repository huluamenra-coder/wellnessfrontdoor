import { useEffect, useMemo, useState } from 'react';
import { Filters, NeighborhoodFilters } from '../components/Filters';
import { ProviderCard } from '../components/ProviderCard';
import { SearchBar } from '../components/SearchBar';
import { EXPLORE_SPOTS, TemplateBoard } from '../components/TemplateBoard';
import { Link, getSearchParams, useRouter } from '../lib/router';
import { listNeedRoutes, listProviders, listTaxonomy } from '../db/repository';
import type { DirectoryFilters } from '../db/types';

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
  const hasDirectoryQuery = Boolean(
    params.get('q') ||
      params.get('view') ||
      params.get('category') ||
      params.get('neighborhood') ||
      params.get('need') ||
      params.get('modality') ||
      params.get('experience')
  );

  if (isMainExplore && !hasDirectoryQuery) {
    return (
      <TemplateBoard
        src="/brand/pages/explore.jpg"
        alt="Explore people, places, and experiences across San Diego."
        spots={EXPLORE_SPOTS}
      />
    );
  }

  return (
    <section className="section page explore-page">
      <div className="section-heading">
        <div>
          <p className="kicker">{heading?.kicker || 'Explore'}</p>
          <h1>{heading?.title || 'Directory listings'}</h1>
          <p className="lede">
            {heading?.lede || 'Search practitioners, shops, and supporting spaces across San Diego.'}
          </p>
        </div>
      </div>
      <SearchBar initial={filters.query || ''} />
      <NeighborhoodFilters
        neighborhoods={listTaxonomy('neighborhoods')}
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
  );
}
