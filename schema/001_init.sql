-- Wellness Front Door V1 schema
-- Postgres-compatible. V1 ships a JSON snapshot with the same shape.
-- Future: replace the snapshot repository with this database.

CREATE TYPE verification_status AS ENUM (
  'verified',
  'needs_verification',
  'claimed',
  'suspended'
);

CREATE TYPE submission_type AS ENUM (
  'submit',
  'claim',
  'correction'
);

CREATE TYPE submission_status AS ENUM (
  'pending_review',
  'in_review',
  'approved',
  'rejected'
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE modalities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE client_needs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE neighborhoods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  city TEXT,
  state TEXT,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE experience_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE providers (
  id TEXT PRIMARY KEY,
  record_id TEXT NOT NULL UNIQUE,
  source_row INTEGER,
  business_name TEXT,
  practitioner_name TEXT,
  primary_category_id TEXT REFERENCES categories(id),
  neighborhood_id TEXT REFERENCES neighborhoods(id),
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  website TEXT,
  booking_url TEXT,
  phone TEXT,
  email TEXT,
  credentials TEXT,
  price_range TEXT,
  description TEXT,
  hours TEXT,
  accessibility TEXT,
  social_links JSONB,
  verification_status verification_status NOT NULL DEFAULT 'needs_verification',
  verification_date DATE,
  source TEXT,
  heal_maps_notes TEXT,
  source_category_raw TEXT,
  source_modalities_raw TEXT,
  source_area_raw TEXT,
  is_internal_reference BOOLEAN NOT NULL DEFAULT FALSE,
  is_demo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE provider_categories (
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (provider_id, category_id)
);

CREATE TABLE provider_modalities (
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  modality_id TEXT NOT NULL REFERENCES modalities(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, modality_id)
);

CREATE TABLE provider_services (
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, service_id)
);

CREATE TABLE provider_client_needs (
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  client_need_id TEXT NOT NULL REFERENCES client_needs(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, client_need_id)
);

CREATE TABLE provider_experience_types (
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  experience_type_id TEXT NOT NULL REFERENCES experience_types(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, experience_type_id)
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  event_name TEXT,
  organizer_id TEXT REFERENCES providers(id),
  organizer_name_raw TEXT,
  category_id TEXT REFERENCES categories(id),
  description TEXT,
  date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  website TEXT,
  booking_url TEXT,
  price TEXT,
  verification_status verification_status NOT NULL DEFAULT 'needs_verification',
  source TEXT,
  verification_date DATE,
  is_demo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_modalities (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  modality_id TEXT NOT NULL REFERENCES modalities(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, modality_id)
);

CREATE TABLE listing_submissions (
  id TEXT PRIMARY KEY,
  submission_type submission_type NOT NULL,
  status submission_status NOT NULL DEFAULT 'pending_review',
  provider_id TEXT REFERENCES providers(id),
  business_name TEXT,
  practitioner_name TEXT,
  website TEXT,
  booking_url TEXT,
  phone TEXT,
  email TEXT,
  neighborhood TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- WFD product knowledge (not claimed on a provider unless source-verified):
-- Client Need → experience tokens → practitioners / services / events → outbound book.
CREATE TABLE client_need_experiences (
  client_need_id TEXT NOT NULL REFERENCES client_needs(id) ON DELETE CASCADE,
  experience_token TEXT NOT NULL,
  PRIMARY KEY (client_need_id, experience_token)
);

-- Structured intake for the future concierge. V1 stores the schema only.
CREATE TABLE intake_intents (
  id TEXT PRIMARY KEY,
  intent TEXT,
  primary_desire TEXT,
  secondary_desire TEXT,
  experience TEXT,
  time_window TEXT,
  location TEXT,
  budget TEXT,
  modality_preference TEXT,
  urgency TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Future AI routing will query:
-- client_needs -> modalities / services -> providers / events
-- Do not add vector search, recommendations, or intake agents in V1.
-- Orchestrator, Ask WFD, Provider Concierge, and MIM are later phases.

CREATE INDEX providers_verification_idx ON providers (verification_status);
CREATE INDEX providers_neighborhood_idx ON providers (neighborhood_id);
CREATE INDEX providers_primary_category_idx ON providers (primary_category_id);
CREATE INDEX providers_business_name_idx ON providers (business_name);
CREATE INDEX events_date_idx ON events (date);
