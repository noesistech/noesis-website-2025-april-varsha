import React from 'react';
import Header from '../components/Header';
import MissionSection from '../components/MissionSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';
import SubpageHero from '@/components/SubpageHero';
import CompanyHistory from '@/components/about/CompanyHistory';
import FounderSection from '@/components/founder/FounderSection';
import CultureSection from '@/components/about/CultureSection';
import CareersSection from '@/components/about/CareersSection';
import ChatBotSection from '@/components/ChatBotSection';
import ContactBanner from '@/components/ContactBanner';
import FilterableTeamSection from '@/components/FilterableTeamSection';
const About = () => {
  return <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16">
        <SubpageHero title="About Our Company" subtitle="Learn about our mission, vision, and how we blend human expertise with AI innovation" gradientText="Company" backgroundEffect="purple" />
        
        <CompanyHistory />
        
        <MissionSection showPromisePanel={false} />
        
        <CultureSection />
        
        <FilterableTeamSection />
        
        <section className="py-[10px]">
          <div className="container mx-auto px-4 md:px-6 py-[15px]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Leadership</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
            </div>
            
            <FounderSection />
          </div>
        </section>
        
        <CareersSection />
        
        {/* AI Assistant Section */}
        <ChatBotSection />
        
        {/* Contact Banner - No bottom margin needed as it connects to footer */}
        <ContactBanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>;
};
export default About;