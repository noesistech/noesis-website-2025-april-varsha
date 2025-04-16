
import React, { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { useContent } from './contexts/ContentContext';
import { toast } from 'sonner';

// Import all sections
import AboutStatsSection from './components/AboutStatsSection';
import AICapabilitiesSection from './components/AICapabilitiesSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import FilterableTeamSection from './components/FilterableTeamSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import ServicesSection from './components/ServicesSection';
import SolutionsSection from './components/SolutionsSection';
import TechStackSection from './components/TechStackSection';

function App() {
  const {
    servicesSection,
    serviceItems,
    aiCapabilitiesSection,
    aiCapabilities,
    aiProducts,
    aiProductsSection,
    solutionsSection,
    solutionItems,
    techStackSection,
    techCategories
  } = useContent();

  useEffect(() => {
    // Log to verify App component is rendering
    console.info("App component rendered");
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutStatsSection />
        <MissionSection />
        <ServicesSection title={servicesSection?.title || ''} services={serviceItems || []} />
        <AICapabilitiesSection 
          title={aiCapabilitiesSection?.title || ''} 
          capabilities={aiCapabilities || []} 
          products={aiProducts || []} 
          productsSection={{
            title: aiProductsSection?.title || '',
            subtitle: aiProductsSection?.subtitle || ''
          }}
        />
        <SolutionsSection title={solutionsSection?.title || ''} solutions={solutionItems || []} />
        <FilterableTeamSection />
        <TechStackSection title={techStackSection?.title || ''} categories={techCategories || []} />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </>
  );
}

export default App;
