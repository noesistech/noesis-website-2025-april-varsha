
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import ServiceCardsContainer from './hero/ServiceCardsContainer';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Only apply mouse move effect on non-mobile devices
    if (isMobile) return;
    
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
  }, [isMobile]);
  
  return (
    <div 
      ref={heroRef}
      className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden pt-16 md:pt-20"
      style={{
        background: 'linear-gradient(135deg, rgba(15,17,26,1) 0%, rgba(40,24,64,1) 100%)'
      }}
    >
      <HeroBackground />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <HeroContent />
          <div className="block">
            <ServiceCardsContainer />
          </div>
        </div>
      </div>
      
      {/* Scroll arrow with enhanced styling - Updated href to point to chatbot section */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce z-20">
        <a 
          href="#chatbot" 
          className="text-white/80 hover:text-white transition-colors bg-noesis-dark/50 p-2 rounded-full backdrop-blur-sm shadow-lg border border-white/10 hover:border-white/20"
          aria-label="Scroll to chatbot section"
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
      </div>
      
      {/* Enhanced gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-noesis-darker to-transparent"></div>
    </div>
  );
};

export default HeroSection;
