
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ChatBotSection from "@/components/ChatBotSection";
import PromiseSection from "@/components/PromiseSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import AICapabilitiesPreviewSection from "@/components/AICapabilitiesPreviewSection";

const Index = () => {
  const { 
    servicesSection, 
    serviceItems,
    aiCapabilities
  } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <HeroSection />
      <AboutSection />
      <PromiseSection />
      <ServicesPreviewSection />
      <AICapabilitiesPreviewSection capabilities={aiCapabilities} />
      <ClientsSection />
      <ChatBotSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
