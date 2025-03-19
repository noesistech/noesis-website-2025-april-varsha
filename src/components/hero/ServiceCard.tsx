
import React from 'react';
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

const ServiceCard = ({ icon, title, description, index, isMobile }: ServiceCardProps) => {
  return (
    <div 
      className="glow-element flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm border border-white/10 rounded-2xl"
      style={{ 
        height: isMobile ? '140px' : '160px',
        marginTop: index % 2 === 0 ? '0' : '40px', // Offset every second card in the same row
        transform: 'translateZ(0)', // Force hardware acceleration with better cross-browser support
        backfaceVisibility: 'hidden', // Prevent flicker
        willChange: 'transform' // Hint to browser for optimization
      }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
};

export default ServiceCard;
