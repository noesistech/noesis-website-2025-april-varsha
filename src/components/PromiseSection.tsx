
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const PromiseSection = () => {
  const promiseCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-noesis-purple/10 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-noesis-blue/10 rounded-full filter blur-[60px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="mb-10 text-4xl md:text-5xl font-bold">
          <span className="text-white">Our </span><span className="text-noesis-purple">Promise</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={promiseCardRef}
            className="bg-[#2A2F3C]/70 backdrop-blur-sm rounded-xl p-8 md:p-10 transition-transform duration-300 ease-out shadow-xl border border-white/5 hover:border-white/10"
          >
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
