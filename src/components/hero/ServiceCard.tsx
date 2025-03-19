
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isMobile: boolean;
}

const ServiceCard = ({ icon, title, description, index, isMobile }: ServiceCardProps) => {
  return (
    <div 
      className="glow-element flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm border border-white/10 rounded-2xl"
      style={{ 
        height: isMobile ? '130px' : '160px',
        marginTop: index % 2 === 0 ? '0' : '40px', // Offset every second card in the same row
        transform: 'translate3d(0,0,0)', // Force hardware acceleration
        backfaceVisibility: 'hidden' // Prevent flicker
      }}
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
};

export default ServiceCard;
