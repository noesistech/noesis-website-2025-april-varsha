
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AIProduct } from './AICapabilitiesSection';

interface AIProductCardProps {
  product: AIProduct;
}

const AIProductCard: React.FC<AIProductCardProps> = ({ product }) => {
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    console.error(`Failed to load image from ${imgElement.src}`);
    
    // Try the lovable-uploads folder if the regular path fails
    if (product.id === 'brainstormer-pro') {
      imgElement.src = '/lovable-uploads/6b081ef6-8346-43a6-914b-2d88e9f5bef1.png';
    } else if (product.id === 'brainstormer-studio') {
      imgElement.src = '/lovable-uploads/736acdd7-53ea-4297-a0a2-06aac8a6b605.png';
    }
  };

  return (
    <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 flex flex-col h-full">
          {/* Product Logo */}
          {product.logoUrl && (
            <div className="mb-6 max-w-[250px]">
              <img 
                src={product.logoUrl} 
                alt={`${product.title} logo`} 
                className="w-full h-auto"
                onError={handleImageError}
              />
            </div>
          )}
          
          {/* Product Description */}
          <p className="text-white/80 mb-6 flex-grow">
            {product.description}
          </p>
          
          {/* CTA Button */}
          {product.ctaUrl && product.ctaText && (
            <div className="mt-auto">
              <Button
                variant="noesis"
                asChild
                className="group"
              >
                <a href={product.ctaUrl}>
                  {product.ctaText} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProductCard;
