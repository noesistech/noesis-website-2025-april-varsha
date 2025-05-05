
import React from 'react';
import { Check, CircleUser, CodeXml, Lightbulb, MessageSquare, RefreshCw } from 'lucide-react';

interface WorkStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowWeWorkSection: React.FC = () => {
  const workSteps: WorkStep[] = [
    {
      id: 'step-1',
      title: 'Discovery & Consultation',
      description: 'We begin by understanding your business goals, challenges, and requirements through in-depth consultation.',
      icon: <MessageSquare className="h-10 w-10 text-noesis-purple" />
    },
    {
      id: 'step-2',
      title: 'Strategy & Planning',
      description: 'Our team develops a comprehensive plan that combines human expertise with AI capabilities to meet your objectives.',
      icon: <Lightbulb className="h-10 w-10 text-blue-400" />
    },
    {
      id: 'step-3',
      title: 'Design & Development',
      description: 'We create solutions using our hybrid human-AI approach, ensuring both creativity and technical excellence.',
      icon: <CodeXml className="h-10 w-10 text-green-400" />
    },
    {
      id: 'step-4',
      title: 'Testing & Refinement',
      description: 'Rigorous testing ensures your solution performs flawlessly across all platforms and use cases.',
      icon: <RefreshCw className="h-10 w-10 text-amber-400" />
    },
    {
      id: 'step-5',
      title: 'Deployment & Support',
      description: 'We handle the launch process and provide ongoing support to ensure continued success.',
      icon: <Check className="h-10 w-10 text-teal-400" />
    },
    {
      id: 'step-6',
      title: 'Collaboration & Growth',
      description: 'We maintain an ongoing partnership, continuously improving your solution as your business evolves.',
      icon: <CircleUser className="h-10 w-10 text-pink-400" />
    }
  ];

  return (
    <section id="how-we-work" className="bg-[#1A1F2C] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-title mb-4">
          Our <span className="gradient-text">Process</span>
        </h2>
        <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg mb-12">
          A systematic approach that combines human creativity with AI precision
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workSteps.map((step) => (
            <div 
              key={step.id}
              className="bg-[#222732] rounded-xl p-6 hover:shadow-xl hover:shadow-noesis-purple/10 transition-all duration-300 hover:scale-[1.02] border border-[#2A2F3C]"
            >
              <div className="bg-[#1A1F2C] p-4 rounded-full w-fit mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
