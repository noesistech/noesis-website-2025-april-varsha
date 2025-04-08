
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AIProduct } from './AICapabilitiesSection';

interface AIProductCardProps {
  product: AIProduct;
}

const AIProductCard: React.FC<AIProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image from ${e.currentTarget.src}`);
    setImageError(true);
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
