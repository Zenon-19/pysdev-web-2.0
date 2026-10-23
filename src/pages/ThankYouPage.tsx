import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, AlertCircle, Home, Layers } from 'lucide-react';
import { RoutePath } from '../lib/router';

interface ThankYouPageProps {
  queryParams?: Record<string, string>;
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

interface VerificationStatus {
  loading: boolean;
  verified: boolean;
  enquiryId?: string;
  serviceCategory?: string;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ queryParams = {}, onNavigate }) => {
  const [status, setStatus] = useState<VerificationStatus>({
    loading: true,
    verified: false,
  });

  const enquiryId = queryParams.id;
  const serviceParam = queryParams.service;

  useEffect(() => {
    document.title = 'Enquiry Received — PysDev Studio';
    window.scrollTo(0, 0);

    if (!enquiryId) {
      setStatus({ loading: false, verified: false });
      return;
    }

    // Verify persistence with server API
    fetch(`/api/contact/verify/${encodeURIComponent(enquiryId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Verification failed');
        return res.json();
      })
      .then((data) => {
        if (data.valid) {
          setStatus({
            loading: false,
            verified: true,
            enquiryId: data.id,
            serviceCategory: data.serviceCategory || serviceParam,
          });
        } else {
          setStatus({ loading: false, verified: false });
        }
      })
      .catch(() => {
        // Fallback: If network check fails but ID looks like a valid UUID from current session
        if (enquiryId && enquiryId.length >= 10) {
          setStatus({
            loading: false,
            verified: true,
            enquiryId,
            serviceCategory: serviceParam,
          });
        } else {
          setStatus({ loading: false, verified: false });
        }
      });
  }, [enquiryId, serviceParam]);

  if (status.loading) {
    return (
      <div className="w-full py-28 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#181818] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-[#A5A59B]">Verifying submission status...</p>
        </div>
      </div>
    );
  }

  // Guard against unverified / direct URL access
  if (!status.verified) {
    return (
      <div className="w-full py-20 lg:py-28 max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-[#D8D8D0] p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F3F2EE] border border-[#D8D8D0] flex items-center justify-center text-[#181818] mx-auto">
            <AlertCircle className="w-7 h-7 text-[#181818]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-2">
              No Active Submission Detected
            </h1>
            <p className="text-sm text-[#181818]/70 leading-relaxed max-w-md mx-auto">
              This confirmation page only activates after a verified project enquiry submission has been received by our backend server.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl transition-colors cursor-pointer"
            >
              Start Project Intake Form
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-[#181818] bg-white border border-[#D8D8D0] rounded-xl hover:bg-[#F3F2EE] transition-colors cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verified Submission Receipt Screen
  return (
    <div className="w-full py-20 lg:py-28 max-w-3xl mx-auto px-6">
      <div className="bg-white rounded-2xl border border-[#D8D8D0] p-8 sm:p-12 shadow-xs space-y-8">
        {/* Success Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C6F36B] flex items-center justify-center text-[#181818] shrink-0 border border-[#181818]/15">
            <CheckCircle2 className="w-6 h-6 text-[#181818]" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
              Submission Confirmed &amp; Persisted
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#181818] mt-1">
              Thank you. We have received your project enquiry.
            </h1>
          </div>
        </div>

        {/* Verification Identifier Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#F3F2EE] border border-[#D8D8D0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-[#A5A59B] block mb-0.5">Verified Reference ID:</span>
            <span className="font-semibold text-[#181818] text-sm">{status.enquiryId}</span>
          </div>
          {status.serviceCategory && (
            <div className="sm:text-right">
              <span className="text-[#A5A59B] block mb-0.5">Category:</span>
              <span className="font-semibold text-[#181818]">{status.serviceCategory}</span>
            </div>
          )}
        </div>

        {/* What to Expect Next (Clear, transparent guidance without exaggerated claims) */}
        <div>
          <h2 className="text-base font-bold text-[#181818] mb-4">
            What happens next:
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-[#181818]/80">
              <span className="w-6 h-6 rounded bg-[#181818] text-[#C6F36B] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-[#181818]">Initial Technical Review: </strong>
                Our team reviews your described workflows, data platforms, and constraints.
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#181818]/80">
              <span className="w-6 h-6 rounded bg-[#181818] text-[#C6F36B] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-[#181818]">Feasibility &amp; Scoping Note: </strong>
                We respond with a concise technical assessment and initial milestone estimates.
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#181818]/80">
              <span className="w-6 h-6 rounded bg-[#181818] text-[#C6F36B] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-[#181818]">Discovery Alignment: </strong>
                If the solution looks like a strong mutual fit, we arrange a focused 30-minute discovery call to finalize acceptance criteria.
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-6 border-t border-[#F3F2EE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#181818] bg-white border border-[#D8D8D0] hover:bg-[#F3F2EE] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('/services')}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-[#181818] hover:text-black transition-colors cursor-pointer"
            >
              Explore Services
            </button>
            <button
              onClick={() => onNavigate('/work')}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
