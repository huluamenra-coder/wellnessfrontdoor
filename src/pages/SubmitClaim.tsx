import { useState } from 'react';
import { CtaBand, PageHero } from '../components/Brand';
import { Link } from '../lib/router';
import { addSubmission, listProviders } from '../db/repository';
import type { SubmissionType } from '../db/types';

export function SubmitClaimPage() {
  const providers = listProviders();
  const [type, setType] = useState<SubmissionType>('submit');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    provider_id: '',
    business_name: '',
    practitioner_name: '',
    website: '',
    booking_url: '',
    phone: '',
    email: '',
    neighborhood: '',
    notes: '',
  });

  if (sent) {
    return (
      <section className="section page">
        <p className="kicker">Join</p>
        <h1>Thank you.</h1>
        <p className="lede">
          We’ll review this before it appears in the directory. Nothing is published automatically. A listing is not
          verified until it is reviewed.
        </p>
      </section>
    );
  }

  return (
    <>
      <PageHero
        kicker="For providers"
        title="Grow your impact."
        lede="Join a trusted network of wellness professionals and connect with people who are ready to invest in their wellbeing. Nothing is published until it is reviewed."
        visual="panorama"
      >
        <div className="hero-actions">
          <a href="#form" className="button gold">
            List your business
          </a>
          <Link to="/for-providers" className="button outline">
            Learn more
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <p className="kicker">Provider benefits</p>
        <h2>More than a listing.</h2>
        <p className="lede">
          Wellness Front Door gives you visibility in the San Diego map and a path to your own booking link.
        </p>
        <div className="card-grid">
          <article className="category-card">
            <h3>Reach more people</h3>
            <p>Connect with clients actively seeking wellness services in your area.</p>
          </article>
          <article className="category-card">
            <h3>Showcase your offerings</h3>
            <p>Highlight your services, modalities, and unique approach.</p>
          </article>
          <article className="category-card">
            <h3>Keep your systems</h3>
            <p>Visitors visit or book on your site. We do not replace your calendar.</p>
          </article>
        </div>
      </section>
      <section className="section" id="form">
        <div className="entry-paths join-paths">
          <button
            type="button"
            className={type === 'submit' ? 'entry-path solid' : 'entry-path'}
            onClick={() => setType('submit')}
          >
            <span>
              <strong>List your business</strong>
              Submit a new provider or shop
            </span>
          </button>
          <button
            type="button"
            className={type === 'claim' || type === 'correction' ? 'entry-path solid' : 'entry-path'}
            onClick={() => setType('claim')}
          >
            <span>
              <strong>Claim your listing</strong>
              Claim or correct an existing record
            </span>
          </button>
        </div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            addSubmission({
              submission_type: type,
              provider_id: form.provider_id || null,
              business_name: form.business_name || null,
              practitioner_name: form.practitioner_name || null,
              website: form.website || null,
              booking_url: form.booking_url || null,
              phone: form.phone || null,
              email: form.email || null,
              neighborhood: form.neighborhood || null,
              notes: form.notes || null,
            });
            setSent(true);
          }}
        >
          <label>
            Request type
            <select value={type} onChange={(event) => setType(event.target.value as SubmissionType)}>
              <option value="submit">Submit a new listing</option>
              <option value="claim">Claim an existing listing</option>
              <option value="correction">Correct information</option>
            </select>
          </label>
          {(type === 'claim' || type === 'correction') && (
            <label>
              Existing listing
              <select
                value={form.provider_id}
                onChange={(event) => setForm({ ...form, provider_id: event.target.value })}
                required
              >
                <option value="">Select a listing</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.business_name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Business name
            <input
              value={form.business_name}
              onChange={(event) => setForm({ ...form, business_name: event.target.value })}
              required={type === 'submit'}
            />
          </label>
          <label>
            Practitioner name
            <input
              value={form.practitioner_name}
              onChange={(event) => setForm({ ...form, practitioner_name: event.target.value })}
            />
          </label>
          <label>
            Website
            <input value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
          </label>
          <label>
            Booking URL
            <input value={form.booking_url} onChange={(event) => setForm({ ...form, booking_url: event.target.value })} />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label>
            Neighborhood
            <input
              value={form.neighborhood}
              onChange={(event) => setForm({ ...form, neighborhood: event.target.value })}
            />
          </label>
          <label>
            Notes
            <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={5} />
          </label>
          <button className="button gold" type="submit">
            Send to review
          </button>
        </form>
      </section>
      <CtaBand
        kicker="Join our network"
        title="List your business today."
        lede="Be part of San Diego’s wellness map. A listing is not verified until it is reviewed."
        actionTo="/join#form"
        actionLabel="Get started"
      />
    </>
  );
}
