
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BrainCircuit, Bot, Microscope, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AICapability {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: string[];
  color?: string;
}

export interface AICapabilitiesSectionProps {
  title: string;
  capabilities: AICapability[];
}

const AICapabilitiesSection: React.FC<AICapabilitiesSectionProps> = ({
  title,
  capabilities = []
}) => {
  const [activeTab, setActiveTab] = useState('development');

  const renderIcon = (iconName: string) => {
    switch(iconName.toLowerCase()) {
      case 'brain':
        return <Brain className="h-10 w-10 text-noesis-purple" />;
      case 'brain-circuit':
        return <BrainCircuit className="h-10 w-10 text-noesis-blue" />;
      case 'robot':
        return <Bot className="h-10 w-10 text-green-400" />; // Changed Robot to Bot
      case 'microscope':
        return <Microscope className="h-10 w-10 text-pink-400" />;
      case 'settings':
        return <Settings className="h-10 w-10 text-yellow-400" />;
      case 'zap':
        return <Zap className="h-10 w-10 text-orange-400" />;
      default:
        return <Brain className="h-10 w-10 text-noesis-purple" />;
    }
  };

  // Group capabilities into Development and Deployment categories
  const developmentCapabilities = capabilities.filter(cap => !cap.id.includes('deploy'));
  const deploymentCapabilities = capabilities.filter(cap => cap.id.includes('deploy'));

  const renderTitle = () => {
    if (!title) return "Our AI Capabilities";
    
    // Wrap the entire title in the gradient-text class to highlight it
    return (
      <span className="gradient-text font-bold">{title}</span>
    );
  };

  return (
    <section id="ai-capabilities" className="py-10 sm:py-16 md:py-[40px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <h2 className="section-title">
          {renderTitle()}
        </h2>
        
        <Tabs defaultValue="development" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <TabsList className="glass">
              <TabsTrigger 
                value="development" 
                className="data-[state=active]:bg-noesis-purple data-[state=active]:text-white px-3 sm:px-4 md:px-6" 
                onClick={() => setActiveTab('development')}
              >
                AI Development
              </TabsTrigger>
              <TabsTrigger 
                value="deployment" 
                className="data-[state=active]:bg-noesis-blue data-[state=active]:text-white px-3 sm:px-4 md:px-6" 
                onClick={() => setActiveTab('deployment')}
              >
                AI Deployment
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="development" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {developmentCapabilities.map((capability) => (
                <div 
                  key={capability.id} 
                  className="glass-card h-full"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-white/10 p-2 sm:p-3 rounded-full w-fit mr-4">
                      {renderIcon(capability.icon)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold gradient-text mt-2">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-white/80 text-base">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.tools.map((tool, index) => (
                      <span 
                        key={`${capability.id}-tool-${index}`} 
                        className="bg-white/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white/80 hover:bg-noesis-purple/20 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="deployment" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {deploymentCapabilities.map((capability) => (
                <div 
                  key={capability.id} 
                  className="glass-card h-full"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-white/10 p-2 sm:p-3 rounded-full w-fit mr-4">
                      {renderIcon(capability.icon)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold gradient-text mt-2">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-white/80 text-base">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.tools.map((tool, index) => (
                      <span 
                        key={`${capability.id}-tool-${index}`} 
                        className="bg-white/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white/80 hover:bg-noesis-blue/20 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AICapabilitiesSection;
