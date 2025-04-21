import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
interface PromisePanelProps {
  title: string;
  text: string;
}
const PromisePanel = ({
  title,
  text
}: PromisePanelProps) => {
  const promiseTextRef = useRef<HTMLParagraphElement>(null);
  const promiseContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Simplified intersection observer for fade-in animation
  useEffect(() => {
    if (!promiseTextRef.current) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.5
    });
    observer.observe(promiseTextRef.current);
    return () => observer.disconnect();
  }, []);

  // Simplified tilt effect
  useEffect(() => {
    if (!promiseContainerRef.current || isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const panel = promiseContainerRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Reduced rotation intensity
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      if (!promiseContainerRef.current) return;
      promiseContainerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    // Remove scroll listener to simplify
    const element = promiseContainerRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);
  const renderPromiseText = () => {
    if (isMobile) {
      return <>
          <span>Human </span><span className="gradient-word">creativity</span><span>,</span>
          <br />
          <span>AI </span><span className="gradient-word">precision</span>
        </>;
    }
    return <>
        <span>Human </span><span className="gradient-word">creativity</span><span>, </span>
        <span>AI </span><span className="gradient-word">precision</span>
      </>;
  };
  return <div className="flex flex-col items-center w-full mt-32 py-0 my-[170px]">
      <div style={{
      animationDelay: '0.4s'
    }} className="text-center max-w-4xl mx-auto animate-fade-in my-0">
        <h3 className="text-4xl md:text-5xl font-bold mb-12">
          <span>Our </span><span className="gradient-text">Promise</span>
        </h3>
        
        <div ref={promiseContainerRef} className="promise-glass-panel relative overflow-hidden p-10 transition-transform duration-300 ease-out mx-auto px-[130px] py-[40px]">
          <div className="refraction-layer"></div>
          <div className="glass-highlight"></div>
          
          <p ref={promiseTextRef} className="text-3xl md:text-4xl relative promise-text font-light tracking-wide z-10">
            {renderPromiseText()}
          </p>
        </div>
      </div>
    </div>;
};
export default PromisePanel;