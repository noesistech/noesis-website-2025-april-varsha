
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import SolutionsSection from '../components/SolutionsSection';
import ClientsSection from '../components/ClientsSection';
import TechStackSection from '../components/TechStackSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AboutStatsSection from '../components/AboutStatsSection';
import { servicesSectionData, serviceItemsData } from '@/data/content/services';
import { solutionsSectionData, solutionItemsData } from '@/data/content/solutions';
import { techStackSectionData, techCategoriesData } from '@/data/content/techstack';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <HeroSection />
      <AboutStatsSection />
      <ServicesSection title={servicesSectionData.title} services={serviceItemsData} />
      <SolutionsSection title={solutionsSectionData.title} solutions={solutionItemsData} />
      <ClientsSection />
      <TechStackSection title={techStackSectionData.title} categories={techCategoriesData} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
