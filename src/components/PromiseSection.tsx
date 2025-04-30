
import React from 'react';
import PromisePanel from './mission/PromisePanel';
import { missionSectionData } from '@/data/content/mission';

const PromiseSection = () => {
  return (
    <section className="page-section relative overflow-hidden bg-noesis-dark py-12 sm:py-16">
      <div className="container mx-auto px-6 relative z-10">
        <PromisePanel 
          title={missionSectionData.promise_title} 
          subtitle={missionSectionData.promise_subtitle}
          text={missionSectionData.promise_text} 
        />
      </div>
    </section>
  );
};

export default PromiseSection;
