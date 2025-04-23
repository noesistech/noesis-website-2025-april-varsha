
import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { useContent } from './contexts/ContentContext';

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
import ChatBotSection from "@/components/ChatBotSection";

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

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutStatsSection />
        <MissionSection />
        <ServicesSection 
          title={servicesSection?.title || ''} 
          services={serviceItems || []} 
          servicesSection={servicesSection} 
        />
        <AICapabilitiesSection 
          title={aiCapabilitiesSection?.title || ''} 
          capabilities={aiCapabilities || []} 
          products={aiProducts || []} 
          productsSection={{
            title: aiProductsSection?.title || '',
            subtitle: aiProductsSection?.subtitle || ''
          }}
        />
        <SolutionsSection 
          title={solutionsSection?.title || ''} 
          subtitle={solutionsSection?.subtitle || ''}
          solutions={solutionItems || []} 
        />
        <FilterableTeamSection />
        <TechStackSection 
          title={techStackSection?.title || ''} 
          subtitle={techStackSection?.subtitle || ''}
          categories={techCategories || []} 
        />
        <ClientsSection />
        <ChatBotSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </>
  );
}

export default App;
