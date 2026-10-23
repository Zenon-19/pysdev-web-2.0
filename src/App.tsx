import React from 'react';
import { useRouter } from './lib/router';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  const { path, queryParams, navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F2EE] text-[#181818] font-sans">
      {/* Top Header */}
      <SiteHeader currentPath={path} onNavigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full" id="main-content">
        {path === '/' && <HomePage onNavigate={navigate} />}
        {path === '/services' && <ServicesPage onNavigate={navigate} />}
        {path === '/work' && <WorkPage queryParams={queryParams} onNavigate={navigate} />}
        {path === '/process' && <ProcessPage onNavigate={navigate} />}
        {path === '/contact' && <ContactPage queryParams={queryParams} onNavigate={navigate} />}
        {path === '/thank-you' && <ThankYouPage queryParams={queryParams} onNavigate={navigate} />}
        {path === '/privacy' && <PrivacyPage onNavigate={navigate} />}
      </main>

      {/* Site Footer */}
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
