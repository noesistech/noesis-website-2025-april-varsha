
import React from 'react';
import { Flag } from 'lucide-react';

interface MissionCardProps {
  title: string;
  description: string;
}

const MissionCard = ({
  title,
  description
}: MissionCardProps) => {
  return (
    <div id="mission-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10 mt-20">
      <div className="absolute -top-16 md:-top-20 left-0 md:-left-6 p-4 md:p-6 rounded-full bg-noesis-purple/15 text-noesis-purple">
        <Flag className="h-8 w-8 md:h-12 md:w-12" />
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4 md:mb-8 pt-4 md:pt-6 relative">
        {title}
        <span className="absolute left-0 bottom-[-15px] w-16 h-1 bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full"></span>
      </h3>
      <p className="text-white/80 text-lg md:text-xl leading-relaxed mt-4 md:mt-8">
        {description}
      </p>
    </div>
  );
};

export default MissionCard;
