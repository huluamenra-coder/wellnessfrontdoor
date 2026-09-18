import { ArrowRight, Building2, CalendarCheck, MessagesSquare, Sparkles } from 'lucide-react';
import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const FUTURE = [
  'Your services, products, and memberships',
  'FAQs, policies, and philosophy',
  'How visitors should choose an experience',
  'Booking pathways on your existing systems',
];

const STEPS = [
  { n: '1', title: 'We learn your business', body: 'Services, FAQs, pricing notes, and how you already work.' },
  { n: '2', title: 'We build your concierge', body: 'A business-specific guide in your brand and voice — when this layer ships.' },
  { n: '3', title: 'Your clients get support', body: 'Answers and routing without replacing your staff or booking tools.' },
  { n: '4', title: 'More of the right visits', body: 'Questions turn into the next step on your own website.' },
];

export function ConciergePage() {
  return (
    <>
      <PageHero
        kicker="For wellness providers"
        title="Your business has a front door."
        lede="Give your clients an intelligent way in. A business-specific concierge is the product we are building — trained on your knowledge, not a generic chatbot on this directory."
      >
        <div className="hero-actions">
          <Link to="/join" className="button gold">
            Get your concierge <ArrowRight size={16} />
          </Link>
          <Link to="/for-providers" className="button outline">
            Provider benefits
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">How it will work</p>
        <h2>Your knowledge. Your services. Your concierge.</h2>
        <p className="lede">
          This page describes a product in development. It is not a live AI on Wellness Front Door today. The directory
          is the front door that is live now.
        </p>
        <ol className="step-grid four">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section">
        <div className="card-grid">
          <article className="category-card">
            <MessagesSquare size={22} aria-hidden="true" />
            <h3>What it can eventually understand</h3>
            <ul className="plain-list">
              {FUTURE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="category-card">
            <Building2 size={22} aria-hidden="true" />
            <h3>What stays yours</h3>
            <p>Your website, your booking, your client relationships. The concierge is a way in — not a marketplace checkout.</p>
          </article>
          <article className="category-card">
            <CalendarCheck size={22} aria-hidden="true" />
            <h3>What you can do now</h3>
            <p>List or claim your San Diego business so people can already discover you through the directory.</p>
          </article>
          <article className="category-card">
            <Sparkles size={22} aria-hidden="true" />
            <h3>Honest about the present</h3>
            <p>No voice agent, SMS bot, or automated booking engine is running here. We build the beautiful front door first.</p>
          </article>
        </div>
      </section>
      <CtaBand
        title="Bring your vision to life."
        lede="Give your business an intelligent front door when you are ready."
        actionTo="/join"
        actionLabel="Get started today"
      />
    </>
  );
}
