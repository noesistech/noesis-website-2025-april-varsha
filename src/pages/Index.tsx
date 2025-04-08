
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import SolutionsSection from '../components/SolutionsSection';
import ClientsSection from '../components/ClientsSection';
import TechStackSection from '../components/TechStackSection';
import AICapabilitiesSection from '../components/AICapabilitiesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AboutStatsSection from '../components/AboutStatsSection';
import MissionSection from '../components/MissionSection';
import { useContent } from '@/contexts/ContentContext';

const Index = () => {
  const { 
    servicesSectionData, 
    serviceItemsData, 
    solutionsSectionData, 
    solutionItemsData, 
    techStackSectionData, 
    techCategoriesData,
    aiCapabilitiesSection,
    aiCapabilities
  } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <HeroSection />
      <AboutStatsSection />
      <MissionSection />
      <ServicesSection title={servicesSectionData.title} services={serviceItemsData} />
      <SolutionsSection title={solutionsSectionData.title} solutions={solutionItemsData} />
      <TechStackSection title={techStackSectionData.title} categories={techCategoriesData} />
      <AICapabilitiesSection title={aiCapabilitiesSection.title} capabilities={aiCapabilities} />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
