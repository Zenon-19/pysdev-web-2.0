import React, { useEffect } from 'react';
import { RoutePath } from '../lib/router';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Privacy Policy — PysDev Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full py-16 lg:py-24 max-w-4xl mx-auto px-6 lg:px-8">
      {/* Back link */}
      <button
        onClick={() => onNavigate('/')}
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#181818]/70 hover:text-[#181818] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Studio Homepage</span>
      </button>

      {/* Header */}
      <div className="mb-12 border-b border-[#D8D8D0] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181818]/5 border border-[#181818]/10 text-xs font-mono text-[#181818] mb-4">
          <Shield className="w-3.5 h-3.5 text-[#181818]" />
          <span>Data Governance &amp; Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818]">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-[#A5A59B] mt-2">
          Effective Date: October 2026 · Version 1.0
        </p>
      </div>

      {/* Legal & Policy Prose */}
      <div className="space-y-10 text-sm sm:text-base text-[#181818]/85 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            1. Overview &amp; Commitment
          </h2>
          <p>
            PysDev Studio (&ldquo;PysDev&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this marketing and project intake website. We respect your privacy and are committed to handling business enquiries responsibly, with purpose limitation and strict data minimization principles consistent with applicable regulations, including India&rsquo;s Digital Personal Data Protection (DPDP) Act 2023.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            2. Information We Collect
          </h2>
          <p className="mb-3">
            We collect only the information you voluntarily provide when submitting an enquiry through our multi-step intake form:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#181818]/80">
            <li>
              <strong>Contact Details:</strong> Your full name, business/work email address, optional company name, and optional company website URL.
            </li>
            <li>
              <strong>Project Specifications:</strong> Selected service category, description of the business process or problem to solve, current software tools in use, and desired outcomes.
            </li>
            <li>
              <strong>Scope &amp; Budget Estimates:</strong> General budget tier, desired project timeline, engagement preference (one-time build or monthly managed service), and technical notes.
            </li>
            <li>
              <strong>Technical Telemetry:</strong> Anonymized server logs, masked IP addresses for rate limiting and spam defense, and timestamp records. We do not track keystrokes or transmit form contents to marketing data brokers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            3. Purpose of Processing
          </h2>
          <p>We process the submitted information strictly for the following operational purposes:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#181818]/80 mt-2">
            <li>Evaluating technical feasibility, architecture requirements, and milestone estimates for your proposed project.</li>
            <li>Directly communicating with you via email to deliver an initial technical response and scoping note.</li>
            <li>Preventing automated bot spam, denial-of-service, and fraudulent submissions on our website endpoints.</li>
          </ul>
          <p className="mt-3">
            We will never sell, rent, or trade your personal information to third-party advertisers or data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            4. Service Providers &amp; Infrastructure
          </h2>
          <p>
            To deliver this website and receive enquiries reliably, we use reputable cloud infrastructure providers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#181818]/80 mt-2">
            <li>
              <strong>Hosting &amp; Edge Infrastructure:</strong> Vercel or Google Cloud Platform (for server compute, content delivery, and SSL encryption).
            </li>
            <li>
              <strong>Data Storage:</strong> Encrypted persistent server storage and managed PostgreSQL database instances.
            </li>
            <li>
              <strong>Transactional Email:</strong> Resend or equivalent transactional mail services (solely for routing inbound notifications to our engineering team).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            5. Data Retention &amp; Security Safeguards
          </h2>
          <p>
            We retain enquiry records for as long as necessary to conduct project discovery and fulfill business communications. If an enquiry does not result in an active engagement, we periodically purge obsolete records or archive them with restricted access.
          </p>
          <p className="mt-2">
            All data in transit is protected using industry-standard Transport Layer Security (TLS/HTTPS). Server endpoints implement payload size restrictions, honeypot filters, and rate-limiting safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#181818] mb-3">
            6. Your Rights
          </h2>
          <p>
            You have the right to request access to the personal data we hold about you, request corrections to inaccurate records, or request complete erasure of your submitted information.
          </p>
          <p className="mt-2">
            To exercise any of these rights, simply email our team at{' '}
            <a href="mailto:privacy@pysdev.studio" className="font-semibold underline text-[#181818]">
              privacy@pysdev.studio
            </a>{' '}
            or{' '}
            <a href="mailto:hello@pysdev.studio" className="font-semibold underline text-[#181818]">
              hello@pysdev.studio
            </a>
            . We will process your request promptly within 30 days without cost.
          </p>
        </section>

        <section className="pt-6 border-t border-[#D8D8D0]">
          <h2 className="text-xl font-bold text-[#181818] mb-2">
            7. Contact Information
          </h2>
          <p className="text-sm text-[#181818]/80">
            For questions or concerns regarding this privacy notice or data protection practices, please contact:
          </p>
          <div className="mt-3 p-4 rounded-xl bg-white border border-[#D8D8D0] text-xs font-mono space-y-1">
            <div>PysDev Studio — Engineering &amp; Operations</div>
            <div>Email: hello@pysdev.studio / privacy@pysdev.studio</div>
            <div>Jurisdiction: New Delhi, India</div>
          </div>
        </section>
      </div>
    </div>
  );
};
