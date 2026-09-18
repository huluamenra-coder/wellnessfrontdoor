import { Compass, Heart, Leaf, MapPin, Search, Sparkles, Users } from 'lucide-react';
import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const BENEFITS = [
  { icon: Search, title: 'Discover curated options', body: 'Find trusted local practitioners, services, and spaces in one place.' },
  { icon: Heart, title: 'Explore by what you need', body: 'Start with rest, pain, energy, beauty, movement, or connection — then matching listings.' },
  { icon: Compass, title: 'Save time searching', body: 'Skip a scatter of tabs. Search by name, modality, category, or neighborhood.' },
  { icon: MapPin, title: 'Find local', body: 'See what is close to home across Encinitas, Little Italy, Ocean Beach, and San Diego at large.' },
  { icon: Users, title: 'Connect directly', body: 'Visit or book on the provider’s own site. We do not stand between you and their practice.' },
  { icon: Sparkles, title: 'Discover events as they are added', body: 'Workshops, classes, and gatherings appear here only when they are documented.' },
];

export function BenefitsPage() {
  return (
    <>
      <PageHero
        kicker="Benefits"
        title="A healthier you starts here."
        lede="Wellness Front Door connects people with local practitioners, places, and experiences — a clearer path into wellness and healing arts in San Diego."
      >
        <div className="hero-actions">
          <Link to="/explore" className="button gold">
            Explore the directory
          </Link>
          <Link to="/join" className="button outline">
            Join the movement
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="split-story">
          <div>
            <p className="kicker">For members</p>
            <h2>Benefits for you</h2>
            <p className="lede">A simpler path to a healthier, more balanced life — without pretending an AI already knows you.</p>
            <ul className="benefit-list">
              {BENEFITS.map((item) => (
                <li key={item.title}>
                  <item.icon size={18} aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/needs" className="button gold">
              Start exploring
            </Link>
          </div>
          <aside className="story-panel">
            <Leaf size={28} aria-hidden="true" />
            <p>Wellness lives here.</p>
            <p>Real people. Real places. Real progress.</p>
          </aside>
        </div>
      </section>
      <CtaBand
        title="Wellness for a brighter tomorrow."
        lede="Whether you are seeking support or offering it, you belong here."
        actionTo="/join"
        actionLabel="Join Wellness Front Door"
      />
    </>
  );
}
