import type { ReactNode } from 'react';
import {
  ArrowRight,
  Compass,
  Flower2,
  Heart,
  Leaf,
  Moon,
  PersonStanding,
  Sparkles,
  Sun,
  Users,
  Waves,
} from 'lucide-react';
import { Link } from '../lib/router';
import { NEED_VISUALS } from '../architecture/wfd';
import type { ClientNeedRoute } from '../architecture/wfd';

export function NeedIcon({ slug, size = 22 }: { slug: string; size?: number }) {
  const icon = NEED_VISUALS[slug]?.icon;
  const props = { size, strokeWidth: 1.6, 'aria-hidden': true as const };
  if (icon === 'waves') return <Waves {...props} />;
  if (icon === 'sun') return <Sun {...props} />;
  if (icon === 'leaf') return <Leaf {...props} />;
  if (icon === 'moon') return <Moon {...props} />;
  if (icon === 'users') return <Users {...props} />;
  if (icon === 'sparkles') return <Sparkles {...props} />;
  if (icon === 'move') return <PersonStanding {...props} />;
  return <Flower2 {...props} />;
}

export function PageHero({
  kicker,
  title,
  lede,
  children,
  visual = 'none',
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
  visual?: 'door' | 'coast' | 'none';
}) {
  return (
    <section className={`page-hero visual-${visual}`}>
      <div className="page-hero-copy">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        {children}
      </div>
      {visual !== 'none' && (
        <img
          src="/brand/hero-doorway.jpg"
          alt=""
          className="page-hero-visual"
          loading="lazy"
          aria-hidden="true"
        />
      )}
    </section>
  );
}

export function CtaBand({
  kicker,
  title,
  lede,
  actionTo,
  actionLabel,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  actionTo: string;
  actionLabel: string;
}) {
  return (
    <section className="cta-band">
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
        {lede && <p>{lede}</p>}
      </div>
      <Link to={actionTo} className="button gold">
        {actionLabel} <ArrowRight size={16} />
      </Link>
    </section>
  );
}

export function NeedCard({
  route,
  count,
  compact = false,
}: {
  route: ClientNeedRoute;
  count?: number;
  compact?: boolean;
}) {
  return (
    <Link to={`/needs/${route.slug}`} className={`need-card ${compact ? 'compact' : ''}`}>
      <span className="need-icon" aria-hidden="true">
        <NeedIcon slug={route.slug} />
      </span>
      <h3>{route.name}</h3>
      <p>{NEED_VISUALS[route.slug]?.blurb || route.primary_desire}</p>
      {!compact && typeof count === 'number' && (
        <span className="need-meta">
          {count} matching {count === 1 ? 'listing' : 'listings'} <ArrowRight size={14} />
        </span>
      )}
    </Link>
  );
}

export function EntryPaths() {
  return (
    <div className="entry-paths">
      <Link to="/explore" className="entry-path solid">
        <Compass size={22} aria-hidden="true" />
        <span>
          <strong>I know what I’m looking for</strong>
          Explore the directory
        </span>
        <ArrowRight size={18} />
      </Link>
      <Link to="/needs" className="entry-path">
        <Heart size={22} aria-hidden="true" />
        <span>
          <strong>I’m not sure what I need</strong>
          Start with a need
        </span>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ to?: string; label: string }>;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <span aria-hidden="true"> / </span>}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
