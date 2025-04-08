
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
import { AIProduct } from './AICapabilitiesSection';

interface AIProductCardProps {
  product: AIProduct;
}

const AIProductCard: React.FC<AIProductCardProps> = ({
  product
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image for ${product.title}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded image for ${product.title}`);
    setImageLoaded(true);
  };

  // Select the appropriate icon based on product.icon
  const renderIcon = () => {
    switch(product.icon.toLowerCase()) {
      case 'brain':
        return <Brain className="w-12 h-12 text-noesis-purple" />;
      case 'sparkles':
        return <Sparkles className="w-12 h-12 text-cyan-400" />;
      default:
        return <Brain className="w-12 h-12 text-noesis-purple" />;
    }
  };

  return (
    <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 flex flex-col h-full">
          {/* Product Logo or Fallback Icon */}
          <div className="mb-6 max-w-[250px]">
            {product.logoUrl && !imageError ? (
              <img 
                src={product.logoUrl} 
                alt={`${product.title} logo`} 
                onError={handleImageError}
                onLoad={handleImageLoad}
                className={`w-full h-auto object-contain ${!imageLoaded ? 'hidden' : 'block'}`}
              />
            ) : (
              <div className="flex items-center">
                {renderIcon()}
                <span className="ml-2 text-xl font-bold text-white">{product.title}</span>
              </div>
            )}
          </div>
          
          {/* Product Description */}
          <p className="text-white/80 mb-6 flex-grow">
            {product.description}
          </p>
          
          {/* CTA Button */}
          {product.ctaUrl && product.ctaText && (
            <div className="mt-auto">
              <Button variant="noesis" asChild className="group">
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
