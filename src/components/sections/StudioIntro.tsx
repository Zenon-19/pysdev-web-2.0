import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const StudioIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 border-y border-[#181818]/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          <div className="lg:col-span-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#181818]/60 block mb-2">
              Studio Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] leading-tight">
              Technology should remove friction, not create more of it.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-[#181818]/80 leading-relaxed font-normal">
            <p>
              Most businesses don't need another generic dashboard or an unguided chatbot hallucinating responses. They need systems that quietly work: leads qualified without hours of delay, data synchronizing across tools without manual copy-pasting, and digital products engineered with clean, maintainable code.
            </p>
            <p>
              PysDev Studio is built on practical software engineering and deterministic automation. We believe in transparent architecture, well-defined milestones, and delivering software where you retain complete ownership of the code, data, and infrastructure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
