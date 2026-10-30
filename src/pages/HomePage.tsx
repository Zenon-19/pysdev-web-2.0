import React, { useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { StudioIntro } from '../components/sections/StudioIntro';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { SelectedWorkSection } from '../components/sections/SelectedWorkSection';
import { ClientsCaseStudiesPanel } from '../components/sections/ClientsCaseStudiesPanel';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { WhyPysDev } from '../components/sections/WhyPysDev';
import { FAQSection } from '../components/sections/FAQSection';
import { RoutePath } from '../lib/router';

interface HomePageProps {
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'PysDev Studio — AI Automation & Custom Software';
  }, []);

  return (
    <div className="w-full">
      <HeroSection onNavigate={onNavigate} />
      <StudioIntro />
      <ServicesOverview onNavigate={onNavigate} />
      <SelectedWorkSection onNavigate={onNavigate} />
      <ClientsCaseStudiesPanel onNavigate={onNavigate} />
      <ProcessTimeline onNavigate={onNavigate} />
      <WhyPysDev />
      <FAQSection onNavigate={onNavigate} />
    </div>
  );
};

