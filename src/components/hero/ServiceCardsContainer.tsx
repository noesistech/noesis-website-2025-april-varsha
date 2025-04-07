
import React, { useRef, useEffect, useState } from 'react';
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

// Create three sets of cards for smooth infinite scrolling
const duplicatedServiceCards = [...serviceCards, ...serviceCards, ...serviceCards];

const ServiceCardsContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollPositionRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const totalCards = serviceCards.length;
    const cardHeight = isMobile ? 160 + 20 : 180 + 20; // Adjusted card height with spacing
    const totalHeight = totalCards * cardHeight;
    
    // Reset scroll position to ensure smooth loop
    scrollPositionRef.current = 0;
    
    const checkVisibility = () => {
      if (scrollContainer) {
        const rect = scrollContainer.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(visible);
      }
    };
    
    const animate = () => {
      if (isVisible) {
        scrollPositionRef.current += 0.5; // Slower, smoother scroll
        
        // When we've scrolled through the first set of cards completely,
        // reset the position to the beginning of the second set
        if (scrollPositionRef.current >= totalHeight) {
          // Instead of using modulo which can cause visual jumps,
          // we just reset to exactly where the second set begins
          scrollPositionRef.current = 0;
        }
        
        // Apply the transform to create the scrolling effect
        if (scrollContainer) {
          scrollContainer.style.transform = `translateY(-${scrollPositionRef.current}px) translateZ(0)`;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Initial visibility check
    checkVisibility();
    
    // Set up visibility checking on scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isMobile, isVisible]);
  
  return (
    <div className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden animate-fade-in">
      {/* We'll create a wrapper for the scroll container for better scroll management */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={scrollContainerRef} 
          className="grid grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-4 sm:gap-y-5" 
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
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCardsContainer;
