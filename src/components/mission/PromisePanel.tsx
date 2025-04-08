import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromisePanelProps {
  title: string;
  text: string;
}

const PromisePanel = ({ title, text }: PromisePanelProps) => {
  const promiseTextRef = useRef<HTMLParagraphElement>(null);
  const promiseContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
      if (!promiseContainerRef.current) return;
      
      const windowHeight = window.innerHeight;
      const rect = promiseContainerRef.current.getBoundingClientRect();
      
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
  
  const renderPromiseText = () => {
    if (isMobile) {
      return (
        <>
          <span>Human </span><span className="gradient-word">creativity</span><span>,</span>
          <br />
          <span>AI </span><span className="gradient-word">precision</span>
        </>
      );
    }
    
    return (
      <>
        <span>Human </span><span className="gradient-word">creativity</span><span>, </span>
        <span>AI </span><span className="gradient-word">precision</span>
      </>
    );
  };
  
  return (
    <div className="mt-32 max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h3 className="text-4xl md:text-5xl font-bold mb-12">
        <span>Our </span><span className="gradient-text">Promise</span>
      </h3>
      <div 
        ref={promiseContainerRef}
        className="promise-glass-panel relative overflow-hidden p-10 transition-transform duration-300 ease-out"
      >
        <div className="refraction-layer"></div>
        <div className="glass-highlight"></div>
        <p ref={promiseTextRef} className="text-3xl md:text-4xl relative promise-text font-light tracking-wide z-10">
          {renderPromiseText()}
        </p>
      </div>
    </div>
  );
};

export default PromisePanel;
