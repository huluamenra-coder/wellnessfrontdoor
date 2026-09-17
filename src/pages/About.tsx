import { getMeta, getRoutingGoldStandard } from '../db/repository';
import {
  CONCIERGE_LOOP,
  CONVERSION_PATHS,
  INTENT_EXAMPLE,
  MATCH_TARGETS,
  ORCHESTRATOR,
  PRODUCT_LAYERS,
  PROVIDER_CONCIERGE,
  ROADMAP,
} from '../architecture/wfd';

export function AboutPage() {
  const meta = getMeta();
  const routing = getRoutingGoldStandard();
  return (
    <section className="section page">
      <div className="section-heading">
        <div>
          <p className="kicker">Wellness Front Door</p>
          <h1>The wellness & healing arts map.</h1>
          <p className="lede">
            WFD organizes and connects the ecosystem. It does not replace booking systems, models, or platforms. The
            asset is the knowledge base.
          </p>
        </div>
      </div>

      <ol className="stack-list dark">
        {PRODUCT_LAYERS.map((layer) => (
          <li key={layer.id}>
            <strong>{layer.name}</strong>
            <span className={layer.status === 'live' ? 'badge verified' : 'badge pending'}>{layer.status}</span>
            <p>{layer.summary}</p>
          </li>
        ))}
      </ol>

      <section className="profile-section">
        <h2>Intelligent concierge (future)</h2>
        <p>{CONCIERGE_LOOP.join(' → ')}</p>
        <p>Then match {MATCH_TARGETS.join(', ')} and convert with {CONVERSION_PATHS.join(', ')} on existing systems.</p>
      </section>

      <section className="profile-section">
        <h2>Intake example</h2>
        <dl className="intent-grid">
          {Object.entries(INTENT_EXAMPLE).map(([key, value]) => (
            <div key={key}>
              <dt>{key.replace(/_/g, ' ')}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="profile-section">
        <h2>Orchestrator (not live)</h2>
        <p>{ORCHESTRATOR.principle}</p>
        <ul>
          {ORCHESTRATOR.agents.map((agent) => (
            <li key={agent.id}>
              <strong>{agent.name}</strong> — {agent.job}
            </li>
          ))}
        </ul>
      </section>

      <section className="profile-section" id="provider-concierge">
        <h2>Provider Concierge (future B2B)</h2>
        <p>{PROVIDER_CONCIERGE.summary}</p>
        <ol className="flow-row">
          {PROVIDER_CONCIERGE.channels.map((channel) => (
            <li key={channel}>{channel}</li>
          ))}
        </ol>
        <p className="muted">{PROVIDER_CONCIERGE.pipeline.join(' → ')}</p>
        <p>V1 only collects listings and business knowledge. Phone, chat, SMS, and booking are not built.</p>
      </section>

      <section className="profile-section">
        <h2>Roadmap</h2>
        {ROADMAP.map((item) => (
          <p key={item.version}>
            <strong>{item.version}</strong> ({item.status}): {item.items.join(' · ')}
          </p>
        ))}
      </section>

      <div className="about-grid">
        <img src="/brand/i-we.jpg" alt="I to We — wellness as community" />
        <div>
          <h2>What is live</h2>
          <p>
            V1 is the discovery layer: a San Diego knowledge base, search, profiles, events, and links out to book.
            Ask WFD, phone/SMS provider concierge, payments, and MIM are not built.
          </p>
          <p>Source: {meta.source_file}. Records: {meta.provider_count}. Verified: {meta.verification_counts.verified}.</p>
        </div>
      </div>
      {routing.length > 1 && (
        <section className="profile-section">
          <h2>Hidden Spa routing gold standard</h2>
          <ol className="routing-list">
            {routing.slice(1).map((row) => (
              <li key={row[0]}>
                <strong>{row[1]}</strong> — {row[2]}
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}
