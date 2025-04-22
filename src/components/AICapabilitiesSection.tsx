import React, { useEffect, useRef, useState } from 'react';
import { Brain, BrainCircuit, Microscope, Settings, Zap, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIProductCard from './AIProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
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

  return <section id="ai-capabilities" className="page-section relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="section-title mb-8">
          Our <span className="gradient-text">AI</span> <span className="gradient-text">Capabilities</span>
        </h2>
        
        <Tabs defaultValue="development" className="max-w-6xl mx-auto my-0 py-0">
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
            <TabsList className="glass p-1">
              {categories.map(category => <TabsTrigger key={category.id} value={category.id} className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 data-[state=active]:bg-noesis-purple data-[state=active]:text-white text-base sm:text-lg" onClick={() => setActiveTab(category.id)}>
                  {category.name}
                </TabsTrigger>)}
            </TabsList>
          </div>
          
          {categories.map(category => <TabsContent key={category.id} value={category.id} className="animate-fade-in">
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
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
        
        {products && products.length > 0 && <div className="mt-12">
            <h2 dangerouslySetInnerHTML={{
              __html: productsSection.title
            }} className="section-title mb-4"></h2>
            <h3 className="text-base text-center mb-8 text-white/80 md:text-lg">{productsSection.subtitle}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {products.map(product => {
            return <AIProductCard key={product.id} title={product.title} description={product.description} logoUrl={product.logoUrl || '/placeholder.svg'} ctaText={product.ctaText} ctaUrl={product.ctaUrl} />;
          })}
            </div>
        </div>}
      </div>
    </section>;
};

export default AICapabilitiesSection;
