import React, { useEffect } from 'react';
import { ArrowUpRight, Check, ArrowRight, Layers, Bot, Code2, RefreshCw } from 'lucide-react';
import { servicesData, ServiceCategory } from '../data/services';
import { RoutePath } from '../lib/router';
import { trackEvent } from '../lib/analytics';

interface ServicesPageProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  automation: RefreshCw,
  agents: Bot,
  software: Code2,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'AI Automation, AI Agents & Software Services — PysDev';
    window.scrollTo(0, 0);
  }, []);

  const handleEnquire = (serviceName: string, serviceSlug: string) => {
    trackEvent('hero_cta_clicked', { location: `services_page_${serviceSlug}` });
    onNavigate('/contact', { service: serviceName });
  };

  return (
    <div className="w-full py-16 lg:py-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 lg:mb-28">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
            Services &amp; Capabilities
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
            Engineering designed to eliminate friction.
          </h1>
          <p className="text-lg sm:text-xl text-[#181818]/75 leading-relaxed font-normal">
            We provide three focused technical capabilities: connecting your business tools through automated workflows, deploying task-focused AI assistants with verified guardrails, and engineering custom full-stack web software.
          </p>
        </div>
      </div>

      {/* Services Deep Dive */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28 lg:space-y-36">
        {servicesData.map((service: ServiceCategory, index: number) => {
          const Icon = serviceIcons[service.id] || Code2;
          const isReversed = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.slug}
              className="scroll-mt-28 border-t border-[#181818]/10 pt-16 lg:pt-24"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-12 border-b border-[#D8D8D0] gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#D8D8D0] flex items-center justify-center text-[#181818]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#A5A59B]">
                      Category 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#181818]">
                      {service.name}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => handleEnquire(service.name, service.slug)}
                  className="px-5 py-2.5 text-sm font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl border border-[#181818]/15 transition-all self-start md:self-auto flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start a {service.name.split(' ')[0]} Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content Grid: Alternating on desktop, stacked copy before visual on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Column 1: Core Problem & Solution (Text) */}
                <div className={`space-y-8 ${isReversed ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6 lg:order-1'}`}>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                      What This Service Is
                    </h3>
                    <p className="text-base sm:text-lg text-[#181818]/85 leading-relaxed">
                      {service.longDescription}
                    </p>
                  </div>

                  {/* 4–6 Use Cases */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#181818] mb-4">
                      Relevant Business Use Cases
                    </h3>
                    <div className="space-y-3">
                      {service.useCases.map((useCase, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-[#181818]/80 leading-normal">
                          <span className="w-5 h-5 rounded-md bg-[#181818] text-[#C6F36B] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concrete Deliverables */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#181818] mb-3">
                      Tangible Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#181818]/80">
                          <Check className="w-4 h-4 text-[#181818] mt-0.5 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 2: Implementation Workflow & "Good Fit If" (Visual / Structure) */}
                <div className={`space-y-8 ${isReversed ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6 lg:order-2'}`}>
                  {/* Delivery Flow Stepper */}
                  <div className="bg-white rounded-2xl border border-[#D8D8D0] p-7">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#181818]/60 mb-5">
                      Implementation Workflow
                    </h3>
                    <div className="space-y-4">
                      {service.deliveryFlow.map((flow) => (
                        <div key={flow.step} className="flex items-start gap-3.5">
                          <span className="w-6 h-6 rounded bg-[#F3F2EE] border border-[#D8D8D0] text-[#181818] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {flow.step}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-[#181818]">
                              {flow.title}
                            </h4>
                            <p className="text-xs text-[#181818]/70 leading-relaxed mt-0.5">
                              {flow.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* "Good fit if..." Guidance */}
                  <div className="bg-[#181818] text-white rounded-2xl p-7 border border-[#181818]">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6F36B] mb-4">
                      Good Fit If...
                    </h3>
                    <ul className="space-y-2.5 mb-6">
                      {service.goodFitCriteria.map((criterion, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/80 leading-normal">
                          <span className="text-[#C6F36B] mr-1">→</span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/50">
                      Technical environment: {service.technicalStackSummary}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
