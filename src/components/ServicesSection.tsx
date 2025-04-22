
import React from 'react';
import { Palette, Globe, Image, Cloud, BrainCircuit, Users, ChevronDown } from 'lucide-react';
import { ServiceItem } from '@/types/supabase';
import { useIsMobile } from '@/hooks/use-mobile';
import { ServicesSection as ServicesSectionType } from '@/types/contentTypes';
import { servicesSectionData } from '@/data/content/services';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface ServicesSectionProps {
  title: string;
  services: ServiceItem[];
  servicesSection?: ServicesSectionType;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  services,
  servicesSection
}) => {
  const isMobile = useIsMobile();

  const displayServices = services && services.length > 0 ? services.map(service => ({
    id: service.id,
    icon: getIconByName(service.icon_name),
    title: service.title,
    description: service.description
  })) : [{
    id: 'uiux',
    icon: <Palette className="h-8 w-8 text-blue-400" />,
    title: 'UI/UX',
    description: 'Create exceptional user experiences through the perfect blend of human-centered design principles and AI-powered insights.'
  }, {
    id: 'webdev',
    icon: <Globe className="h-8 w-8 text-green-400" />,
    title: 'Web and Application Development',
    description: 'Build cutting-edge digital solutions with our AI-enhanced development process that combines human creativity with machine efficiency.'
  }, {
    id: 'graphics',
    icon: <Image className="h-8 w-8 text-yellow-400" />,
    title: 'Graphics and Content Creation',
    description: 'AI-assisted content creation balanced with human editorial expertise for compelling website copy and articles. Human creativity enhanced by AI tools to design captivating visuals and infographics that resonate with audiences.'
  }, {
    id: 'cloud',
    icon: <Cloud className="h-8 w-8 text-pink-400" />,
    title: 'Cloud Services & DevOps',
    description: 'AI-optimized hosting solutions managed by experienced human engineers. Intelligent performance tuning that leverages machine learning for predictive scaling while maintaining human oversight.'
  }, {
    id: 'ai',
    icon: <BrainCircuit className="h-8 w-8 text-purple-400" />,
    title: 'AI Customized Solutions',
    description: 'Human-guided AI systems that extract meaningful insights from complex data. Content generation that combines AI efficiency with human creativity for brand-perfect messaging.'
  }, {
    id: 'staff',
    icon: <Users className="h-8 w-8 text-orange-400" />,
    title: 'AI-Enhanced Staff Solutions',
    description: 'Access to 500+ high-quality professionals trained in AI-human collaboration methodologies. Teams skilled in AI integration across Frontend, Backend, Fullstack, ML, DevOps and cloud technologies.'
  }];

  return (
    <section id="services" className="page-section bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-title mb-3">
          Our <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">Services</span>
        </h2>
        {servicesSectionData.subtitle && (
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg mb-12">
            {servicesSectionData.subtitle}
          </p>
        )}
        
        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            {displayServices.map(service => (
              <AccordionItem key={service.id} value={service.id} className="mb-4 rounded-2xl overflow-hidden bg-[#222732] border-none">
                <AccordionTrigger className="px-4 py-3 flex items-center hover:no-underline">
                  <div className="flex items-center">
                    <div className="bg-[#1A1F2C]/80 p-3 rounded-full mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white text-left">{service.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-300 text-left">
                  {service.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map(service => (
              <div 
                key={service.id} 
                className="glass-card relative overflow-hidden rounded-2xl transition-all duration-300 h-full hover:border-white/30"
              >
                <div className="p-6">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-left text-white">{service.title}</h3>
                  <p className="text-gray-300 text-left">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const getIconByName = (iconName: string) => {
  const normalizedIconName = iconName.toLowerCase();

  switch (normalizedIconName) {
    case 'palette':
      return <Palette className="h-8 w-8 text-blue-400" />;
    case 'globe':
      return <Globe className="h-8 w-8 text-green-400" />;
    case 'image':
      return <Image className="h-8 w-8 text-yellow-400" />;
    case 'cloud':
      return <Cloud className="h-8 w-8 text-pink-400" />;
    case 'braincircuit':
      return <BrainCircuit className="h-8 w-8 text-purple-400" />;
    case 'users':
      return <Users className="h-8 w-8 text-orange-400" />;
    default:
      console.warn(`Icon name not recognized: ${iconName}`);
      return <Globe className="h-8 w-8" />;
  }
};

export default ServicesSection;
