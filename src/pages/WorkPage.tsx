import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { projectsData, ProjectItem, ProjectCategory } from '../data/projects';
import { caseStudiesData, CaseStudyItem } from '../data/caseStudies';
import { ClientShowcaseLogos } from '../components/sections/ClientShowcaseLogos';
import { TestimonialsGrid } from '../components/sections/TestimonialsGrid';
import { CaseStudyDetailModal } from '../components/projects/CaseStudyDetailModal';
import { RoutePath } from '../../src/lib/router';
import { trackEvent } from '../lib/analytics';

interface WorkPageProps {
  queryParams?: Record<string, string>;
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

type FilterOption = 'All' | ProjectCategory;

export const WorkPage: React.FC<WorkPageProps> = ({ queryParams = {}, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);

  useEffect(() => {
    document.title = 'Selected Work & Projects — PysDev Studio';
    window.scrollTo(0, 0);

    // Deep link support via ?project=slug
    if (queryParams.project) {
      const found = caseStudiesData.find((c) => c.slug === queryParams.project);
      if (found) {
        setSelectedCaseStudy(found);
      }
    }
  }, [queryParams.project]);

  const filteredProjects = projectsData.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    trackEvent('project_card_clicked', { filter });
  };

  const handleOpenCaseStudyBySlug = (slug: string) => {
    const found = caseStudiesData.find((item) => item.slug === slug);
    if (found) {
      trackEvent('project_card_clicked', { projectSlug: slug, source: 'work_page' });
      setSelectedCaseStudy(found);
    }
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

        {/* Functional Category Filters */}
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              onClick={() => handleOpenCaseStudyBySlug(project.slug)}
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
                <span>View Full Case Study &amp; Architecture</span>
                <div className="w-8 h-8 rounded-full bg-[#F3F2EE] group-hover:bg-[#C6F36B] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaborators & Verified Client Feedback Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16 pt-16 border-t border-[#181818]/10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] mb-2">
            Client Collaborations &amp; Work
          </h2>
          <p className="text-sm sm:text-base text-[#181818]/70 max-w-2xl mb-8">
            Explore verified organizations, project scopes, and direct testimonials from partners we have collaborated with.
          </p>
          <ClientShowcaseLogos onSelectProject={handleOpenCaseStudyBySlug} />
        </div>

        <div>
          <TestimonialsGrid onSelectProject={handleOpenCaseStudyBySlug} />
        </div>
      </div>

      {/* 14-Point Case Study Detail Modal */}
      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
