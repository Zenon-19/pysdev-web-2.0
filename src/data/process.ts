export interface ProcessStage {
  number: string;
  id: string;
  title: string;
  objective: string;
  activities: string[];
  clientInvolvement: string;
  expectedDeliverables: string[];
  whatHappensNext: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const processStages: ProcessStage[] = [
  {
    number: '01',
    id: 'discover',
    title: 'Discover',
    objective: 'Gain an exact understanding of the business problem, current bottlenecks, tool ecosystems, and clear criteria for success.',
    activities: [
      'Deconstruct the current manual workflow or feature requirements step-by-step',
      'Audit existing software stack, API capabilities, and data structures',
      'Identify critical edge cases, data security boundaries, and volume expectations',
      'Establish quantifiable success metrics and project boundaries',
    ],
    clientInvolvement:
      'A focused 45-to-60 minute discovery session, sharing sample payloads or process walkthroughs, and clarifying team responsibilities.',
    expectedDeliverables: [
      'Crisp problem statement document',
      'Integration architecture inventory',
      'Initial technical scope and feasibility assessment',
    ],
    whatHappensNext:
      'We translate these findings into a detailed architectural blueprint, fixed timeline, and transparent investment proposal for your review.',
  },
  {
    number: '02',
    id: 'design',
    title: 'Design',
    objective: 'Architect the complete system flow, user experience, data models, integration contracts, and error-handling boundaries before writing code.',
    activities: [
      'Map end-to-end data flow diagrams and event-driven trigger architectures',
      'Design clean, accessible UI wireframes and interactive component states',
      'Define API schemas, payload validation rules, and third-party rate limits',
      'Establish safety guardrails and human review thresholds for AI components',
    ],
    clientInvolvement:
      'Reviewing the proposed solution plan and wireframes, confirming approval of the integration contracts and milestone checkpoints.',
    expectedDeliverables: [
      'Comprehensive solution plan and system architecture specification',
      'Figma/interactive interface mockups (for software projects)',
      'Detailed acceptance criteria checklist',
    ],
    whatHappensNext:
      'With the technical blueprint approved, full-stack implementation starts immediately with no guesswork.',
  },
  {
    number: '03',
    id: 'build',
    title: 'Build',
    objective: 'Implement production-grade code, configure integrations, test failure cases, and build resilience against unexpected real-world data.',
    activities: [
      'Develop modular frontend and backend code with strict TypeScript typing',
      'Wire webhook listeners, credential vaulting, and API integrations with backoff retries',
      'Conduct rigorous testing against malformed inputs, timeout limits, and rate limits',
      'Deploy continuously to an isolated staging environment for ongoing review',
    ],
    clientInvolvement:
      'Asynchronous weekly checkpoint summaries with screen recordings; hands-on user acceptance testing on the staging environment.',
    expectedDeliverables: [
      'Fully functioning, tested staging deployment',
      'End-to-end workflow verification with test transaction logs',
      'Automated error-alerting configuration',
    ],
    whatHappensNext:
      'Once staging testing is signed off, we initiate pre-launch checklist verification and schedule production deployment.',
  },
  {
    number: '04',
    id: 'launch',
    title: 'Launch & Support',
    objective: 'Seamlessly transition the solution into live production, train team members, document operating procedures, and monitor stability.',
    activities: [
      'Execute zero-downtime production deployment and domain/DNS cutover',
      'Verify live end-to-end telemetry and transaction flow in production',
      'Hand over complete documentation, environment variable guides, and runbooks',
      'Provide dedicated launch warranty support and scheduled check-ins',
    ],
    clientInvolvement:
      'Verifying live production operations with your team and providing domain DNS updates or API credentials when needed.',
    expectedDeliverables: [
      'Live production deployment in your own hosting infrastructure or managed setup',
      'Comprehensive operations runbook and architecture documentation',
      'Full repository transfer with complete IP ownership',
      'Agreed post-launch warranty and optional monthly monitoring plan',
    ],
    whatHappensNext:
      'Your systems run reliably. We remain available for ongoing optimization, workflow expansion, or monthly managed retainer support.',
  },
];

export const processFAQs: FAQItem[] = [
  {
    question: 'How are payment milestones structured?',
    answer:
      'Projects are structured with clear, predictable milestone payments tied to tangible outputs: an initial deposit upon project kickoff, a milestone payment upon staging review approval, and the balance upon verified production handover. We do not charge surprise hourly fees for agreed scope.',
  },
  {
    question: 'Who owns the intellectual property and code?',
    answer:
      'You own 100% of the code, intellectual property, workflow configurations, and credentials created for your business upon project completion. There are no proprietary lock-ins or hidden vendor fees.',
  },
  {
    question: 'How do you handle third-party software costs and API usage?',
    answer:
      'Third-party services (such as OpenAI/Anthropic API keys, database hosting, domain registration, or specialized SaaS subscriptions like HubSpot) are paid directly by you under your accounts. This ensures you maintain full direct control over your billing, data privacy, and usage limits.',
  },
  {
    question: 'What happens if we need scope adjustments or changes during a build?',
    answer:
      'We maintain clear, transparent communication. If a new requirement arises during development, we evaluate its impact on timeline and effort immediately, provide a straightforward mini-scope proposal, and let you decide whether to incorporate it now or schedule it for a subsequent phase.',
  },
  {
    question: 'What ongoing maintenance and support options are available?',
    answer:
      'Every project includes a post-launch warranty period to ensure everything operates smoothly. For businesses wanting continuous optimization, schema migrations, and proactive API version updates, we offer monthly managed service retainers.',
  },
  {
    question: 'How much client time is required each week?',
    answer:
      'We respect your schedule. Most projects require approximately 60 to 90 minutes of client time per week, consisting of an initial kickoff, brief asynchronous reviews of staging demos, and final launch verification.',
  },
];
