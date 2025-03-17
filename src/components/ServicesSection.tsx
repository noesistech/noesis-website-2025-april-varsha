
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Palette, Globe, Image, Cloud, BrainCircuit, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type Service = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
};

const services: Service[] = [
  {
    id: 'ui-ux',
    icon: <Palette className="h-12 w-12 text-noesis-purple" />,
    title: 'UI/UX',
    description: 'Design captivating, user-friendly interfaces for websites, apps, and software.',
  },
  {
    id: 'web-dev',
    icon: <Globe className="h-12 w-12 text-noesis-blue" />,
    title: 'Web and Application Development',
    description: 'Build dynamic websites, microsites, web apps and captivating landing pages.',
  },
  {
    id: 'graphics',
    icon: <Image className="h-12 w-12 text-purple-400" />,
    title: 'Graphics and Content Creation',
    description: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Writing compelling website copy, blog articles, and interface content.</li>
        <li>Designing eye-catching banners and visually appealing infographics.</li>
      </ul>
    ),
  },
  {
    id: 'cloud',
    icon: <Cloud className="h-12 w-12 text-pink-400" />,
    title: 'Cloud Services & DevOps',
    description: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Ensure reliable website and app hosting.</li>
        <li>Optimize servers for peak performance, including advanced configurations like autoscaling.</li>
        <li>Flexibility with "Bring Your Own Cloud," supporting AWS, Digital Ocean, Heroku, etc., and offering dedicated bare metal servers for control.</li>
      </ul>
    ),
  },
  {
    id: 'ai',
    icon: <BrainCircuit className="h-12 w-12 text-green-400" />,
    title: 'AI Customized Solutions',
    description: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Intelligent Insights: Extract meaningful patterns from unstructured data.</li>
        <li>Personalized Content: Generate tailored, brand-aligned content at scale.</li>
        <li>Next-Gen Experiences: Transform audience engagement with advanced AI.</li>
      </ul>
    ),
  },
  {
    id: 'staff',
    icon: <Users className="h-12 w-12 text-yellow-400" />,
    title: 'Staff Augmentation / Offshoring',
    description: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Access to over 500+ high quality bench resources.</li>
        <li>Expertise in wide range of Frontend, Backend, Fullstack, AI & ML, DevOps & AWS and many more technologies.</li>
        <li>Retention rate of more than 90%.</li>
        <li>Remote and On-site both kind of deployments.</li>
      </ul>
    ),
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-16">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className={cn(
                "glass-card group transition-all duration-300 hover:bg-white/10 cursor-pointer transform hover:-translate-y-2",
                activeService === service.id ? "ring-2 ring-noesis-purple" : ""
              )}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 gradient-text">{service.title}</h3>
                <div className={cn(
                  "overflow-hidden transition-all duration-500",
                  activeService === service.id ? "max-h-96" : "max-h-16"
                )}>
                  <div className="text-white/80">
                    {service.description}
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <span className="text-noesis-purple text-sm">
                    {activeService === service.id ? "Show less" : "Learn more"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
