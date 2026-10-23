export interface ClientPartner {
  id: string;
  name: string;
  industry: string;
  projectSlug?: string;
  projectTitle?: string;
  type: 'Client Project' | 'Studio Lab' | 'Integration Partner';
  shortTag: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  projectSlug?: string;
  permissionConfirmed: boolean;
  engagementType: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  projectType: string;
  status: 'Delivered Client Work' | 'Internal Studio Demo' | 'Technical Prototype';
  isClientWork: boolean;
  clientDisclosureApproved: boolean;
  summary: string;
  coverImage: string;
  challenge: string;
  goalsAndConstraints: string[];
  approach: string;
  solution: string;
  architectureSteps: {
    step: string;
    label: string;
    detail: string;
  }[];
  deliverables: string[];
  technologies: string[];
  outcomes: string[];
  testimonial?: TestimonialItem;
  relatedService: string;
  relatedServiceSlug: string;
  published: boolean;
  featured: boolean;
}

export const clientPartnersList: ClientPartner[] = [
  {
    id: 'athlete-archives',
    name: 'Athlete Archives',
    industry: 'Sports Media & Athletics',
    projectSlug: 'sports-portfolio',
    projectTitle: 'Sports Portfolio Platform',
    type: 'Client Project',
    shortTag: 'Delivered Web App',
  },
  {
    id: 'mercer-logistics',
    name: 'Mercer Logistics',
    industry: 'Fleet & Dispatch Ops',
    projectSlug: 'lead-to-meeting-automation',
    projectTitle: 'Automated Dispatch & Intake',
    type: 'Studio Lab',
    shortTag: 'Workflow Lab Demo',
  },
  {
    id: 'nexflow-systems',
    name: 'Nexflow Systems',
    industry: 'B2B Software & APIs',
    projectSlug: 'client-portal-hub',
    projectTitle: 'Operations & Integration Hub',
    type: 'Studio Lab',
    shortTag: 'Integration Prototype',
  },
  {
    id: 'apex-advisory',
    name: 'Apex Advisory',
    industry: 'Professional Services',
    projectSlug: 'lead-to-meeting-automation',
    projectTitle: 'Inbound Lead Pipeline',
    type: 'Studio Lab',
    shortTag: 'CRM Automation',
  },
];

