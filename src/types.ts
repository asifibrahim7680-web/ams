export type TrackType = 'Software' | 'Hardware' | 'Open Domain';
export type OpenSubType = 'Open Software' | 'Open Hardware';
export type RegistrationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type PaymentStatus = 'PENDING' | 'PAID';

export interface TeamMember {
  id?: string;
  team_id?: string;
  name: string;
  email: string;
  department: string;
  college_id: string;
  created_at?: string;
}

export interface Team {
  id: string;
  team_id: string;
  team_name: string;
  college_name: string;
  department: string;
  leader_name: string;
  leader_email: string;
  leader_phone: string;
  track: TrackType;
  sub_track?: OpenSubType | '';
  project_title: string;
  project_description: string;
  problem_statement_id: string;
  created_at: string;
  members?: TeamMember[];
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  github_repo?: string;
  demo_url?: string;
  presentation_url?: string;
}

export interface ProblemStatement {
  id: string;
  code: string;
  title: string;
  track: 'SOFTWARE' | 'HARDWARE' | 'OPEN DOMAIN';
  category: string;
  description: string;
  expectedSolution: string;
  constraints: string;
  isAnnounced: boolean;
  subTracks?: string[];
}

export interface EvaluationItem {
  name: string;
  weight: number;
  description: string;
  isHighest?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RuleItem {
  id: string;
  num: string;
  title: string;
  details: string[];
}
