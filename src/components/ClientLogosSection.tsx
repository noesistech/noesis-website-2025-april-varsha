
import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import { ScrollArea } from "@/components/ui/scroll-area";

const ClientLogosSection = () => {
  const { clientsSection, clientLogos } = useContent();
  
  // Double the logos array to create the continuous scrolling effect
  const repeatedLogos = [...clientLogos, ...clientLogos];
  
  return (
    <section className="bg-gradient-to-b from-noesis-darkest to-noesis-dark py-12 border-t border-gray-800/30">
      <div className="container mx-auto px-4">
        {clientsSection && (
          <div className="text-center mb-10">
            <h3 className="text-xl font-medium text-white">
              {clientsSection.clients_subtitle}
            </h3>
          </div>
        )}
        
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
                    className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays for smooth fade effect on edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-noesis-darkest to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-noesis-darkest to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
