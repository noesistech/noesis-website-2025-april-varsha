
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroContent = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span>Where AI and human talent</span><br />
        <span className="gradient-text">create breakthrough solutions.</span>
      </h1>
      <p className="text-xl text-white/80 mb-8">
        As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#contact" className="inline-block">
          <Button className="text-white text-lg py-6 px-8 w-full" variant="noesis">
            Get in Touch
          </Button>
        </a>
        <a href="#services" className="inline-block">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg py-6 px-8 w-full">
            Our Services
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
