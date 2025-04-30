
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
          {serviceItems.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl hover:shadow-noesis-purple/30 transition-all duration-300 flex flex-col items-center text-center hover:border-noesis-purple/30 group"
            >
              <div className={`bg-[#1A1F2C]/90 p-3 rounded-full w-fit mb-3 group-hover:bg-noesis-purple/20 transition-colors duration-300 border border-white/5 group-hover:border-noesis-purple/30`}>
                <div className="text-noesis-purple group-hover:text-white transition-colors duration-300">
                  {getIconByName(service.icon_name)}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-noesis-purple transition-colors duration-300">{service.title}</h3>
              <Button 
                variant="ghost" 
                className="text-noesis-purple hover:text-white hover:bg-noesis-purple/20 p-0 w-fit opacity-80 group-hover:opacity-100"
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
            className="group shadow-lg hover:shadow-noesis-purple/50" 
            asChild
          >
            <Link to="/services" className="inline-flex items-center gap-2">
              View All Services 
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-30" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-noesis-blue/10 rounded-full filter blur-[80px] opacity-20" />
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] bg-noesis-teal/10 rounded-full filter blur-[70px] opacity-20" />
    </section>
  );
};

export default ServicesPreviewSection;
