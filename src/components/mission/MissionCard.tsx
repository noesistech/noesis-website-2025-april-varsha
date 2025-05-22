
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
  return <div className="relative flex flex-col items-center h-full">
      {/* Icon positioned on left edge of card consistently for all devices */}
      <div className="z-20 absolute top-8 -left-6 bg-noesis-purple/15 text-noesis-purple rounded-full p-4 md:p-6 shadow-lg mx-[40px]">
        <Flag className="h-8 w-8 md:h-12 md:w-12" />
      </div>
      {/* Card content */}
      <div id="mission-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10 mt-16 pt-8 md:pt-10 w-full h-full">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 relative text-left pt-8 leading-tight">
          {title}
          <span className="absolute left-0 bottom-[-15px] w-16 h-1 bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full"></span>
        </h3>
        <p className="text-standard mt-4 md:mt-6 text-left">
          {description}
        </p>
      </div>
    </div>;
};
export default MissionCard;
