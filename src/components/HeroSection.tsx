
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import ServiceCardsContainer from './hero/ServiceCardsContainer';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const glowElements = hero.querySelectorAll('.glow-element');
      
      glowElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (el as HTMLElement).style.setProperty('--x', `${x}px`);
        (el as HTMLElement).style.setProperty('--y', `${y}px`);
      });
    };
    
    // Debounced version of mouse move handler to improve performance
    let requestId: number;
    const debouncedHandleMouseMove = (e: MouseEvent) => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      requestId = requestAnimationFrame(() => {
        handleMouseMove(e);
      });
    };
    
    window.addEventListener('mousemove', debouncedHandleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', debouncedHandleMouseMove);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 font-inter"
      style={{
        background: 'linear-gradient(135deg, rgba(26,31,44,1) 0%, rgba(50,30,80,1) 100%)'
      }}
    >
      <HeroBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <ServiceCardsContainer />
        </div>
      </div>
      
      {/* Scroll arrow - adjusted position to be more visible */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce z-20">
        <a href="#about" className="text-white/70 hover:text-white transition-colors bg-noesis-dark/40 p-2 rounded-full backdrop-blur-sm">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
