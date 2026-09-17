import { useEffect, useMemo, useState } from 'react';
import { Filters, NeighborhoodFilters } from '../components/Filters';
import { ProviderCard } from '../components/ProviderCard';
import { SearchBar } from '../components/SearchBar';
import { getSearchParams, useRouter } from '../lib/router';
import { listProviders, listTaxonomy } from '../db/repository';
import type { DirectoryFilters } from '../db/types';

export function ExplorePage({
  preset,
}: {
  preset?: Partial<DirectoryFilters>;
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
    verification: (params.get('status') as DirectoryFilters['verification']) || preset?.verification || 'all',
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
  }, [route.search, preset?.query, preset?.category, preset?.neighborhood]);

  const providers = useMemo(() => listProviders(filters), [filters]);
  const verifiedCount = providers.filter((provider) => provider.verification_status === 'verified').length;

  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Explore San Diego</p>
          <h1>Directory</h1>
          <p className="lede">
            Structured search. Client-need routing uses documented modalities, not invented provider needs.
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
          { id: 'clientNeed', label: 'Client need', options: listTaxonomy('client_needs') },
          { id: 'experienceType', label: 'Experience type', options: listTaxonomy('experience_types') },
        ]}
      />
      <p className="result-meta">
        {providers.length} listings · {verifiedCount} verified recommendations
      </p>
      {filters.verification === 'verified' && verifiedCount === 0 && (
        <p className="notice">No verified providers yet. Research listings remain visible under Needs verification.</p>
      )}
      <div className="card-grid providers">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </section>
  );
}
