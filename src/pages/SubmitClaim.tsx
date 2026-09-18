import { useState } from 'react';
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
          We’ll review this before it appears in the directory. Nothing is published automatically.
        </p>
      </section>
    );
  }

  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Join</p>
          <h1>Join as a San Diego wellness provider</h1>
          <p className="lede">
            Add or claim your listing. Reach people looking for practitioners, shops, and experiences. Nothing is
            auto-published.
          </p>
        </div>
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
          <input value={form.business_name} onChange={(event) => setForm({ ...form, business_name: event.target.value })} required={type === 'submit'} />
        </label>
        <label>
          Practitioner name
          <input value={form.practitioner_name} onChange={(event) => setForm({ ...form, practitioner_name: event.target.value })} />
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
          <input value={form.neighborhood} onChange={(event) => setForm({ ...form, neighborhood: event.target.value })} />
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
  );
}
