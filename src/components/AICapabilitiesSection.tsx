
import React, { useEffect, useRef, useState } from 'react';
import { Brain, BrainCircuit, Microscope, Settings, Zap, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIProductCard from './AIProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeviceType } from '@/hooks/use-mobile';
import { aiCapabilitiesSectionData } from '@/data/content/aiCapabilities';
export interface AICapability {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: string[];
  color: string;
  category?: string;
}
export interface AIProduct {
  id: string;
  title: string;
  description: string;
  icon: string;
  logoUrl: string;
  logoWidth?: number;
  logoHeight?: number;
  ctaUrl: string;
  ctaText: string;
}
interface AICapabilitiesSectionProps {
  title: string;
  capabilities: AICapability[];
  products: AIProduct[];
  productsSection: {
    title: string;
    subtitle: string;
  };
}
const AICapabilitiesSection: React.FC<AICapabilitiesSectionProps> = ({
  title,
  capabilities = [],
  products = [],
  productsSection = {
    title: '',
    subtitle: ''
  }
}) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState('development');
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const categories = [{
    id: 'development',
    name: 'AI Development'
  }, {
    id: 'deployment',
    name: 'AI Deployment'
  }];
  const filteredCapabilities = capabilities?.filter(cap => cap.category === activeTab) || [];
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredCapabilities.length);
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('animate-fade-in');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });
    setTimeout(() => {
      cardsRef.current.forEach(card => {
        if (card) {
          card.style.opacity = '0';
          observer.observe(card);
        }
      });
      setTimeout(() => {
        cardsRef.current.forEach(card => {
          if (card) {
            card.classList.add('animate-fade-in');
          }
        });
      }, 100);
    }, 100);
    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, [filteredCapabilities, activeTab]);
  const getIconByName = (iconName: string) => {
    const normalizedIconName = iconName.toLowerCase();
    switch (normalizedIconName) {
      case 'brain':
        return <Brain className="h-8 w-8 text-purple-400" />;
      case 'brain-circuit':
        return <BrainCircuit className="h-8 w-8 text-blue-400" />;
      case 'microscope':
        return <Microscope className="h-8 w-8 text-pink-400" />;
      case 'settings':
        return <Settings className="h-8 w-8 text-yellow-400" />;
      case 'zap':
        return <Zap className="h-8 w-8 text-green-400" />;
      case 'bot':
        return <Bot className="h-8 w-8 text-orange-400" />;
      default:
        console.warn(`Icon name not recognized: ${iconName}`);
        return <Brain className="h-8 w-8" />;
    }
  };

  // Define grid columns based on device type
  const gridColumns = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2';
  return <section id="ai-capabilities" className="page-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        <Tabs defaultValue="development" className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <TabsList className="glass p-1">
              {categories.map(category => <TabsTrigger key={category.id} value={category.id} className="px-2 py-1 sm:px-4 sm:py-2 md:px-8 md:py-3 data-[state=active]:bg-noesis-purple data-[state=active]:text-white text-sm sm:text-base md:text-lg" onClick={() => setActiveTab(category.id)}>
                  {category.name}
                </TabsTrigger>)}
            </TabsList>
          </div>
          
          {categories.map(category => <TabsContent key={category.id} value={category.id} className="animate-fade-in mt-6">
              <div className={`grid ${gridColumns} gap-4`}>
                {capabilities?.filter(cap => cap.category === category.id).map((capability, index) => <div key={capability.id} ref={el => cardsRef.current[index] = el} className="glass-card opacity-0 relative overflow-hidden min-h-[200px]" style={{
              animationDelay: `${index * 100}ms`
            }}>
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", capability.color)}></div>
                      <div className="relative z-10 p-4">
                        <div className="bg-white/10 p-2 rounded-lg w-fit mb-3">
                          {getIconByName(capability.icon)}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                        <p className="text-white/80 mb-3 text-base">{capability.description}</p>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-white/60 mb-1">Technologies</h4>
                          <div className="flex flex-wrap gap-1">
                            {capability.tools.map(tool => <span key={`${capability.id}-${tool}`} className="bg-white/10 text-white/90 text-xs px-2 py-0.5 rounded-full hover:bg-white/20 transition-colors">
                                {tool}
                              </span>)}
                          </div>
                        </div>
                      </div>
                    </div>)}
              </div>
            </TabsContent>)}
        </Tabs>
        
        {products && products.length > 0 && <div className="mt-12 sm:mt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">AI Products</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {products.map(product => {
            return <AIProductCard key={product.id} title={product.title} description={product.description} logoUrl={product.logoUrl || '/placeholder.svg'} logoWidth={product.logoWidth} logoHeight={product.logoHeight} ctaText={product.ctaText} ctaUrl={product.ctaUrl} />;
          })}
            </div>
        </div>}
      </div>
    </section>;
};
export default AICapabilitiesSection;
