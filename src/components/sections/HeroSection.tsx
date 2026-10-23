import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { WorkflowIllustration } from '../ui/WorkflowIllustration';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface HeroSectionProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleStartProject = () => {
    trackEvent('hero_cta_clicked', { location: 'hero_primary' });
    onNavigate('/contact');
  };

  const handleExploreServices = () => {
    trackEvent('hero_cta_clicked', { location: 'hero_services' });
    onNavigate('/services');
  };

  const transitionSettings = {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Copy (Left Column) */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#181818]/5 border border-[#181818]/10 text-xs font-mono text-[#181818]"
            >
              <span className="w-2 h-2 rounded-full bg-[#C6F36B] border border-[#181818]" />
              <span>PysDev Engineering &amp; AI Automation</span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.22 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] leading-[1.08] text-balance"
            >
              Less manual work. More intelligent systems.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.35 }}
              className="text-base sm:text-lg text-[#181818]/75 leading-relaxed max-w-xl"
            >
              We build AI-powered workflows, task-focused AI assistants, and custom software that help growing businesses connect their tools, reduce repetitive tasks, and move faster.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.45 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                onClick={handleStartProject}
                className="group px-7 py-3.5 text-base font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl border border-[#181818]/15 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                onClick={handleExploreServices}
                className="px-6 py-3.5 text-base font-medium text-[#181818] bg-white hover:bg-[#F3F2EE] border border-[#D8D8D0] hover:border-[#181818]/30 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#181818]/60" />
              </motion.button>
            </motion.div>

            {/* Subtle Credibility Attributes */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.58 }}
              className="pt-6 border-t border-[#181818]/10 grid grid-cols-3 gap-4 text-xs text-[#181818]/70"
            >
              <div>
                <span className="block font-semibold text-[#181818]">Deterministic</span>
                <span className="text-[#A5A59B]">Strict guardrails</span>
              </div>
              <div>
                <span className="block font-semibold text-[#181818]">Full Ownership</span>
                <span className="text-[#A5A59B]">100% Client IP</span>
              </div>
              <div>
                <span className="block font-semibold text-[#181818]">Fixed Milestones</span>
                <span className="text-[#A5A59B]">No surprise hours</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual / Interactive Pipeline (Right Column) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...transitionSettings, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <WorkflowIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
