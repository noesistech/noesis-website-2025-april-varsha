
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import PromiseSection from "@/components/PromiseSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import AICapabilitiesPreviewSection from "@/components/AICapabilitiesPreviewSection";
import BrainstormerSection from "@/components/BrainstormerSection";
import ClientsSection from "../components/ClientsSection";
import ChatBotSection from "@/components/ChatBotSection";
import ScrollToTop from "@/components/ScrollToTop";

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
      <main className="pt-16 sm:pt-20 md:pt-16">
        <HeroSection />
        
        {/* ChatBot Section - needed for the #chatbot anchor */}
        <div id="chatbot">
          <ChatBotSection />
        </div>
        
        {/* About Section */}
        <AboutSection />
        
        {/* Promise Section - removed extra wrapper div */}
        <PromiseSection />
        
        {/* Services Preview */}
        <section id="services-preview">
          <ServicesPreviewSection />
        </section>
        
        {/* AI Capabilities - removed separate gradient div */}
        <AICapabilitiesPreviewSection capabilities={aiCapabilities} />
        
        {/* Brainstormer Section */}
        <BrainstormerSection products={aiProducts} />
        
        {/* Clients Section */}
        <ClientsSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
