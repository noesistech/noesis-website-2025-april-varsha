import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import { useDeviceType } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ClientsSection = () => {
  const {
    clientsSection,
    testimonials,
    clientLogos
  } = useContent();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const showCarousel = isMobile || isTablet;

  // Double the logos array to create the continuous scrolling effect
  const repeatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="page-section overflow-hidden relative">
      {/* Background gradients similar to BrainstormerSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-noesis-blue/20 rounded-full filter blur-[100px] opacity-30"></div>
      
      <div className="container mx-auto px-4">
        {/* Testimonials Section */}
        {clientsSection && <div className="text-center mb-6">
            <h2 className="section-title py-0 my-0">
              <span className="text-white">Client</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#997aff] to-[#987aff]">Testimonials</span>
            </h2>
            {clientsSection.subtitle && <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg mt-3 mb-6">
                {clientsSection.subtitle}
              </p>}
          </div>}
        
        {/* Testimonials - Carousel for mobile/tablet, grid for desktop */}
        {testimonials && testimonials.length > 0 && <div className="mb-24">
            {showCarousel ? <Carousel opts={{
          align: "center",
          loop: true
        }} className="w-full" autoplay={true} interval={6000}>
                <CarouselContent>
                  {testimonials.map(testimonial => <CarouselItem key={testimonial.id}>
                      <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 h-full shadow-xl">
                        <blockquote className="text-lg mb-4 text-white/90">{testimonial.quote}</blockquote>
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold"><span className="gradient-text">{testimonial.author}</span></div>
                            <div className="text-sm text-white/70">{testimonial.position}, {testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0 mr-2" />
                  <CarouselNext className="static translate-y-0 ml-2" />
                </div>
              </Carousel> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-xl">
                    <blockquote className="text-lg mb-4 text-white/90">{testimonial.quote}</blockquote>
                    <div className="flex items-center">
                      <div>
                        <div className="font-semibold"><span className="gradient-text">{testimonial.author}</span></div>
                        <div className="text-sm text-white/70">{testimonial.position}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>}
          
        {/* Client Logos Scrolling Section - moved below testimonials */}
        <div className="relative overflow-hidden w-full">
          <div className="overflow-hidden">
            <div className="flex animate-[scroll_40s_linear_infinite] items-center">
              {repeatedLogos.map((logo, index) => <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 w-[120px] sm:w-[140px] md:w-[160px] h-[60px] sm:h-[70px] flex items-center justify-center my-0">
                  <img src={logo.image_url} alt={logo.name} className="max-h-full max-w-full opacity-70 hover:opacity-100 transition-opacity duration-300" />
                </div>)}
            </div>
          </div>
          
          {/* Gradient overlays for smooth fade effect on edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-noesis-darker to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-noesis-darker to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
