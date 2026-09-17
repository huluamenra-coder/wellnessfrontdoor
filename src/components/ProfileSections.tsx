import type { ReactNode } from 'react';
import { ExternalLink, Globe, Phone, Mail, CalendarDays } from 'lucide-react';
import type { ProviderView } from '../db/types';
import { isVerified } from '../db/repository';
import { Link } from '../lib/router';
import { VerificationBadge } from './ProviderCard';

function Empty({ children }: { children: ReactNode }) {
  return <p className="empty-field">{children}</p>;
}

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
          <VerificationBadge status={provider.verification_status} />
          {provider.is_demo && <span className="badge demo">Demo data</span>}
          {provider.is_internal_reference && <span className="badge gold">Internal reference</span>}
        </div>
        {location && <p className="location">{location}</p>}
      </div>
      <div className="profile-cta">
        {provider.booking_url ? (
          <a className="button gold" href={provider.booking_url} target="_blank" rel="noreferrer">
            Book <ExternalLink size={16} />
          </a>
        ) : (
          <button className="button gold" disabled>
            Book unavailable
          </button>
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
        <Link to="/events" className="button outline">
          View events <CalendarDays size={16} />
        </Link>
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

export function TermList({ items, empty }: { items: { id: string; name: string }[]; empty: string }) {
  if (!items.length) return <Empty>{empty}</Empty>;
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
      <p><Globe size={16} /> {provider.website ? <a href={provider.website} target="_blank" rel="noreferrer">{provider.website}</a> : 'Website not yet documented'}</p>
      <p><Phone size={16} /> {provider.phone || 'Phone not yet documented'}</p>
      <p><Mail size={16} /> {provider.email || 'Email not yet documented'}</p>
      <p>Booking: {provider.booking_url ? <a href={provider.booking_url} target="_blank" rel="noreferrer">{provider.booking_url}</a> : 'Not yet documented'}</p>
    </div>
  );
}

export function SourceBlock({ provider }: { provider: ProviderView }) {
  return (
    <div className="source-block">
      <p>Verification status: {provider.verification_status.replace('_', ' ')}</p>
      <p>Source: {provider.source || 'Not yet documented'}</p>
      <p>Verification date: {provider.verification_date || 'Not yet documented'}</p>
      <p>Record ID: {provider.record_id}</p>
      {!isVerified(provider.verification_status) && (
        <p className="notice">This listing is visible for research and review. It is not presented as a verified recommendation.</p>
      )}
    </div>
  );
}
