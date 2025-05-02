import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useContent } from '@/contexts/ContentContext';
const PromiseSection = () => {
  const promiseCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const {
    missionSection
  } = useContent();
  useEffect(() => {
    if (!promiseCardRef.current || isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const card = promiseCardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      if (!promiseCardRef.current) return;
      promiseCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    const element = promiseCardRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);
  return <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title">
            Our <span className="text-noesis-purple">Promise</span>
          </h2>
          
          {/* Purple divider line */}
          
          
          {/* Subtitle with proper spacing and 20px font size */}
          <p className="text-gray-300 text-xl">{missionSection.promise_subtitle}</p>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <div ref={promiseCardRef} className="bg-[#1d2130]/80 backdrop-blur-sm rounded-xl p-8 md:p-10 transition-transform duration-300 ease-out shadow-xl border border-white/5 hover:border-white/10 py-[35px]">
            <p className="text-3xl lg:text-5xl font-light tracking-wide text-white text-center md:text-3xl">
              <span>Human </span>
              <span className="text-noesis-blue">creativity</span>
              <span>, AI </span>
              <span className="text-noesis-purple">precision</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default PromiseSection;