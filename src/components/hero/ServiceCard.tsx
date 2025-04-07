
import React, { useEffect, useRef, useState } from 'react';
import { 
  BrainCircuit, 
  Code, 
  Palette as PaletteIcon, 
  Server, 
  Palette, 
  Globe, 
  Users 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isMobile: boolean;
  isVisible: boolean;
}

// Helper function to map icon names to actual icon components
export const getIconByName = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case 'BrainCircuit':
      return <BrainCircuit size={24} className="text-white" />;
    case 'Code':
      return <Code size={24} className="text-white" />;
    case 'PaletteIcon':
      return <PaletteIcon size={24} className="text-white" />;
    case 'Server':
      return <Server size={24} className="text-white" />;
    case 'Palette':
      return <Palette size={24} className="text-white" />;
    case 'Globe':
      return <Globe size={24} className="text-white" />;
    case 'Users':
      return <Users size={24} className="text-white" />;
    default:
      return <BrainCircuit size={24} className="text-white" />;
  }
};

const ServiceCard = ({ icon, title, description, index, isMobile, isVisible }: ServiceCardProps) => {
  const [hasRendered, setHasRendered] = useState(false);
  
  useEffect(() => {
    // Mark as rendered once the card is visible
    if (isVisible && !hasRendered) {
      setHasRendered(true);
    }
  }, [isVisible, hasRendered]);
  
  return (
    <div 
      className={`glow-element flex flex-col items-center justify-center text-center backdrop-blur-sm border border-white/10 rounded-2xl ${hasRendered ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        height: isMobile ? '150px' : '170px', 
        padding: isMobile ? '16px 12px' : '22px 18px',
        marginTop: index % 2 === 0 ? '0' : '35px', // Reduced offset for better spacing on smaller screens
        transform: 'translateZ(0)', // Force hardware acceleration with better cross-browser support
        backfaceVisibility: 'hidden', // Prevent flicker
        willChange: 'transform', // Hint to browser for optimization
        transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out'
      }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-white/70">{description}</p>
    </div>
  );
};

export default ServiceCard;
