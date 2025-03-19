
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

// Define our service cards data
const serviceCards = [
  {
    icon: <BrainCircuit className="h-12 w-12 md:h-12 md:w-12 text-noesis-purple mb-4" />,
    title: "AI Solutions",
    description: "Next-gen intelligent experiences"
  },
  {
    icon: <Code className="h-12 w-12 md:h-12 md:w-12 text-noesis-blue mb-4" />,
    title: "Web Development",
    description: "AI-powered digital experiences"
  },
  {
    icon: <LayoutGrid className="h-12 w-12 md:h-12 md:w-12 text-purple-400 mb-4" />,
    title: "UI/UX Design",
    description: "Human-centered, AI-enhanced"
  },
  {
    icon: <Server className="h-12 w-12 md:h-12 md:w-12 text-pink-400 mb-4" />,
    title: "Cloud Services",
    description: "AI-optimized infrastructure"
  },
  {
    icon: <Palette className="h-12 w-12 md:h-12 md:w-12 text-green-400 mb-4" />,
    title: "Creative Design",
    description: "Human creativity, AI precision"
  },
  {
    icon: <Globe className="h-12 w-12 md:h-12 md:w-12 text-yellow-400 mb-4" />,
    title: "Digital Marketing",
    description: "Data-driven, AI-powered growth"
  },
  {
    icon: <Users className="h-12 w-12 md:h-12 md:w-12 text-blue-400 mb-4" />,
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
  
  // Animation for continuous infinite vertical scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const totalCards = serviceCards.length;
    const cardHeight = isMobile ? 130 + 16 : 160 + 16; // Adjust card height for mobile
    const totalHeight = totalCards * cardHeight;
    
    let scrollPos = 0;
    const scrollSpeed = 0.5; // Speed of scrolling
    
    const scroll = () => {
      scrollPos += scrollSpeed;
      
      // When we've scrolled the height of the original set of cards, 
      // reset position to create the illusion of infinite scrolling
      if (scrollPos >= totalHeight) {
        scrollPos = 0;
      }
      
      scrollContainer.style.transform = `translateY(-${scrollPos}px)`;
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
          style={{ padding: '1rem 0', transform: 'translate3d(0,0,0)' }}
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
