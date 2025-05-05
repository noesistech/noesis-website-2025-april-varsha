
import React, { useState } from 'react';
import { Check, CircleUser, CodeXml, Lightbulb, MessageSquare, RefreshCw } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from './ui/carousel';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface WorkStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  step: number;
}

const HowWeWorkSection: React.FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [currentStep, setCurrentStep] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  
  // Update current step when carousel changes
  React.useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentStep(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);
    
    // Cleanup
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);
  
  const workSteps: WorkStep[] = [
    {
      id: 'step-1',
      title: 'Discovery & Consultation',
      description: 'We begin by understanding your business goals, challenges, and requirements through in-depth consultation.',
      icon: <MessageSquare className="h-10 w-10 text-noesis-purple" />,
      step: 1
    },
    {
      id: 'step-2',
      title: 'Strategy & Planning',
      description: 'Our team develops a comprehensive plan that combines human expertise with AI capabilities to meet your objectives.',
      icon: <Lightbulb className="h-10 w-10 text-blue-400" />,
      step: 2
    },
    {
      id: 'step-3',
      title: 'Design & Development',
      description: 'We create solutions using our hybrid human-AI approach, ensuring both creativity and technical excellence.',
      icon: <CodeXml className="h-10 w-10 text-green-400" />,
      step: 3
    },
    {
      id: 'step-4',
      title: 'Testing & Refinement',
      description: 'Rigorous testing ensures your solution performs flawlessly across all platforms and use cases.',
      icon: <RefreshCw className="h-10 w-10 text-amber-400" />,
      step: 4
    },
    {
      id: 'step-5',
      title: 'Deployment & Support',
      description: 'We handle the launch process and provide ongoing support to ensure continued success.',
      icon: <Check className="h-10 w-10 text-teal-400" />,
      step: 5
    },
    {
      id: 'step-6',
      title: 'Collaboration & Growth',
      description: 'We maintain an ongoing partnership, continuously improving your solution as your business evolves.',
      icon: <CircleUser className="h-10 w-10 text-pink-400" />,
      step: 6
    }
  ];

  return (
    <>
      {/* Desktop & Tablet Process Steps */}
      <div className="hidden md:block">
        <div className="relative mb-16">
          {/* Progress line */}
          <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-noesis-purple/30 via-noesis-purple to-noesis-purple/30 rounded-full"></div>
          
          <div className="grid grid-cols-6 gap-4">
            {workSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step indicator - made smaller */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#222732] border-2 border-noesis-purple flex items-center justify-center z-10 shadow-lg shadow-noesis-purple/20">
                  <span className="text-xs font-bold text-noesis-purple">{step.step}</span>
                </div>
                
                {/* Content card - positioned below the step indicator */}
                <div className="bg-[#222732] rounded-xl p-6 shadow-lg shadow-noesis-purple/10 border border-[#2A2F3C] mt-16
                              transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-noesis-purple/20 h-full">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-[#1A1F2C] p-4 rounded-full mb-3">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Steps Carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
          setApi={setCarouselApi}
          autoplay={true}
          interval={5000}
        >
          <div className="relative mb-8">
            {/* Progress line */}
            <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-noesis-purple/30 via-noesis-purple to-noesis-purple/30 rounded-full"></div>
            
            {/* Step indicators - made smaller */}
            <div className="flex justify-between mb-16">
              {workSteps.map((step, index) => (
                <div 
                  key={`indicator-${step.id}`}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-lg shadow-noesis-purple/20 transition-all duration-300",
                    currentStep === index 
                      ? "bg-noesis-purple border-2 border-white transform scale-115" 
                      : "bg-[#222732] border-2 border-noesis-purple"
                  )}
                >
                  <span className={cn(
                    "text-xs font-bold",
                    currentStep === index ? "text-white" : "text-noesis-purple"
                  )}>
                    {step.step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CarouselContent>
            {workSteps.map((step) => (
              <CarouselItem key={step.id}>
                <div className="bg-[#222732] rounded-xl p-6 shadow-lg shadow-noesis-purple/10 border border-[#2A2F3C]
                            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-noesis-purple/20">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-[#1A1F2C] p-4 rounded-full mb-3">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-center">{step.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default HowWeWorkSection;
