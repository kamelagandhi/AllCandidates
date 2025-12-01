export interface Interview {
  name: string;
  scheduled: boolean;
}

export interface Candidate {
  id: number | string;
  name?: string;
  position?: string;
  company?: string;
  job_title?: string;
  status?: string;
  last_activity?: string;
  action_link?: string;
  availability?: { status?: string };
  interviews?: Array<{ id: string | number; name: string; scheduled?: boolean; mode?: string }>;
  location?: string;
  experience?: string;
  [k: string]: any;
}


export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface FilterState {
  search: string;
  sort: 'activity_desc' | 'activity_asc' | 'name_asc' | 'name_desc';
  application_type: string[];
  jobs: string[];
  sources: string[];
}
