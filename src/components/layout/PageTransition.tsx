import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PageTransitionProps {
  /** The unique key representing the route (typically router path) */
  routeKey: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Editorial cubic-bezier easing curve matching PysDev design tokens
 */
const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PageTransition Component
 * 
 * Provides smooth, editorial fade-and-slide route transitions when navigating
 * between pages in PysDev Studio. Utilizes Framer Motion's AnimatePresence in 'wait' mode
 * to cleanly unmount the previous page before seamlessly introducing the incoming route.
 * 
 * Includes:
 * - Reduced-motion accessibility fallback.
 * - Coordinated scroll reset to top between page transitions.
 * - Automatic GSAP ScrollTrigger recalculation to keep hero and section triggers synchronized.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  routeKey,
  children,
  className = 'w-full flex-1 flex flex-col',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleExitComplete = () => {
    // Snap scroll to top cleanly once exiting page has completed fading out
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }
  };

  const handleAnimationComplete = () => {
    // Refresh GSAP triggers once incoming page is fully rendered
    if (typeof window !== 'undefined' && ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={handleExitComplete}
    >
      <motion.div
        key={routeKey}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.32,
          ease: TRANSITION_EASE,
        }}
        onAnimationComplete={handleAnimationComplete}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
