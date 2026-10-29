import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkflowIllustration } from '../ui/WorkflowIllustration';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  // GSAP animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const credibilityRef = useRef<HTMLDivElement>(null);
  const backgroundGlowRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences
    const prefersReduced =
      shouldReduceMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline on initial page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.08 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.4'
        )
        .fromTo(
          credibilityRef.current?.children || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, y: 32, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power2.out' },
          0.18
        )
        .fromTo(
          scrollPromptRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        );

      // 2. Subtle Scroll-Triggered Parallax & Layering
      // Right Column (Workflow Card) glides with weighted positive parallax
      gsap.to(rightColRef.current, {
        y: 44,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Left Column (Hero Copy) glides subtly upwards with delicate opacity fade
      gsap.to(leftColRef.current, {
        y: -32,
        opacity: 0.88,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Ambient background glow shifts smoothly on scroll
      if (backgroundGlowRef.current) {
        gsap.to(backgroundGlowRef.current, {
          y: 70,
          scale: 1.15,
          opacity: 0.65,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Scroll progress tracking accent line
      if (accentLineRef.current) {
        gsap.fromTo(
          accentLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      }

      // Scroll prompt at bottom smoothly dissolves as user scrolls away
      if (scrollPromptRef.current) {
        gsap.to(scrollPromptRef.current, {
          opacity: 0,
          y: 14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '18% top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const handleStartProject = () => {
    trackEvent('hero_cta_clicked', { location: 'hero_primary' });
    onNavigate('/contact');
  };

  const handleExploreServices = () => {
    trackEvent('hero_cta_clicked', { location: 'hero_services' });
    onNavigate('/services');
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden"
    >
      {/* Subtle Ambient Parallax Glow */}
      <div
        ref={backgroundGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 w-[480px] lg:w-[620px] h-[480px] lg:h-[620px] bg-gradient-to-br from-[#C6F36B]/15 via-[#C6F36B]/5 to-transparent rounded-full blur-3xl opacity-40 will-change-transform"
      />

      {/* Decorative Technical Coordinates */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-8 hidden xl:flex items-center gap-2 text-[10px] font-mono text-[#181818]/30 tracking-widest uppercase"
      >
        <span>COORD: 28.6139° N, 77.2090° E</span>
        <span>·</span>
        <span>SYS.STATUS: OPERATIONAL</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Copy (Left Column) */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6 will-change-transform">
            <div
              ref={kickerRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#181818]/5 border border-[#181818]/10 text-xs font-mono text-[#181818]"
            >
              <img
                src="/images/pysdev-symbol.png"
                alt=""
                className="w-3.5 h-3.5 object-contain"
              />
              <span>PysDev Engineering &amp; AI Automation</span>
            </div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] leading-[1.08] text-balance"
            >
              Less manual work. More intelligent systems.
            </h1>

            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#181818]/75 leading-relaxed max-w-xl"
            >
              We build AI-powered workflows, task-focused AI assistants, and custom software that help growing businesses connect their tools, reduce repetitive tasks, and move faster.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
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
            </div>

            {/* Subtle Credibility Attributes */}
            <div
              ref={credibilityRef}
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
            </div>
          </div>

          {/* Hero Visual / Interactive Pipeline (Right Column) */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 will-change-transform"
          >
            <WorkflowIllustration />
          </div>
        </div>

        {/* Subtle Scroll Cue at the base of the Hero */}
        <div
          ref={scrollPromptRef}
          aria-hidden="true"
          className="mt-14 lg:mt-16 flex items-center justify-between text-xs font-mono text-[#181818]/50 border-t border-[#181818]/10 pt-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6F36B] animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">Scroll to explore studio work</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#181818]/40">
            <span>DISCOVER</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* GSAP Scroll-Triggered Progress Line */}
      <div
        ref={accentLineRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#181818]/30 via-[#C6F36B] to-[#181818]/30 will-change-transform"
      />
    </section>
  );
};

