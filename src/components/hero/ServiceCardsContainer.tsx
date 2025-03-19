
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

// Create three sets of cards to ensure smooth continuous scrolling
const duplicatedServiceCards = [...serviceCards, ...serviceCards, ...serviceCards];

const ServiceCardsContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollPositionRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const totalCards = serviceCards.length;
    const cardHeight = isMobile ? 160 + 20 : 180 + 20; // Adjusted card height with spacing
    const totalHeight = totalCards * cardHeight;
    
    // Reset scroll position to ensure smooth loop
    scrollPositionRef.current = 0;
    
    const animate = () => {
      scrollPositionRef.current += 0.5; // Slower, smoother scroll
      
      // When we've scrolled the height of the original set of cards, 
      // reset position to create the illusion of infinite scrolling
      if (scrollPositionRef.current >= totalHeight) {
        scrollPositionRef.current = 0;
      }
      
      if (scrollContainer) {
        scrollContainer.style.transform = `translateY(-${scrollPositionRef.current}px) translateZ(0)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);
  
  return (
    <div className="relative h-[500px] overflow-hidden animate-fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={scrollContainerRef} 
          className="grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-5" // Increased gap-y for more vertical spacing
          style={{ 
            padding: '1rem 0', 
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden', // Prevent flicker
            willChange: 'transform', // Tell the browser to optimize
            transition: 'transform 0.1s linear' // Smooth transition between frames
          }}
        >
          {duplicatedServiceCards.map((card, index) => (
            <ServiceCard 
              key={`card-${index}`} 
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
