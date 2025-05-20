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
import ClientsSection from '../components/ClientsSection';
import ContactBanner from '../components/ContactBanner';
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
        
        {/* Updated Founder Section with consistent styling */}
        <section className="page-section py-16 sm:py-20 overflow-hidden relative">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="section-title">
                Meet Our <span className="gradient-text">Founder</span>
              </h2>
              <p className="section-subtitle">Learn about the visionary behind Noesis.tech</p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
              <div className="lg:w-1/3">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  {/* Base image */}
                  <img src="/lovable-uploads/af4dc9fd-e708-4fc8-b6e5-d4dee4f5961d.png" alt="Sidd - Founder of Noesis.tech" className="w-full h-auto relative z-[1]" />
                  
                  {/* Color overlay with blend mode */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple/60 via-noesis-blue/40 to-noesis-teal/50 mix-blend-overlay z-[2]"></div>
                  
                  {/* Cyberpunk scan lines */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_2px] animate-pulse opacity-30 z-[3]"></div>
                  
                  {/* Enhanced glow effect around borders */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-noesis-purple via-noesis-blue to-noesis-teal rounded-2xl blur opacity-50 z-[0]"></div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-white mb-1">Siddharth Bhansali</h4>
                  <p className="text-noesis-purple">Founder & CEO</p>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-lg">
                  <p className="text-white/80 leading-relaxed text-xl">
                    Sidd is a dynamic technology entrepreneur and seasoned consultant, combining deep expertise in AI, digital transformation, and software engineering. As the founder of Noesis.tech, he leads a team focused on building impactful tech solutions that drive growth for startups and mid-sized enterprises.
                  </p>
                </div>
                
                {/* Moved CTA button outside of the gradient card */}
                <div className="mt-6 flex justify-center">
                  <a href="/about" className="bg-noesis-purple/30 border border-noesis-purple hover:bg-noesis-purple/40 text-white hover:scale-105 shadow-[0_0_10px_rgba(160,116,255,0.3)] px-6 py-2 rounded-md text-sm font-medium transition-all">
                    Meet Our Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <SolutionsSection 
          title={solutionsSection.title} 
          subtitle={solutionsSection.subtitle}
          solutions={solutionItems} 
        />
        <ClientsSection />
      </main>
      
      {/* Remove margin from container and update comment */}
      <div className="contact-footer-container" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <ContactBanner />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
