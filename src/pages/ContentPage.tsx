
import React, { useEffect } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { LoadingSkeleton } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MissionSection from '@/components/MissionSection';
import ServicesSection from '@/components/ServicesSection';
import SolutionsSection from '@/components/SolutionsSection';
import TechStackSection from '@/components/TechStackSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ContentPage: React.FC = () => {
  const { 
    loading, 
    error,
    heroSection,
    serviceCards,
    aboutSection,
    stats,
    missionSection,
    servicesSection,
    serviceItems,
    solutionsSection,
    solutionItems,
    techStackSection,
    techCategories,
    clientsSection,
    clientLogos,
    partnerLogos,
    testimonials
  } = useContent();

  useEffect(() => {
    // Update document title and description based on content
    const siteTitle = heroSection?.title 
      ? `${heroSection.title} | Noesis.tech`
      : "Noesis.tech - Creative Technology Solutions";
    
    document.title = siteTitle;
    
    // Update meta description dynamically if we have content
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && heroSection?.subtitle) {
      metaDescription.setAttribute('content', heroSection.subtitle);
    }
  }, [heroSection]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {heroSection && (
          <HeroSection />
        )}
        
        {aboutSection && (
          <AboutSection />
        )}
        
        {missionSection && (
          <MissionSection />
        )}
        
        {servicesSection && (
          <ServicesSection 
            title={servicesSection.title}
            services={serviceItems}
          />
        )}
        
        {solutionsSection && (
          <SolutionsSection 
            title={solutionsSection.title}
            solutions={solutionItems}
          />
        )}
        
        {techStackSection && techCategories && (
          <TechStackSection 
            title={techStackSection.title}
            categories={techCategories}
          />
        )}
        
        {clientsSection && (
          <ClientsSection />
        )}
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContentPage;
