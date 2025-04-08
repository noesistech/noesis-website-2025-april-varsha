import React, { useRef, useEffect } from 'react';
import { missionSectionData } from '@/data/content/mission';
import MissionCard from './mission/MissionCard';
import VisionCard from './mission/VisionCard';
import PromisePanel from './mission/PromisePanel';
import BackgroundPattern from './mission/BackgroundPattern';
import MissionStyles from './mission/MissionStyles';
const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      const missionCard = sectionRef.current.querySelector('#mission-card');
      const visionCard = sectionRef.current.querySelector('#vision-card');
      if (missionCard && visionCard) {
        const translateY = scrollPercent * 50;
        (missionCard as HTMLElement).style.transform = `translateY(-${translateY}px)`;
        (visionCard as HTMLElement).style.transform = `translateY(-${translateY * 0.7}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configuration for the grid pattern
  const gridRows = 16;
  const gridCols = 24;
  return <section id="mission" className="py-10 relative overflow-hidden bg-noesis-dark" ref={sectionRef}>
      <BackgroundPattern gridRows={gridRows} gridCols={gridCols} />
      
      <div className="container mx-auto px-6 relative z-10 py-[15px]">
        <h2 className="section-title mb-20">Mission & Vision</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <MissionCard title={missionSectionData.mission_title} description={missionSectionData.mission_description} />
          
          <VisionCard title={missionSectionData.vision_title} description={missionSectionData.vision_description} />
        </div>
        
        <PromisePanel title={missionSectionData.promise_title} text={missionSectionData.promise_text} />
      </div>
      
      <MissionStyles gridRows={gridRows} gridCols={gridCols} />
    </section>;
};
export default MissionSection;