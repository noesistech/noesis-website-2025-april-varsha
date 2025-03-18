
import React from 'react';
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
    testimonials
  } = useContent();

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
          <HeroSection 
            title={heroSection.title}
            subtitle={heroSection.subtitle}
            ctaPrimaryText={heroSection.cta_primary_text}
            ctaSecondaryText={heroSection.cta_secondary_text}
            serviceCards={serviceCards}
          />
        )}
        
        {aboutSection && (
          <AboutSection 
            title={aboutSection.title}
            subtitle={aboutSection.subtitle}
            description1={aboutSection.description_1}
            description2={aboutSection.description_2}
            description3={aboutSection.description_3}
            imageUrl={aboutSection.image_url}
            stats={stats}
          />
        )}
        
        {missionSection && (
          <MissionSection 
            missionTitle={missionSection.mission_title}
            missionDescription={missionSection.mission_description}
            visionTitle={missionSection.vision_title}
            visionDescription={missionSection.vision_description}
            promiseTitle={missionSection.promise_title}
            promiseText={missionSection.promise_text}
          />
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
        
        {techStackSection && (
          <TechStackSection 
            title={techStackSection.title}
            categories={techCategories}
          />
        )}
        
        {clientsSection && (
          <ClientsSection 
            title={clientsSection.title}
            clientsSubtitle={clientsSection.clients_subtitle}
            partnersSubtitle={clientsSection.partners_subtitle}
            testimonialsSubtitle={clientsSection.testimonials_subtitle}
            clientLogos={[]}  // We need to add client logos later
            partnerLogos={[]} // We need to add partner logos later
            testimonials={testimonials}
          />
        )}
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContentPage;
