import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clientPartnersList, ClientPartner } from '../../data/caseStudies';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ClientShowcaseLogosProps {
  onSelectProject: (slug: string) => void;
}

export const ClientShowcaseLogos: React.FC<ClientShowcaseLogosProps> = ({ onSelectProject }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#D8D8D0] gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
          Selected Collaborators &amp; Lab Projects
        </span>
        <span className="text-[11px] font-mono text-[#A5A59B]">
          Verified Work · Click to inspect case study
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {clientPartnersList.map((partner: ClientPartner, index: number) => {
          const isClickable = Boolean(partner.projectSlug);

          return (
            <motion.button
              key={partner.id}
              type="button"
              disabled={!isClickable}
              onClick={() => partner.projectSlug && onSelectProject(partner.projectSlug)}
              whileHover={shouldReduceMotion || !isClickable ? {} : { y: -2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`text-left p-5 rounded-xl border transition-all duration-200 group relative ${
                isClickable
                  ? 'bg-white border-[#D8D8D0] hover:border-[#181818] hover:shadow-xs cursor-pointer'
                  : 'bg-white/60 border-[#D8D8D0]/60 cursor-default'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-[#A5A59B] uppercase">
                  0{index + 1}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    partner.type === 'Client Project'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-[#F3F2EE] text-[#181818]/70 border border-[#D8D8D0]'
                  }`}
                >
                  {partner.shortTag}
                </span>
              </div>

              <div className="font-bold text-base text-[#181818] tracking-tight group-hover:text-black flex items-center justify-between">
                <span>{partner.name}</span>
                {isClickable && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A5A59B] group-hover:text-[#181818] transition-colors" />
                )}
              </div>

              <div className="text-xs text-[#A5A59B] mt-1 truncate">
                {partner.industry}
              </div>

              {partner.projectTitle && (
                <div className="mt-3 pt-3 border-t border-[#F3F2EE] text-[11px] font-mono text-[#181818]/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F36B] border border-[#181818]/30" />
                  <span className="truncate">{partner.projectTitle}</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
