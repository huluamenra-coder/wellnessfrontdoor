export type VerificationStatus =
  | 'verified'
  | 'needs_verification'
  | 'claimed'
  | 'suspended';

export type SubmissionType = 'submit' | 'claim' | 'correction';
export type SubmissionStatus = 'pending_review' | 'in_review' | 'approved' | 'rejected';

export type TaxonomyTerm = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
  city?: string | null;
  state?: string | null;
};

export type ProviderRecord = {
  id: string;
  record_id: string;
  source_row: number | null;
  business_name: string | null;
  practitioner_name: string | null;
  primary_category_id: string | null;
  neighborhood_id: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  website: string | null;
  booking_url: string | null;
  phone: string | null;
  email: string | null;
  credentials: string | null;
  price_range: string | null;
  description: string | null;
  hours: string | null;
  accessibility: string | null;
  social_links: Record<string, string> | null;
  verification_status: VerificationStatus;
  verification_date: string | null;
  source: string | null;
  heal_maps_notes: string | null;
  source_category_raw: string | null;
  source_modalities_raw: string | null;
  source_area_raw: string | null;
  is_internal_reference: boolean;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
};

export type EventRecord = {
  id: string;
  event_name: string | null;
  organizer_id: string | null;
  organizer_name_raw: string | null;
  category_id: string | null;
  description: string | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  website: string | null;
  booking_url: string | null;
  price: string | null;
  verification_status: VerificationStatus;
  source: string | null;
  verification_date: string | null;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
};

export type ListingSubmission = {
  id: string;
  submission_type: SubmissionType;
  status: SubmissionStatus;
  provider_id: string | null;
  business_name: string | null;
  practitioner_name: string | null;
  website: string | null;
  booking_url: string | null;
  phone: string | null;
  email: string | null;
  neighborhood: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Snapshot = {
  meta: {
    source_file: string;
    source_workbook_title: string;
    import_batch: string;
    imported_at: string;
    demo: boolean;
    demo_notice: string;
    provider_count: number;
    event_count: number;
    verification_counts: Record<VerificationStatus, number>;
    empty_taxonomies: Record<string, boolean>;
    notes: string[];
  };
  categories: TaxonomyTerm[];
  modalities: TaxonomyTerm[];
  services: TaxonomyTerm[];
  client_needs: TaxonomyTerm[];
  neighborhoods: TaxonomyTerm[];
  experience_types: TaxonomyTerm[];
  providers: ProviderRecord[];
  events: EventRecord[];
  event_modalities: { event_id: string; modality_id: string }[];
  provider_categories: { provider_id: string; category_id: string; is_primary: boolean }[];
  provider_modalities: { provider_id: string; modality_id: string }[];
  provider_services: { provider_id: string; service_id: string }[];
  provider_client_needs: { provider_id: string; client_need_id: string }[];
  provider_experience_types: { provider_id: string; experience_type_id: string }[];
  submissions: ListingSubmission[];
  import_log: Array<{
    record_id: string;
    source_row: number;
    business_name: string | null;
    verification_status: VerificationStatus;
    source_verification: string;
    fields_populated: string[];
  }>;
  routing_gold_standard: string[][];
};

export type ProviderView = ProviderRecord & {
  primary_category: TaxonomyTerm | null;
  categories: TaxonomyTerm[];
  modalities: TaxonomyTerm[];
  services: TaxonomyTerm[];
  client_needs: TaxonomyTerm[];
  experience_types: TaxonomyTerm[];
  neighborhood: TaxonomyTerm | null;
  events: EventRecord[];
};

export type EventView = EventRecord & {
  organizer: ProviderView | null;
  category: TaxonomyTerm | null;
  modalities: TaxonomyTerm[];
};

export type DirectoryFilters = {
  query?: string;
  category?: string;
  modality?: string;
  clientNeed?: string;
  neighborhood?: string;
  experienceType?: string;
  verification?: VerificationStatus | 'all';
};

export type TaxonomyKind =
  | 'categories'
  | 'modalities'
  | 'services'
  | 'client_needs'
  | 'neighborhoods'
  | 'experience_types';
