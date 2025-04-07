
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Small delay to ensure animation triggers after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 ease-out py-0 sm:py-0`}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
        <span className="block">Where AI and human talent create</span>
        <span className="gradient-text block">breakthrough solutions.</span>
      </h1>
      <p className="text-lg sm:text-xl text-white/80 mb-3 sm:mb-3 md:mb-4 max-w-2xl">
        As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a href="#contact" className="inline-block">
          <Button className="text-white text-md sm:text-lg py-2 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 w-full" variant="noesis">
            Get in Touch
          </Button>
        </a>
        <a href="#services" className="inline-block">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-md sm:text-lg py-2 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 w-full">
            Our Services
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
