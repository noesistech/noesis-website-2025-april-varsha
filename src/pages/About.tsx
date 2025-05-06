
import React, { useEffect } from 'react';
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
import ContactBanner from '@/components/ContactBanner';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation on component mount and when location changes
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure DOM is ready
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16">
        <SubpageHero title="About Our Company" subtitle="Learn about our mission, vision, and how we blend human expertise with AI innovation" gradientText="Company" backgroundEffect="purple" />
        
        {/* Our Story Section with ID for navigation */}
        <section id="our-story">
          <CompanyHistory />
        </section>
        
        {/* Mission & Vision Section with ID for navigation */}
        <section id="mission-vision">
          <MissionSection showPromisePanel={false} />
        </section>
        
        <CultureSection />
        
        {/* Team Section with ID for navigation */}
        <section id="team" className="py-[10px]">
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
        
        {/* Careers Section with ID for navigation */}
        <section id="careers">
          <CareersSection />
        </section>
        
        {/* Contact Banner - No bottom margin needed as it connects to footer */}
        <ContactBanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
