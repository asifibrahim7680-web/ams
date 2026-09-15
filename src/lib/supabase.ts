import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Team, TeamMember, RegistrationStatus, PaymentStatus } from '../types';

// Read from Vite or Next.js environment variables safely
const metaEnv = (typeof import.meta !== 'undefined' ? (import.meta as unknown as { env?: Record<string, string> }).env : undefined) || {};

const supabaseUrl = 
  metaEnv.VITE_SUPABASE_URL || 
  metaEnv.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  metaEnv.VITE_SUPABASE_ANON_KEY || 
  metaEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('xyzcompany') && 
  supabaseUrl.startsWith('https://')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const STORAGE_KEY = 'frost_hacks_teams_store_v1';

// Seed initial realistic data for preview & development demo
const INITIAL_SEED_TEAMS: Team[] = [
  {
    id: 'seed-01',
    team_id: 'FRST-2026-9042',
    team_name: 'CryoCore Systems',
    college_name: 'Indian Institute of Technology, Madras',
    department: 'Computer Science & Engineering',
    leader_name: 'Aarav Sharma',
    leader_email: 'aarav.sharma@iitm.ac.in',
    leader_phone: '+91 98765 43210',
    track: 'Software',
    sub_track: '',
    project_title: 'Zero-Latency Distributed State Synchronizer',
    project_description: 'An ultra-lightweight distributed state machine utilizing cryogenic consensus protocols for high-frequency edge compute nodes.',
    problem_statement_id: 'PS-SOFT-01',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    registration_status: 'VERIFIED',
    payment_status: 'PAID',
    github_repo: 'https://github.com/cryocore/frost-sync',
    demo_url: 'https://demo.cryocore.dev',
    members: [
      { id: 'm-01', team_id: 'FRST-2026-9042', name: 'Aarav Sharma', email: 'aarav.sharma@iitm.ac.in', department: 'CSE', college_id: 'CS23B042' },
      { id: 'm-02', team_id: 'FRST-2026-9042', name: 'Rhea Nambiar', email: 'rhea.n@iitm.ac.in', department: 'CSE', college_id: 'CS23B088' },
      { id: 'm-03', team_id: 'FRST-2026-9042', name: 'Karthik Rao', email: 'karthik.r@iitm.ac.in', department: 'EE', college_id: 'EE23B019' }
    ]
  },
  {
    id: 'seed-02',
    team_id: 'FRST-2026-4188',
    team_name: 'SubZero Bionics',
    college_name: 'National Institute of Technology, Trichy',
    department: 'Electronics & Instrumentation',
    leader_name: 'Pooja Sundaram',
    leader_email: 'pooja.sundaram@nitt.edu',
    leader_phone: '+91 91234 56789',
    track: 'Hardware',
    sub_track: '',
    project_title: 'Peltier-Cooled Sensory Exoskeleton Joint',
    project_description: 'A robotic orthotic limb stabilizer employing solid-state thermoelectric cooling and EMG feedback telemetry.',
    problem_statement_id: 'PS-HARD-01',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    registration_status: 'PENDING',
    payment_status: 'PAID',
    members: [
      { id: 'm-04', team_id: 'FRST-2026-4188', name: 'Pooja Sundaram', email: 'pooja.sundaram@nitt.edu', department: 'ICE', college_id: 'ICE22B005' },
      { id: 'm-05', team_id: 'FRST-2026-4188', name: 'Devanathan K', email: 'deva.k@nitt.edu', department: 'Mech', college_id: 'ME22B061' }
    ]
  },
  {
    id: 'seed-03',
    team_id: 'FRST-2026-7231',
    team_name: 'NeuralGlacier',
    college_name: 'BITS Pilani',
    department: 'Artificial Intelligence & Robotics',
    leader_name: 'Rohan Mehra',
    leader_email: 'rohan.mehra@pilani.bits-pilani.ac.in',
    leader_phone: '+91 99887 76655',
    track: 'Open Domain',
    sub_track: 'Open Software',
    project_title: 'Glacial Quantization Engine for Edge LLMs',
    project_description: 'An open-domain deep quantization framework running dense language models on sub-watt microprocessors.',
    problem_statement_id: 'OPEN-DOMAIN-CUSTOM',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    registration_status: 'VERIFIED',
    payment_status: 'PAID',
    github_repo: 'https://github.com/neuralglacier/glacier-quant',
    members: [
      { id: 'm-06', team_id: 'FRST-2026-7231', name: 'Rohan Mehra', email: 'rohan.mehra@pilani.bits-pilani.ac.in', department: 'AI', college_id: 'BITS22A012' },
      { id: 'm-07', team_id: 'FRST-2026-7231', name: 'Ananya Verma', email: 'ananya.v@pilani.bits-pilani.ac.in', department: 'ECE', college_id: 'BITS22A099' },
      { id: 'm-08', team_id: 'FRST-2026-7231', name: 'Siddharth Roy', email: 'sid.roy@pilani.bits-pilani.ac.in', department: 'CS', college_id: 'BITS22A044' },
      { id: 'm-09', team_id: 'FRST-2026-7231', name: 'Tanvi Iyer', email: 'tanvi.iyer@pilani.bits-pilani.ac.in', department: 'CS', college_id: 'BITS22A052' }
    ]
  },
  {
    id: 'seed-04',
    team_id: 'FRST-2026-3105',
    team_name: 'ThermoGrid',
    college_name: 'Vellore Institute of Technology',
    department: 'Mechanical & Automation',
    leader_name: 'Vikramaditya Nair',
    leader_email: 'vikram.nair@vit.ac.in',
    leader_phone: '+91 97654 32190',
    track: 'Open Domain',
    sub_track: 'Open Hardware',
    project_title: 'Cryo-Thermal Power Harvesting Micro-Turbine',
    project_description: 'An open hardware energy generator capturing sub-ambient industrial thermal gradients to power remote IoT telemetry stations.',
    problem_statement_id: 'OPEN-DOMAIN-CUSTOM',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    registration_status: 'PENDING',
    payment_status: 'PENDING',
    members: [
      { id: 'm-10', team_id: 'FRST-2026-3105', name: 'Vikramaditya Nair', email: 'vikram.nair@vit.ac.in', department: 'Mech', college_id: 'VIT22BME01' },
      { id: 'm-11', team_id: 'FRST-2026-3105', name: 'Meera Chawla', email: 'meera.chawla@vit.ac.in', department: 'EEE', college_id: 'VIT22BEE45' }
    ]
  }
];

