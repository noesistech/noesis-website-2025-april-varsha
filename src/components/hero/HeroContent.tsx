
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroContent = () => {
  return (
    <div className="animate-fade-in py-0 sm:py-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">
        <span>Where AI and human talent</span><br />
        <span className="gradient-text">create breakthrough solutions.</span>
      </h1>
      <p className="text-lg sm:text-xl text-white/80 mb-3 sm:mb-4 md:mb-5 max-w-2xl">
        As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a href="#contact" className="inline-block">
          <Button className="text-white text-md sm:text-lg py-3 sm:py-4 md:py-5 px-5 sm:px-6 md:px-8 w-full" variant="noesis">
            Get in Touch
          </Button>
        </a>
        <a href="#services" className="inline-block">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-md sm:text-lg py-3 sm:py-4 md:py-5 px-5 sm:px-6 md:px-8 w-full">
            Our Services
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
