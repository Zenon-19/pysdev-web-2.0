import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { projectsData, ProjectItem, ProjectCategory } from '../data/projects';
import { RoutePath } from '../lib/router';
import { trackEvent } from '../lib/analytics';

interface WorkPageProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

type FilterOption = 'All' | ProjectCategory;

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.title = 'Selected Work & Projects — PysDev Studio';
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projectsData.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    trackEvent('project_card_clicked', { filter });
  };

  return (
    <div className="w-full py-16 lg:py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
            Portfolio &amp; Lab
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
            Selected work. Practical outcomes.
          </h1>
          <p className="text-lg sm:text-xl text-[#181818]/75 leading-relaxed font-normal">
            A transparent overview of engineered systems, delivered client implementations, and internal studio technical demonstrations. We clearly distinguish between live client deployments and studio prototypes.
          </p>
        </div>

        {/* Functional Category Filters (Interactive buttons, accessible by keyboard and touch) */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Project Category Filters">
          {(['All', 'Automation', 'AI', 'Software'] as FilterOption[]).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#181818] text-[#C6F36B] border-[#181818] shadow-xs'
                    : 'bg-white text-[#181818]/70 border-[#D8D8D0] hover:border-[#181818]/40 hover:text-[#181818]'
                }`}
              >
                {filter === 'All' ? 'All Projects & Demos' : filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              onClick={() => {
                trackEvent('project_card_clicked', { projectSlug: project.slug });
                setSelectedProject(project);
              }}
              className="bg-white rounded-2xl border border-[#D8D8D0] overflow-hidden flex flex-col justify-between hover:border-[#181818]/40 hover:shadow-sm transition-all duration-200 group cursor-pointer"
            >
              <div>
                {/* Visual Preview */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#F3F2EE]">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-[#181818]/90 text-white border border-[#181818] text-[11px]">
                      {project.categoryLabel}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                        project.isClientWork
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#C6F36B]/90 text-[#181818] border border-[#181818]/20'
                      }`}
                    >
                      {project.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#181818] mb-3 group-hover:text-black">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#181818]/70 line-clamp-3 leading-relaxed mb-6">
                    {project.problem}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F3F2EE]">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-[#181818]/70 bg-[#F3F2EE] px-2 py-0.5 rounded border border-[#D8D8D0]/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-7 pb-7 pt-2 flex items-center justify-between text-xs font-semibold text-[#181818]">
                <span>View Full Architecture &amp; Solution</span>
                <div className="w-8 h-8 rounded-full bg-[#F3F2EE] group-hover:bg-[#C6F36B] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
        >
          <div className="bg-white text-[#181818] border border-[#D8D8D0] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 text-[#181818]/80 hover:text-[#181818] bg-white/80 rounded-full border border-[#D8D8D0] cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#C6F36B] text-[#181818] font-semibold mb-2 inline-block">
                  {selectedProject.statusLabel}
                </span>
                <h3 id="work-modal-title" className="text-2xl sm:text-3xl font-bold">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-2">
                  The Problem &amp; Operational Context
                </h4>
                <p className="text-sm sm:text-base text-[#181818]/85 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#181818] mb-2">
                  The Engineered Solution
                </h4>
                <p className="text-sm sm:text-base text-[#181818]/85 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>

              {selectedProject.interactiveDemoNotes && (
                <div className="p-4 rounded-xl bg-[#F3F2EE] border border-[#D8D8D0] text-xs text-[#181818]/80">
                  <span className="font-semibold text-[#181818]">Technical Note: </span>
                  {selectedProject.interactiveDemoNotes}
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A59B] mb-3">
                  Verifiable Deliverables &amp; Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#181818]/90">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                      className="px-2.5 py-1 rounded-md bg-[#F3F2EE] border border-[#D8D8D0] text-xs font-mono text-[#181818]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#D8D8D0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onNavigate('/contact', { service: selectedProject.categoryLabel });
                  }}
                  className="px-6 py-3 bg-[#C6F36B] text-[#181818] rounded-xl font-semibold text-sm hover:bg-[#b8ee52] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Scope a Project Like This</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-[#181818]/60 hover:text-[#181818] transition-colors text-center py-2 cursor-pointer"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
