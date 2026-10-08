import { Layout } from './components/Layout';
import { useRouter } from './lib/router';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { CategoriesPage, CategoryDetailPage } from './pages/Categories';
import { NeighborhoodsPage, NeighborhoodDetailPage } from './pages/Neighborhoods';
import { ProviderProfilePage } from './pages/ProviderProfile';
import { EventDetailPage, EventsPage } from './pages/Events';
import { SubmitClaimPage } from './pages/SubmitClaim';
import { AboutPage } from './pages/About';
import { HowItWorksPage } from './pages/HowItWorks';
import { BenefitsPage } from './pages/Benefits';
import { ForProvidersPage } from './pages/ForProviders';
import { ConciergePage } from './pages/Concierge';
import { ContactPage } from './pages/Contact';
import { AdminPage } from './pages/Admin';
import { NeedDetailPage, NeedsPage } from './pages/Needs';
import { Link } from './lib/router';

export default function App() {
  const { route } = useRouter();

  let page = null;
  if (route.name === 'home') page = <HomePage />;
  else if (route.name === 'explore') page = <ExplorePage />;
  else if (route.name === 'needs') page = <NeedsPage />;
  else if (route.name === 'need') page = <NeedDetailPage slug={route.params.slug} />;
  else if (route.name === 'categories') page = <CategoriesPage />;
  else if (route.name === 'category') page = <CategoryDetailPage slug={route.params.slug} />;
  else if (route.name === 'neighborhoods') page = <NeighborhoodsPage />;
  else if (route.name === 'neighborhood') page = <NeighborhoodDetailPage slug={route.params.slug} />;
  else if (route.name === 'provider') page = <ProviderProfilePage id={route.params.id} />;
  else if (route.name === 'events') page = <EventsPage />;
  else if (route.name === 'event') page = <EventDetailPage slug={route.params.slug} />;
  else if (route.name === 'submit') page = <SubmitClaimPage />;
  else if (route.name === 'about') page = <AboutPage />;
  else if (route.name === 'how-it-works') page = <HowItWorksPage />;
  else if (route.name === 'benefits') page = <BenefitsPage />;
  else if (route.name === 'for-providers') page = <ForProvidersPage />;
  else if (route.name === 'your-concierge') page = <ConciergePage />;
  else if (route.name === 'contact') page = <ContactPage />;
  else if (route.name === 'admin') page = <AdminPage />;
  else if (route.name === 'admin-provider') page = <AdminPage providerId={route.params.id} />;
  else {
    page = (
      <section className="section page">
        <p className="kicker">Wellness Front Door</p>
        <h1>This page isn’t here.</h1>
        <p className="lede">Return to the directory and continue from people, places, practitioners, or experiences.</p>
        <Link to="/" className="button gold">
          Return home
        </Link>
      </section>
    );
  }

  return <Layout>{page}</Layout>;
}
