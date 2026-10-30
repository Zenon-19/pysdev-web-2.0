export interface FAQItem {
  id: string;
  category: 'AI & Automation' | 'Custom Software' | 'Process & Ownership' | 'Security';
  question: string;
  answer: string;
  highlight?: string;
}

export const faqsData: FAQItem[] = [
  {
    id: 'ai-guardrails',
    category: 'AI & Automation',
    question: 'How do you ensure AI workflows and agents do not hallucinate or make errors?',
    answer:
      'We practice deterministic engineering: AI models are never given unconstrained authority. Every assistant or extraction pipeline operates with strict JSON schemas, grounded retrieval over verified company knowledge, policy guardrails, and automated validation gates. If confidence falls below pre-set thresholds, the system flags the task for human-in-the-loop approval rather than guessing.',
    highlight: 'Deterministic JSON schemas & human fallback gates',
  },
  {
    id: 'ip-ownership',
    category: 'Process & Ownership',
    question: 'Who owns the code, intellectual property, and data after delivery?',
    answer:
      'You retain 100% complete ownership of all source code, architectural documentation, schemas, and credentials. We transfer full Git repository access and deployment configurations upon milestone sign-off. We never impose recurring agency software retainers, vendor lock-in, or proprietary platform dependencies.',
    highlight: '100% client IP transfer with zero vendor lock-in',
  },
  {
    id: 'tech-stack-integrations',
    category: 'Custom Software',
    question: 'Can you integrate with our existing software tools and internal databases?',
    answer:
      'Yes. We specialize in connecting disjointed software ecosystems. Whether your team relies on established platforms like HubSpot, Stripe, Slack, Airtable, and Notion, or proprietary relational databases (PostgreSQL, MySQL) and custom internal REST/GraphQL APIs, we engineer resilient webhook gateways and synchronization services tailored to your current setup.',
    highlight: 'Seamless connectivity for modern APIs & legacy databases',
  },
  {
    id: 'timeline-and-milestones',
    category: 'Process & Ownership',
    question: 'What is your typical project timeline and engagement structure?',
    answer:
      'Most automation pipelines and focused MVPs are completed within 2 to 6 weeks. Engagements are divided into clear, fixed-price milestones: Process Architecture & Scoping, System Engineering, Staging Validation, and Production Handover. You receive weekly progress walkthroughs and staging links, with guaranteed scope transparency and zero surprise billable hours.',
    highlight: '2–6 week fixed sprints with weekly staging reviews',
  },
  {
    id: 'api-reliability-retries',
    category: 'Security',
    question: 'What happens if a third-party service experiences downtime or an API changes?',
    answer:
      'Our pipelines are architected defensively. We build all integrations with idempotency keys, exponential backoff retries, and dead-letter queue storage so no incoming webhook or transaction payload is ever lost during third-party outages. In the event of persistent errors, automated alerts notify your team channel immediately with structured payload diagnostics.',
    highlight: 'Exponential backoff, dead-letter queues & automated Slack alerts',
  },
  {
    id: 'project-kickoff',
    category: 'Process & Ownership',
    question: 'How do we get started, and what is needed from our team to scope a project?',
    answer:
      'Getting started is straightforward. Submit our interactive 3-step project scoping form or email hello@pysdev.studio outlining the manual bottleneck or software goal. We respond within 1 business day with a preliminary architectural evaluation, feasibility assessment, and an honest fixed-cost estimate.',
    highlight: '1-day turnaround with preliminary architecture assessment',
  },
];
