import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const STEPS = [
  { n: '1', title: 'List your business', body: 'Submit a San Diego listing. Nothing is published until it is reviewed.' },
  { n: '2', title: 'Keep your knowledge', body: 'Your website, booking link, and offerings stay yours.' },
  { n: '3', title: 'Be found today', body: 'Show up in search, needs, categories, and the directory.' },
  { n: '4', title: 'Concierge later', body: 'A business-specific concierge is the product we are building. It is not live on this site.' },
];

export function ConciergePage() {
  return (
    <>
      <PageHero
        kicker="For wellness providers"
        title="Your business has a front door."
        lede="A business-specific Intelligent Concierge is the product we are building. Today, list your San Diego wellness business in the live directory so people can find you and book on your site."
      >
        <div className="hero-actions">
          <Link to="/join" className="button gold">
            List your business
          </Link>
          <Link to="/for-providers" className="button outline">
            Provider benefits
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">How it will work</p>
        <h2>Your knowledge. Your services. Then a concierge.</h2>
        <p className="lede">
          The future layer listens, clarifies, understands, and guides using your business knowledge. V1 is the map
          those conversations will sit on.
        </p>
        <ol className="step-grid four">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span className="kicker">Step {step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <CtaBand
        kicker="Bring your vision to life"
        title="Give your business a front door."
        lede="Start with a listing. The concierge comes later."
        actionTo="/join"
        actionLabel="Get started today"
      />
    </>
  );
}
