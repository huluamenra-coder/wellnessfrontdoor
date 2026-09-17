import { EventCard } from '../components/CategoryCard';
import { listEvents } from '../db/repository';
import { Link } from '../lib/router';

export function EventsPage() {
  const events = listEvents();
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Events foundation</p>
          <h1>Events</h1>
          <p className="lede">
            The events entity is ready and can connect to providers. Master Start List 001 did not include named events,
            so none were invented.
          </p>
        </div>
      </div>
      {events.length === 0 ? (
        <div className="empty-state">
          <p>No verified or documented events are in the imported dataset yet.</p>
          <p>Admin can add events after source verification. Providers can note upcoming events when they submit or claim a listing.</p>
          <Link to="/admin" className="button outline">
            Open data admin
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
              verification={event.verification_status}
            />
          ))}
        </div>
      )}
    </section>
  );
}
