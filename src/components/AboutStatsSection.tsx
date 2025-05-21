
import React from 'react';
import { Users, Award, Clock, Percent } from 'lucide-react';
import P5Animation from './P5Animation';
import { useDeviceType } from '@/hooks/use-mobile';
import { useContent } from '@/contexts/ContentContext';

const AboutStatsSection = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const { stats } = useContent();

  return (
    <section className="w-full py-12 md:py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="absolute inset-0 overflow-hidden">
          <P5Animation
            className="stats-animation"
          />
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Impact</span> By The Numbers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats && stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-lg text-center hover:border-noesis-purple/50 transition-all duration-300"
            >
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-noesis-purple/20 border border-noesis-purple/30">
                {getStatIcon(stat.icon_name)}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users':
      return <Users className="w-6 h-6 text-purple-400" />;
    case 'Trophy':
      return <Award className="w-6 h-6 text-purple-400" />;
    case 'Calendar':
      return <Clock className="w-6 h-6 text-purple-400" />;
    case 'Percent':
    default:
      return <Percent className="w-6 h-6 text-purple-400" />;
  }
};

export default AboutStatsSection;
