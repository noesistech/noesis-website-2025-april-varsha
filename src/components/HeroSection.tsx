
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, BrainCircuit, Code, Server, Palette, Globe, Users } from 'lucide-react';

// Define our service cards data
const serviceCards = [
  {
    icon: <BrainCircuit className="h-12 w-12 text-noesis-purple mb-4" />,
    title: "AI Solutions",
    description: "Customized intelligent experiences"
  },
  {
    icon: <Code className="h-12 w-12 text-noesis-blue mb-4" />,
    title: "Web Development",
    description: "Dynamic websites & applications"
  },
  {
    icon: <svg className="h-12 w-12 text-purple-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9H21M7 3V5M17 3V5M6 13H8M11 13H13M16 13H18M6 17H8M11 17H13M16 17H18M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    title: "UI/UX Design",
    description: "Captivating interfaces"
  },
  {
    icon: <Server className="h-12 w-12 text-pink-400 mb-4" />,
    title: "Cloud Services",
    description: "Flexible, high-performance hosting"
  },
  {
    icon: <Palette className="h-12 w-12 text-green-400 mb-4" />,
    title: "Creative Design",
    description: "Eye-catching visuals & branding"
  },
  {
    icon: <Globe className="h-12 w-12 text-yellow-400 mb-4" />,
    title: "Digital Marketing",
    description: "Reach your target audience"
  },
  {
    icon: <Users className="h-12 w-12 text-blue-400 mb-4" />,
    title: "Staff Augmentation",
    description: "Expert teams on demand"
  }
];

// Duplicate the cards to ensure smooth continuous scrolling
const duplicatedServiceCards = [...serviceCards, ...serviceCards];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Animation for continuous vertical scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const height = scrollContainer.offsetHeight / 2;
    let animationId: number;
    let scrollPos = 0;
    
    const scroll = () => {
      scrollPos += 0.5; // Speed of scrolling
      if (scrollPos >= height) {
        scrollPos = 0;
      }
      
      scrollContainer.style.transform = `translateY(-${scrollPos}px)`;
      animationId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, rgba(26,31,44,1) 0%, rgba(50,30,80,1) 100%)'
      }}
    >
      {/* Background particles/orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/5 h-40 w-40 rounded-full bg-noesis-purple/20 blur-3xl animate-float"></div>
        <div className="absolute top-3/4 left-3/4 h-60 w-60 rounded-full bg-noesis-blue/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-purple-400/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Gradient overlay for smooth section transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-noesis-dark/90 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Design for experiences,<br />
              <span className="gradient-text">Build for outcomes.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Creatively combining content, media, data and technology to build digital solutions that deliver business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-noesis-purple hover:bg-noesis-darkpurple text-white text-lg py-6 px-8">
                Get in Touch
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg py-6 px-8">
                Our Services
              </Button>
            </div>
          </div>
          
          <div className="relative h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-noesis-dark/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/80 to-transparent z-10 pointer-events-none"></div>
            
            <div 
              ref={scrollContainerRef} 
              className="grid grid-cols-2 gap-4 transition-transform"
            >
              {duplicatedServiceCards.map((card, index) => (
                <div 
                  key={index} 
                  className="glass-card h-48 glow-element flex flex-col items-center justify-center p-6 text-center"
                  style={{ animationDelay: `${0.1 * index}s` }}
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
      
      {/* Scroll arrow */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center animate-bounce z-20">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
