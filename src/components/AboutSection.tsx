
import React, { useRef, useEffect } from 'react';
import { Users, Award, Clock, Percent } from 'lucide-react';
import P5Animation from './P5Animation';
import { useContent } from '@/contexts/ContentContext';

const AboutSection = () => {
  const { aboutSection, stats } = useContent();
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);

  // Effect to match the left container height to the right container
  useEffect(() => {
    const adjustHeight = () => {
      if (rightContainerRef.current && leftContainerRef.current) {
        const rightHeight = rightContainerRef.current.offsetHeight;
        leftContainerRef.current.style.height = `${rightHeight}px`;
        console.log("Adjusted height to:", rightHeight);
      }
    };

    // Initial adjustment with a slight delay to ensure content is rendered
    const initialTimer = setTimeout(adjustHeight, 100);
    
    // Listen for window resize to readjust
    window.addEventListener('resize', adjustHeight);
    
    // Setup a mutation observer to track content changes in the right container
    const observer = new MutationObserver(adjustHeight);
    if (rightContainerRef.current) {
      observer.observe(rightContainerRef.current, { 
        childList: true, 
        subtree: true,
        characterData: true
      });
    }
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', adjustHeight);
      clearTimeout(initialTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="relative py-20 bg-noesis-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left side - P5 Animation */}
          <div 
            ref={leftContainerRef}
            className="relative bg-noesis-darker/80 rounded-2xl overflow-hidden animate-fade-in"
            style={{ minHeight: '500px' }}
          >
            <P5Animation className="w-full h-full absolute inset-0" />
            <div className="absolute inset-0 grid-pattern opacity-20"></div>
          </div>
          
          {/* Right side - Content */}
          <div ref={rightContainerRef} className="space-y-8">
            {/* Heading */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in">
                Evolving Since <span className="text-purple-400">2009</span>, Leading in AI Today
              </h2>
              <div className="h-1 w-24 bg-purple-500 rounded-full animate-fade-in"></div>
            </div>
            
            {/* Description paragraphs */}
            <div className="space-y-4">
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Our 40+ member team combines talented human experts with cutting-edge AI tools to deliver solutions that blend the best of human creativity and artificial intelligence.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                With over a decade of experience in digital innovation, we've grown alongside emerging technologies to establish ourselves as leaders in AI-enhanced digital services.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Our 95% client retention rate and 4+ year average relationships demonstrate how our unique AI-human partnership approach consistently delivers breakthrough solutions that exceed expectations.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatCard 
                  key={stat.id}
                  icon={getIconComponent(stat.icon_name)}
                  value={stat.value}
                  label={stat.label}
                  delay={`${0.3 + (index * 0.1)}s`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Users':
      return <Users className="h-6 w-6 text-purple-400" />;
    case 'Trophy':
      return <Award className="h-6 w-6 text-purple-400" />;
    case 'Calendar':
      return <Clock className="h-6 w-6 text-purple-400" />;
    case 'Percent':
    default:
      return <Percent className="h-6 w-6 text-purple-400" />;
  }
};

const StatCard = ({ 
  icon, 
  value, 
  label, 
  delay 
}: { 
  icon: React.ReactNode, 
  value: string, 
  label: string, 
  delay: string 
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const displayValue = target.getAttribute('data-value') || '0';
            
            if (displayValue.includes('>')) {
              target.textContent = displayValue;
              observer.unobserve(target);
              return;
            }
            
            const countTo = parseInt(displayValue.replace(/\D/g, ''), 10);
            let count = 0;
            const increment = Math.ceil(countTo / 30);
            const suffix = displayValue.includes('+') ? '+' : '';
            
            const updateCount = () => {
              count += increment;
              if (count < countTo) {
                target.textContent = count + suffix;
                requestAnimationFrame(updateCount);
              } else {
                target.textContent = displayValue;
              }
            };
            
            requestAnimationFrame(updateCount);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value]);
  
  return (
    <div 
      className="bg-noesis-darker rounded-xl p-6 flex flex-col items-center animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="bg-purple-900/30 p-3 rounded-full mb-4">
        {icon}
      </div>
      <div 
        ref={counterRef}
        className="text-3xl md:text-4xl font-bold text-center text-purple-300"
        data-value={value}
      >
        {value.startsWith('>') ? '> 0' : '0'}
      </div>
      <p className="text-sm text-center text-gray-400 mt-1">{label}</p>
    </div>
  );
};

export default AboutSection;
