
import React, { useEffect, useRef } from 'react';
import { Users, Briefcase, Calendar, Award } from 'lucide-react';

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
            const countTo = parseInt(target.getAttribute('data-value') || '0', 10);
            let count = 0;
            const increment = Math.ceil(countTo / 50);
            
            const updateCount = () => {
              count += increment;
              if (count < countTo) {
                target.textContent = count.toString() + (target.getAttribute('data-suffix') || '');
                requestAnimationFrame(updateCount);
              } else {
                target.textContent = target.getAttribute('data-value') + (target.getAttribute('data-suffix') || '');
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
          data-suffix={value.includes('+') ? '+' : ''}
        >
          0
        </div>
        <p className="text-white/70">{label}</p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">About <span className="gradient-text">Noesis</span></h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="glass rounded-2xl overflow-hidden animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
              alt="Team collaboration" 
              className="w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 animate-fade-in">
              Founded in <span className="gradient-text">2009</span>
            </h3>
            <div className="space-y-4">
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Our 40+ member strong team consists of some of the most skilled creative technologists, engineers, project managers and business analysts in the industry.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                With a combined experience of 175+ years in delivering strategic and tactical digital technology services, we've established ourselves as a trusted partner for businesses worldwide.
              </p>
              <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                We take pride in our 95% client retention rate and average client relationships exceeding 4 years, serving as an innovation partner to leading agencies and consultancies across the globe.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users className="h-6 w-6 text-noesis-purple" />}
            value="40"
            label="Team Members"
            delay="0.2s"
          />
          <StatCard 
            icon={<Briefcase className="h-6 w-6 text-noesis-blue" />}
            value="175+"
            label="Years of Experience"
            delay="0.4s"
          />
          <StatCard 
            icon={<Calendar className="h-6 w-6 text-purple-400" />}
            value="4+"
            label="Avg. Client Relationship"
            delay="0.6s"
          />
          <StatCard 
            icon={<Award className="h-6 w-6 text-pink-400" />}
            value="95"
            label="Client Retention Rate %"
            delay="0.8s"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
