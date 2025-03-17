
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
    <section id="mission" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background pattern with actual icons rather than SVG data URLs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pattern-fade-top"></div>
        <div className="pattern-fade-bottom"></div>
        <div className="icon-grid">
          <div className="icon-row">
            {Array(12).fill(0).map((_, i) => (
              <React.Fragment key={`sparkle-${i}`}>
                <Sparkles className="icon icon-sparkle" />
                <Zap className="icon icon-zap" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/80 via-noesis-purple/5 to-noesis-dark/80 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title text-4xl md:text-5xl mb-24">Mission & Vision</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div id="mission-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10">
            <div className="absolute -top-14 -left-6 p-6 rounded-full bg-noesis-purple/15 text-noesis-purple">
              <Flag className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-8 pt-8">Mission</h3>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Creatively combine content, media, data and technology to build digital solutions that deliver business results.
            </p>
          </div>
          
          <div id="vision-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-14 -left-6 p-6 rounded-full bg-noesis-blue/15 text-noesis-blue">
              <Gem className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-8 pt-8">Vision</h3>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              To design, build and sustain breakthrough digital solutions for the world's leading brands and organizations.
            </p>
          </div>
        </div>
        
        <div className="mt-32 max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-4xl md:text-5xl font-bold mb-12">
            Our <span className="gradient-text">Promise</span>
          </h3>
          <div className="promise-container overflow-hidden relative p-10 glass-card">
            <p ref={promiseTextRef} className="text-3xl md:text-4xl relative promise-text font-light tracking-wide">
              <span className="text-word block md:inline-block mb-6 md:mb-0">Design</span> for 
              <span className="text-word-highlight block md:inline-block mx-2 font-medium"> experiences</span>,
              
              <span className="text-word block md:inline-block mt-6 md:mt-0 md:ml-2">Build</span> for 
              <span className="text-word-highlight block md:inline-block mx-2 font-medium"> outcomes.</span>
            </p>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .pattern-fade-top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: linear-gradient(to bottom, #1A1F2C, transparent);
            z-index: 2;
          }
          
          .pattern-fade-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: linear-gradient(to top, #1A1F2C, transparent);
            z-index: 2;
          }
          
          .icon-grid {
            position: absolute;
            inset: 0;
            animation: moveUp 60s linear infinite;
            z-index: 1;
          }
          
          .icon-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20px;
          }
          
          .icon {
            opacity: 0.15;
            margin: 20px;
            transform: scale(1.5);
          }
          
          .icon-sparkle {
            color: #a074ff;
          }
          
          .icon-zap {
            color: #4ea7ff;
          }
          
          @keyframes moveUp {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-100%);
            }
          }
          
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
