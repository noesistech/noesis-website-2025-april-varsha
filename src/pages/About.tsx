
import React from 'react';
import Header from '../components/Header';
import MissionSection from '../components/MissionSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';
import SubpageHero from '@/components/SubpageHero';
import CompanyHistory from '@/components/about/CompanyHistory';
import FounderSection from '@/components/founder/FounderSection';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16 flex flex-col gap-16 md:gap-24">
        <SubpageHero 
          title="About Our Company"
          subtitle="Learn about our mission, vision, and how we blend human expertise with AI innovation"
          gradientText="Company"
          backgroundEffect="purple"
        />
        
        <CompanyHistory />
        
        <MissionSection showPromisePanel={false} />

        <section className="bg-[#1A1F2C] py-8 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Leadership</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
            </div>
            
            <FounderSection />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
