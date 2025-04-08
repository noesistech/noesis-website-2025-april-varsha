
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BrainCircuit, Bot, Microscope, Settings, Zap, Sparkles, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIProductCard from './AIProductCard';

export interface AICapability {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: string[];
  color?: string;
}

export interface AIProduct {
  id: string;
  title: string;
  description: string;
  icon: string;
  logoUrl?: string;
  ctaUrl?: string;
  ctaText?: string;
}

export interface AICapabilitiesSectionProps {
  title: string;
  capabilities: AICapability[];
  products?: AIProduct[];
  productsSection?: {
    title: string;
    subtitle: string;
  };
}

const AICapabilitiesSection: React.FC<AICapabilitiesSectionProps> = ({
  title,
  capabilities = [],
  products = [],
  productsSection
}) => {
  const [activeTab, setActiveTab] = useState('development');

  const renderIcon = (iconName: string) => {
    switch(iconName.toLowerCase()) {
      case 'brain':
        return <Brain className="h-10 w-10 text-noesis-purple" />;
      case 'brain-circuit':
        return <BrainCircuit className="h-10 w-10 text-noesis-blue" />;
      case 'bot':
        return <Bot className="h-10 w-10 text-orange-400" />; 
      case 'microscope':
        return <Microscope className="h-10 w-10 text-pink-400" />;
      case 'settings':
        return <Settings className="h-10 w-10 text-yellow-400" />;
      case 'zap':
        return <Zap className="h-10 w-10 text-green-400" />;
      case 'sparkles':
        return <Sparkles className="h-10 w-10 text-cyan-400" />;
      case 'layers':
        return <Layers className="h-10 w-10 text-indigo-400" />;
      default:
        return <Brain className="h-10 w-10 text-noesis-purple" />;
    }
  };

  // Group capabilities into Development and Deployment categories
  const developmentCapabilities = capabilities.filter(cap => !cap.id.includes('deploy'));
  const deploymentCapabilities = capabilities.filter(cap => cap.id.includes('deploy'));

  const renderTitle = () => {
    if (!title) return "Our AI Capabilities";
    
    // Only wrap "AI Capabilities" in the gradient-text class to highlight it
    return (
      <span>Our <span className="gradient-text font-bold">AI Capabilities</span></span>
    );
  };

  console.log("Products data:", products);
  console.log("Products section data:", productsSection);

  return (
    <section id="ai-capabilities" className="py-10 sm:py-16 md:py-[40px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <h2 className="section-title mb-12">
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
      
      {/* AI Products Section */}
      {products && products.length > 0 && productsSection && (
        <div className="mt-24 container mx-auto px-3 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">{productsSection.title}</span>
              </h2>
              <p className="text-white/70 mt-3 text-lg md:text-xl">{productsSection.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {products.map((product) => (
                <AIProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AICapabilitiesSection;
