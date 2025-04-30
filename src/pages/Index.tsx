
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ChatBotSection from "@/components/ChatBotSection";
import PromiseSection from "@/components/PromiseSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import AICapabilitiesPreviewSection from "@/components/AICapabilitiesPreviewSection";
import BrainstormerSection from "@/components/BrainstormerSection";
import ClientsSection from "../components/ClientsSection";

const Index = () => {
  const { 
    servicesSection, 
    serviceItems,
    aiCapabilities,
    aiProducts
  } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-b from-noesis-darkest via-noesis-dark to-noesis-darker">
      <Header />
      <HeroSection />
      
      {/* ChatBot Section with smoother transition */}
      <div className="bg-gradient-to-b from-noesis-darker to-noesis-dark py-12">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-16">
          <ChatBotSection />
        </div>
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Promise Section */}
      <div className="bg-gradient-to-b from-noesis-dark to-noesis-darker">
        <PromiseSection />
      </div>
      
      {/* Services Preview */}
      <ServicesPreviewSection />
      
      {/* AI Capabilities with improved transition */}
      <div className="bg-gradient-to-b from-noesis-darker to-noesis-dark">
        <AICapabilitiesPreviewSection capabilities={aiCapabilities} />
      </div>
      
      {/* Brainstormer Section */}
      <div className="bg-gradient-to-b from-noesis-dark to-noesis-darkest">
        <BrainstormerSection products={aiProducts} />
      </div>
      
      {/* Clients Section */}
      <ClientsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
