import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
interface PromisePanelProps {
  title: string;
  subtitle?: string;
  text: string;
}
const PromisePanel = ({
  title,
  subtitle,
  text
}: PromisePanelProps) => {
  const promiseTextRef = useRef<HTMLParagraphElement>(null);
  const promiseContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
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
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      if (!promiseContainerRef.current) return;
      promiseContainerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
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
    // Make sure the text is displayed for both mobile and desktop
    return <>
        <span>Human </span><span className="gradient-word">creativity</span>
        {isMobile ? <br /> : <span>, </span>}
        <span>AI </span><span className="gradient-word">precision</span>
      </>;
  };
  return;
};
export default PromisePanel;