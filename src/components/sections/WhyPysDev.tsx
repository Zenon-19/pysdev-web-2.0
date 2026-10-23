import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, MessageSquare, CheckCircle2 } from 'lucide-react';

export const WhyPysDev: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      icon: Terminal,
      title: 'Practical Engineering',
      description:
        'We build systems to solve genuine business bottlenecks, not to chase tech fads. Every automation has fallback error-handling, and every software project uses clean, maintainable architecture you own entirely.',
    },
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      description:
        'No confusing jargon, hidden surprises, or inflated hour counts. You receive transparent proposals, predictable milestone deliverables, and straightforward asynchronous progress demos each week.',
    },
    {
      icon: CheckCircle2,
      title: 'Dependable Delivery',
      description:
        'We test edge cases, rate limits, and failure modes before production release. You get comprehensive handoff documentation, deployment verification, and reliable post-launch warranty support.',
    },
  ];

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
    <section className="py-24 lg:py-32 bg-white border-b border-[#181818]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
            Studio Standards
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818]">
            Built on engineering rigor, not empty promises.
          </h2>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {principles.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={idx}
                variants={shouldReduceMotion ? undefined : itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-8 rounded-2xl bg-[#F3F2EE]/50 border border-[#D8D8D0] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#D8D8D0] flex items-center justify-center text-[#181818] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#181818] mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#181818]/70 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#D8D8D0]/60 text-xs font-mono text-[#A5A59B]">
                  PysDev Standard 0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
