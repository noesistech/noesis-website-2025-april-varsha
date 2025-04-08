
import React, { useEffect, useRef } from 'react';
import { Brain, BrainCircuit, Microscope, Settings, Zap, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIProductCard from './AIProductCard';

export interface AICapability {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: string[];
  color: string;
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
  capabilities,
  products,
  productsSection
}) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Helper function to get icon by name
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

  // Format the section titles to highlight specific words
  const formatSectionTitle = (titleText: string, highlightWords: string[]) => {
    const words = titleText.split(' ');
    return words.map((word, index) => {
      if (highlightWords.includes(word)) {
        return <span key={index} className="gradient-text">{word}</span>;
      }
      return <span key={index}>{word}{index < words.length - 1 ? ' ' : ''}</span>;
    });
  };

  // Log AI products data for debugging
  console.info('Products data:', products);
  console.info('Products section data:', productsSection);

  return (
    <section id="ai-capabilities" className="page-section">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-title">
          {formatSectionTitle(title, ["AI", "Capabilities"])}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              ref={el => cardsRef.current[index] = el}
              className="glass-card opacity-0 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", capability.color)}></div>
              <div className="relative z-10">
                <div className="bg-white/10 p-3 rounded-lg w-fit mb-4">
                  {getIconByName(capability.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                <p className="text-white/80 mb-6">{capability.description}</p>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-white/60 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {capability.tools.map((tool) => (
                      <span 
                        key={`${capability.id}-${tool}`}
                        className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products && products.length > 0 && (
          <div className="mt-24">
            <h2 className="section-title">
              {formatSectionTitle(productsSection.subtitle, ["AI", "Products"])}
            </h2>
            <h3 className="text-2xl font-semibold text-center mt-2 mb-12 text-white/80">{productsSection.title}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {products.map((product) => {
                console.info(`Attempting to load image for ${product.title}: ${product.logoUrl}`);
                return (
                  <AIProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    logoUrl={product.logoUrl}
                    ctaText={product.ctaText}
                    ctaUrl={product.ctaUrl}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AICapabilitiesSection;
