import { useState } from 'react';
import { PageHero } from '../components/Brand';
import { Link } from '../lib/router';

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: 'general', message: '' });

  if (sent) {
    return (
      <section className="section page">
        <p className="kicker">Contact</p>
        <h1>Thank you.</h1>
        <p className="lede">
          Your note is saved for review. Listing requests still go through Join so they can be checked before anything
          is published.
        </p>
        <Link to="/" className="button gold">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Contact Wellness Front Door."
        lede="Questions about the directory, a listing, or the platform. This form is for human review — it is not an automated concierge."
        visual="none"
      />
      <section className="section">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            const existing = JSON.parse(localStorage.getItem('wfd-contact') || '[]') as unknown[];
            localStorage.setItem(
              'wfd-contact',
              JSON.stringify([{ ...form, created_at: new Date().toISOString() }, ...existing])
            );
            setSent(true);
          }}
        >
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label>
            Topic
            <select value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })}>
              <option value="general">General</option>
              <option value="listing">A listing</option>
              <option value="press">Press</option>
              <option value="providers">Provider partnership</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              rows={6}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              required
            />
          </label>
          <button className="button gold" type="submit">
            Send message
          </button>
        </form>
      </section>
    </>
  );
}
