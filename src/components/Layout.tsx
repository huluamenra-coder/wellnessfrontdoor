import { Link } from '../lib/router';
import type { ReactNode } from 'react';
import { getMeta } from '../db/repository';

const NAV = [
  { to: '/explore', label: 'Explore' },
  { to: '/needs', label: 'Needs' },
  { to: '/categories', label: 'Categories' },
  { to: '/neighborhoods', label: 'Neighborhoods' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
];

export function Layout({ children }: { children: ReactNode }) {
  const meta = getMeta();
  return (
    <div className="site-shell">
      <div className="demo-banner">
        Research directory — San Diego V1. Listings are imported demo data and are not verified recommendations.
      </div>
      <header className="nav">
        <Link to="/" className="wordmark">
          <img src="/brand/app-icon.jpg" alt="Wellness Front Door" className="brand-mark" />
          <span>
            <strong>Wellness Front Door</strong>
            <em>San Diego directory</em>
          </span>
        </Link>
        <nav>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <img src="/brand/logo-mark.jpg" alt="" className="footer-mark" />
          <p>Discover · Connect · Heal · Belong</p>
          <p>People · Places · Practitioners · Experiences · Possibilities</p>
        </div>
        <div>
          <Link to="/explore">Explore San Diego</Link>
          <Link to="/submit">Join as a provider</Link>
          <Link to="/admin">Data admin</Link>
        </div>
        <small>
          {meta.demo_notice} Source: {meta.source_file}. wellnessfrontdoor.com
        </small>
      </footer>
    </div>
  );
}
