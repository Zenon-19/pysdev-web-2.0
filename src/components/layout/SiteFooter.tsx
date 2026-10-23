import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface SiteFooterProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleNav = (path: RoutePath) => {
    onNavigate(path);
  };

  const handleCta = () => {
    trackEvent('hero_cta_clicked', { location: 'footer_cta' });
    onNavigate('/contact');
  };

  return (
    <footer className="w-full bg-[#181818] text-[#F3F2EE] border-t border-[#181818]">
      {/* Pre-footer Call to Action Section with Smooth Scroll Reveal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20 border-b border-white/10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-widest text-[#C6F36B] font-mono mb-4">
            Next Steps
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Have a process worth improving?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
            Whether you want to automate manual lead handoffs, connect disconnected tools, or engineer a custom web application from scratch, we’re ready to help you scope it cleanly.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
              onClick={handleCta}
              className="px-7 py-3.5 text-base font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#bbf055] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
            <a
              href="mailto:hello@pysdev.studio"
              className="px-6 py-3.5 text-base font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#C6F36B]" />
              <span>hello@pysdev.studio</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
            className="inline-block hover:opacity-85 transition-opacity py-1 focus-visible:outline-2 focus-visible:outline-white rounded-sm"
            aria-label="PysDev Studio logo - Return to homepage"
          >
            <img
              src="/images/pysdev-logo-light-clean.png"
              alt="PysDev Studio logo"
              className="h-8 sm:h-9 w-auto max-w-[165px] sm:max-w-[190px] object-contain"
              width="190"
              height="57"
              loading="lazy"
              decoding="async"
            />
          </a>
          <p className="text-white/60 leading-relaxed max-w-sm">
            A software engineering and AI automation studio helping startups and growing businesses eliminate repetitive work, connect their tools, and build useful digital products.
          </p>
          <div className="pt-2 text-xs text-white/40 font-mono">
            New Delhi · Global Delivery · Est. 2024
          </div>
        </div>

        {/* Directory Links */}
        <div className="md:col-span-3 space-y-3">
          <p className="text-xs font-semibold tracking-wider text-white uppercase mb-4">
            Directory
          </p>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => handleNav('/services')}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Services & Capabilities
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/work')}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Selected Work & Demos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/process')}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Delivery Process & FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/contact')}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Project Intake Form
              </button>
            </li>
          </ul>
        </div>

        {/* Standards & Transparency */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-xs font-semibold tracking-wider text-white uppercase mb-4">
            Transparency
          </p>
          <p className="text-white/60 text-xs leading-relaxed">
            We prioritize transparent communication and verifiable outcomes. All projects include full source code IP ownership, documented runbooks, and zero proprietary platform lock-in.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNav('/privacy')}
              className="text-xs text-white/50 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Privacy Policy & Data Handling
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div>
          &copy; {new Date().getFullYear()} PysDev Studio. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Production-grade engineering</span>
          <span aria-hidden="true">·</span>
          <span>No unverified claims</span>
        </div>
      </div>
    </footer>
  );
};
