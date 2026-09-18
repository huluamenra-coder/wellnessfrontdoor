import { Calendar, Eye, HeartHandshake, Leaf, Megaphone, Users } from 'lucide-react';
import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';

const BENEFITS = [
  { icon: Users, title: 'Reach more people', body: 'Connect with visitors actively looking for wellness in San Diego.' },
  { icon: Eye, title: 'Gain visibility', body: 'Appear in search, need pathways, categories, and neighborhood pages.' },
  { icon: Megaphone, title: 'Showcase your offering', body: 'A structured listing for services, modalities, and what makes your work distinct.' },
  { icon: HeartHandshake, title: 'Join a trusted network', body: 'Stand with other practitioners, shops, and supporting wellness businesses.' },
  { icon: Calendar, title: 'Share events when ready', body: 'Upcoming gatherings can be documented as they are verified — we do not invent dates.' },
  { icon: Leaf, title: 'Stay on your own systems', body: 'Visitors book, buy, or join on your website. We do not replace your booking tools.' },
];

export function ForProvidersPage() {
  return (
    <>
      <PageHero
        kicker="For wellness professionals"
        title="Grow your impact. We’ll open the door."
        lede="Wellness Front Door gives practitioners, healers, teachers, studios, and supporting businesses a clear place in the San Diego wellness map."
      >
        <div className="hero-actions">
          <Link to="/join" className="button gold">
            List your business
          </Link>
          <Link to="/your-concierge" className="button outline">
            Your Intelligent Concierge
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">Key benefits</p>
        <h2>Built for wellness businesses and healers</h2>
        <div className="card-grid">
          {BENEFITS.map((item) => (
            <article key={item.title} className="category-card">
              <item.icon size={22} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section copy-narrow">
        <h2>What is live, and what is next</h2>
        <p>
          Today you can list or claim a business, appear in the directory, and link people to your own site. A
          business-specific Intelligent Concierge — trained on your services, FAQs, and philosophy — is the product
          being developed. It is not live on this website yet.
        </p>
      </section>
      <CtaBand
        title="List your business today."
        lede="Join a trusted platform. Reach more people. Make a bigger impact."
        actionTo="/join"
        actionLabel="Get started"
      />
    </>
  );
}
