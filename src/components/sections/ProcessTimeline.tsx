import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { processStages, ProcessStage } from '../../data/process';
import { RoutePath } from '../../lib/router';

interface ProcessTimelineProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-24 lg:py-32 border-b border-[#181818]/10 bg-[#F3F2EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
              Delivery Framework
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818]">
              Transparent steps. Zero surprises.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/process')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#181818] hover:text-black group self-start md:self-auto cursor-pointer pb-1 border-b border-[#181818]"
          >
            <span>Read full delivery process &amp; FAQ</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Desktop Horizontal / Mobile Vertical Timeline with Staggered Entrance */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {processStages.map((stage: ProcessStage, index: number) => (
            <motion.div
              key={stage.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-[#D8D8D0] p-7 flex flex-col justify-between hover:border-[#181818]/40 transition-colors relative"
            >
              <div>
                {/* Number & Progress connector */}
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-lg bg-[#181818] text-[#C6F36B] font-mono text-xs font-bold flex items-center justify-center">
                    {stage.number}
                  </span>
                  <span className="text-xs font-mono text-[#A5A59B]">
                    Stage {index + 1} of 4
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#181818] mb-3">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#181818]/70 leading-relaxed mb-6">
                  {stage.objective}
                </p>

                {/* Core activities preview */}
                <div className="space-y-2 pt-4 border-t border-[#F3F2EE] mb-6">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#A5A59B]">
                    Key Activities
                  </p>
                  {stage.activities.slice(0, 2).map((activity, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#181818]/80 leading-normal">
                      <Check className="w-3.5 h-3.5 text-[#181818] mt-0.5 shrink-0" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tangible Output Badge */}
              <div className="pt-4 border-t border-[#F3F2EE] bg-[#F3F2EE]/40 -mx-7 -mb-7 p-4 rounded-b-2xl">
                <span className="text-[11px] font-mono text-[#A5A59B] block mb-1">
                  Deliverable Output:
                </span>
                <span className="text-xs font-semibold text-[#181818] block truncate">
                  {stage.expectedDeliverables[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
