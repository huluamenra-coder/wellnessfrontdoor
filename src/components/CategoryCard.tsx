import { Link } from '../lib/router';
import type { TaxonomyTerm } from '../db/types';

export function CategoryCard({
  term,
  count,
  href,
}: {
  term: TaxonomyTerm;
  count: number;
  href?: string;
}) {
  return (
    <Link to={href ?? `/categories/${term.slug}`} className="category-card">
      <h3>{term.name}</h3>
      <p>{count} {count === 1 ? 'listing' : 'listings'}</p>
    </Link>
  );
}

export function EventCard({
  name,
  location,
  date,
  href,
  verification,
}: {
  name: string;
  location?: string | null;
  date?: string | null;
  href?: string;
  verification?: string;
}) {
  const body = (
    <article className="event-card">
      <p className="kicker">{date || 'Date not yet documented'}</p>
      <h3>{name}</h3>
      {location && <p>{location}</p>}
      {verification && <span className="badge pending">{verification}</span>}
    </article>
  );
  return href ? <Link to={href}>{body}</Link> : body;
}
