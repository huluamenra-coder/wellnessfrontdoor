import type { DirectoryFilters, TaxonomyTerm } from '../db/types';

type FilterConfig = {
  id: keyof DirectoryFilters;
  label: string;
  options: TaxonomyTerm[];
};

export function Filters({
  filters,
  configs,
  onChange,
}: {
  filters: DirectoryFilters;
  configs: FilterConfig[];
  onChange: (next: DirectoryFilters) => void;
}) {
  return (
    <div className="filters">
      {configs.map((config) => (
        <label key={config.id}>
          <span>{config.label}</span>
          <select
            value={(filters[config.id] as string) || ''}
            onChange={(event) => onChange({ ...filters, [config.id]: event.target.value || undefined })}
            disabled={config.options.length === 0}
          >
            <option value="">{config.options.length === 0 ? 'None in source data yet' : 'All'}</option>
            {config.options.map((option) => (
              <option key={option.id} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

export function NeighborhoodFilters({
  neighborhoods,
  active,
  onSelect,
}: {
  neighborhoods: TaxonomyTerm[];
  active?: string;
  onSelect: (slug?: string) => void;
}) {
  return (
    <div className="neighborhood-filters">
      <button className={!active ? 'active' : ''} onClick={() => onSelect(undefined)}>
        All areas
      </button>
      {neighborhoods.map((item) => (
        <button key={item.id} className={active === item.slug ? 'active' : ''} onClick={() => onSelect(item.slug)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
