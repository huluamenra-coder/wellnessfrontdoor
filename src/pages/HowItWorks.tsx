import { ArrowRight } from 'lucide-react';
import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const STEPS = [
  {
    n: '1',
    title: 'Tell us what you need',
    body: 'Start with a feeling, a neighborhood, or a kind of care. You do not have to know the exact modality first.',
  },
  {
    n: '2',
    title: 'Explore possibilities',
    body: 'Browse needs, categories, and places. The directory shows what is actually listed in San Diego today.',
  },
  {
    n: '3',
    title: 'Find people and places',
    body: 'Open real provider profiles — practitioners, shops, and supporting spaces with a distinct offering.',
  },
  {
    n: '4',
    title: 'Choose your experience',
    body: 'Read what they offer, where they are, and how they describe their work. Only verified fields are shown.',
  },
  {
    n: '5',
    title: 'Connect and book',
    body: 'Visit or book on the provider’s own website. Wellness Front Door does not replace their booking system.',
  },
  {
    n: '6',
    title: 'Experience and continue',
    body: 'Come back through the same front door when you need a different path — rest, movement, connection, or care.',
  },
];

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="A simpler path to the right next step."
        lede="Wellness Front Door helps you go from a question to a real local experience — with the people, places, and practitioners already in the San Diego directory."
      >
        <div className="hero-actions">
          <Link to="/needs" className="button gold">
            Start with a need <ArrowRight size={16} />
          </Link>
          <Link to="/explore" className="button outline">
            Explore the directory
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">Your journey</p>
        <h2>Six steps, one doorway.</h2>
        <ol className="step-grid">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section copy-narrow">
        <h2>Powered by a map. Guided by a future concierge.</h2>
        <p>
          What is live today is the discovery layer: search, needs, categories, neighborhoods, profiles, events as they
          are documented, and outbound links. The Intelligent Concierge is the evolving layer that will later listen,
          clarify, and guide — it is not a live chatbot on this site.
        </p>
      </section>
      <CtaBand
        title="Your wellness journey starts now."
        lede="Explore. Connect. Experience."
        actionTo="/explore"
        actionLabel="Start exploring"
      />
    </>
  );
}
