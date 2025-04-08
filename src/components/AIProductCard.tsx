import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AIProduct } from './AICapabilitiesSection';
interface AIProductCardProps {
  product: AIProduct;
}
const AIProductCard: React.FC<AIProductCardProps> = ({
  product
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    // Check if the logoUrl is available and not empty
    if (product.logoUrl) {
      console.log(`Attempting to load image for ${product.title}: ${product.logoUrl}`);

      // For SVG files, we can immediately set loaded to true since they render well
      if (product.logoUrl.endsWith('.svg')) {
        setImageLoaded(true);
      } else {
        // For other file types, preload the image
        const img = new Image();
        img.src = product.logoUrl;
        img.onload = () => {
          console.log(`Successfully loaded image for ${product.title}`);
          setImageLoaded(true);
        };
        img.onerror = e => {
          console.error(`Failed to load image for ${product.title}:`, product.logoUrl, e);
          setImageError(true);
        };
      }
    } else {
      setImageError(true);
    }
  }, [product.logoUrl, product.title]);
  return <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 flex flex-col h-full">
          {/* Product Logo */}
          <div className="mb-6">
            <div className="relative h-16 sm:h-20">
              {!imageLoaded && !imageError && <div className="absolute inset-0 flex items-center justify-start">
                  <div className="animate-pulse bg-gray-700 h-12 w-48 rounded"></div>
                </div>}
              
              {imageError ? <h3 className="text-xl font-bold text-white">{product.title}</h3> : <img src={product.logoUrl} alt={`${product.title} logo`} style={{
              maxWidth: '200px'
            }} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} className="object-fill" />}
            </div>
          </div>
          
          {/* Product Description */}
          <p className="text-white/80 mb-6 flex-grow">
            {product.description}
          </p>
          
          {/* CTA Button */}
          {product.ctaUrl && product.ctaText && <div className="mt-auto">
              <Button variant="noesis" asChild className="group">
                <a href={product.ctaUrl}>
                  {product.ctaText} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>}
        </div>
      </CardContent>
    </Card>;
};
export default AIProductCard;