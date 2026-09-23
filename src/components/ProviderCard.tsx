import { Link } from '../lib/router';
import { offeringPath, uniqueOfferings } from '../db/repository';
import type { ProviderView } from '../db/types';
import { MapPin } from 'lucide-react';

export function ProviderCard({
  provider,
  featured = false,
}: {
  provider: ProviderView;
  featured?: boolean;
}) {
  const location = provider.neighborhood?.name || provider.city || provider.source_area_raw;
  const path = offeringPath(provider);
  const offerings = uniqueOfferings(provider);
  return (
    <article className={featured ? 'provider-card featured' : 'provider-card'}>
      <p className="kicker">{featured ? 'Highlighted practitioner' : path.name}</p>
      <h3>
        <Link to={`/providers/${provider.id}`}>{provider.business_name}</Link>
      </h3>
      {provider.practitioner_name && provider.practitioner_name !== provider.business_name && (
        <p className="muted">{provider.practitioner_name}</p>
      )}
      <p className="muted">
        {featured && provider.description
          ? provider.description
          : provider.primary_category?.name
            || provider.categories[0]?.name
            || (provider.source_category_raw && provider.source_category_raw.toLowerCase() !== 'internal reference'
              ? provider.source_category_raw
              : provider.modalities[0]?.name)
            || 'Unique local offering'}
      </p>
      {location && (
        <p className="location">
          <MapPin size={14} /> {location}
        </p>
      )}
      {offerings.length > 0 && (
        <div className="chip-row">
          {offerings.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      )}
      <div className="card-actions">
        <Link to={`/providers/${provider.id}`} className="text-link">
          View profile
        </Link>
        {provider.website && (
          <a href={provider.website} target="_blank" rel="noreferrer" className="text-link">
            Visit website
          </a>
        )}
      </div>
    </article>
  );
}
