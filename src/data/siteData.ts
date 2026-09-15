export interface CompetitionScoring {
  label: string;
  weight: number;
}

export interface Competition {
  id: 'crack-the-code' | 'hackathon' | 'techforge';
  index: string;
  name: string;
  category: string;
  teamSize: string;
  tagline: string;
  description: string;
  fee: string;
  feeAmount: number;
  minMembers: number;
  maxMembers: number;
  cta: string;
  symbol: string;
  codePrefix: string;
  stages: string[];
  domains?: string[];
  scoring: CompetitionScoring[];
  details: {
    eligibility: string[];
    teamSize: string;
    procedure: string[];
    rules: string[];
    evaluationNote: string;
    suggestedDomains?: string[];
  };
}

export interface TimelineItem {
  key: string;
  label: string;
  date: string;
  note: string;
  state: 'pending' | 'confirmed';
}

export interface PrizePodium {
  place: string;
  amount: string;
  note: string;
  rank: string;
  featured?: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const SITE_DATA = {
  name: 'AMSFROST',
  year: '2026',
  fullTitle: 'AMSFROST 2026',
  tagline: 'Code. Build. Innovate.',
  eyebrow: 'Inter-College Technical Innovation Challenge',
  dateLong: '01 October 2026',
  dateShort: '01 OCT 2026',
  isoDate: '2026-10-01T09:00:00+05:30',
  location: 'Chennai',
  college: 'Aalim Muhammed Salegh College of Engineering, Chennai',
  campusAddress: 'Nizara Educational Campus, Muthapudupet, Avadi IAF, Chennai - 600055',
  footprint: 'INTER-COLLEGE TECHNICAL INNOVATION CHALLENGE',
  stats: [
    { value: '3', label: 'Competitions' },
    { value: '100%', label: 'Student Driven' },
    { value: '01', label: 'Day' },
    { value: '₹200', label: 'Starting Fee' },
  ],
  about: {
    label: '01 / ABOUT',
    heading: 'Three ways to compete. One platform to build.',
    description:
      'AMSFROST 2026 brings students together to compete in coding, software innovation, and hardware engineering.',
  },
  experience: {
    label: '03 / THE EXPERIENCE',
    heading: 'More than a competition.',
    items: [
      {
        index: '01',
        title: 'Build real solutions',
        note: 'Working software and hardware, judged on outcomes.',
      },
      {
        index: '02',
        title: 'Compete across colleges',
        note: 'Go up against students from every institution.',
      },
      {
        index: '03',
        title: 'Showcase your skills',
        note: 'A public stage for code, design, and engineering.',
      },
      {
        index: '04',
        title: 'Earn recognition',
        note: 'Awards, certificates, and opportunities that count.',
      },
    ],
  },
  patrons: {
    label: 'OUR PATRONS',
    heading: 'GUIDING THE VISION.',
    sub: 'The leadership behind FROST HACKS — championing innovation, learning, and impact at AMS college of engineering.',
    groupLabel: 'MAIN PATRONS',
    main: [
      {
        title: 'Secretary & Correspondent',
        featured: true,
        role: 'Leadership & Patronage',
      },
      {
        title: 'Advisor',
        featured: false,
        role: 'Strategic Guidance',
      },
      {
        title: 'Principal',
        featured: false,
        role: 'Academic & Institutional Direction',
      },
      {
        title: 'Vice Principal',
        featured: false,
        role: 'Operations & Event Mentorship',
      },
    ],
  },
  contact: {
    label: 'CONTACT',
    heading: 'Have a question?',
    sub: 'Contact the organizing team.',
    channels: [
      { key: 'email', label: 'Email', value: 'amsfrost2026@amsce.ac.in', hint: 'Official queries' },
      { key: 'phone', label: 'Phone', value: '+91 98400 12345', hint: 'Helpline' },
      { key: 'instagram', label: 'Instagram', value: '@amsfrost2026', hint: 'Follow updates' },
      { key: 'linkedin', label: 'LinkedIn', value: 'amsfrost-2026', hint: 'Professional network' },
      { key: 'whatsapp', label: 'WhatsApp / Community', value: 'https://chat.whatsapp.com/amsfrost2026', hint: 'Join participant group' },
    ],
  },
  copyright: '© 2026 AMSFROST',
};

export const COMPETITIONS: Competition[] = [
  {
    id: 'crack-the-code',
    index: '01',
    name: 'CRACK THE CODE',
    category: 'Coding & Debugging',
    teamSize: 'Individual / 2',
    tagline: 'Solve. Debug. Outthink.',
    description: 'A timed battle of logic, speed, and precision across three rounds.',
    fee: '₹100 / participant',
    feeAmount: 100,
    minMembers: 1,
    maxMembers: 2,
    cta: 'View Challenge',
    symbol: '{ }',
    codePrefix: 'CDE',
    stages: ['Code Sprint', 'Debugging Arena', 'Final Code Challenge'],
    scoring: [
      { label: 'Correctness', weight: 40 },
      { label: 'Problem-solving', weight: 25 },
      { label: 'Code efficiency', weight: 15 },
      { label: 'Debugging', weight: 10 },
      { label: 'Time management', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Can be played solo or as a duo (1–2 participants)',
        'Valid Student ID required at check-in',
      ],
      teamSize: '1–2 participants',
      procedure: [
        'R1 · Code Sprint — timed competitive coding against the clock',
        'R2 · Debugging Arena — spot and fix bugs in broken code',
        'R3 · Final Code Challenge — one complex problem, best solution wins',
      ],
      rules: [
        'All submissions must be original work',
        'No copying or unauthorized assistance from other participants',
        'Reference materials and internet use are allowed only where stated per round',
        'Strict per-round deadlines — late submissions are not accepted',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Ranked by correctness of output first, then problem-solving, efficiency, debugging accuracy, and speed.',
    },
  },
  {
    id: 'hackathon',
    index: '02',
    name: 'HACKATHON',
    category: 'Software & Innovation',
    teamSize: '2–5 Members',
    tagline: 'Find a problem. Build the solution.',
    description: 'A full-day build sprint across technology domains.',
    fee: '₹200 / participant',
    feeAmount: 200,
    minMembers: 2,
    maxMembers: 5,
    cta: 'View Challenge',
    symbol: '>>_',
    codePrefix: 'HKT',
    stages: ['Problem Identification', 'Prototype Build', 'Pitch & Demo'],
    domains: [
      'AI/ML',
      'Cybersecurity',
      'EdTech',
      'HealthTech',
      'FinTech',
      'IoT',
      'Open Innovation',
    ],
    scoring: [
      { label: 'Problem Identification', weight: 15 },
      { label: 'Innovation', weight: 20 },
      { label: 'Technical Implementation', weight: 25 },
      { label: 'Functionality & Demo', weight: 15 },
      { label: 'Impact & Scalability', weight: 10 },
      { label: 'UI/UX', weight: 5 },
      { label: 'Presentation & Q&A', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 2–5 members',
        'All team members must carry a valid Student ID',
      ],
      teamSize: '2–5 members',
      procedure: [
        'Ideate — identify a real problem in a chosen domain',
        'Build — develop a working software solution',
        'Pitch — present the product and demo it to the jury',
      ],
      rules: [
        'All submitted work must be built during the event window',
        'No copying, resubmission, or unauthorized assistance',
        'AI and internet use are permitted only where explicitly stated',
        'Deadlines are strict — demos after the cut-off are disqualified',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Judged on the problem, innovation, implementation quality, a working demo, and how well it could scale.',
      suggestedDomains: [
        'AI/ML',
        'Cybersecurity',
        'EdTech',
        'HealthTech',
        'FinTech',
        'IoT',
        'Open Innovation',
      ],
    },
  },
  {
    id: 'techforge',
    index: '03',
    name: 'TECHFORGE',
    category: 'Hardware & Engineering',
    teamSize: '2–4 Members',
    tagline: 'Design. Build. Demonstrate.',
    description: 'Turn ideas into working hardware in a single day.',
    fee: '₹200 / participant',
    feeAmount: 200,
    minMembers: 2,
    maxMembers: 4,
    cta: 'View Challenge',
    symbol: '◇▱',
    codePrefix: 'TFG',
    stages: ['Concept & Design', 'Prototype Build', 'Live Demo'],
    domains: ['Robotics', 'IoT', 'EV', 'Automation', 'Energy', 'Smart Systems'],
    scoring: [
      { label: 'Problem Relevance', weight: 10 },
      { label: 'Innovation & Creativity', weight: 15 },
      { label: 'Engineering Design', weight: 20 },
      { label: 'Technical Implementation', weight: 20 },
      { label: 'Working Prototype & Demo', weight: 20 },
      { label: 'Practicality & Scalability', weight: 5 },
      { label: 'Presentation & Q&A', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 2–4 members',
        'All team members must carry a valid Student ID',
      ],
      teamSize: '2–4 members',
      procedure: [
        'Design — define the system and its purpose',
        'Build — assemble a working prototype',
        'Demonstrate — show a live demo to the jury',
      ],
      rules: [
        'All work must be original and produced during the event window',
        'No copying or unauthorized assistance from other teams',
        'Materials and tool usage follow the rules announced at the event',
        'Deadlines are strict — prototypes after the cut-off are disqualified',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Judged on relevance, design maturity, a working prototype demo, and whether the build could scale.',
      suggestedDomains: [
        'Robotics',
        'IoT',
        'EV',
        'Automation',
        'Energy',
        'Smart Systems',
      ],
    },
  },
];

export const TIMELINE_EVENTS: TimelineItem[] = [
  {
    key: 'opens',
    label: 'Registration Opens',
    date: 'TBA',
    note: 'Registration opens for all three competitions',
    state: 'pending',
  },
  {
    key: 'closes',
    label: 'Registration Closes',
    date: 'TBA',
    note: 'Final date to confirm participation',
    state: 'pending',
  },
  {
    key: 'shortlist',
    label: 'Shortlist / Confirmation',
    date: 'TBA',
    note: 'Registered teams receive confirmation',
    state: 'pending',
  },
  {
    key: 'event-day',
    label: 'Event Day',
    date: '01 OCT 2026',
    note: 'AMSFROST 2026',
    state: 'confirmed',
  },
  {
    key: 'results',
    label: 'Results & Awards',
    date: 'TBA',
    note: 'Results announced at the closing ceremony',
    state: 'pending',
  },
];

export const PRIZE_PODIUM: PrizePodium[] = [
  {
    place: '1st Prize',
    amount: '₹XX,XXX',
    note: 'Amount to be confirmed.',
    rank: '1',
    featured: true,
  },
  {
    place: '2nd Prize',
    amount: '₹XX,XXX',
    note: 'Amount to be confirmed.',
    rank: '2',
  },
  {
    place: '3rd Prize',
    amount: '₹XX,XXX',
    note: 'Amount to be confirmed.',
    rank: '3',
  },
];

export const RECOGNITION_PERKS = [
  {
    title: 'Participation Certificate',
    note: 'For eligible registered participants.',
  },
  {
    title: 'Internship Opportunities',
    note: 'For outstanding performance.',
  },
];

export const RECOGNITION_BADGES = [
  'Best Innovation',
  'Best Technical Implementation',
  'Best Interdisciplinary Team',
  'Best Social Impact',
];

export const FAQ_LIST: FAQItem[] = [
  {
    q: 'Can students from other colleges participate?',
    a: 'Yes. AMSFROST is an inter-college challenge open to students from any institution.',
  },
  {
    q: 'What is the team size?',
    a: 'Crack the Code — 1–2 participants · Hackathon — 2–5 members · TechForge — 2–4 members.',
  },
  {
    q: 'What is the registration fee?',
    a: 'Crack the Code — ₹100 per participant. Hackathon — ₹200 per participant. TechForge — ₹200 per participant.',
  },
  {
    q: 'Can I participate in more than one competition?',
    a: 'To be confirmed against the official rules.',
  },
  {
    q: 'What should I bring?',
    a: 'To be announced — organizers will publish the kit list before the event.',
  },
  {
    q: 'Is a college ID required?',
    a: 'Yes, a valid college Student ID is required for verification at check-in.',
  },
  {
    q: 'Are certificates provided?',
    a: 'Yes — participation certificates are awarded to eligible registered participants.',
  },
  {
    q: 'Are internships available?',
    a: 'Internship opportunities are being arranged for outstanding performance. Details will be announced.',
  },
  {
    q: 'Can interdisciplinary teams participate?',
    a: 'Interdisciplinary teams are encouraged — there is a dedicated Best Interdisciplinary Team recognition.',
  },
];
