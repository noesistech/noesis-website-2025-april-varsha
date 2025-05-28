import React, { useRef, useEffect } from 'react';
import { Users, Award, Clock, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import P5Animation from './P5Animation';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const {
    aboutSection,
    stats
  } = useContent();
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

    // Initial adjustment with multiple attempts to ensure content is fully rendered
    const initialTimer = setTimeout(adjustHeight, 100);
    const secondTimer = setTimeout(adjustHeight, 300);
    const thirdTimer = setTimeout(adjustHeight, 500);

    // Listen for window resize to readjust
    window.addEventListener('resize', adjustHeight);

    // Setup a mutation observer to track content changes in the right container
    const observer = new MutationObserver(adjustHeight);
    if (rightContainerRef.current) {
      observer.observe(rightContainerRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', adjustHeight);
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
      clearTimeout(thirdTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="relative py-12 sm:py-20 bg-noesis-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Modified grid to reverse column order on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Content first on mobile - With order-2 for larger screens */}
          <div 
            ref={rightContainerRef} 
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            {/* Heading - Updated to match screenshot */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in">
                Evolving Since <span className="text-purple-400">2009</span>, Leading in AI Today
              </h2>
            </div>
            
            {/* Description paragraph - Updated to match screenshot */}
            <div className="space-y-4">
              <p className="text-white/80 text-lg sm:text-xl animate-fade-in" style={{
                animationDelay: '0.2s'
              }}>
                With over a decade of experience in digital innovation, we've grown alongside emerging technologies to establish ourselves as leaders in AI-enhanced digital services.
              </p>
            </div>
            
            {/* CTA Button to About Page - Updated to match screenshot */}
            <div className="flex justify-start mt-4 sm:mt-6 animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
              <Link to="/about">
                <Button variant="noesis" className="px-6 py-2 text-base">
                  Learn More About Noesis
                </Button>
              </Link>
            </div>
            
            {/* Stats Grid - Made responsive for mobile and updated to match screenshot */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {stats.map((stat, index) => (
                <StatCard 
                  key={stat.id} 
                  icon={getIconComponent(stat.icon_name)} 
                  value={stat.value} 
                  label={stat.label} 
                  delay={`${0.4 + index * 0.1}s`} 
                />
              ))}
            </div>
          </div>
          
          {/* Animation second on mobile - With order-1 for larger screens - Made extra compact square on mobile */}
          <div 
            ref={leftContainerRef} 
            className="relative bg-noesis-darker/80 rounded-2xl overflow-hidden order-2 lg:order-1 w-full max-w-xs mx-auto aspect-square sm:max-w-none sm:aspect-auto mb-0"
            style={{ minHeight: '300px' }}
          >
            <P5Animation className="w-full h-full absolute inset-0" />
            <div className="absolute inset-0 grid-pattern opacity-20 w-full h-full"></div>
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
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: string;
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
    }, {
      threshold: 0.5
    });
    
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
      className="bg-noesis-darker rounded-xl p-4 sm:p-6 flex flex-col items-center animate-fade-in" 
      style={{ animationDelay: delay }}
    >
      <div className="bg-purple-900/30 p-2 sm:p-3 rounded-full mb-2 sm:mb-4">
        {icon}
      </div>
      <div 
        ref={counterRef} 
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-purple-300" 
        data-value={value}
      >
        {value.startsWith('>') ? '> 0' : '0'}
      </div>
      <p className="text-xs sm:text-sm text-center text-gray-400 mt-1">{label}</p>
    </div>
  );
};

export default AboutSection;
