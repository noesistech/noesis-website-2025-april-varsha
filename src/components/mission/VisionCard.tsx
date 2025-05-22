import React from 'react';
import { Gem } from 'lucide-react';
interface VisionCardProps {
  title: string;
  description: string;
}
const VisionCard = ({
  title,
  description
}: VisionCardProps) => {
  return <div className="relative flex flex-col items-center h-full" style={{
    animationDelay: '0.2s'
  }}>
      {/* Icon positioned on top edge of card */}
      <div className="z-20 absolute -top-6 left-0 -translate-x-1/2 bg-noesis-blue/15 text-noesis-blue rounded-full p-4 md:p-6 shadow-lg my-[32px] mx-[66px]">
        <Gem className="h-8 w-8 md:h-12 md:w-12" />
      </div>
      {/* Card content */}
      <div id="vision-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10 mt-16 pt-8 md:pt-10 w-full h-full">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4 md:mb-8 relative text-center">
          {title}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-15px] w-16 h-1 bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full"></span>
        </h3>
        <p className="text-standard mt-4 md:mt-8 text-center">
          {description}
        </p>
      </div>
    </div>;
};
export default VisionCard;