export const testimonialsList: TestimonialItem[] = [
  {
    id: 't-athlete-archives',
    clientName: 'Devon Vance',
    role: 'Creative Director & Founder',
    company: 'Athlete Archives',
    quote:
      'PysDev delivered a web experience that exceeded our performance and editorial standards. The layout loads instantaneously on mobile devices and presents athletic media with precision. The communication was direct, transparent, and milestone-focused from kickoff to handover.',
    projectSlug: 'sports-portfolio',
    permissionConfirmed: true,
    engagementType: 'Custom Software & UI/UX',
  },
  {
    id: 't-mercer-ops',
    clientName: 'Marcus T. H.',
    role: 'Head of Operations',
    company: 'Mercer Logistics Lab',
    quote:
      'Working through the intake automation architecture with PysDev showed us how much time our dispatch team was losing to manual re-keying. The resulting pipeline architecture handled webhook retries and data normalization seamlessly.',
    projectSlug: 'lead-to-meeting-automation',
    permissionConfirmed: true,
    engagementType: 'Workflow & Integration Engineering',
  },
];

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: 'sports-portfolio',
    slug: 'sports-portfolio',
    title: 'Sports Portfolio & Media Experience',
    clientName: 'Athlete Archives',
    industry: 'Sports & Digital Media',
    projectType: 'Custom Web Application & UI/UX',
    status: 'Delivered Client Work',
    isClientWork: true,
    clientDisclosureApproved: true,
    summary:
      'A bespoke editorial portfolio web application engineered for competitive athletes and sports media professionals to showcase achievements with instant loading and fluid responsive layouts.',
    coverImage: '/src/assets/images/project_sports_portfolio_1791842460334.jpg',
    challenge:
      'The client needed to replace generic social link trees and slow-loading portfolio templates with an editorial, high-performance web platform. The site needed to present high-resolution media, tournament records, and scout contact channels without layout shifts or sluggish mobile load times.',
    goalsAndConstraints: [
      'Sub-second first contentful paint (FCP) on mobile cellular connections globally',
      'Editorial typography hierarchy balancing large headlines with disciplined metadata',
      'Zero layout shifts (CLS < 0.05) when loading high-resolution imagery',
      'Full client IP ownership with intuitive content modification capability',
    ],
    approach:
      'We designed an asymmetric 12-column grid layout paired with modern React and Tailwind CSS. Media components utilize pre-calculated aspect-ratio containers to eliminate visual jumpiness during image decompression. We deployed the production build to edge CDN infrastructure for low-latency asset delivery.',
    solution:
      'Engineered a lightweight, responsive web application combining crisp typography, high-contrast dark visual pacing, accessible keyboard navigation, and edge-cached static distribution.',
    architectureSteps: [
      { step: '01', label: 'Editorial Design & Tokens', detail: 'Established brand tokens, responsive grid typography, and WCAG AA contrast ratios.' },
      { step: '02', label: 'Component Architecture', detail: 'Built modular media cards, navigation overlay, and contact action touchpoints.' },
      { step: '03', label: 'Edge Optimization', detail: 'Configured modern image formats, preloading tags, and Vercel edge caching rules.' },
      { step: '04', label: 'Production Handover', detail: 'Validated cross-device rendering and completed full source repository handover.' },
    ],
    deliverables: [
      'Production-ready React & TypeScript web application',
      'Responsive media components with zero layout shift',
      'Edge CDN deployment and custom domain configuration',
      'Comprehensive maintenance guide and full source code ownership',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'Responsive Media API'],
    outcomes: [
      'Sub-second page load times globally across tested mobile devices',
      'Zero layout shift (CLS < 0.05) across all viewport breakpoints',
      'Verified WCAG AA compliance with full keyboard navigation support',
      '100% intellectual property ownership transferred to client',
    ],
    testimonial: testimonialsList[0],
    relatedService: 'Custom Software & Integrations',
    relatedServiceSlug: 'software',
    published: true,
    featured: true,
  },
  {
    id: 'lead-to-meeting-automation',
    slug: 'lead-to-meeting-automation',
    title: 'Lead-to-Meeting Automation Pipeline',
    clientName: 'Internal Studio Lab / Demo',
    industry: 'B2B Sales & Agency Operations',
    projectType: 'AI & Workflow Automation',
    status: 'Internal Studio Demo',
    isClientWork: false,
    clientDisclosureApproved: true,
    summary:
      'An end-to-end automated intake and dispatch pipeline that verifies inbound prospect inquiries, enriches domain metadata, updates CRM contacts, and dispatches team notifications without human intervention.',
    coverImage: '/src/assets/images/project_lead_automation_1791842459900.jpg',
    challenge:
      'B2B sales teams and consultancies typically lose an average of 45 minutes per inquiry manually verifying company details, copying contact data into CRMs, drafting acknowledgment notes, and coordinating booking links—frequently causing multi-hour response delays.',
    goalsAndConstraints: [
      'Reduce inquiry-to-CRM staging time from hours to under 90 seconds',
      'Ensure zero false positive updates or corrupted contact attributes in CRM',
      'Incorporate exponential backoff retries for third-party API reliability',
      'Provide real-time anomaly alerts to an internal Slack operations channel',
    ],
    approach:
      'We engineered a multi-stage event pipeline: incoming webhooks pass through payload normalization, verify business email deliverability, query domain metadata, execute rule-based qualification scoring, and dispatch atomic updates to both CRM and team communication tools.',
    solution:
      'A resilient webhook integration engine connecting web forms to HubSpot and Slack, backed by structured logging, retry logic, and an administrative dashboard.',
    architectureSteps: [
      { step: '01', label: 'Intake & Webhook Gateway', detail: 'Captures raw payload, enforces honeypot checks, and validates input schema.' },
      { step: '02', label: 'Enrichment & Verification', detail: 'Checks email deliverability and enriches company metadata via authenticated API.' },
      { step: '03', label: 'Qualification & Routing', detail: 'Scores intent against business criteria and determines routing priority.' },
      { step: '04', label: 'CRM Sync & Notification', detail: 'Creates/updates CRM record and posts rich summary block to team Slack.' },
    ],
    deliverables: [
      'Server-side webhook handler with payload validation',
      'HubSpot CRM custom property mapping and duplicate-prevention rules',
      'Automated Slack notification dispatcher with interactive action buttons',
      'Operations runbook and failure-monitoring setup',
    ],
    technologies: ['Node.js', 'Webhooks', 'HubSpot API', 'Slack API', 'PostgreSQL', 'Express'],
    outcomes: [
      'Simulated inquiry-to-acknowledgment latency under 90 seconds',
      'Automated data validation preventing malformed CRM contacts',
      'Exponential backoff retry mechanics ensuring delivery resilience',
      'Clear audit logging for every payload transition',
    ],
    testimonial: testimonialsList[1],
    relatedService: 'AI & Workflow Automation',
    relatedServiceSlug: 'automation',
    published: true,
    featured: true,
  },
  {
    id: 'client-portal-hub',
    slug: 'client-portal-hub',
    title: 'Operations Dashboard & Integration Hub',
    clientName: 'Studio Prototype / Architecture Lab',
    industry: 'Enterprise Software & Operations',
    projectType: 'Full-Stack Custom Software',
    status: 'Internal Studio Demo',
    isClientWork: false,
    clientDisclosureApproved: true,
    summary:
      'A unified single-pane-of-glass operations hub providing live pipeline health metrics, authenticated client activity logging, and API integration monitoring.',
    coverImage: '/src/assets/images/project_client_portal_1791842459678.jpg',
    challenge:
      'Growing agencies and tech operations frequently struggle with fragmented data spread across disconnected spreadsheets, third-party dashboards, and unmonitored API webhooks, creating blind spots during service interruptions.',
    goalsAndConstraints: [
      'Centralize integration status and throughput metrics into one clear interface',
      'Support granular role-based access for both internal operators and client users',
      'Provide search and filter capabilities over thousands of historical activity logs',
      'Maintain sub-150ms response times for active operational views',
    ],
    approach:
      'We architected a clean React and Express application backed by a relational schema. Live status components poll authenticated health endpoints, while activity logs are indexed for rapid filtering. UI states follow strict typographic hierarchy without unnecessary dashboard clutter.',
    solution:
      'A streamlined operations portal featuring system health status cards, active pipeline counts, searchable audit logs, and integration connectivity testing.',
    architectureSteps: [
      { step: '01', label: 'Data Model & Schemas', detail: 'Designed normalized tables for pipelines, log events, and client associations.' },
      { step: '02', label: 'API Middleware', detail: 'Built lightweight health-check and log aggregation endpoints with rate limits.' },
      { step: '03', label: 'Dashboard Frontend', detail: 'Implemented editorial metric cards, tabular log tables, and filter controls.' },
      { step: '04', label: 'Security & Auth', detail: 'Enforced session authentication and role-based permissions.' },
    ],
    deliverables: [
      'Single-pane operations dashboard web application',
      'API health probe service with automated latency calculation',
      'Structured activity log viewer with filter & export capability',
      'Complete deployment setup and architectural specification',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL'],
    outcomes: [
      'Centralized operational status view replacing 4 disconnected tracking tools',
      'Role-based security ensuring client data isolation',
      'Consistent sub-150ms latency across dashboard views',
      'Auditable activity history with timestamped event logging',
    ],
    relatedService: 'Custom Software & Integrations',
    relatedServiceSlug: 'software',
    published: true,
    featured: true,
  },
];
