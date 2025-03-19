
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import SolutionsSection from "@/components/SolutionsSection";
import TechStackSection from "@/components/TechStackSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import PromptingIsAllYouNeed from "@/components/PromptingIsAllYouNeed";
import { useContent } from "@/contexts/ContentContext";

const Index = () => {
  const { 
    serviceItems, 
    solutionItems, 
    techCategories,
    servicesSection,
    solutionsSection,
    techStackSection 
  } = useContent();

  return (
    <div className="min-h-screen bg-noesis-dark text-white overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">
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
        <PromptingIsAllYouNeed />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
