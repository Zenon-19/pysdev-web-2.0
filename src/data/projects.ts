export type ProjectCategory = 'Automation' | 'AI' | 'Software';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: 'Delivered' | 'Internal Demo' | 'Concept';
  statusLabel: string;
  isClientWork: boolean;
  imageSrc: string;
  imageAlt: string;
  problem: string;
  solution: string;
  outcomes: string[];
  techStack: string[];
  interactiveDemoNotes?: string;
  livePreviewUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'sports-portfolio',
    slug: 'sports-portfolio',
    title: 'Sports Portfolio Website',
    category: 'Software',
    categoryLabel: 'Custom Software & UI/UX',
    status: 'Delivered',
    statusLabel: 'Delivered Client Project',
    isClientWork: true,
    imageSrc: '/src/assets/images/project_sports_portfolio_1791842460334.jpg',
    imageAlt: 'Sports Portfolio Website editorial preview on high-resolution tablet display',
    problem:
      'Sports professionals and competitive athletes needed an editorial, high-performance web portfolio that loads instantly on mobile, presents media-rich achievements cleanly to scouts and sponsors, and eliminates reliance on generic social media links.',
    solution:
      'Architected a bespoke web experience featuring editorial typography, fluid responsive media layout, zero-layout-shift image handling, and deployment to edge CDN for sub-second global delivery.',
    outcomes: [
      'Sub-second page load speeds globally on edge infrastructure',
      'Editorial typography with balanced visual pacing across all breakpoints',
      'Accessible keyboard navigation and WCAG AA contrast standards',
      'Complete client ownership with intuitive content updates',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'Responsive Media'],
  },
  {
    id: 'lead-to-meeting-automation',
    slug: 'lead-to-meeting-automation',
    title: 'Lead-to-Meeting Automation Pipeline',
    category: 'Automation',
    categoryLabel: 'AI & Workflow Automation',
    status: 'Internal Demo',
    statusLabel: 'Internal Studio Demo',
    isClientWork: false,
    imageSrc: '/src/assets/images/project_lead_automation_1791842459900.jpg',
    imageAlt: 'Lead-to-Meeting automated pipeline workflow dashboard and CRM integration interface',
    problem:
      'Service agencies and B2B consultancies frequently suffer from delayed responses to inbound leads, where hours or days pass before prospects are verified, classified, and scheduled into meetings.',
    solution:
      'Engineered a resilient multi-stage pipeline: intake forms trigger webhook ingestion, verify company domain data, score the lead using explicit business rules, create or update CRM records, and trigger automated notifications with zero human copy-pasting.',
    outcomes: [
      'Simulated average lead-to-acknowledgement latency reduced to under 90 seconds',
      'Automated data validation preventing corrupted CRM contacts',
      'Built-in exponential backoff retry mechanism for API resiliency',
      'Executive Slack summary alerts for qualified high-intent leads',
    ],
    techStack: ['Node.js', 'Webhooks', 'REST APIs', 'HubSpot API', 'Slack API', 'PostgreSQL'],
    interactiveDemoNotes:
      'This demonstration system showcases our standard workflow architecture for client deployments.',
  },
  {
    id: 'client-portal-hub',
    slug: 'client-portal-hub',
    title: 'Operations Dashboard & Integration Hub',
    category: 'Software',
    categoryLabel: 'Custom Software & AI',
    status: 'Internal Demo',
    statusLabel: 'Internal Studio Demo',
    isClientWork: false,
    imageSrc: '/src/assets/images/project_client_portal_1791842459678.jpg',
    imageAlt: 'Operations Dashboard and Integration Hub user interface with live pipeline health metrics',
    problem:
      'Growing businesses with multiple SaaS tools face fragmented operational visibility, relying on spreadsheets that become unmaintainable as transaction volumes and team size expand.',
    solution:
      'Developed a custom single-pane-of-glass operations hub featuring unified pipeline health metrics, authenticated client activity logging, and intelligent semantic search over internal documentation.',
    outcomes: [
      'Centralized operational status view replacing 4 disconnected spreadsheets',
      'Granular role-based access control protecting client-specific data',
      'Searchable activity audit log with structured export capability',
      'Deterministic API health monitor with downtime alerting',
    ],
    techStack: ['React', 'TypeScript', 'Express', 'Tailwind CSS', 'Vector Embeddings', 'PostgreSQL'],
    interactiveDemoNotes:
      'Internal studio prototype demonstrating client portal architecture and API monitoring patterns.',
  },
];
