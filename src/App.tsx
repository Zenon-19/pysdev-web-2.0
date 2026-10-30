import React from 'react';
import { useRouter } from './lib/router';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { PageTransition } from './components/layout/PageTransition';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  const { path, queryParams, navigate } = useRouter();

  const renderCurrentPage = () => {
    switch (path) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/services':
        return <ServicesPage onNavigate={navigate} />;
      case '/work':
        return <WorkPage queryParams={queryParams} onNavigate={navigate} />;
      case '/process':
        return <ProcessPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage queryParams={queryParams} onNavigate={navigate} />;
      case '/thank-you':
        return <ThankYouPage queryParams={queryParams} onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F2EE] text-[#181818] font-sans">
      {/* Top Header */}
      <SiteHeader currentPath={path} onNavigate={navigate} />

      {/* Main Content Area with Route Transitions */}
      <main className="flex-1 w-full flex flex-col" id="main-content">
        <PageTransition routeKey={path}>
          {renderCurrentPage()}
        </PageTransition>
      </main>

      {/* Site Footer */}
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}

