
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AIProductCardProps {
  title: string;
  description: string;
  logoUrl: string;
  logoWidth?: number;
  logoHeight?: number;
  ctaText: string;
  ctaUrl: string;
}

const AIProductCard: React.FC<AIProductCardProps> = ({
  title,
  description,
  logoUrl,
  logoWidth = 200,
  logoHeight = 120,
  ctaText,
  ctaUrl
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    if (logoUrl) {
      console.log(`Attempting to load image for ${title}: ${logoUrl}`);

      if (logoUrl.endsWith('.svg')) {
        setImageLoaded(true);
      } else {
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

  return <Card className="bg-[#1E2335] border-[#2A304B] overflow-hidden h-full glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex flex-col h-full">
          <div className="mb-4">
            <div className="relative h-20">
              {!imageLoaded && !imageError && <div className="absolute inset-0 flex items-center justify-start">
                  <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
                </div>}
              
              {imageError ? <h3 className="text-lg font-bold text-white">{title}</h3> : <img src={logoUrl} alt={`${title} logo`} style={{
              maxWidth: `${logoWidth}px`,
              maxHeight: `${logoHeight}px`
            }} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} className="object-contain w-full h-full" />}
            </div>
          </div>
          
          <p className="text-white/80 mb-4 flex-grow leading-relaxed text-base">
            {description}
          </p>
          
          {ctaUrl && ctaText && <div className="mt-auto">
              <Button 
                variant="noesis" 
                size="sm" 
                asChild 
                className="shadow-lg hover:shadow-noesis-purple/50"
              >
                <a href={ctaUrl} className="inline-flex items-center gap-2">
                  {ctaText} <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>}
        </div>
      </CardContent>
    </Card>;
};

export default AIProductCard;
