
import React from 'react';
import Header from '../components/Header';
import SubpageHero from '../components/SubpageHero';
import ServicesSection from '../components/ServicesSection';
import TechStackSection from '../components/TechStackSection';
import Footer from '../components/Footer';
import ContactBanner from '../components/ContactBanner';
import { useContent } from '@/contexts/ContentContext';

const Services = () => {
  const { serviceItems, techCategories, techStackSection } = useContent();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C]">
      <Header />
      <main className="flex-grow">
        <SubpageHero 
          title="Our Services" 
          subtitle="Discover the comprehensive range of services we offer"
          backgroundEffect="purple"
        />
        
        <ServicesSection 
          title="Our Services"
          services={serviceItems}
        />
        
        <div id="tech-stack">
          <TechStackSection 
            title={techStackSection?.title || "Our Technology Stack"} 
            categories={techCategories}
          />
        </div>
        
        <ContactBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
