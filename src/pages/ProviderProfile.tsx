import { ContactBlock, ProfileHeader, ProfileSection, SourceBlock, TermList } from '../components/ProfileSections';
import { EventCard } from '../components/CategoryCard';
import { getProvider, isVerified } from '../db/repository';
import { Link } from '../lib/router';

export function ProviderProfilePage({ id }: { id: string }) {
  const provider = getProvider(id);
  if (!provider) {
    return (
      <section className="section page">
        <h1>Listing not found</h1>
        <Link to="/explore">Back to explore</Link>
      </section>
    );
  }

  return (
    <article className="section page profile">
      <ProfileHeader provider={provider} />
      <ProfileSection title="Category">
        <TermList items={provider.categories} empty="Category not yet documented" />
      </ProfileSection>
      <ProfileSection title="Modalities">
        <TermList items={provider.modalities} empty="Modalities not yet documented" />
      </ProfileSection>
      <ProfileSection title="Services">
        <TermList items={provider.services} empty="Services not yet documented" />
      </ProfileSection>
      <ProfileSection title="Client needs">
        <TermList items={provider.client_needs} empty="Client needs not yet documented" />
      </ProfileSection>
      <ProfileSection title="Experience types">
        <TermList items={provider.experience_types} empty="Experience types not yet documented" />
      </ProfileSection>
      <ProfileSection title="Location">
        <p>{[provider.address, provider.neighborhood?.name, provider.city, provider.state, provider.zip].filter(Boolean).join(', ') || provider.source_area_raw || 'Location not yet documented'}</p>
      </ProfileSection>
      <ProfileSection title="Contact">
        <ContactBlock provider={provider} />
      </ProfileSection>
      <ProfileSection title="Credentials">
        <p>
          {isVerified(provider.verification_status)
            ? provider.credentials || 'Credentials not yet documented'
            : 'Credentials are shown on verified listings only.'}
        </p>
      </ProfileSection>
      <ProfileSection title="Hours & accessibility">
        <p>Hours: {provider.hours || 'Not yet documented'}</p>
        <p>Accessibility: {provider.accessibility || 'Not yet documented'}</p>
        <p>Price range: {provider.price_range || 'Not yet documented'}</p>
      </ProfileSection>
      <ProfileSection title="Events">
        {provider.events.length ? (
          provider.events.map((event) => (
            <EventCard
              key={event.id}
              name={event.event_name || 'Untitled event'}
              location={event.location}
              date={event.date}
              verification={event.verification_status}
            />
          ))
        ) : (
          <p className="empty-field">No connected events in the current dataset.</p>
        )}
      </ProfileSection>
      <ProfileSection title="Source & verification">
        <SourceBlock provider={provider} />
      </ProfileSection>
    </article>
  );
}
