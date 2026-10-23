import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface SiteHeaderProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (path: RoutePath) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    trackEvent('hero_cta_clicked', { location: 'header_cta' });
    onNavigate('/contact');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F3F2EE]/90 backdrop-blur-md border-b border-[#181818]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
          className="text-xl font-bold tracking-tight text-[#181818] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity flex items-center gap-2"
          aria-label="PysDev Studio Home"
        >
          <span className="w-2.5 h-2.5 bg-[#C6F36B] border border-[#181818] inline-block rounded-xs" />
          <span>PysDev Studio</span>
        </a>

        {/* Zone 2: Navigation Links (Single line text links) */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#181818]/70"
          aria-label="Main Navigation"
        >
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/services');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentPath === '/services'
                ? 'text-[#181818] font-semibold'
                : 'hover:text-[#181818]'
            }`}
          >
            Services
            {currentPath === '/services' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#181818] rounded-full" />
            )}
          </a>

          <a
            href="/work"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/work');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentPath === '/work'
                ? 'text-[#181818] font-semibold'
                : 'hover:text-[#181818]'
            }`}
          >
            Work
            {currentPath === '/work' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#181818] rounded-full" />
            )}
          </a>

          <a
            href="/process"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/process');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentPath === '/process'
                ? 'text-[#181818] font-semibold'
                : 'hover:text-[#181818]'
            }`}
          >
            Process
            {currentPath === '/process' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#181818] rounded-full" />
            )}
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={handleCtaClick}
            className="group px-5 py-2.5 text-sm font-semibold text-[#181818] bg-[#C6F36B] rounded-lg border border-[#181818]/15 hover:bg-[#b8ee52] hover:shadow-xs transition-all active:translate-y-[1px] whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#181818] rounded-md hover:bg-[#181818]/5 focus-visible:outline-2 focus-visible:outline-[#181818]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-50 bg-[#F3F2EE] flex flex-col justify-between px-8 py-10 md:hidden border-t border-[#181818]/10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col space-y-6 text-2xl font-semibold tracking-tight text-[#181818]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="py-2 border-b border-[#D8D8D0] flex items-center justify-between"
            >
              <span>Home</span>
            </a>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/services');
              }}
              className="py-2 border-b border-[#D8D8D0] flex items-center justify-between"
            >
              <span>Services</span>
            </a>
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/work');
              }}
              className="py-2 border-b border-[#D8D8D0] flex items-center justify-between"
            >
              <span>Work</span>
            </a>
            <a
              href="/process"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/process');
              }}
              className="py-2 border-b border-[#D8D8D0] flex items-center justify-between"
            >
              <span>Process</span>
            </a>
          </nav>

          <div className="pt-8 flex flex-col gap-4">
            <button
              onClick={handleCtaClick}
              className="w-full py-4 text-center text-base font-semibold text-[#181818] bg-[#C6F36B] rounded-xl border border-[#181818]/15 shadow-sm active:bg-[#bbf055] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-center text-[#A5A59B]">
              No commitment · Free initial scoping review
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
