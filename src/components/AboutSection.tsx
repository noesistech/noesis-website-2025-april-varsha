import React, { useEffect, useRef } from 'react';
import { Users, Briefcase, Calendar, Award } from 'lucide-react';
import P5Animation from './P5Animation';
import { useContent } from '@/contexts/ContentContext';

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: string;
};

const StatCard = ({ icon, value, label, delay }: StatCardProps) => {
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const numericValue = target.getAttribute('data-numeric-value') || '0';
            const countTo = parseInt(numericValue, 10);
            const suffix = target.getAttribute('data-suffix') || '';
            let count = 0;
            const increment = Math.ceil(countTo / 50);
            
            const updateCount = () => {
              count += increment;
              if (count < countTo) {
                target.textContent = count.toString() + suffix;
                requestAnimationFrame(updateCount);
              } else {
                target.textContent = numericValue + suffix;
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
  }, []);
  
  const numericValue = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');
  
  return (
    <div className={`glass-card animate-fade-in`} style={{ animationDelay: delay }}>
      <div className="flex flex-col items-center">
        <div className="p-4 rounded-full bg-noesis-purple/20 mb-4">
          {icon}
        </div>
        <div 
          ref={counterRef}
          className="text-4xl font-bold mb-2 gradient-text"
          data-value={value}
          data-numeric-value={numericValue}
          data-suffix={suffix}
        >
          0
        </div>
        <p className="text-white/70">{label}</p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const { aboutSection, stats } = useContent();

  return (
    <section id="about" className="py-20 relative bg-noesis-dark">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-noesis-dark/90 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">About <span className="gradient-text">Noesis</span></h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="glass rounded-2xl overflow-hidden animate-fade-in" style={{ height: '500px' }}>
            <P5Animation className="w-full h-full" />
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 animate-fade-in">
              An AI-Native Agency Since <span className="gradient-text">2009</span>
            </h3>
            <div className="space-y-4">
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Our 40+ member team combines talented human experts with cutting-edge AI tools to deliver solutions that blend the best of human creativity and artificial intelligence.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                With 175+ years of combined experience, we've pioneered the integration of human expertise and AI capabilities, establishing ourselves as leaders in AI-enhanced digital technology services.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Our 95% client retention rate and 4+ year average relationships demonstrate how our unique AI-human partnership approach consistently delivers breakthrough solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.id}
              icon={
                stat.icon_name === 'Users' ? <Users className="h-6 w-6 text-noesis-purple" /> :
                stat.icon_name === 'Briefcase' ? <Briefcase className="h-6 w-6 text-noesis-blue" /> :
                stat.icon_name === 'Calendar' ? <Calendar className="h-6 w-6 text-purple-400" /> :
                <Award className="h-6 w-6 text-pink-400" />
              }
              value={stat.value}
              label={stat.label}
              delay={`${0.2 * (index + 1)}s`}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-noesis-dark/0 to-noesis-dark pointer-events-none"></div>
    </section>
  );
};

export default AboutSection;
