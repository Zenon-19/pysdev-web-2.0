import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2, Clock, ShieldCheck, FileCode, Users } from 'lucide-react';
import { processStages, processFAQs, ProcessStage } from '../data/process';
import { RoutePath } from '../lib/router';
import { trackEvent } from '../lib/analytics';

interface ProcessPageProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Our Process — PysDev Studio';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16 lg:py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 lg:mb-28">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
            Delivery Framework
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
            How projects are scoped, built, and launched.
          </h1>
          <p className="text-lg sm:text-xl text-[#181818]/75 leading-relaxed font-normal">
            Software projects fail when assumptions remain unstated. We deliver through an explicit four-stage methodology designed to reduce risk, maintain communication clarity, and ensure you own the completed system.
          </p>
        </div>
      </div>

      {/* 4 Process Stages Breakdown */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20 lg:space-y-28">
        {processStages.map((stage: ProcessStage, index: number) => (
          <div
            key={stage.id}
            id={stage.id}
            className="scroll-mt-28 border-t border-[#181818]/10 pt-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Stage Overview & Index */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#181818] text-[#C6F36B] font-mono text-sm font-bold flex items-center justify-center">
                    {stage.number}
                  </span>
                  <span className="text-xs font-mono text-[#A5A59B] uppercase tracking-wider">
                    Stage {index + 1} of 4
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#181818]">
                  {stage.title}
                </h2>
                <p className="text-base text-[#181818]/80 leading-relaxed">
                  {stage.objective}
                </p>
              </div>

              {/* Stage Detailed Breakdown Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#D8D8D0] p-7 sm:p-9 space-y-8">
                {/* Main Activities */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-4">
                    Core Technical Activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {stage.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#181818]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#181818] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Involvement & Expected Deliverables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#F3F2EE]">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#181818]" />
                      <span>Client Involvement</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#181818]/75 leading-relaxed">
                      {stage.clientInvolvement}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-[#181818]" />
                      <span>Tangible Deliverables</span>
                    </h3>
                    <ul className="space-y-1.5">
                      {stage.expectedDeliverables.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm font-medium text-[#181818] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F36B] border border-[#181818]/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="pt-6 border-t border-[#F3F2EE] bg-[#F3F2EE]/40 -mx-7 -mb-7 sm:-mx-9 sm:-mb-9 p-6 rounded-b-2xl">
                  <span className="text-[11px] font-mono uppercase text-[#A5A59B] block mb-1">
                    Transition Gate: What happens next?
                  </span>
                  <p className="text-xs sm:text-sm text-[#181818]/80 leading-relaxed font-normal">
                    {stage.whatHappensNext}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-32 pt-20 border-t border-[#181818]/10">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
            Engagement Details
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#181818]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#181818]/70 mt-3">
            Clear guidelines on payment milestones, intellectual property, third-party costs, and responsibilities.
          </p>
        </div>

        <div className="space-y-4">
          {processFAQs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D8D8D0] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F3F2EE]/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#181818]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#181818]/60 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#181818]/80 leading-relaxed border-t border-[#F3F2EE]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-16 p-8 rounded-2xl bg-[#181818] text-white text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Ready to explore your project requirements?
          </h3>
          <p className="text-sm text-white/70 max-w-lg mx-auto">
            Take two to three minutes to outline your process in our multi-step intake form. Initial consultation and technical scoping are free.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                trackEvent('hero_cta_clicked', { location: 'process_faq_bottom' });
                onNavigate('/contact');
              }}
              className="px-7 py-3.5 bg-[#C6F36B] hover:bg-[#b8ee52] text-[#181818] rounded-xl font-semibold text-sm transition-all inline-flex items-center gap-2 cursor-pointer active:translate-y-[1px]"
            >
              <span>Start an Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
