
import React from 'react';
import { useContent } from '@/contexts/ContentContext';

const AboutStatsSection = () => {
  const { stats } = useContent();
  
  return (
    <section id="about" className="page-section py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-2">
          <span className="text-white">About</span> <span className="gradient-text">Us</span>
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
          Building innovative solutions with cutting-edge technology
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats && stats.map((stat, index) => (
            <div key={stat.id || index} className="glass-card text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
