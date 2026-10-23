import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, CheckCircle2 } from 'lucide-react';
import { caseStudiesData, CaseStudyItem } from '../../data/caseStudies';
import { ClientShowcaseLogos } from './ClientShowcaseLogos';
import { TestimonialsGrid } from './TestimonialsGrid';
import { CaseStudyDetailModal } from '../projects/CaseStudyDetailModal';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface ClientsCaseStudiesPanelProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const ClientsCaseStudiesPanel: React.FC<ClientsCaseStudiesPanelProps> = ({ onNavigate }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenCaseStudy = (slug: string) => {
    const found = caseStudiesData.find((item) => item.slug === slug);
    if (found) {
      trackEvent('project_card_clicked', { projectSlug: slug, source: 'clients_panel' });
      setSelectedCaseStudy(found);
    }
  };

  const handleCloseModal = () => {
    setSelectedCaseStudy(null);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F3F2EE] border-b border-[#181818]/10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20 lg:space-y-24">
        {/* Section Heading & Positioning Copy */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
              Case Studies &amp; Client Collaborations
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818] leading-tight">
              Built with businesses. Proven through work.
            </h2>
            <p className="text-base sm:text-lg text-[#181818]/75 leading-relaxed mt-4">
              We partner with businesses to build practical software, automate repetitive operations and create digital experiences that solve real problems.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('hero_cta_clicked', { location: 'clients_panel_explore' });
              onNavigate('/work');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#181818] hover:text-black group self-start md:self-auto cursor-pointer pb-1 border-b border-[#181818] whitespace-nowrap"
          >
            <span>Explore our work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* 1. Client Showcase Panel (Horizontal row / grid of client logos/names) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <ClientShowcaseLogos onSelectProject={handleOpenCaseStudy} />
        </motion.div>

        {/* 2. What We Built / Case Study Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
              Featured Client Implementations &amp; Studio Demos
            </span>
            <span className="text-xs font-mono text-[#A5A59B]">
              Detailed breakdown
            </span>
          </div>

          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {caseStudiesData.map((study: CaseStudyItem) => (
              <motion.div
                key={study.id}
                variants={shouldReduceMotion ? undefined : itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="bg-white rounded-2xl border border-[#D8D8D0] overflow-hidden flex flex-col justify-between hover:border-[#181818]/50 hover:shadow-sm transition-colors duration-200"
              >
                <div>
                  {/* Visual Preview */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#F3F2EE]">
                    <img
                      src={study.coverImage}
                      alt={study.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    />
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-[#181818]/90 text-white border border-[#181818] text-[11px]">
                        {study.industry}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                          study.isClientWork
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-[#C6F36B]/90 text-[#181818] border border-[#181818]/20'
                        }`}
                      >
                        {study.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Structure */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="text-xs font-mono text-[#A5A59B] mb-1">
                        {study.clientName}
                      </div>
                      <h3 className="text-xl font-bold text-[#181818]">
                        {study.title}
                      </h3>
                    </div>

                    {/* Challenge */}
                    <div className="text-xs text-[#181818]/75 leading-relaxed pt-2 border-t border-[#F3F2EE]">
                      <strong className="text-[#181818] block font-semibold mb-0.5">
                        The Challenge:
                      </strong>
                      <p className="line-clamp-2">{study.challenge}</p>
                    </div>

                    {/* Our Solution */}
                    <div className="text-xs text-[#181818]/75 leading-relaxed">
                      <strong className="text-[#181818] block font-semibold mb-0.5">
                        Our Solution:
                      </strong>
                      <p className="line-clamp-2">{study.solution}</p>
                    </div>

                    {/* What We Delivered */}
                    <div className="text-xs text-[#181818]/75 leading-relaxed">
                      <strong className="text-[#181818] block font-semibold mb-1">
                        What We Delivered:
                      </strong>
                      <ul className="space-y-1">
                        {study.deliverables.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#181818]/85">
                            <Check className="w-3.5 h-3.5 text-[#181818] shrink-0 mt-0.5" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Verified Outcomes */}
                    <div className="p-3 rounded-xl bg-[#F3F2EE]/70 border border-[#D8D8D0]/60 text-xs text-[#181818]">
                      <span className="font-semibold text-[11px] font-mono uppercase text-[#A5A59B] block mb-1">
                        Verified Outcome:
                      </span>
                      <p className="text-[11px] leading-normal font-medium text-[#181818]">
                        {study.outcomes[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-6 pb-6 pt-2 border-t border-[#F3F2EE] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A5A59B]">
                    Full Architecture View
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenCaseStudy(study.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181818] hover:text-black py-1.5 px-3 rounded-lg bg-[#F3F2EE] hover:bg-[#C6F36B] transition-colors cursor-pointer"
                  >
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3. Client Reviews & Testimonials Grid */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <TestimonialsGrid onSelectProject={handleOpenCaseStudy} />
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        onClose={handleCloseModal}
        onNavigate={onNavigate}
      />
    </section>
  );
};
