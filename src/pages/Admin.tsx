import { useMemo, useState } from 'react';
import {
  addEvent,
  addTaxonomyTerm,
  getMeta,
  getProvider,
  getVerificationCounts,
  linkProviderTaxonomy,
  listProviders,
  listSubmissions,
  listTaxonomy,
  patchProvider,
  updateSubmissionStatus,
} from '../db/repository';
import { Link, useRouter } from '../lib/router';
import type { TaxonomyKind, VerificationStatus } from '../db/types';

function AdminHome() {
  const meta = getMeta();
  const counts = getVerificationCounts();
  const submissions = listSubmissions();
  const providers = listProviders();
  const [kind, setKind] = useState<TaxonomyKind>('categories');
  const [termName, setTermName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [, setTick] = useState(0);
  const refresh = () => setTick((value) => value + 1);

  return (
    <section className="section page admin">
      <p className="kicker">Data management foundation</p>
      <h1>Admin</h1>
      <p className="lede">
        Local-only review tools for V1. Edits stay in this browser until a real database is connected. No enterprise
        auth yet.
      </p>
      <div className="stat-grid">
        <article><span>Imported</span><strong>{meta.provider_count}</strong></article>
        <article><span>Verified</span><strong>{counts.verified}</strong></article>
        <article><span>Needs verification</span><strong>{counts.needs_verification}</strong></article>
        <article><span>Submissions</span><strong>{submissions.length}</strong></article>
      </div>

      <h2>Providers</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Business</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.record_id}</td>
                <td>{provider.business_name}</td>
                <td>{provider.verification_status}</td>
                <td>
                  <Link to={`/admin/providers/${provider.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Taxonomies</h2>
      <form
        className="inline-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!termName.trim()) return;
          addTaxonomyTerm(kind, termName);
          setTermName('');
          refresh();
        }}
      >
        <select value={kind} onChange={(event) => setKind(event.target.value as TaxonomyKind)}>
          <option value="categories">Category</option>
          <option value="modalities">Modality</option>
          <option value="services">Service</option>
          <option value="client_needs">Client need</option>
          <option value="experience_types">Experience type</option>
          <option value="neighborhoods">Neighborhood</option>
        </select>
        <input value={termName} onChange={(event) => setTermName(event.target.value)} placeholder="Add term" />
        <button className="button gold" type="submit">
          Add
        </button>
      </form>
      <p className="muted">
        {listTaxonomy(kind).length} {kind.replace('_', ' ')} in the working set.
      </p>

      <h2>Add event</h2>
      <form
        className="inline-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!eventName.trim()) return;
          addEvent({
            event_name: eventName,
            organizer_id: eventOrganizer || null,
            organizer_name_raw: null,
            category_id: null,
            description: null,
            date: null,
            start_time: null,
            end_time: null,
            location: null,
            website: null,
            booking_url: null,
            price: null,
            verification_status: 'needs_verification',
            source: 'Admin V1',
            verification_date: null,
          });
          setEventName('');
          refresh();
        }}
      >
        <input value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="Event name" />
        <select value={eventOrganizer} onChange={(event) => setEventOrganizer(event.target.value)}>
          <option value="">No organizer yet</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.business_name}
            </option>
          ))}
        </select>
        <button className="button gold" type="submit">
          Add event
        </button>
      </form>

      <h2>Submitted listings</h2>
      {submissions.length === 0 ? (
        <p className="empty-field">No submissions yet.</p>
      ) : (
        submissions.map((submission) => (
          <article key={submission.id} className="submission-card">
            <p>
              <strong>{submission.submission_type}</strong> · {submission.status}
            </p>
            <p>{submission.business_name}</p>
            <p>{submission.notes}</p>
            <div className="chip-row">
              {(['pending_review', 'in_review', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  className="chip-button"
                  onClick={() => {
                    updateSubmissionStatus(submission.id, status);
                    refresh();
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  );
}

function AdminProvider({ id }: { id: string }) {
  const provider = getProvider(id);
  const [, setTick] = useState(0);
  const [status, setStatus] = useState<VerificationStatus>(provider?.verification_status ?? 'needs_verification');
  const [website, setWebsite] = useState(provider?.website ?? '');
  const [booking, setBooking] = useState(provider?.booking_url ?? '');
  const [phone, setPhone] = useState(provider?.phone ?? '');
  const [email, setEmail] = useState(provider?.email ?? '');
  const [notes, setNotes] = useState(provider?.heal_maps_notes ?? '');
  const [linkKind, setLinkKind] = useState<TaxonomyKind>('modalities');
  const [linkId, setLinkId] = useState('');

  if (!provider) {
    return (
      <section className="section page">
        <h1>Provider not found</h1>
      </section>
    );
  }

  const terms = useMemo(() => listTaxonomy(linkKind), [linkKind, provider]);

  return (
    <section className="section page admin">
      <p className="kicker">{provider.record_id}</p>
      <h1>Edit {provider.business_name}</h1>
      <p className="notice">Public verified presentation is reserved for status = verified.</p>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          patchProvider(provider.id, {
            verification_status: status,
            verification_date: status === 'verified' ? new Date().toISOString().slice(0, 10) : provider.verification_date,
            website: website || null,
            booking_url: booking || null,
            phone: phone || null,
            email: email || null,
            heal_maps_notes: notes || null,
          });
          setTick((value) => value + 1);
        }}
      >
        <label>
          Verification status
          <select value={status} onChange={(event) => setStatus(event.target.value as VerificationStatus)}>
            <option value="needs_verification">needs_verification</option>
            <option value="verified">verified</option>
            <option value="claimed">claimed</option>
            <option value="suspended">suspended</option>
          </select>
        </label>
        <label>
          Website
          <input value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
        <label>
          Booking URL
          <input value={booking} onChange={(event) => setBooking(event.target.value)} />
        </label>
        <label>
          Phone
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Internal notes
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
        </label>
        <button className="button gold" type="submit">
          Save
        </button>
      </form>
      <h2>Attach taxonomy</h2>
      <form
        className="inline-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!linkId) return;
          linkProviderTaxonomy(provider.id, linkKind, linkId);
          setTick((value) => value + 1);
        }}
      >
        <select value={linkKind} onChange={(event) => setLinkKind(event.target.value as TaxonomyKind)}>
          <option value="categories">Category</option>
          <option value="modalities">Modality</option>
          <option value="services">Service</option>
          <option value="client_needs">Client need</option>
          <option value="experience_types">Experience type</option>
        </select>
        <select value={linkId} onChange={(event) => setLinkId(event.target.value)}>
          <option value="">Select term</option>
          {terms.map((term) => (
            <option key={term.id} value={term.id}>
              {term.name}
            </option>
          ))}
        </select>
        <button className="button outline" type="submit">
          Attach
        </button>
      </form>
      <Link to="/admin">Back to admin</Link>
    </section>
  );
}

export function AdminPage({ providerId }: { providerId?: string }) {
  const { navigate } = useRouter();
  if (providerId) return <AdminProvider id={providerId} />;
  return (
    <>
      <AdminHome />
      <p className="section">
        <button className="text-link" onClick={() => navigate('/explore')}>
          View public directory
        </button>
      </p>
    </>
  );
}
