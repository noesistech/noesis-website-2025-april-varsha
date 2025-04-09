
import React from 'react';
import { Flag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MissionCardProps {
  title: string;
  description: string;
}

const MissionCard = ({
  title,
  description
}: MissionCardProps) => {
  const isMobile = useIsMobile();

  return (
    <div id="mission-card" className={`glass-card animate-fade-in relative transition-transform duration-500 ease-out transform ${isMobile ? 'p-3' : 'p-4 sm:p-8 md:p-10'} ${isMobile ? 'mt-6' : 'mt-10 sm:mt-20'}`}>
      <div className={`absolute ${isMobile ? "-top-8" : "-top-10 sm:-top-20"} left-0 md:-left-6 ${isMobile ? 'p-2' : 'p-4 sm:p-6'} rounded-full bg-noesis-purple/15 text-noesis-purple`}>
        <Flag className={`${isMobile ? "h-6 w-6" : "h-8 w-8 md:h-12 md:w-12"}`} />
      </div>
      <h3 className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-bold gradient-text mb-2 sm:mb-4 md:mb-8 pt-4 sm:pt-6 relative`}>
        {title}
        <span className="absolute left-0 bottom-[-15px] w-16 h-1 bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full"></span>
      </h3>
      <p className={`text-white/80 ${isMobile ? 'text-sm' : 'text-base sm:text-xl md:text-lg'} leading-relaxed mt-2 sm:mt-4 md:mt-8`}>
        {description}
      </p>
    </div>
  );
};

export default MissionCard;
