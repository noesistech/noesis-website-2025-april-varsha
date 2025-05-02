
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
    <section className="w-full py-16 bg-gradient-to-b from-[#232736] to-[#1A1F2C] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTI5LjkgMCAyOS45IDYwTTYwIDMwLjEgMCAzMC4xIiBzdHJva2U9IiM0MDQwNDAiIHN0cm9rZS13aWR0aD0iLjMiLz48L3N2Zz4=')] opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-noesis-purple">Impact</span> by Numbers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our achievements and milestones reflect our commitment to excellence and innovation in everything we do.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="bg-[#242836]/80 backdrop-blur-sm border border-purple-500/10 p-8 rounded-xl flex flex-col items-center justify-center animate-fade-in shadow-lg hover:shadow-purple-500/5 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                {getStatIcon(stat.icon_name)}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-purple-300">{stat.value}</h3>
              <p className="text-sm text-gray-400 text-center mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* P5 Animation Section */}
        <div className="mt-20 md:mt-24 bg-[#1d212f]/50 border border-purple-500/10 rounded-xl p-1 overflow-hidden shadow-lg">
          <div className={`w-full ${isMobile || isTablet ? 'h-[40vh]' : 'h-[50vh]'} relative rounded overflow-hidden`}>
            <P5Animation />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                The Perfect Blend of <span className="text-noesis-purple">Human & AI</span>
              </h3>
              <p className="text-gray-300 max-w-2xl">
                Our network of human experts and AI systems work in perfect harmony to create innovative solutions that drive business growth and transformation.
              </p>
            </div>
          </div>
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
