import { Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Seo } from './Seo';
import { Link, useRouter } from '../lib/router';

const FOOTER_LINKS = [
  { to: '/explore', label: 'People' },
  { to: '/neighborhoods', label: 'Places' },
  { to: '/needs', label: 'Experiences' },
  { to: '/categories', label: 'Practitioners' },
  { to: '/explore', label: 'Explore' },
  { to: '/join', label: 'Join' },
];

const MENU = [
  {
    heading: 'Discover',
    links: [
      { to: '/', label: 'Home' },
      { to: '/explore', label: 'Explore' },
      { to: '/needs', label: 'Start with a need' },
      { to: '/categories', label: 'Categories' },
      { to: '/neighborhoods', label: 'Neighborhoods' },
      { to: '/events', label: 'Events' },
    ],
  },
  {
    heading: 'The platform',
    links: [
      { to: '/about', label: 'About' },
      { to: '/join', label: 'Join' },
    ],
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const { route } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [route.path]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <Seo />
      <header className="nav">
        <Link to="/" className="wordmark">
          <img src="/brand/app-icon.jpg" alt="Wellness Front Door" className="brand-mark" />
          <span>
            <strong>Wellness Front Door</strong>
            <em>The Intelligent Concierge</em>
            <small>San Diego directory</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>
      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
      <aside id="site-menu" className={menuOpen ? 'site-menu open' : 'site-menu'} aria-hidden={!menuOpen}>
        {MENU.map((group) => (
          <section key={group.heading}>
            <p className="kicker">{group.heading}</p>
            {group.links.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </section>
        ))}
      </aside>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-brand">
          <img src="/brand/logo-mark.jpg" alt="Wellness Front Door" className="footer-mark" />
          <div>
            <strong>Wellness Front Door</strong>
            <em>The Intelligent Concierge</em>
          </div>
        </div>
        <nav className="footer-links" aria-label="Site">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="footer-copy">© 2026 Wellness Front Door</p>
        <p className="footer-site">wellnessfrontdoor.com</p>
      </footer>
    </div>
  );
}
