
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromisePanelProps {
  title: string;
  text: string;
}

const PromisePanel = ({
  title,
  text
}: PromisePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    
    if (panelRef.current) {
      observer.observe(panelRef.current);
    }
    
    return () => {
      if (panelRef.current) {
        observer.unobserve(panelRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      
      const rect = panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const highlight = panel.querySelector('.glass-highlight') as HTMLElement;
      if (highlight) {
        highlight.style.setProperty('--x', `${x}%`);
        highlight.style.setProperty('--y', `${y}%`);
      }
    };
    
    panel.addEventListener('mousemove', handleMouseMove);
    return () => {
      panel.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);
  
  const textWords = text.split(' ');
  
  return (
    <div 
      ref={panelRef}
      className={`promise-glass-panel mx-auto my-8 sm:my-16 max-w-3xl p-4 sm:p-8 text-center promise-text ${isMobile ? 'py-6' : 'py-10'}`}
    >
      <div className="refraction-layer"></div>
      <div className="glass-highlight"></div>
      
      <h3 className={`mb-4 sm:mb-6 text-xl sm:text-2xl font-medium tracking-wide uppercase text-white/80`}>
        {title}
      </h3>
      
      <div className={`gradient-text font-bold ${isMobile ? 'text-2xl sm:text-4xl' : 'text-2xl sm:text-3xl md:text-5xl'}`}>
        {textWords.map((word, i) => (
          <span key={i} className="gradient-word mx-1 md:mx-2 inline-block">
            <span className="text-word">{word}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromisePanel;
