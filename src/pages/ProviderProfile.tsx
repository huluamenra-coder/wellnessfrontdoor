import { ContactBlock, ProfileHeader, ProfileSection, TermList } from '../components/ProfileSections';
import { EventCard } from '../components/CategoryCard';
import { getProvider } from '../db/repository';
import { Link } from '../lib/router';

export function ProviderProfilePage({ id }: { id: string }) {
  const provider = getProvider(id);
  if (!provider) {
    return (
      <section className="section page">
        <p className="kicker">Directory</p>
        <h1>Listing not found</h1>
        <Link to="/explore" className="text-link">
          Back to explore
        </Link>
      </section>
    );
  }

  const location = [provider.address, provider.neighborhood?.name, provider.city, provider.state, provider.zip]
    .filter(Boolean)
    .join(', ') || provider.source_area_raw;
  const hasContact = Boolean(provider.website || provider.phone || provider.email || provider.booking_url);
  const hasHours = Boolean(provider.hours || provider.accessibility || provider.price_range);

  return (
    <article className="section page profile">
      <ProfileHeader provider={provider} />
      {provider.categories.length > 0 && (
        <ProfileSection title="Category">
          <TermList items={provider.categories} />
        </ProfileSection>
      )}
      {provider.modalities.length > 0 && (
        <ProfileSection title="Modalities">
          <TermList items={provider.modalities} />
        </ProfileSection>
      )}
      {provider.services.length > 0 && (
        <ProfileSection title="Services">
          <TermList items={provider.services} />
        </ProfileSection>
      )}
      {location && (
        <ProfileSection title="Location">
          <p>{location}</p>
        </ProfileSection>
      )}
      {hasContact && (
        <ProfileSection title="Contact">
          <ContactBlock provider={provider} />
        </ProfileSection>
      )}
      {provider.credentials && (
        <ProfileSection title="Credentials">
          <p>{provider.credentials}</p>
        </ProfileSection>
      )}
      {hasHours && (
        <ProfileSection title="Hours & accessibility">
          {provider.hours && <p>Hours: {provider.hours}</p>}
          {provider.accessibility && <p>Accessibility: {provider.accessibility}</p>}
          {provider.price_range && <p>Price range: {provider.price_range}</p>}
        </ProfileSection>
      )}
      {provider.events.length > 0 && (
        <ProfileSection title="Events">
          {provider.events.map((event) => (
            <EventCard
              key={event.id}
              name={event.event_name || 'Event'}
              location={event.location}
              date={event.date}
            />
          ))}
        </ProfileSection>
      )}
    </article>
  );
}
