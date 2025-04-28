
import React from 'react';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import MissionSection from '../components/MissionSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { useContent } from '@/contexts/ContentContext';

const About = () => {
  const { teamSection, teamMembers } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        <AboutSection />
        <MissionSection />
        <TeamSection 
          title={teamSection.title} 
          subtitle={teamSection.subtitle} 
          teamMembers={teamMembers} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default About;
