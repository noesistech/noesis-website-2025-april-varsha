
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { getIconByName } from '@/components/hero/ServiceCard';

const ServicesPreviewSection = () => {
  const { serviceItems } = useContent();

  return (
    <section className="bg-[#1A1F2C] relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Our <span className="text-noesis-purple">Services</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We combine human creativity with AI precision to deliver exceptional solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {serviceItems.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#222732]/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl hover:shadow-noesis-purple/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-3">
                {getIconByName(service.icon_name)}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{service.title}</h3>
              <Button 
                variant="ghost" 
                className="text-noesis-purple hover:text-white hover:bg-noesis-purple/20 p-0 w-fit"
                asChild
                size="sm"
              >
                <Link to="/services" className="flex items-center gap-1">
                  Learn more <ChevronRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="noesis" 
            size="lg" 
            className="group" 
            asChild
          >
            <Link to="/services" className="inline-flex items-center gap-2">
              View All Services 
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-30" />
    </section>
  );
};

export default ServicesPreviewSection;
