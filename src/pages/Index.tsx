
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
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
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <HeroSection />
      <ChatBotSection />
      <AboutSection />
      <PromiseSection />
      <ServicesPreviewSection />
      <AICapabilitiesPreviewSection capabilities={aiCapabilities} />
      <BrainstormerSection products={aiProducts} />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
