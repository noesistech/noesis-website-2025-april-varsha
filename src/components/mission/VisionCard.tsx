
import React from 'react';
import { Gem } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface VisionCardProps {
  title: string;
  description: string;
}

const VisionCard = ({
  title,
  description
}: VisionCardProps) => {
  const isMobile = useIsMobile();

  return (
    <div id="vision-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-4 sm:p-8 md:p-10 mt-10 sm:mt-20" style={{
      animationDelay: '0.2s'
    }}>
      <div className={`absolute ${isMobile ? "-top-10" : "-top-20"} left-0 md:-left-6 p-4 sm:p-6 rounded-full bg-noesis-blue/15 text-noesis-blue`}>
        <Gem className={`h-8 w-8 md:h-12 md:w-12`} />
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4 sm:mb-8 pt-4 sm:pt-6 relative">
        {title}
        <span className="absolute left-0 bottom-[-15px] w-16 h-1 bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full"></span>
      </h3>
      <p className="text-white/80 text-base sm:text-xl md:text-lg leading-relaxed mt-4 sm:mt-8">
        {description}
      </p>
    </div>
  );
};

export default VisionCard;
