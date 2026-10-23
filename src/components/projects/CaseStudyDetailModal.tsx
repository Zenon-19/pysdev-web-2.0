import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CaseStudyItem } from '../../data/caseStudies';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Layers, Cpu, Quote, ArrowRight } from 'lucide-react';
import { RoutePath } from '../../lib/router';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudyItem | null;
  onClose: () => void;
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  onClose,
  onNavigate,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && caseStudy) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [caseStudy]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-white text-[#181818] border border-[#D8D8D0] rounded-2xl max-w-4xl w-full my-auto max-h-[92vh] overflow-y-auto shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-[#181818] hover:bg-[#F3F2EE] border border-[#D8D8D0] shadow-sm cursor-pointer transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 1. Header Media Banner */}
          <div className="relative aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-[#181818]">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#C6F36B] text-[#181818] font-bold">
                  {caseStudy.status}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 text-white/90 border border-white/20 backdrop-blur-xs">
                  {caseStudy.industry}
                </span>
              </div>
              <h2 id="case-study-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          {/* Case Study Content Body */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Summary & Client Details */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-8 border-b border-[#D8D8D0] gap-6">
              <div className="max-w-xl">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                  Executive Summary
                </h3>
                <p className="text-base sm:text-lg text-[#181818]/85 leading-relaxed font-normal">
                  {caseStudy.summary}
                </p>
              </div>
              <div className="sm:border-l sm:border-[#D8D8D0] sm:pl-6 space-y-3 min-w-[200px] text-xs font-mono">
                <div>
                  <span className="text-[#A5A59B] block">Client / Entity:</span>
                  <span className="font-semibold text-[#181818]">{caseStudy.clientName}</span>
                </div>
                <div>
                  <span className="text-[#A5A59B] block">Project Domain:</span>
                  <span className="font-semibold text-[#181818]">{caseStudy.projectType}</span>
                </div>
                <div>
                  <span className="text-[#A5A59B] block">Related Service:</span>
                  <span className="font-semibold text-[#181818]">{caseStudy.relatedService}</span>
                </div>
              </div>
            </div>

            {/* 4. The Challenge & 5. Goals & Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-[#F3F2EE]/50 border border-[#D8D8D0]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#181818] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#181818]" />
                  <span>The Challenge</span>
                </h3>
                <p className="text-sm text-[#181818]/80 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F3F2EE]/50 border border-[#D8D8D0]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#181818] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B] border border-[#181818]" />
                  <span>Goals &amp; Constraints</span>
                </h3>
                <ul className="space-y-2">
                  {caseStudy.goalsAndConstraints.map((goal, i) => (
                    <li key={i} className="text-xs text-[#181818]/80 flex items-start gap-2">
                      <span className="text-[#181818] font-mono">→</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Our Approach & 7. Solution Architecture */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                  Our Engineering Approach
                </h3>
                <p className="text-sm sm:text-base text-[#181818]/85 leading-relaxed">
                  {caseStudy.approach}
                </p>
              </div>

              {/* Solution Architecture Diagram / Steps */}
              <div className="bg-[#181818] text-white rounded-2xl p-6 sm:p-8 border border-[#181818]">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-[#C6F36B] tracking-wider">
                    Solution Architecture Pipeline
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    Phase Breakdown
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseStudy.architectureSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C6F36B] font-bold">
                          {step.step}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {step.label}
                      </h4>
                      <p className="text-xs text-white/70 leading-normal">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8. Deliverables & 10. Verified Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-3">
                  What We Delivered
                </h3>
                <ul className="space-y-2.5">
                  {caseStudy.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#181818]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#181818] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-3">
                  Verified Outcomes &amp; Impact
                </h3>
                <ul className="space-y-2.5">
                  {caseStudy.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#181818]/85">
                      <span className="w-4 h-4 rounded-full bg-[#C6F36B] text-[#181818] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 9. Technologies Used */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2.5">
                Technologies &amp; Integrations
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#F3F2EE] border border-[#D8D8D0] text-xs font-mono text-[#181818]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 11. Client Testimonial (if available) */}
            {caseStudy.testimonial && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F3F2EE] border border-[#D8D8D0] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#181818]/60">
                  <Quote className="w-4 h-4 text-[#181818]" />
                  <span>Client Feedback</span>
                </div>
                <blockquote className="text-sm sm:text-base text-[#181818] leading-relaxed italic">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="pt-2 text-xs font-mono text-[#181818]/70">
                  — <strong className="text-[#181818] font-semibold">{caseStudy.testimonial.clientName}</strong>, {caseStudy.testimonial.role} at {caseStudy.testimonial.company}
                </div>
              </div>
            )}

            {/* 13. Case Study Footer CTA */}
            <div className="pt-8 border-t border-[#D8D8D0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] block mb-1">
                  Ready to solve a similar challenge?
                </span>
                <p className="text-sm font-bold text-[#181818]">
                  Have a similar project? Let&rsquo;s talk.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('/contact', { service: caseStudy.relatedService });
                  }}
                  className="px-6 py-3 bg-[#C6F36B] hover:bg-[#b8ee52] text-[#181818] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:translate-y-[1px]"
                >
                  <span>Scope Similar Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 text-xs text-[#181818]/70 hover:text-[#181818] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
