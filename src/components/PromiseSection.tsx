
import React from 'react';
import { missionSectionData } from '@/data/content/mission';

const PromiseSection = () => {
  return (
    <section className="page-section relative overflow-hidden bg-noesis-dark py-16 sm:py-24">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="mb-10 text-4xl md:text-5xl font-bold">
          <span>Our </span><span className="text-noesis-purple">Promise</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#2A2F3C]/70 backdrop-blur-sm rounded-xl p-8 md:p-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white">
              <span>Human </span>
              <span className="gradient-text underline decoration-noesis-purple decoration-2 underline-offset-8">creativity</span>
              <span>, AI </span>
              <span className="gradient-text underline decoration-noesis-purple decoration-2 underline-offset-8">precision</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
