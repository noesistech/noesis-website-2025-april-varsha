
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, BrainCircuit, Code, Server, Palette, Globe, Users } from 'lucide-react';

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
    icon: <svg className="h-12 w-12 md:h-12 md:w-12 text-purple-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9H21M7 3V5M17 3V5M6 13H8M11 13H13M16 13H18M6 17H8M11 17H13M16 17H18M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
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

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const glowElements = hero.querySelectorAll('.glow-element');
      
      glowElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (el as HTMLElement).style.setProperty('--x', `${x}px`);
        (el as HTMLElement).style.setProperty('--y', `${y}px`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation for continuous infinite vertical scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const totalCards = serviceCards.length;
    const cardHeight = 160 + 16; // card height + gap
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
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 font-inter"
      style={{
        background: 'linear-gradient(135deg, rgba(26,31,44,1) 0%, rgba(50,30,80,1) 100%)'
      }}
    >
      {/* Background particles/orbs - Modified to prevent rendering artifacts */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[25%] left-[20%] h-40 w-40 rounded-full bg-noesis-purple/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite',
               transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
               backfaceVisibility: 'hidden' // Prevent flicker
             }}></div>
        <div className="absolute top-[75%] left-[75%] h-60 w-60 rounded-full bg-noesis-blue/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite 1s',
               transform: 'translate3d(0, 0, 0)', 
               backfaceVisibility: 'hidden'
             }}></div>
        <div className="absolute top-[50%] left-[50%] h-32 w-32 rounded-full bg-purple-400/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite 2s',
               transform: 'translate3d(0, 0, 0)', 
               backfaceVisibility: 'hidden'
             }}></div>
      </div>
      
      {/* Gradient overlay for smooth section transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-noesis-dark pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span>Where AI and human talent</span><br />
              <span className="gradient-text">create breakthrough solutions.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-block">
                <Button className="text-white text-lg py-6 px-8 w-full" variant="noesis">
                  Get in Touch
                </Button>
              </a>
              <a href="#services" className="inline-block">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg py-6 px-8 w-full">
                  Our Services
                </Button>
              </a>
            </div>
          </div>
          
          <div className="relative h-[500px] overflow-hidden animate-fade-in">
            <div className="absolute inset-0 overflow-hidden">
              <div 
                ref={scrollContainerRef} 
                className="grid grid-cols-2 gap-x-6 gap-y-4 transition-transform will-change-transform"
                style={{ padding: '1rem 0', transform: 'translate3d(0,0,0)' }}
              >
                {duplicatedServiceCards.map((card, index) => (
                  <div 
                    key={index} 
                    className="glow-element flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm border border-white/10 rounded-2xl"
                    style={{ 
                      height: '160px',
                      marginTop: index % 2 === 0 ? '0' : '40px', // Offset every second card in the same row
                      transform: 'translate3d(0,0,0)', // Force hardware acceleration
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {card.icon}
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-white/70">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll arrow - adjusted position to be more visible */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce z-20">
        <a href="#about" className="text-white/70 hover:text-white transition-colors bg-noesis-dark/40 p-2 rounded-full backdrop-blur-sm">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
