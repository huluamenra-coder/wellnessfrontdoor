import { CtaBand, PageHero } from '../components/Brand';
import { EventCard } from '../components/CategoryCard';
import { getMeta, listEvents } from '../db/repository';
import { Link } from '../lib/router';

export function EventsPage() {
  const events = listEvents();
  const meta = getMeta();
  return (
    <>
      <PageHero
        kicker="Events"
        title="Gather. Learn. Heal. Belong."
        lede="Workshops, classes, ceremonies, and gatherings will appear here as they are documented. We do not invent dates, prices, or organizers."
      />
      <section className="section">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>No verified events are listed yet.</p>
            <p>
              {meta.event_count === 0
                ? 'Providers can include upcoming gatherings when they join. Nothing is shown as current until it is reviewed.'
                : 'Events in review are not shown until they are verified.'}
            </p>
            <Link to="/join" className="button outline">
              Join as a provider
            </Link>
          </div>
        ) : (
          <div className="card-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                name={event.event_name || 'Untitled event'}
                location={event.location}
                date={event.date}
                href={event.organizer_id ? `/providers/${event.organizer_id}` : undefined}
              />
            ))}
          </div>
        )}
      </section>
      <CtaBand
        title="Know of a gathering?"
        lede="Providers can share verified events when they list or claim a business."
        actionTo="/join"
        actionLabel="List your business"
      />
    </>
  );
}

export function EventDetailPage({ slug }: { slug: string }) {
  const event = listEvents().find((item) => item.id === slug || (item.event_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
  if (!event) {
    return (
      <section className="section page">
        <p className="kicker">Events</p>
        <h1>Event not found</h1>
        <p className="lede">No verified event matches this page. We do not publish invented gatherings.</p>
        <Link to="/events" className="text-link">
          Back to events
        </Link>
      </section>
    );
  }
  return (
    <section className="section page">
      <p className="kicker">{event.date || 'Event'}</p>
      <h1>{event.event_name}</h1>
      {event.location && <p className="lede">{event.location}</p>}
      {event.description && <p>{event.description}</p>}
      {event.booking_url && (
        <a className="button gold" href={event.booking_url} target="_blank" rel="noreferrer">
          Register on organizer site
        </a>
      )}
    </section>
  );
}
