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
            Retreats, classes, and gatherings will appear here as they are documented. None were invented for launch.
          </p>
        </div>
      </div>
      {events.length === 0 ? (
        <div className="empty-state">
          <p>No documented events are in the imported dataset yet.</p>
          <p>Providers can note upcoming events when they submit or claim a listing.</p>
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
