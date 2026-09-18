import type { ReactNode } from 'react';
import { ExternalLink, Globe, Phone, Mail } from 'lucide-react';
import type { ProviderView } from '../db/types';
import { offeringPath, uniqueOfferings } from '../db/repository';

export function ProfileHeader({ provider }: { provider: ProviderView }) {
  const location = [provider.neighborhood?.name, provider.city, provider.state, provider.zip]
    .filter(Boolean)
    .join(', ') || provider.source_area_raw;
  return (
    <section className="profile-hero">
      <div>
        <p className="kicker">San Diego directory</p>
        <h1>{provider.business_name}</h1>
        {provider.practitioner_name && <p className="lede">{provider.practitioner_name}</p>}
        <div className="chip-row">
          <span className="chip">{offeringPath(provider).name}</span>
          {uniqueOfferings(provider, 3).map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
        {location && <p className="location">{location}</p>}
      </div>
      <div className="profile-cta">
        {provider.booking_url && (
          <a className="button gold" href={provider.booking_url} target="_blank" rel="noreferrer">
            Book <ExternalLink size={16} />
          </a>
        )}
        {provider.website && (
          <a className="button outline" href={provider.website} target="_blank" rel="noreferrer">
            Visit website <Globe size={16} />
          </a>
        )}
        {provider.phone && (
          <a className="button outline" href={`tel:${provider.phone}`}>
            Call <Phone size={16} />
          </a>
        )}
      </div>
    </section>
  );
}

export function ProfileSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="profile-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function TermList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <div className="chip-row">
      {items.map((item) => (
        <span key={item.id} className="chip">
          {item.name}
        </span>
      ))}
    </div>
  );
}

export function ContactBlock({ provider }: { provider: ProviderView }) {
  return (
    <div className="contact-grid">
      {provider.website && (
        <p>
          <Globe size={16} />{' '}
          <a href={provider.website} target="_blank" rel="noreferrer">
            {provider.website}
          </a>
        </p>
      )}
      {provider.phone && (
        <p>
          <Phone size={16} /> {provider.phone}
        </p>
      )}
      {provider.email && (
        <p>
          <Mail size={16} /> {provider.email}
        </p>
      )}
      {provider.booking_url && (
        <p>
          Booking:{' '}
          <a href={provider.booking_url} target="_blank" rel="noreferrer">
            {provider.booking_url}
          </a>
        </p>
      )}
    </div>
  );
}
