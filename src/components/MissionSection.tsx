
import React, { useRef, useEffect } from 'react';
import { missionSectionData } from '@/data/content/mission';
import MissionCard from './mission/MissionCard';
import VisionCard from './mission/VisionCard';
import PromisePanel from './mission/PromisePanel';
import BackgroundPattern from './mission/BackgroundPattern';
import MissionStyles from './mission/MissionStyles';
import { useIsMobile } from '@/hooks/use-mobile';

interface MissionSectionProps {
  showPromisePanel?: boolean;
}

const MissionSection = ({ showPromisePanel = true }: MissionSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      const missionCard = sectionRef.current.querySelector('#mission-card');
      const visionCard = sectionRef.current.querySelector('#vision-card');
      if (missionCard && visionCard) {
        const translateY = scrollPercent * (isMobile ? 30 : 50);
        (missionCard as HTMLElement).style.transform = `translateY(-${translateY}px)`;
        (visionCard as HTMLElement).style.transform = `translateY(-${translateY * 0.7}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const gridRows = 16;
  const gridCols = 24;

  return <section id="mission" ref={sectionRef} className="page-section relative overflow-hidden bg-[#1A1F2C] py-12 sm:py-16">
      <BackgroundPattern gridRows={gridRows} gridCols={gridCols} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Mission & Vision</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto mb-12">
          <MissionCard title={missionSectionData.mission_title} description={missionSectionData.mission_description} />
          <VisionCard title={missionSectionData.vision_title} description={missionSectionData.vision_description} />
        </div>
        {showPromisePanel && (
          <PromisePanel 
            title={missionSectionData.promise_title} 
            subtitle={missionSectionData.promise_subtitle}
            text={missionSectionData.promise_text} 
          />
        )}
      </div>
      <MissionStyles gridRows={gridRows} gridCols={gridCols} />
    </section>;
};

export default MissionSection;
