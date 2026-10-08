import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';

export type Route = {
  path: string;
  search: string;
  name: string;
  params: Record<string, string>;
};

function parsePath(pathname: string, search = ''): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  if (path === '/') return { path, search, name: 'home', params: {} };
  if (path === '/explore') return { path, search, name: 'explore', params: {} };
  if (path === '/needs') return { path, search, name: 'needs', params: {} };
  if (parts[0] === 'needs' && parts[1]) return { path, search, name: 'need', params: { slug: parts[1] } };
  if (path === '/categories') return { path, search, name: 'categories', params: {} };
  if (parts[0] === 'categories' && parts[1]) return { path, search, name: 'category', params: { slug: parts[1] } };
  if (path === '/neighborhoods') return { path, search, name: 'neighborhoods', params: {} };
  if (parts[0] === 'neighborhoods' && parts[1]) return { path, search, name: 'neighborhood', params: { slug: parts[1] } };
  if (parts[0] === 'providers' && parts[1]) return { path, search, name: 'provider', params: { id: parts[1] } };
  if (path === '/events') return { path, search, name: 'events', params: {} };
  if (path === '/submit' || path === '/join') return { path, search, name: 'submit', params: {} };
  if (path === '/about') return { path, search, name: 'about', params: {} };
  if (path === '/how-it-works') return { path, search, name: 'how-it-works', params: {} };
  if (path === '/benefits') return { path, search, name: 'benefits', params: {} };
  if (path === '/for-providers') return { path, search, name: 'for-providers', params: {} };
  if (path === '/your-concierge') return { path, search, name: 'your-concierge', params: {} };
  if (path === '/contact') return { path, search, name: 'contact', params: {} };
  if (parts[0] === 'events' && parts[1]) return { path, search, name: 'event', params: { slug: parts[1] } };
  if (path === '/admin') return { path, search, name: 'admin', params: {} };
  if (parts[0] === 'admin' && parts[1] === 'providers' && parts[2]) {
    return { path, search, name: 'admin-provider', params: { id: parts[2] } };
  }
  return { path, search, name: 'not-found', params: {} };
}

const RouterContext = createContext<{
  route: Route;
  navigate: (to: string) => void;
}>({ route: parsePath('/'), navigate: () => undefined });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(() => parsePath(window.location.pathname, window.location.search));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname, window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    setRoute(parsePath(url.pathname, url.search));
    if (url.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({
  to,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: {
  to: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function getSearchParams() {
  return new URLSearchParams(window.location.search);
}