export function getLocalTeams(): Team[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_TEAMS));
      return INITIAL_SEED_TEAMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_TEAMS;
  }
}

export function saveLocalTeams(teams: Team[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  } catch (err) {
    console.warn('Unable to persist to localStorage', err);
  }
}

// -------------------------------------------------------------
// Database Data Services (Supabase with Local Fallback)
// -------------------------------------------------------------

export async function fetchAllTeams(): Promise<Team[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (teamsError) throw teamsError;

      if (teamsData && teamsData.length > 0) {
        // Fetch members and registrations
        const { data: membersData } = await supabase.from('team_members').select('*');
        const { data: regsData } = await supabase.from('registrations').select('*');

        const combined: Team[] = teamsData.map((t) => {
          const mList = membersData ? membersData.filter((m) => m.team_id === t.team_id) : [];
          const reg = regsData ? regsData.find((r) => r.team_id === t.team_id) : null;
          return {
            ...t,
            members: mList,
            registration_status: (reg?.registration_status as RegistrationStatus) || 'PENDING',
            payment_status: (reg?.payment_status as PaymentStatus) || 'PENDING',
          };
        });

        // Cache local copy
        saveLocalTeams(combined);
        return combined;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local storage cache:', err);
    }
  }
  return getLocalTeams();
}

export async function registerNewTeam(newTeamData: Omit<Team, 'id' | 'created_at'>): Promise<Team> {
  const timestamp = new Date().toISOString();
  const teamRecord: Team = {
    ...newTeamData,
    id: 'team_' + Math.random().toString(36).substring(2, 9),
    created_at: timestamp,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Insert into teams table
      const { error: teamInsertError } = await supabase.from('teams').insert({
        team_id: teamRecord.team_id,
        team_name: teamRecord.team_name,
        college_name: teamRecord.college_name,
        department: teamRecord.department,
        leader_name: teamRecord.leader_name,
        leader_email: teamRecord.leader_email,
        leader_phone: teamRecord.leader_phone,
        track: teamRecord.track,
        sub_track: teamRecord.sub_track || '',
        project_title: teamRecord.project_title,
        project_description: teamRecord.project_description,
        problem_statement_id: teamRecord.problem_statement_id,
        created_at: timestamp,
      });

      if (teamInsertError) throw teamInsertError;

      // 2. Insert team members
      if (teamRecord.members && teamRecord.members.length > 0) {
        const memberPayload = teamRecord.members.map((m) => ({
          team_id: teamRecord.team_id,
          name: m.name,
          email: m.email,
          department: m.department,
          college_id: m.college_id,
          created_at: timestamp,
        }));
        await supabase.from('team_members').insert(memberPayload);
      }

      // 3. Insert registration status
      await supabase.from('registrations').insert({
        team_id: teamRecord.team_id,
        registration_status: teamRecord.registration_status,
        payment_status: teamRecord.payment_status,
        created_at: timestamp,
      });
    } catch (err) {
      console.warn('Supabase insertion error, falling back to local storage:', err);
    }
  }

  // Persist locally
  const current = getLocalTeams();
  const updated = [teamRecord, ...current];
  saveLocalTeams(updated);

  return teamRecord;
}

export async function updateRegistrationStatus(
  team_id: string,
  newStatus: RegistrationStatus,
  paymentStatus?: PaymentStatus
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      const updateData: { registration_status: RegistrationStatus; payment_status?: PaymentStatus } = {
        registration_status: newStatus,
      };
      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }
      await supabase.from('registrations').update(updateData).eq('team_id', team_id);
    } catch (err) {
      console.warn('Supabase status update error:', err);
    }
  }

  // Update local storage
  const current = getLocalTeams();
  const index = current.findIndex((t) => t.team_id === team_id);
  if (index !== -1) {
    current[index].registration_status = newStatus;
    if (paymentStatus) current[index].payment_status = paymentStatus;
    saveLocalTeams([...current]);
  }
}

export async function updateProjectSubmission(
  team_id: string,
  submission: { github_repo?: string; demo_url?: string; presentation_url?: string }
): Promise<void> {
  const current = getLocalTeams();
  const index = current.findIndex((t) => t.team_id === team_id);
  if (index !== -1) {
    current[index] = {
      ...current[index],
      ...submission,
    };
    saveLocalTeams([...current]);
  }
}
