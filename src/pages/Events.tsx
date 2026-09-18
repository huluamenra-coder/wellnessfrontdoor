import { EventCard } from '../components/CategoryCard';
import { listEvents } from '../db/repository';
import { Link } from '../lib/router';

export function EventsPage() {
  const events = listEvents();
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">San Diego</p>
          <h1>Wellness events</h1>
          <p className="lede">
            Retreats, classes, and gatherings will appear here as they are added.
          </p>
        </div>
      </div>
      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events are listed yet.</p>
          <p>Providers can include upcoming gatherings when they join.</p>
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
  );
}
