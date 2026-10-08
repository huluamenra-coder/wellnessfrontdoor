import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const STEPS = [
  {
    n: '1',
    title: 'Tell us what you need',
    body: 'Start with how you feel — rest, pain, energy, movement, or connection. You do not have to know the modality yet.',
    to: '/needs',
  },
  {
    n: '2',
    title: 'Explore possibilities',
    body: 'Browse categories, neighborhoods, and the directory. Filter by what matches your intention.',
    to: '/explore',
  },
  {
    n: '3',
    title: 'Find people and places',
    body: 'Open a listing for a practitioner, shop, or supporting space. See what they actually offer.',
    to: '/explore',
  },
  {
    n: '4',
    title: 'Choose your experience',
    body: 'Read the profile. Visit or book on the provider’s own site. Wellness Front Door does not replace their systems.',
    to: '/explore',
  },
];

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="A simpler path to a healthier, happier you."
        lede="Wellness Front Door helps you go from a question to a real local experience — with the right people, places, and possibilities. Then you visit or book on their site."
        visual="panorama"
      >
        <div className="hero-actions">
          <Link to="/needs" className="button gold">
            Start your journey
          </Link>
          <Link to="/explore" className="button outline">
            Explore the directory
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">Your journey</p>
        <h2>Four steps. Then their front door.</h2>
        <ol className="step-grid four">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span className="kicker">Step {step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <Link to={step.to} className="text-link">
                Continue
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="section copy-narrow">
        <p className="kicker">Powered by a map. Guided by people.</p>
        <h2>More than a search box.</h2>
        <p>
          The live product is a San Diego directory: curated listings, needs, categories, neighborhoods, and documented
          events. The Intelligent Concierge is the future layer — listen, clarify, understand, and guide. It is not a
          live agent on this website.
        </p>
      </section>
      <CtaBand
        kicker="Your wellness journey starts now"
        title="Explore. Connect. Experience."
        lede="People, places, practices, community."
        actionTo="/explore"
        actionLabel="Start exploring"
      />
    </>
  );
}
