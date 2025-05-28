
import React from 'react';
import { 
  MessageSquare, 
  Lightbulb, 
  FileCode, 
  RefreshCcw, 
  Upload, 
  Users2 
} from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const HowWeWorkSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  // Use mobile layout for both mobile and tablet
  const useMobileLayout = isMobile || isTablet;

  const processSteps = [
    {
      id: 'discovery',
      icon: <MessageSquare className="h-10 w-10 text-noesis-purple" />,
      title: "Discovery & Consultation",
      description: "We begin by understanding your business goals, challenges, and requirements through in-depth consultation."
    },
    {
      id: 'strategy',
      icon: <Lightbulb className="h-10 w-10 text-noesis-blue" />,
      title: "Strategy & Planning",
      description: "Our team develops a comprehensive plan that combines human expertise with AI capabilities to meet your objectives."
    },
    {
      id: 'design',
      icon: <FileCode className="h-10 w-10 text-noesis-green" />,
      title: "Design & Development",
      description: "We create solutions using our hybrid human-AI approach, ensuring both creativity and technical excellence."
    },
    {
      id: 'testing',
      icon: <RefreshCcw className="h-10 w-10 text-yellow-400" />,
      title: "Testing & Refinement",
      description: "Rigorous testing ensures your solution performs flawlessly across all platforms and use cases."
    },
    {
      id: 'deployment',
      icon: <Upload className="h-10 w-10 text-teal-400" />,
      title: "Deployment & Support",
      description: "We handle the launch process and provide ongoing support to ensure continued success."
    },
    {
      id: 'collaboration',
      icon: <Users2 className="h-10 w-10 text-pink-400" />,
      title: "Collaboration & Growth",
      description: "We maintain an ongoing partnership, continuously improving your solution as your business evolves."
    }
  ];

  return (
    <div className="w-full">
      {useMobileLayout ? (
        <Accordion type="single" collapsible className="w-full">
          {processSteps.map((step, index) => (
            <AccordionItem 
              key={step.id} 
              value={step.id} 
              className="mb-4 rounded-2xl overflow-hidden border-none"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[#222732] to-[#1e232d] border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                <AccordionTrigger className="px-6 py-4 flex items-center hover:no-underline">
                  <div className="flex items-center">
                    <div className="bg-[#1A1F2C]/80 p-3 rounded-full mr-4 shadow-inner">
                      {step.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-purple-400 font-medium mb-1">Step {index + 1}</div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{step.title}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <CardContent className="p-4 pt-0 pb-6 bg-[#222732]/50 text-gray-300 backdrop-blur-sm">
                    {step.description}
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <Card 
              key={step.id} 
              className="bg-gradient-to-br from-[#222732] to-[#1e232d] border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden rounded-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8257e6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="text-sm text-purple-400 font-medium mb-3">Step {index + 1}</div>
                <div className="bg-[#1A1F2C]/90 p-4 rounded-full w-fit mb-4 shadow-md border border-white/5 group-hover:border-white/10 transition-all">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-left bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{step.title}</h3>
                <p className="text-gray-300 text-left">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HowWeWorkSection;
