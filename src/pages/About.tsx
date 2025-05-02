
import React from 'react';
import Header from '../components/Header';
import AboutStatsSection from '../components/AboutStatsSection';
import MissionSection from '../components/MissionSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';
import SubpageHero from '@/components/SubpageHero';
import CompanyHistory from '@/components/about/CompanyHistory';

const About = () => {
  const { teamSection, teamMembers } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16 flex flex-col gap-16 md:gap-24">
        <SubpageHero 
          title="About Our Company"
          subtitle="Learn about our mission, vision, and the team behind our success"
          gradientText="Company"
          backgroundEffect="purple"
        />
        
        <CompanyHistory />
        
        <AboutStatsSection />
        
        <MissionSection showPromisePanel={true} />
        
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
          <TeamSection 
            title={teamSection.title} 
            subtitle={teamSection.subtitle} 
            teamMembers={teamMembers} 
          />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
