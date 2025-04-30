
import React from 'react';
import { useContent } from '@/contexts/ContentContext';

const ClientLogosSection = () => {
  const { clientLogos } = useContent();
  
  // Double the logos array to create the continuous scrolling effect
  const repeatedLogos = [...clientLogos, ...clientLogos];
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden w-full">
          {/* Main container that will animate infinitely */}
          <div className="overflow-hidden">
            <div className="flex animate-[scroll_40s_linear_infinite] items-center">
              {repeatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`} 
                  className="flex-shrink-0 mx-8 my-2 w-[120px] md:w-[140px] h-[60px] flex items-center justify-center"
                >
                  <img 
                    src={logo.image_url} 
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays for smooth fade effect on edges - updated to match background */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1A1F2C] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1A1F2C] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
