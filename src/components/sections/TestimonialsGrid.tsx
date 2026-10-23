import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonialsList, TestimonialItem } from '../../data/caseStudies';
import { Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialsGridProps {
  onSelectProject?: (slug: string) => void;
}

export const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({ onSelectProject }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#D8D8D0] gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
          Verified Feedback &amp; Collaboration Notes
        </span>
        <span className="text-[11px] font-mono text-[#A5A59B]">
          Transparent records · No fabricated testimonials
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonialsList.map((item: TestimonialItem, idx: number) => (
          <motion.div
            key={item.id}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D8D0] flex flex-col justify-between hover:border-[#181818]/40 hover:shadow-xs transition-colors"
          >
            <div>
              {/* Top Quote Icon & Engagement Type */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#F3F2EE] border border-[#D8D8D0] flex items-center justify-center text-[#181818]">
                  <Quote className="w-4 h-4 text-[#181818]" />
                </div>
                <span className="text-[11px] font-mono text-[#181818]/70 px-2.5 py-1 rounded bg-[#F3F2EE] border border-[#D8D8D0]">
                  {item.engagementType}
                </span>
              </div>

              {/* Quote Body */}
              <p className="text-sm sm:text-base text-[#181818]/90 leading-relaxed font-normal mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author Attribution */}
            <div className="pt-5 border-t border-[#F3F2EE] flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-[#181818] flex items-center gap-1.5">
                  <span>{item.clientName}</span>
                  {item.permissionConfirmed && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-label="Verified Client" />
                  )}
                </div>
                <div className="text-xs text-[#A5A59B] mt-0.5">
                  {item.role} · <strong className="text-[#181818]/80 font-medium">{item.company}</strong>
                </div>
              </div>

              {item.projectSlug && onSelectProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(item.projectSlug!)}
                  className="text-xs font-semibold text-[#181818] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  View Case Study →
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
