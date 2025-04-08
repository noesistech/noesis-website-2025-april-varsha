
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AIProductCardProps {
  title: string;
  description: string;
  logoUrl: string;
  ctaText: string;
  ctaUrl: string;
}

const AIProductCard: React.FC<AIProductCardProps> = ({
  title,
  description,
  logoUrl,
  ctaText,
  ctaUrl
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    // Check if the logoUrl is available and not empty
    if (logoUrl) {
      console.log(`Attempting to load image for ${title}: ${logoUrl}`);

      // For SVG files, we can immediately set loaded to true since they render well
      if (logoUrl.endsWith('.svg')) {
        setImageLoaded(true);
      } else {
        // For other file types, preload the image
        const img = new Image();
        img.src = logoUrl;
        img.onload = () => {
          console.log(`Successfully loaded image for ${title}`);
          setImageLoaded(true);
        };
        img.onerror = e => {
          console.error(`Failed to load image for ${title}:`, logoUrl, e);
          setImageError(true);
        };
      }
    } else {
      setImageError(true);
    }
  }, [logoUrl, title]);

  return (
    <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden h-full glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex flex-col h-full">
          {/* Product Logo */}
          <div className="mb-4">
            <div className="relative h-12">
              {!imageLoaded && !imageError && 
                <div className="absolute inset-0 flex items-center justify-start">
                  <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
                </div>
              }
              
              {imageError ? 
                <h3 className="text-lg font-bold text-white">{title}</h3> : 
                <img 
                  src={logoUrl} 
                  alt={`${title} logo`} 
                  style={{ maxWidth: '150px' }}
                  onLoad={() => setImageLoaded(true)} 
                  onError={() => setImageError(true)} 
                  className="object-fill h-10" 
                />
              }
            </div>
          </div>
          
          {/* Product Description */}
          <p className="text-white/80 mb-4 flex-grow text-sm leading-relaxed">
            {description}
          </p>
          
          {/* CTA Button */}
          {ctaUrl && ctaText && 
            <div className="mt-auto">
              <Button 
                variant="noesis" 
                size="sm" 
                asChild 
                className="group bg-gradient-to-r from-noesis-purple/80 to-noesis-blue/80 hover:from-noesis-purple hover:to-noesis-blue text-sm font-medium"
              >
                <a href={ctaUrl}>
                  {ctaText} <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProductCard;
