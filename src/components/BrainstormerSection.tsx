
import React from 'react';
import { AIProduct } from '@/components/AICapabilitiesSection';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BrainstormerSectionProps {
  products: AIProduct[];
  title?: string;
  subtitle?: string;
}

const BrainstormerSection: React.FC<BrainstormerSectionProps> = ({
  products,
  title = 'Brainstormer Suite',
  subtitle = 'Our AI Products'
}) => {
  // Get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'brain':
        return <Brain className="h-8 w-8 text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="h-8 w-8 text-blue-400" />;
      default:
        return <Brain className="h-8 w-8 text-purple-400" />;
    }
  };

  return (
    <section className="page-section py-16 sm:py-24 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-noesis-blue/20 rounded-full filter blur-[100px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Brainstormer <span className="text-noesis-purple">Suite</span>
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="glass-card relative overflow-hidden p-6 sm:p-8"
            >
              <div className="flex flex-col h-full">
                {/* Logo display if available */}
                {product.logoUrl && (
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={product.logoUrl} 
                      alt={`${product.title} logo`}
                      className="h-auto max-h-16" 
                      style={{ 
                        width: product.logoWidth || 'auto',
                        height: product.logoHeight || 'auto'
                      }}
                    />
                  </div>
                )}
                
                {/* Icon if no logo */}
                {!product.logoUrl && product.icon && (
                  <div className="bg-white/10 p-3 rounded-lg w-fit mb-4">
                    {getIconComponent(product.icon)}
                  </div>
                )}
                
                {/* Title and description */}
                {!product.logoUrl && (
                  <h3 className="text-xl font-bold mb-4">{product.title}</h3>
                )}
                <p className="text-white/80 mb-6">{product.description}</p>
                
                {/* CTA button */}
                <div className="mt-auto">
                  <Button 
                    variant="noesis" 
                    className="shadow-lg hover:shadow-noesis-purple/50"
                    asChild
                  >
                    <a href={product.ctaUrl} className="inline-flex items-center gap-2" target='_blank'>
                      {product.ctaText} <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrainstormerSection;
