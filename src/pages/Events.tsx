import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Brand';
import { EventCard } from '../components/CategoryCard';
import { getEvent, listEvents } from '../db/repository';
import { Link } from '../lib/router';

const NRP_URL = 'https://nubianrestorationproject.org/';

export function EventsPage() {
  const events = listEvents();
  return (
    <section className="section page events-page">
      <p className="kicker">Events</p>
      <h1>Gather. Learn. Heal. Belong.</h1>
      <p className="lede">
        Documented retreats, workshops, and gatherings. Dates and prices come from the organizer. Visit or book on
        their site — Wellness Front Door does not invent events.
      </p>

      <article className="featured-event">
        <p className="kicker">Nubian Restoration Project</p>
        <h2>Return to Source — Nubian spiritual retreat in Egypt</h2>
        <p>
          Temple Remembrance Pilgrimage with Abu Sofyan, Hulu Amen Ra, and Nubian elders. Aswan, Philae, a Nile cruise
          to Abu Simbel, Luxor, and Karnak Temple Solar Alignment. December 9–21, 2026. Not a vacation tour. Limited to
          12 guests.
        </p>
        <p>
          $250 from every guest goes directly to Nubian communities through the Nubian Restoration Project Fund.
        </p>
        <div className="hero-actions">
          <a className="button gold" href={NRP_URL} target="_blank" rel="noreferrer">
            View retreats on organizer site <ArrowUpRight size={16} />
          </a>
          <Link to="/providers/wfd-052" className="button outline">
            Organizer listing
          </Link>
        </div>
      </article>

      <div className="section-heading">
        <div>
          <p className="kicker">Retreat packages</p>
          <h2>Choose your length of journey.</h2>
        </div>
      </div>
      {events.length ? (
        <div className="card-grid">
          {events.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="event-card">
              <p className="kicker">{event.date}</p>
              <h3>{event.event_name}</h3>
              {event.location && <p>{event.location}</p>}
              {event.price && <p className="need-meta">{event.price}</p>}
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No verified events are listed yet.</p>
        </div>
      )}
    </section>
  );
}

export function EventDetailPage({ slug }: { slug: string }) {
  const event = getEvent(slug);
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
  const registerUrl = event.booking_url || event.website || NRP_URL;
  return (
    <section className="section page">
      <Breadcrumbs
        items={[
          { to: '/', label: 'Home' },
          { to: '/events', label: 'Events' },
          { label: event.event_name || 'Event' },
        ]}
      />
      <p className="kicker">{event.organizer_name_raw || event.organizer?.business_name || 'Event'}</p>
      <h1>{event.event_name}</h1>
      {event.date && <p className="lede">{event.date}{event.price ? ` · ${event.price}` : ''}</p>}
      {event.location && <p>{event.location}</p>}
      {event.description && <p>{event.description}</p>}
      <div className="hero-actions">
        <a className="button gold" href={registerUrl} target="_blank" rel="noreferrer">
          Register on organizer site <ArrowUpRight size={16} />
        </a>
        {event.organizer && (
          <Link to={`/providers/${event.organizer.id}`} className="button outline">
            {event.organizer.business_name}
          </Link>
        )}
      </div>
      {listEvents().filter((item) => item.id !== event.id).length > 0 && (
        <section className="related-events">
          <h2>Other Return to Source packages</h2>
          <div className="card-grid">
            {listEvents()
              .filter((item) => item.id !== event.id)
              .map((item) => (
                <EventCard
                  key={item.id}
                  name={item.event_name || 'Event'}
                  location={item.location}
                  date={item.date}
                  href={`/events/${item.id}`}
                />
              ))}
          </div>
        </section>
      )}
    </section>
  );
}
