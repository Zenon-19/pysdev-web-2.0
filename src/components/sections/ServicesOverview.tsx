import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, RefreshCw, Bot, Code2, Check } from 'lucide-react';
import { servicesData, ServiceCategory } from '../../data/services';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface ServicesOverviewProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  automation: RefreshCw,
  agents: Bot,
  software: Code2,
};

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleServiceClick = (slug: string) => {
    trackEvent('services_viewed', { serviceCategory: slug });
    onNavigate('/services');
  };

  const handleEnquire = (serviceName: string, serviceSlug: string) => {
    trackEvent('hero_cta_clicked', { location: `services_overview_${serviceSlug}` });
    onNavigate('/contact', { service: serviceName });
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
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-24 lg:py-32">
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
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818]">
              Engineered for efficiency. Built to scale.
            </h2>
          </div>
          <button
            onClick={() => {
              trackEvent('services_viewed');
              onNavigate('/services');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#181818] hover:text-black group self-start md:self-auto cursor-pointer pb-1 border-b border-[#181818]"
          >
            <span>View detailed service breakdown</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* 3 Service Cards Grid with Staggered Entrance */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {servicesData.map((service: ServiceCategory, idx: number) => {
            const Icon = iconMap[service.id] || Code2;

            return (
              <motion.div
                key={service.id}
                variants={shouldReduceMotion ? undefined : itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="bg-white rounded-2xl border border-[#D8D8D0] p-8 flex flex-col justify-between hover:border-[#181818]/40 hover:shadow-sm transition-colors duration-200 group"
              >
                <div>
                  {/* Card Header & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#D8D8D0] flex items-center justify-center text-[#181818] group-hover:bg-[#C6F36B] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#A5A59B]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#181818] mb-3 group-hover:text-black">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#181818]/70 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Representative Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F3F2EE] mb-8">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#A5A59B]">
                      Key Deliverables
                    </p>
                    {service.useCases.slice(0, 3).map((useCase, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#181818]/85 leading-normal">
                        <Check className="w-3.5 h-3.5 text-[#181818] mt-0.5 shrink-0" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#F3F2EE] flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleServiceClick(service.slug)}
                    className="text-xs font-medium text-[#181818]/80 hover:text-[#181818] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleEnquire(service.name, service.slug)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#181818] bg-[#F3F2EE] hover:bg-[#C6F36B] rounded-lg transition-colors border border-[#D8D8D0] hover:border-[#181818]/20 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
