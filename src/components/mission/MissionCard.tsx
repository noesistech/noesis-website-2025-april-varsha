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
  return <div id="mission-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10 mt-20">
      <div className="absolute -top-20 left-0 md:-left-6 p-6 rounded-full bg-noesis-purple/15 text-noesis-purple">
        <Flag className="h-10 w-10 md:h-12 md:w-12" />
      </div>
      <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-8 pt-6">
        {title}
      </h3>
      <p className="text-white/80 text-xl leading-relaxed md:text-lg">
        {description}
      </p>
    </div>;
};
export default MissionCard;