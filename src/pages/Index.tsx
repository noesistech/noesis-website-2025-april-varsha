
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesPreviewSection from '../components/ServicesPreviewSection';
import ChatBotSection from '../components/ChatBotSection';
import Footer from '../components/Footer';
import SolutionsSection from '../components/SolutionsSection';
import AICapabilitiesPreviewSection from '../components/AICapabilitiesPreviewSection';
import BrainstormerSection from '../components/BrainstormerSection';
import TechStackSection from '../components/TechStackSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';
import FounderSection from '@/components/founder/FounderSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesPreviewSection />
        <AICapabilitiesPreviewSection />
        
        {/* Add the Founder Section with CTA */}
        <section className="bg-[#1A1F2C] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Leadership</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
              <p className="text-white/80">
                Meet the visionary behind Noesis.tech and learn about our innovative approach to AI solutions.
              </p>
            </div>
            
            <FounderSection showCta={true} />
          </div>
        </section>
        
        <BrainstormerSection />
        <TechStackSection />
        <SolutionsSection />
        <ClientsSection />
        <ContactSection />
        <ChatBotSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
