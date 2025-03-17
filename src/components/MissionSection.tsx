
import React, { useRef, useEffect } from 'react';
import { Flag, Gem, Sparkles, Zap } from 'lucide-react';

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const promiseTextRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
      
      const missionCard = sectionRef.current.querySelector('#mission-card');
      const visionCard = sectionRef.current.querySelector('#vision-card');
      
      if (missionCard && visionCard) {
        const translateY = scrollPercent * 50;
        (missionCard as HTMLElement).style.transform = `translateY(-${translateY}px)`;
        (visionCard as HTMLElement).style.transform = `translateY(-${translateY * 0.7}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation for the promise text
  useEffect(() => {
    if (!promiseTextRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(promiseTextRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="mission" className="py-20 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-16">Mission & Vision</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div id="mission-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform">
            <div className="absolute -top-10 -left-4 p-4 rounded-full bg-noesis-purple/10 text-noesis-purple">
              <Flag className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-6 pt-8">Mission</h3>
            <p className="text-white/80 text-lg">
              Creatively combine content, media, data and technology to build digital solutions that deliver business results.
            </p>
          </div>
          
          <div id="vision-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-10 -left-4 p-4 rounded-full bg-noesis-blue/10 text-noesis-blue">
              <Gem className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-6 pt-8">Vision</h3>
            <p className="text-white/80 text-lg">
              To design, build and sustain breakthrough digital solutions for the world's leading brands and organizations.
            </p>
          </div>
        </div>
        
        <div className="mt-24 max-w-3xl mx-auto text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Our <span className="gradient-text">Promise</span>
          </h3>
          <div className="promise-container overflow-hidden relative">
            <p ref={promiseTextRef} className="text-2xl md:text-3xl relative promise-text">
              <Sparkles className="inline-block h-6 w-6 mr-2 text-noesis-purple animate-pulse" />
              <span className="text-word">Design</span> for 
              <span className="text-word-highlight"> experiences</span>,<br />
              <Zap className="inline-block h-6 w-6 mr-2 text-noesis-blue animate-pulse" />
              <span className="font-bold gradient-text text-word">Build</span> for 
              <span className="font-bold gradient-text text-word-highlight"> outcomes.</span>
            </p>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .promise-text {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .promise-text.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
          
          .text-word {
            display: inline-block;
            transition: transform 0.3s ease;
          }
          
          .text-word:hover {
            transform: translateY(-5px);
          }
          
          .text-word-highlight {
            display: inline-block;
            position: relative;
          }
          
          .text-word-highlight::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #a074ff, #4ea7ff);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
          }
          
          .promise-text.animate-in .text-word-highlight::after {
            transform: scaleX(1);
            transition-delay: 0.5s;
          }
        `}
      </style>
    </section>
  );
};

export default MissionSection;
