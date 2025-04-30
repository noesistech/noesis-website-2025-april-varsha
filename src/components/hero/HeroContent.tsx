import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BrainCircuit, Code } from 'lucide-react';
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
  return <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 ease-out py-0 sm:py-0`}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7 leading-tight">
        <span className="block">Where AI and human talent create</span>
        <span className="gradient-text block pb-2 my-0">breakthrough solutions.</span>
      </h1>
      <p className="text-standard mb-3 sm:mb-3 md:mb-4 max-w-2xl mx-0 py-0 px-0 my-[35px]">
        As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a href="#chatbot" className="inline-block">
          <Button className="text-white text-md sm:text-lg py-2 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 w-full" variant="noesis">
            <BrainCircuit className="mr-1" /> Try AI Assistant
          </Button>
        </a>
        <a href="#services-preview" className="inline-block">
          <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 text-md sm:text-lg py-2 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 w-full">
            <Code className="mr-1" /> Our Services
          </Button>
        </a>
      </div>
    </div>;
};
export default HeroContent;