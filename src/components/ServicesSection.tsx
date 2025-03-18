
import React from 'react';
import { Card } from '@/components/ui/card';
import { Palette, Globe, Laptop, Cloud, BrainCircuit, Users, Code, PenTool, Database, TrendingUp, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceItem } from '@/types/supabase';

interface ServicesProps {
  title: string;
  services: ServiceItem[];
}

const ServicesSection: React.FC<ServicesProps> = ({ title, services }) => {
  const displayServices = services && services.length > 0 ? services.map(service => ({
    id: service.id,
    icon: getIconByName(service.icon_name),
    title: service.title,
    description: service.description,
  })) : [
    {
      id: 'ui-ux',
      icon: <PenTool className="h-12 w-12 text-noesis-purple" />,
      title: 'UI/UX',
      description: 'Create exceptional user experiences through the perfect blend of human-centered design principles and AI-powered insights.',
    },
    {
      id: 'web-dev',
      icon: <Code className="h-12 w-12 text-noesis-blue" />,
      title: 'Web and Application Development',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Build cutting-edge digital solutions with our AI-enhanced development process</li>
          <li>Combine human creativity with machine efficiency for optimal results</li>
          <li>Create responsive, accessible, and user-friendly applications</li>
        </ul>
      ),
    },
    {
      id: 'graphics',
      icon: <Palette className="h-12 w-12 text-purple-400" />,
      title: 'Graphics and Content Creation',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>AI-assisted content creation balanced with human editorial expertise for compelling website copy and articles.</li>
          <li>Human creativity enhanced by AI tools to design captivating visuals and infographics that resonate with audiences.</li>
        </ul>
      ),
    },
    {
      id: 'cloud',
      icon: <Database className="h-12 w-12 text-pink-400" />,
      title: 'Cloud Services & DevOps',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>AI-optimized hosting solutions managed by experienced human engineers.</li>
          <li>Intelligent performance tuning that leverages machine learning for predictive scaling while maintaining human oversight.</li>
          <li>Cloud flexibility with AI-enhanced configuration across AWS, Digital Ocean, Heroku, and dedicated servers managed by expert teams.</li>
        </ul>
      ),
    },
    {
      id: 'ai',
      icon: <BrainCircuit className="h-12 w-12 text-green-400" />,
      title: 'AI Customized Solutions',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Human-guided AI systems that extract meaningful insights from complex data.</li>
          <li>Content generation that combines AI efficiency with human creativity for brand-perfect messaging.</li>
          <li>Next-generation experiences where human expertise directs AI capabilities for truly transformative engagement.</li>
        </ul>
      ),
    },
    {
      id: 'staff',
      icon: <Users className="h-12 w-12 text-yellow-400" />,
      title: 'AI-Enhanced Staff Solutions',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Access to 500+ high-quality professionals trained in AI-human collaboration methodologies.</li>
          <li>Teams skilled in AI integration across Frontend, Backend, Fullstack, ML, DevOps and cloud technologies.</li>
          <li>90%+ retention rate thanks to our unique AI-human work environment.</li>
          <li>Flexible remote and on-site deployment options with AI productivity enablement.</li>
        </ul>
      ),
    },
    {
      id: 'digital-marketing',
      icon: <TrendingUp className="h-12 w-12 text-blue-400" />,
      title: 'Digital Marketing',
      description: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Data-driven marketing strategies powered by AI analytics</li>
          <li>SEO optimization that combines machine learning with human expertise</li>
          <li>Targeted advertising campaigns that leverage AI for personalization</li>
        </ul>
      )
    },
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-16">{title || "Our Services"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <Card 
              key={service.id}
              className="glass-card group transition-all duration-300 hover:bg-white/10 h-full"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 gradient-text">{service.title}</h3>
                <div className="text-white/80 flex-grow">
                  {service.description}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const getIconByName = (iconName: string) => {
  // Convert to lowercase to handle case inconsistencies in the database
  const normalizedIconName = iconName.toLowerCase();
  
  switch (normalizedIconName) {
    case 'palette':
      return <Palette className="h-12 w-12 text-noesis-purple" />;
    case 'globe':
      return <Globe className="h-12 w-12 text-noesis-blue" />;
    case 'laptop':
    case 'computer':
      return <Laptop className="h-12 w-12 text-purple-400" />;
    case 'code':
      return <Code className="h-12 w-12 text-purple-400" />;
    case 'cloud':
      return <Cloud className="h-12 w-12 text-pink-400" />;
    case 'database':
      return <Database className="h-12 w-12 text-pink-400" />;
    case 'brain':
    case 'brain-circuit':
    case 'braincircuit':
      return <BrainCircuit className="h-12 w-12 text-green-400" />;
    case 'users':
      return <Users className="h-12 w-12 text-yellow-400" />;
    case 'pen-tool':
    case 'pentool':
      return <PenTool className="h-12 w-12 text-noesis-purple" />;
    case 'trending-up':
    case 'trendingup':
      return <TrendingUp className="h-12 w-12 text-blue-400" />;
    case 'image':
      return <Image className="h-12 w-12 text-purple-400" />;
    default:
      console.warn(`Icon name not recognized: ${iconName}`);
      return <Palette className="h-12 w-12 text-noesis-purple" />;
  }
};

export default ServicesSection;
