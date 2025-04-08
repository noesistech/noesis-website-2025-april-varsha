
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

  return <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 flex flex-col h-full">
          {/* Product Logo */}
          <div className="mb-6">
            <div className="relative h-16 sm:h-20">
              {!imageLoaded && !imageError && <div className="absolute inset-0 flex items-center justify-start">
                  <div className="animate-pulse bg-gray-700 h-12 w-48 rounded"></div>
                </div>}
              
              {imageError ? <h3 className="text-xl font-bold text-white">{title}</h3> : <img src={logoUrl} alt={`${title} logo`} style={{
              maxWidth: '800px'
            }} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} className="object-fill" />}
            </div>
          </div>
          
          {/* Product Description */}
          <p className="text-white/80 mb-6 flex-grow">
            {description}
          </p>
          
          {/* CTA Button */}
          {ctaUrl && ctaText && <div className="mt-auto">
              <Button variant="noesis" asChild className="group">
                <a href={ctaUrl}>
                  {ctaText} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>}
        </div>
      </CardContent>
    </Card>;
};

export default AIProductCard;
