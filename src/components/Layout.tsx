import { Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Seo } from './Seo';
import { Link, useRouter } from '../lib/router';

const DESKTOP_NAV = [
  { to: '/explore', label: 'Explore' },
  { to: '/needs', label: 'Needs' },
  { to: '/categories', label: 'Categories' },
  { to: '/neighborhoods', label: 'Neighborhoods' },
  { to: '/events', label: 'Events' },
  { to: '/for-providers', label: 'For Providers' },
  { to: '/about', label: 'About' },
];

const MENU = [
  {
    heading: 'Discover',
    links: [
      { to: '/', label: 'Home' },
      { to: '/explore', label: 'Explore' },
      { to: '/needs', label: 'Start With a Need' },
      { to: '/categories', label: 'Categories' },
      { to: '/neighborhoods', label: 'Neighborhoods' },
      { to: '/events', label: 'Events' },
    ],
  },
  {
    heading: 'For providers',
    links: [
      { to: '/join', label: 'List Your Business' },
      { to: '/your-concierge', label: 'Your Intelligent Concierge' },
      { to: '/for-providers', label: 'Provider Benefits' },
    ],
  },
  {
    heading: 'The platform',
    links: [
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/about', label: 'About' },
      { to: '/join', label: 'Join' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

const FOOTER = [
  {
    heading: 'Discover',
    links: [
      { to: '/explore', label: 'Explore' },
      { to: '/needs', label: 'Needs' },
      { to: '/categories', label: 'Categories' },
      { to: '/neighborhoods', label: 'Neighborhoods' },
      { to: '/events', label: 'Events' },
    ],
  },
  {
    heading: 'For providers',
    links: [
      { to: '/join', label: 'List Your Business' },
      { to: '/your-concierge', label: 'Your Intelligent Concierge' },
      { to: '/for-providers', label: 'Provider Resources' },
    ],
  },
  {
    heading: 'The platform',
    links: [
      { to: '/about', label: 'About' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/join', label: 'Join' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

function isTemplateLanding(path: string, search: string) {
  if (
    path === '/explore' ||
    path === '/needs' ||
    path === '/categories' ||
    path === '/neighborhoods' ||
    path === '/events' ||
    path === '/how-it-works' ||
    path === '/benefits' ||
    path === '/for-providers' ||
    path === '/your-concierge' ||
    path === '/join' ||
    path === '/submit'
  ) {
    if (path === '/explore') {
      const params = new URLSearchParams(search);
      return !(
        params.get('q') ||
        params.get('view') ||
        params.get('category') ||
        params.get('neighborhood') ||
        params.get('need') ||
        params.get('modality') ||
        params.get('experience')
      );
    }
    return true;
  }
  return false;
}

function isCurrent(path: string, to: string) {
  if (to === '/') return path === '/';
  if (to === '/join') return path === '/join' || path === '/submit';
  return path === to || path.startsWith(`${to}/`);
}

export function Layout({ children }: { children: ReactNode }) {
  const { route } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const templateMode = isTemplateLanding(route.path, route.search);

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
    <div className={templateMode ? 'site-shell template-mode' : 'site-shell'}>
      <Seo />
      <header className={route.name === 'home' ? 'nav' : 'nav interior'}>
        <Link to="/" className="wordmark">
          <img src="/brand/app-icon.jpg" alt="" className="brand-mark" />
          <span>
            <strong>Wellness Front Door</strong>
            <em>The Intelligent Concierge</em>
            <small>San Diego</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {DESKTOP_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={isCurrent(route.path, item.to) ? 'current' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/join" className="button gold nav-join">
          Join
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside id="site-menu" className={menuOpen ? 'site-menu open' : 'site-menu'} aria-hidden={!menuOpen}>
        {MENU.map((group) => (
          <section key={group.heading}>
            <p className="kicker">{group.heading}</p>
            {group.links.map((item) => (
              <Link
                key={`${group.heading}-${item.to}`}
                to={item.to}
                className={isCurrent(route.path, item.to) ? 'current' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </section>
        ))}
      </aside>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/brand/logo-mark.jpg" alt="" className="footer-mark" />
            <div>
              <strong>Wellness Front Door</strong>
              <em>The Intelligent Concierge</em>
              <small>San Diego</small>
            </div>
          </div>
          {FOOTER.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="kicker">{group.heading}</p>
              {group.links.map((item) => (
                <Link key={`${group.heading}-${item.label}`} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Wellness Front Door</p>
          <p className="footer-site">wellnessfrontdoor.com</p>
        </div>
      </footer>
    </div>
  );
}
