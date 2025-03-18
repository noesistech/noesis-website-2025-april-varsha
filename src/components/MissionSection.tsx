import React, { useRef, useEffect } from 'react';
import { Flag, Gem, Sparkles, Zap } from 'lucide-react';

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const promiseTextRef = useRef<HTMLParagraphElement>(null);
  const promiseContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    if (!promiseContainerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const panel = promiseContainerRef.current;
      if (!panel) return;
      
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      const percentX = Math.round((x / rect.width) * 100);
      const percentY = Math.round((y / rect.height) * 100);
      panel.style.setProperty('--x', `${percentX}%`);
      panel.style.setProperty('--y', `${percentY}%`);
    };
    
    const handleMouseLeave = () => {
      if (!promiseContainerRef.current) return;
      
      handleScroll();
    };
    
    const handleScroll = () => {
      if (!promiseContainerRef.current || !sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const distanceFromCenter = (rect.top + rect.height / 2) - (windowHeight / 2);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      
      const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
      
      const tiltAngle = normalizedDistance * 15;
      
      if (promiseContainerRef.current) {
        promiseContainerRef.current.style.transform = `perspective(1000px) rotateX(${tiltAngle}deg)`;
      }
    };
    
    promiseContainerRef.current.addEventListener('mousemove', handleMouseMove);
    promiseContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    return () => {
      if (promiseContainerRef.current) {
        promiseContainerRef.current.removeEventListener('mousemove', handleMouseMove);
        promiseContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const gridRows = 16;
  const gridCols = 24;
  
  const totalRows = gridRows * 2;
  
  return (
    <section id="mission" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pattern-fade-top"></div>
        <div className="pattern-fade-bottom"></div>
        
        <div className="pattern-grid">
          {Array.from({ length: totalRows * gridCols }).map((_, index) => {
            const row = Math.floor(index / gridCols);
            const col = index % gridCols;
            const isEven = (row + col) % 2 === 0;
            const Icon = isEven ? Sparkles : Zap;
            const iconClass = isEven ? "sparkle-icon" : "zap-icon";
            
            return (
              <div 
                key={`grid-icon-${index}`} 
                className={`grid-cell ${iconClass}`}
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                  animationDelay: `${(row * col) % 5}s`
                }}
              >
                <Icon />
              </div>
            );
          })}
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
              Harness the synergy of AI capabilities and human expertise to create digital solutions that deliver exceptional business results and transform industries.
            </p>
          </div>
          
          <div id="vision-card" className="glass-card animate-fade-in relative transition-transform duration-500 ease-out transform p-8 md:p-10" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-14 -left-6 p-6 rounded-full bg-noesis-blue/15 text-noesis-blue">
              <Gem className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-8 pt-8">Vision</h3>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              To lead the AI revolution in digital solutions, pioneering the perfect balance of artificial intelligence and human creativity for the world's most innovative organizations.
            </p>
          </div>
        </div>
        
        <div className="mt-32 max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-4xl md:text-5xl font-bold mb-12">
            Our <span className="gradient-text">Promise</span>
          </h3>
          <div 
            ref={promiseContainerRef}
            className="promise-glass-panel relative overflow-hidden p-10 transition-transform duration-300 ease-out"
          >
            <div className="refraction-layer"></div>
            <div className="glass-highlight"></div>
            <p ref={promiseTextRef} className="text-3xl md:text-4xl relative promise-text font-light tracking-wide z-10">
              <span className="text-word block md:inline-block mb-6 md:mb-0">Human</span> 
              <span className="text-word-highlight block md:inline-block mx-2 font-medium"> creativity</span>,
              
              <span className="text-word block md:inline-block mt-6 md:mt-0 md:ml-2">AI</span> 
              <span className="text-word-highlight block md:inline-block mx-2 font-medium"> precision</span>.
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
          
          .pattern-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: grid;
            grid-template-columns: repeat(${gridCols}, 1fr);
            grid-template-rows: repeat(${totalRows}, 1fr);
            animation: moveUp 60s linear infinite;
            z-index: 1;
            height: 200%;
            transform-origin: top center;
          }
          
          .grid-cell {
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.15;
            transition: all 0.5s ease;
            animation: pulseOpacity 8s ease-in-out infinite;
          }
          
          .grid-cell svg {
            width: 38px;
            height: 38px;
          }
          
          .sparkle-icon {
            color: #a074ff;
          }
          
          .zap-icon {
            color: #4ea7ff;
          }
          
          @keyframes moveUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          
          @keyframes pulseOpacity {
            0%, 100% {
              opacity: 0.08;
            }
            50% {
              opacity: 0.2;
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
          
          .promise-glass-panel {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            box-shadow: 
              0 4px 30px rgba(0, 0, 0, 0.1),
              inset 0 0 20px rgba(255, 255, 255, 0.05);
            transform-style: preserve-3d;
            will-change: transform;
            position: relative;
            overflow: hidden;
          }
          
          .refraction-layer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.05),
              rgba(134, 123, 255, 0.05),
              rgba(64, 153, 255, 0.08)
            );
            transform: translateZ(-10px);
            pointer-events: none;
            opacity: 0.7;
            mix-blend-mode: screen;
          }
          
          .glass-highlight {
            position: absolute;
            width: 150%;
            height: 150%;
            top: -25%;
            left: -25%;
            background: radial-gradient(
              circle at var(--x, 50%) var(--y, 50%),
              rgba(255, 255, 255, 0.15),
              transparent 40%
            );
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
          }
          
          .promise-glass-panel:hover .glass-highlight {
            opacity: 1;
          }
          
          .section-title {
            @apply text-3xl md:text-4xl font-bold mb-6 text-center relative;
          }
          
          .section-title::after {
            content: '';
            @apply absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-noesis-purple rounded-full mt-2;
            bottom: -12px;
          }
        `}
      </style>
    </section>
  );
};

export default MissionSection;
