
import React, { useEffect } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { LoadingSkeleton } from '@/components/ui/loading';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MissionSection from '@/components/MissionSection';
import ServicesSection from '@/components/ServicesSection';
import SolutionsSection from '@/components/SolutionsSection';
import TechStackSection from '@/components/TechStackSection';
import TeamSection from '@/components/TeamSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ContentPage: React.FC = () => {
  const { 
    loading,
    heroSection,
    servicesSection,
    serviceItems,
    solutionsSection,
    solutionItems,
    techStackSection,
    techCategories,
    teamSection,
    teamMembers
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection 
          title={servicesSection.title}
          services={serviceItems}
        />
        <SolutionsSection 
          title={solutionsSection.title}
          solutions={solutionItems}
        />
        <TechStackSection 
          title={techStackSection.title}
          categories={techCategories}
        />
        <TeamSection 
          title={teamSection.title}
          subtitle={teamSection.subtitle}
          teamMembers={teamMembers}
        />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContentPage;
