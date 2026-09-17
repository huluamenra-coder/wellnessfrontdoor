import { Link } from '../lib/router';
import { isVerified, verificationLabel } from '../db/repository';
import type { ProviderView } from '../db/types';
import { MapPin } from 'lucide-react';

export function VerificationBadge({ status }: { status: ProviderView['verification_status'] }) {
  const verified = isVerified(status);
  return <span className={verified ? 'badge verified' : 'badge pending'}>{verificationLabel(status)}</span>;
}

export function ProviderCard({ provider }: { provider: ProviderView }) {
  const location = provider.neighborhood?.name || provider.city || provider.source_area_raw;
  return (
    <article className="provider-card">
      <div className="card-top">
        <VerificationBadge status={provider.verification_status} />
        {provider.is_demo && <span className="badge demo">Demo data</span>}
      </div>
      <h3>
        <Link to={`/providers/${provider.id}`}>{provider.business_name}</Link>
      </h3>
      <p className="muted">
        {provider.primary_category?.name
          || provider.categories[0]?.name
          || (provider.source_category_raw && provider.source_category_raw.toLowerCase() !== 'internal reference'
            ? provider.source_category_raw
            : provider.modalities[0]?.name)
          || 'Category not yet documented'}
      </p>
      {location && (
        <p className="location">
          <MapPin size={14} /> {location}
        </p>
      )}
      <div className="chip-row">
        {provider.modalities.slice(0, 4).map((item) => (
          <span key={item.id} className="chip">
            {item.name}
          </span>
        ))}
      </div>
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
