import React, { useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { StudioIntro } from '../components/sections/StudioIntro';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { SelectedWorkSection } from '../components/sections/SelectedWorkSection';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { WhyPysDev } from '../components/sections/WhyPysDev';
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
      <ProcessTimeline onNavigate={onNavigate} />
      <WhyPysDev />
    </div>
  );
};
