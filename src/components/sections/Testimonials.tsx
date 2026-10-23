import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { testimonialsList, TestimonialItem } from '../../data/caseStudies';

export interface TestimonialsProps {
  /** Optional custom array of testimonials. Defaults to the curated testimonialsList */
  testimonials?: TestimonialItem[];
  /** Optional callback to open a related case study modal or navigate */
  onSelectProject?: (slug: string) => void;
  /** Section title override */
  title?: string;
  /** Section kicker/badge label */
  kicker?: string;
  /** Section description or subtitle */
  subtitle?: string;
  /** Whether to render the section header bar. Defaults to true */
  showHeader?: boolean;
  /** Custom wrapper CSS classes */
  className?: string;
}

/**
 * Testimonials Component
 * 
 * Renders client reviews and verified feedback in a balanced, minimal grid layout.
 * Strictly adheres to privacy compliance: client name, role, and company are rendered
 * ONLY when permission is explicitly confirmed (permissionConfirmed === true).
 */
export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = testimonialsList,
  onSelectProject,
  title = 'Verified Feedback & Client Reviews',
  kicker = 'Client Reviews',
  subtitle = 'Direct feedback from client deliverables and studio engineering engagements.',
  showHeader = true,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Determine balanced column layout based on number of items
  const gridColsClass =
    testimonials.length % 3 === 0
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`w-full ${className}`}>
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-[#D8D8D0] gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#181818]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
                {kicker}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#181818]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#181818]/65 mt-1 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#A5A59B] shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C6F36B]" />
            <span>Verified engagements only</span>
          </div>
        </div>
      )}

      {/* Balanced Grid of Testimonial Cards */}
      <div className={`grid ${gridColsClass} gap-6 lg:gap-8`}>
        {testimonials.map((item: TestimonialItem, idx: number) => {
          const isPermissionConfirmed = Boolean(item.permissionConfirmed);

          return (
            <motion.div
              key={item.id || idx}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D8D0] flex flex-col justify-between hover:border-[#181818]/40 hover:shadow-xs transition-all relative group"
            >
              <div>
                {/* Top Row: Quote Accent & Scope Meta */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F2EE] border border-[#D8D8D0] flex items-center justify-center text-[#181818] group-hover:bg-[#181818] group-hover:text-[#C6F36B] transition-colors">
                      <Quote className="w-4 h-4" />
                    </div>
                    {item.engagementType && (
                      <span className="text-[11px] font-mono text-[#181818]/80 px-2.5 py-1 rounded bg-[#F3F2EE] border border-[#D8D8D0] truncate max-w-[190px] sm:max-w-none">
                        {item.engagementType}
                      </span>
                    )}
                  </div>

                  {/* Verification Pill */}
                  {isPermissionConfirmed ? (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded shrink-0"
                      title="Client attribution permission verified"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#181818]/70 bg-[#F3F2EE] border border-[#D8D8D0] px-2 py-0.5 rounded shrink-0"
                      title="Client name and company kept confidential upon request"
                    >
                      <Shield className="w-3 h-3 text-[#A5A59B]" />
                      <span>Confidential</span>
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <blockquote className="text-sm sm:text-base text-[#181818]/90 leading-relaxed font-normal mb-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Attribution Footer: Strictly conditional on confirmed permission */}
              <div className="pt-5 border-t border-[#F3F2EE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  {isPermissionConfirmed ? (
                    /* Permission confirmed: Render client name, role, and company */
                    <div>
                      <div className="font-bold text-sm text-[#181818] flex items-center gap-1.5">
                        <span className="truncate">{item.clientName}</span>
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                          aria-label="Verified identity"
                        />
                      </div>
                      <div className="text-xs text-[#A5A59B] mt-0.5 truncate">
                        {item.role} ·{' '}
                        <strong className="text-[#181818]/85 font-medium">
                          {item.company}
                        </strong>
                      </div>
                    </div>
                  ) : (
                    /* Permission NOT confirmed: Name, role, and company are strictly withheld */
                    <div>
                      <div className="font-bold text-sm text-[#181818] flex items-center gap-1.5">
                        <span>Verified Client</span>
                        <Shield
                          className="w-3.5 h-3.5 text-[#A5A59B] shrink-0"
                          aria-label="Confidential partner"
                        />
                      </div>
                      <div className="text-xs text-[#A5A59B] mt-0.5 italic">
                        Name &amp; company confidential upon NDA request
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Link to Case Study */}
                {item.projectSlug && onSelectProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(item.projectSlug!)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#181818] hover:text-black hover:underline underline-offset-4 cursor-pointer whitespace-nowrap self-start sm:self-auto py-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
