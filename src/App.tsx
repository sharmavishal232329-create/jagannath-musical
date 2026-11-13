import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GenerationsTimeline } from './components/GenerationsTimeline';
import { InstrumentCatalog } from './components/InstrumentCatalog';
import { RepairFeesTable } from './components/RepairFeesTable';
import { FurnitureSection } from './components/FurnitureSection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { OwnerDashboard } from './components/OwnerDashboard';

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useData();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleOpenOwnerPortal = () => {
    if (isAuthenticated) {
      setDashboardOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
    setDashboardOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 font-sans selection:bg-brass-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenOwnerPortal={handleOpenOwnerPortal} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <GenerationsTimeline />
        <InstrumentCatalog />
        <RepairFeesTable />
        <FurnitureSection />
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer onOpenOwnerPortal={handleOpenOwnerPortal} />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

      {/* Modals & Dashboard */}
      <OwnerLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <OwnerDashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </DataProvider>
  );
}

export default App;
