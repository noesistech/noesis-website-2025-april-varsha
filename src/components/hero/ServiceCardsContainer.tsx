
import React, { useRef, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BrainCircuit, 
  Code, 
  Server, 
  Palette, 
  Globe, 
  Users,
  LayoutGrid
} from 'lucide-react';

// Define our service cards data with more explicit icon rendering
const serviceCards = [
  {
    icon: <BrainCircuit size={32} className="text-noesis-purple" />,
    title: "AI Solutions",
    description: "Next-gen intelligent experiences"
  },
  {
    icon: <Code size={32} className="text-noesis-blue" />,
    title: "Web Development",
    description: "AI-powered digital experiences"
  },
  {
    icon: <LayoutGrid size={32} className="text-purple-400" />,
    title: "UI/UX Design",
    description: "Human-centered, AI-enhanced"
  },
  {
    icon: <Server size={32} className="text-pink-400" />,
    title: "Cloud Services",
    description: "AI-optimized infrastructure"
  },
  {
    icon: <Palette size={32} className="text-green-400" />,
    title: "Creative Design",
    description: "Human creativity, AI precision"
  },
  {
    icon: <Globe size={32} className="text-yellow-400" />,
    title: "Digital Marketing",
    description: "Data-driven, AI-powered growth"
  },
  {
    icon: <Users size={32} className="text-blue-400" />,
    title: "Staff Augmentation",
    description: "AI-enhanced talent solutions"
  }
];

// Duplicate the cards to ensure smooth continuous scrolling
const duplicatedServiceCards = [...serviceCards, ...serviceCards, ...serviceCards];

const ServiceCardsContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();
  
  // Improved animation for continuous infinite vertical scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const totalCards = serviceCards.length;
    const cardHeight = isMobile ? 140 + 16 : 160 + 16; // Adjusted card height for mobile with spacing
    const totalHeight = totalCards * cardHeight;
    
    let scrollPos = 0;
    const scrollSpeed = 0.4; // Slightly reduced for smoother animation
    
    const scroll = () => {
      scrollPos += scrollSpeed;
      
      // When we've scrolled the height of the original set of cards, 
      // reset position to create the illusion of infinite scrolling
      if (scrollPos >= totalHeight) {
        scrollPos = 0;
      }
      
      if (scrollContainer) {
        // Using translateZ(0) for better performance
        scrollContainer.style.transform = `translateY(-${scrollPos}px) translateZ(0)`;
      }
      
      animationRef.current = requestAnimationFrame(scroll);
    };
    
    animationRef.current = requestAnimationFrame(scroll);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);
  
  return (
    <div className="relative h-[500px] overflow-hidden animate-fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={scrollContainerRef} 
          className="grid grid-cols-2 gap-x-6 gap-y-4 transition-transform will-change-transform"
          style={{ 
            padding: '1rem 0', 
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden', // Prevent flicker
            willChange: 'transform' // Tell the browser to optimize
          }}
        >
          {duplicatedServiceCards.map((card, index) => (
            <ServiceCard 
              key={index} 
              icon={card.icon} 
              title={card.title} 
              description={card.description} 
              index={index} 
              isMobile={isMobile} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCardsContainer;
