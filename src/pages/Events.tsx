import { EVENTS_SPOTS, TemplateBoard } from '../components/TemplateBoard';
import { listEvents } from '../db/repository';
import { Link } from '../lib/router';

export function EventsPage() {
  return (
    <TemplateBoard
      src="/brand/pages/events.jpg"
      alt="Gather, learn, heal, and belong. Events appear here as they are documented."
      spots={EVENTS_SPOTS}
    />
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
