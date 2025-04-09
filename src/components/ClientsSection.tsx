
import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ClientsSection = () => {
  const {
    clientsSection,
    clientLogos,
    partnerLogos,
    testimonials
  } = useContent();
  const isMobile = useIsMobile();

  return <section id="clients" className="bg-gradient-to-b from-noesis-darkest to-noesis-dark py-[50px]">
      <div className="container mx-auto px-4">
        {clientsSection && <div className="text-center">
            <h2 className="section-title">Our <span className="gradient-text">Clients & Partners</span></h2>
          </div>}
        
        {/* Clients Logos */}
        {clientLogos && clientLogos.length > 0 && <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-center">{clientsSection?.clients_subtitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {clientLogos.map(logo => <div key={logo.id} className="p-4 grayscale hover:grayscale-0 transition-all">
                  <img src={logo.image_url} alt={logo.name} className="max-h-16 mx-auto" />
                </div>)}
            </div>
          </div>}
        
        {/* Partners Logos */}
        {partnerLogos && partnerLogos.length > 0 && <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-center">{clientsSection?.partners_subtitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {partnerLogos.map(logo => <div key={logo.id} className="p-4 grayscale hover:grayscale-0 transition-all">
                  <img src={logo.image_url} alt={logo.name} className="max-h-16 mx-auto" />
                </div>)}
            </div>
          </div>}
        
        {/* Testimonials - Carousel for mobile, grid for desktop */}
        {testimonials && testimonials.length > 0 && <div>
            <h3 className="text-2xl font-semibold mb-12 text-center">{clientsSection?.testimonials_subtitle}</h3>
            
            {isMobile ? (
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
                autoplay={true}
                interval={6000}
              >
                <CarouselContent>
                  {testimonials.map(testimonial => (
                    <CarouselItem key={testimonial.id}>
                      <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 h-full">
                        <blockquote className="text-lg mb-4 text-white/90">{testimonial.quote}</blockquote>
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold"><span className="gradient-text">{testimonial.author}</span></div>
                            <div className="text-sm text-white/70">{testimonial.position}, {testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0 mr-2" />
                  <CarouselNext className="static translate-y-0 ml-2" />
                </div>
              </Carousel>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
                    <blockquote className="text-lg mb-4 text-white/90">{testimonial.quote}</blockquote>
                    <div className="flex items-center">
                      <div>
                        <div className="font-semibold"><span className="gradient-text">{testimonial.author}</span></div>
                        <div className="text-sm text-white/70">{testimonial.position}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>)}
              </div>
            )}
          </div>}
      </div>
    </section>;
};

export default ClientsSection;
