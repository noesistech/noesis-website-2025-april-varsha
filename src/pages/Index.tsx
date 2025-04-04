
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import SolutionsSection from '../components/SolutionsSection';
import ClientsSection from '../components/ClientsSection';
import TechStackSection from '../components/TechStackSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AboutStatsSection from '../components/AboutStatsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <HeroSection />
      <AboutStatsSection />
      <ServicesSection />
      <SolutionsSection />
      <ClientsSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
