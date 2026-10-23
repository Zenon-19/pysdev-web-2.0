export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  deliveryFlow: {
    step: string;
    title: string;
    description: string;
  }[];
  useCases: string[];
  deliverables: string[];
  goodFitCriteria: string[];
  technicalStackSummary: string;
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'automation',
    slug: 'automation',
    name: 'AI & Workflow Automation',
    shortDescription:
      'Automate lead capture, follow-ups, CRM updates, scheduling, notifications, and recurring operational reporting.',
    longDescription:
      'Eliminate repetitive manual tasks by turning disjointed business apps into interconnected, autonomous workflows. We map your current manual process, engineer reliable multi-system integrations with retry logic and human fallback, and deploy monitored pipelines that work around the clock.',
    deliveryFlow: [
      { step: '01', title: 'Map Process', description: 'Deconstruct inputs, bottlenecks, and success criteria for each manual touchpoint.' },
      { step: '02', title: 'Connect Systems', description: 'Wire webhooks and authenticated APIs across CRMs, messaging, databases, and forms.' },
      { step: '03', title: 'Validate Logic', description: 'Simulate high-volume edge cases, bad payload handling, and human approval paths.' },
      { step: '04', title: 'Deploy & Test', description: 'Release into live operations with zero downtime and verified data integrity.' },
      { step: '05', title: 'Monitor & Refine', description: 'Track throughput, execution latencies, and failure notifications with ongoing alerts.' },
    ],
    useCases: [
      'Multi-channel inbound lead intake, data enrichment, and CRM staging',
      'Automated calendar scheduling, confirmation sequences, and reminder sync',
      'Cross-tool real-time synchronization between HubSpot, Slack, Stripe, and Notion',
      'Client onboarding automation: contracts, workspace provisioning, and welcome packets',
      'End-of-week automated performance reporting and data reconciliation',
    ],
    deliverables: [
      'Production-tested webhook pipelines with exponential backoff & retry mechanics',
      'Secure credential vaulting and API token management',
      'Real-time Slack or email anomaly alerts for unhandled exceptions',
      'Comprehensive workflow schema architecture and operational handoff guide',
    ],
    goodFitCriteria: [
      'Your team spends 5+ hours per week manually transferring data between software tools.',
      'Inbound leads wait hours before being qualified, enriched, or contacted.',
      'Manual human data entry creates missed follow-ups or corrupted records.',
      'You use modern cloud apps (HubSpot, Slack, Airtable, Notion, Stripe) that have open APIs.',
    ],
    technicalStackSummary: 'Webhooks, Node.js, Python, PostgreSQL, Make, n8n, Cloud Run, REST/GraphQL APIs',
  },
  {
    id: 'agents',
    slug: 'agents',
    name: 'AI Agents & Assistants',
    shortDescription:
      'Build task-focused AI assistants for lead qualification, customer support, knowledge search, and document workflows.',
    longDescription:
      'Move beyond naive chat widgets to purpose-built, deterministic AI agents grounded in your approved documentation and business rules. Each assistant operates within strict safety guardrails, queries your private knowledge securely, and knows exactly when to escalate to human operators.',
    deliveryFlow: [
      { step: '01', title: 'Define Task', description: 'Identify precise scope, inputs, expected outputs, and acceptable autonomy boundaries.' },
      { step: '02', title: 'Connect Approved Data', description: 'Index validated product specs, guidelines, policies, and API schemas.' },
      { step: '03', title: 'Set Guardrails', description: 'Establish schema validation, boundary filters, and human-in-the-loop review thresholds.' },
      { step: '04', title: 'Test Benchmarks', description: 'Run red-team evaluation suites against hallucination risks and edge inquiries.' },
      { step: '05', title: 'Deploy Safely', description: 'Integrate directly into your customer channels, internal Slack, or web portal.' },
    ],
    useCases: [
      'Tier-1 inbound sales qualification and pre-meeting context gathering',
      'Internal knowledge base retrieval across proprietary manuals and documentation',
      'Intelligent PDF invoice, contract, and RFP data extraction to structured JSON',
      'Customer support answer drafting for human agent verification before dispatch',
      'Automated meeting transcript extraction and task assignment distribution',
    ],
    deliverables: [
      'Custom LLM orchestration pipelines with structured schema output enforcement',
      'Vector database embedding index with hybrid keyword & semantic search',
      'Human-in-the-loop fallback workflow for low-confidence queries',
      'Comprehensive benchmark evaluation test suite and cost-per-query audit',
    ],
    goodFitCriteria: [
      'Senior team members spend hours answering the same internal or external questions.',
      'Critical company knowledge is scattered across static docs, drive folders, and Slack threads.',
      'You need to process unstandardized documents into structured database fields reliably.',
      'You need deterministic, reliable outputs rather than unpredictable creative chatbots.',
    ],
    technicalStackSummary: 'Modern LLM APIs, Vector Search (pgvector/Pinecone), TypeScript, Python, RAG pipelines',
  },
  {
    id: 'software',
    slug: 'software',
    name: 'Custom Software & Integrations',
    shortDescription:
      'Develop client portals, internal dashboards, APIs, SaaS MVPs, and integrations between existing tools.',
    longDescription:
      'When off-the-shelf software forces compromise or spreadsheets buckle under operational weight, we engineer tailored web applications. From founder MVPs to private client portals and bespoke internal dashboards, we build clean, maintainable software with complete IP ownership.',
    deliveryFlow: [
      { step: '01', title: 'Discover & Scope', description: 'Clarify user journeys, data architecture, security specs, and technical constraints.' },
      { step: '02', title: 'System Architecture', description: 'Produce wireframes, component design tokens, and relational database schemas.' },
      { step: '03', title: 'Full-Stack Build', description: 'Develop typed frontend and robust backend APIs with continuous staging deployments.' },
      { step: '04', title: 'Rigorous QA', description: 'Perform cross-device testing, keyboard navigation checks, and load verification.' },
      { step: '05', title: 'Launch & Handoff', description: 'Production deployment with full source code ownership, documentation, and handover.' },
    ],
    useCases: [
      'Bespoke client portals with authenticated document access and milestone tracking',
      'Operational dashboards replacing brittle multi-tab spreadsheets',
      'Zero-to-one SaaS MVPs built for startup founders testing market traction',
      'Custom API middleware bridging legacy on-premise systems to modern web applications',
      'Internal workflow tools with custom role-based permission tiers',
    ],
    deliverables: [
      'Modern responsive web application built with React, TypeScript, and Tailwind CSS',
      'Robust backend APIs, database migrations, and schema validation',
      'Secure authentication and granular role-based access controls',
      'Full source code repository, deployment pipelines, and technical documentation',
    ],
    goodFitCriteria: [
      'Off-the-shelf tools require excessive workarounds or monthly seat licenses that do not scale.',
      'Complex business logic cannot be handled reliably inside spreadsheet formulas.',
      'You are a founder seeking a tested, production-grade MVP without technical debt.',
      'You require full ownership of your code, database, and infrastructure.',
    ],
    technicalStackSummary: 'React, Next.js, Node.js, Express, TypeScript, PostgreSQL, Tailwind CSS, REST/GraphQL',
  },
];
