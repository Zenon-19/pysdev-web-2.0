import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, CheckCircle } from 'lucide-react';
import { projectsData, ProjectItem } from '../../data/projects';
import { RoutePath } from '../../lib/router';
import { trackEvent } from '../../lib/analytics';

interface SelectedWorkSectionProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenProject = (project: ProjectItem) => {
    trackEvent('project_card_clicked', { projectSlug: project.slug });
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
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
    <section className="py-24 lg:py-32 bg-[#181818] text-[#F3F2EE]">
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
            <p className="text-xs font-mono uppercase tracking-widest text-[#C6F36B] mb-3">
              Selected Work &amp; Demonstrations
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Practical outcomes. Transparent engineering.
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('/work');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white group self-start md:self-auto cursor-pointer pb-1 border-b border-white/30"
          >
            <span>Explore all case studies &amp; demos</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projectsData.map((project: ProjectItem) => (
            <motion.div
              key={project.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => handleOpenProject(project)}
              className="bg-[#242424] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#C6F36B]/60 transition-colors duration-300 group cursor-pointer"
            >
              <div>
                {/* Visual Preview */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#1c1c1c]">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed status badge overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-[#181818]/90 text-white border border-white/15 backdrop-blur-xs text-[11px]">
                      {project.categoryLabel}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-medium backdrop-blur-xs ${
                        project.isClientWork
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#181818]/90 text-[#C6F36B] border border-[#C6F36B]/30'
                      }`}
                    >
                      {project.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C6F36B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-3 leading-relaxed mb-6">
                    {project.problem}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[11px] font-mono text-white/40 px-1 py-0.5">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white">
                <span>View Full Architecture</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C6F36B] group-hover:text-[#181818] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Accessible Interactive Detail Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#181818] text-[#F3F2EE] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Modal Close Button */}
              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-black/50 rounded-full border border-white/20 cursor-pointer"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#C6F36B] text-[#181818] font-semibold mb-2 inline-block">
                    {selectedProject.statusLabel}
                  </span>
                  <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                    The Problem &amp; Context
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6F36B] mb-2">
                    The Engineered Solution
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                {selectedProject.interactiveDemoNotes && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
                    <span className="font-semibold text-white">Technical Note: </span>
                    {selectedProject.interactiveDemoNotes}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-3">
                    Verifiable Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/85">
                        <CheckCircle className="w-4 h-4 text-[#C6F36B] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-mono text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      handleCloseProject();
                      onNavigate('/contact', { service: selectedProject.categoryLabel });
                    }}
                    className="px-6 py-3 bg-[#C6F36B] text-[#181818] rounded-xl font-semibold text-sm hover:bg-[#bbf055] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Build Something Similar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseProject}
                    className="text-xs text-white/60 hover:text-white transition-colors text-center py-2 cursor-pointer"
                  >
                    Close Modal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
