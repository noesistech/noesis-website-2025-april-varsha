
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesPreviewSection from '../components/ServicesPreviewSection';
import ChatBotSection from '../components/ChatBotSection';
import Footer from '../components/Footer';
import SolutionsSection from '../components/SolutionsSection';
import AICapabilitiesPreviewSection from '../components/AICapabilitiesPreviewSection';
import BrainstormerSection from '../components/BrainstormerSection';
import ClientsSection from '../components/ClientsSection';
import ContactBanner from '../components/ContactBanner';
import PartnerBadgeSection from '../components/PartnerBadgeSection';
import FounderSection from '@/components/founder/FounderSection';

import PromiseSection from '@/components/PromiseSection';
import { useContent } from '@/contexts/ContentContext';

const Index = () => {
  // Access data from ContentContext
  const { 
    aiCapabilities,
    aiProducts,
    solutionsSection,
    solutionItems,
  } = useContent();
  
  const location = useLocation();
  
  // Only scroll to chatbot if explicitly requested via hash
  useEffect(() => {
    // Only handle hash-based navigation
    if (location.hash === '#chatbot') {
      setTimeout(() => {
        const chatbotElement = document.getElementById('chatbot');
        if (chatbotElement) {
          chatbotElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ChatBotSection />
        <AboutSection />
        
        {/* Promise Section - positioned directly after AboutSection */}
        <PromiseSection />
        
        <ServicesPreviewSection />
        <AICapabilitiesPreviewSection capabilities={aiCapabilities} />
        <BrainstormerSection products={aiProducts} />
        
        {/* Founder Section with consistent spacing */}
        <section className="page-section relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="section-title">
                Meet Our <span className="gradient-text">Founder</span>
              </h2>
              <p className="section-subtitle">Learn about the visionary behind Noesis.tech</p>
            </div>
            
            <FounderSection showCta={true} />
          </div>
        </section>
        
        <SolutionsSection 
          title={solutionsSection.title} 
          subtitle={solutionsSection.subtitle}
          solutions={solutionItems} 
        />
        <ClientsSection />
        <PartnerBadgeSection />
      </main>
      
      {/* Contact footer container */}
      <div className="contact-footer-container" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <ContactBanner />
        <Footer />
      </div>

    </div>
  );
};

export default Index;
