import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, HelpCircle, Sparkles } from 'lucide-react';
import { faqsData, FAQItem } from '../../data/faqs';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface FAQSectionProps {
  onNavigate?: (path: RoutePath, queryParams?: Record<string, string>) => void;
  className?: string;
}

const CATEGORIES = ['All', 'AI & Automation', 'Custom Software', 'Process & Ownership', 'Security'] as const;
type CategoryFilter = typeof CATEGORIES[number];

export const FAQSection: React.FC<FAQSectionProps> = ({ onNavigate, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  // Store expanded FAQ item IDs (defaulting to the first item open)
  const [expandedIds, setExpandedIds] = useState<string[]>(['ai-guardrails']);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    const allFilteredIds = filteredFaqs.map((faq) => faq.id);
    setExpandedIds(allFilteredIds);
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  const filteredFaqs = faqsData.filter(
    (faq) => selectedCategory === 'All' || faq.category === selectedCategory
  );

  return (
    <section className={`py-24 lg:py-32 bg-[#F3F2EE] border-b border-[#181818]/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#181818]" />
              <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60">
                Frequently Asked Questions
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818] leading-tight">
              Answers to common technical &amp; project questions.
            </h2>
            <p className="text-base sm:text-lg text-[#181818]/75 leading-relaxed mt-4">
              Transparent details on how we scope projects, enforce deterministic AI safety guardrails, protect your data, and deliver complete IP ownership.
            </p>
          </div>

          {/* Quick Stats / Scope Note */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#181818]/60 bg-white border border-[#D8D8D0] px-3.5 py-2 rounded-xl shrink-0 self-start md:self-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
            <span>Direct engineering answers · No sales fluff</span>
          </div>
        </motion.div>

        {/* Filter Bar & Expand/Collapse Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D8D8D0]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#181818] text-white font-medium shadow-2xs'
                      : 'bg-white/80 hover:bg-white text-[#181818]/70 hover:text-[#181818] border border-[#D8D8D0]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Global Actions */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#181818]/60 shrink-0">
            <button
              type="button"
              onClick={handleExpandAll}
              className="hover:text-[#181818] underline underline-offset-4 cursor-pointer"
            >
              Expand all
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="hover:text-[#181818] underline underline-offset-4 cursor-pointer"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Collapsible Accordion Grid / Stack */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq: FAQItem, index: number) => {
            const isExpanded = expandedIds.includes(faq.id);
            const buttonId = `faq-trigger-${faq.id}`;
            const contentId = `faq-content-${faq.id}`;

            return (
              <motion.div
                key={faq.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className={`rounded-2xl transition-all border ${
                  isExpanded
                    ? 'bg-white border-[#181818] shadow-xs'
                    : 'bg-white/80 hover:bg-white border-[#D8D8D0]'
                }`}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-5 sm:py-6 px-6 sm:px-8 flex items-start justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#181818] rounded-2xl group"
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono text-[#A5A59B] uppercase tracking-wider">
                        0{index + 1} · {faq.category}
                      </span>
                      {faq.highlight && isExpanded && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#C6F36B]/40 text-[#181818]">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Key Metric</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#181818] leading-snug group-hover:text-black transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                      isExpanded
                        ? 'bg-[#181818] text-[#C6F36B] border-[#181818]'
                        : 'bg-[#F3F2EE] text-[#181818] border-[#D8D8D0] group-hover:border-[#181818]/40'
                    }`}
                  >
                    {isExpanded ? (
                      <Minus className="w-4 h-4 transition-transform duration-200" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.15 : 0.28,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 border-t border-[#F3F2EE]">
                        <p className="text-sm sm:text-base text-[#181818]/80 leading-relaxed font-normal">
                          {faq.answer}
                        </p>

                        {faq.highlight && (
                          <div className="mt-4 pt-3 border-t border-[#F3F2EE] flex items-center gap-2 text-xs font-mono text-[#181818]/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#181818]" />
                            <strong className="text-[#181818] font-medium">Standard Delivery:</strong>
                            <span className="text-[#181818]/85">{faq.highlight}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Section Footer / Inquiries Prompt */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#D8D8D0] flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xs"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#D8D8D0] flex items-center justify-center text-[#181818] shrink-0">
              <HelpCircle className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#181818]">
                Have a unique system or unlisted question?
              </h4>
              <p className="text-xs sm:text-sm text-[#181818]/70 mt-1">
                Share your current manual bottleneck or software scope. We will provide direct technical guidance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('hero_cta_clicked', { location: 'faq_footer_prompt' });
              if (onNavigate) {
                onNavigate('/contact');
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181818] text-[#C6F36B] hover:bg-black font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
          >
            <span>Ask an Engineer</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
