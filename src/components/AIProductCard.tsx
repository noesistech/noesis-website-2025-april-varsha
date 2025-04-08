
import React, { useState, useEffect } from 'react';
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
  
  // Reset image states when product changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    
    // Preload the image
    if (product.logoUrl) {
      const img = new Image();
      img.src = product.logoUrl;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load image for ${product.title}:`, product.logoUrl);
        setImageError(true);
      };
    }
  }, [product.logoUrl, product.title]);

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
          <div className="mb-6">
            {product.logoUrl && !imageError ? (
              <div className="relative h-16 sm:h-20">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-start">
                    <div className="animate-pulse bg-gray-700 h-12 w-48 rounded"></div>
                  </div>
                )}
                <img 
                  src={product.logoUrl} 
                  alt={`${product.title} logo`}
                  className={`h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
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
