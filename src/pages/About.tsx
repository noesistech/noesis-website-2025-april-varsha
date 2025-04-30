
import React from 'react';
import Header from '../components/Header';
import AboutStatsSection from '../components/AboutStatsSection';
import MissionSection from '../components/MissionSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';

const About = () => {
  const { teamSection, teamMembers } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        <AboutStatsSection />
        <MissionSection showPromisePanel={false} />
        <TeamSection 
          title={teamSection.title} 
          subtitle={teamSection.subtitle} 
          teamMembers={teamMembers} 
        />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
