
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import SolutionsSection from '../components/SolutionsSection';
import ClientsSection from '../components/ClientsSection';
import TechStackSection from '../components/TechStackSection';
import AICapabilitiesSection from '../components/AICapabilitiesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ChatBotSection from "@/components/ChatBotSection";

const Index = () => {
  const { 
    servicesSection, 
    serviceItems, 
    solutionsSection, 
    solutionItems, 
    techStackSection, 
    techCategories,
    aiCapabilitiesSection,
    aiCapabilities,
    aiProducts,
    aiProductsSection
  } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection title={servicesSection.title} services={serviceItems} />
      <SolutionsSection title={solutionsSection.title} solutions={solutionItems} />
      <TechStackSection title={techStackSection.title} categories={techCategories} />
      <AICapabilitiesSection 
        title={aiCapabilitiesSection.title} 
        capabilities={aiCapabilities} 
        products={aiProducts}
        productsSection={aiProductsSection}
      />
      <ClientsSection />
      <ChatBotSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
