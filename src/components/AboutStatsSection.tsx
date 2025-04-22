
import React from 'react';
import { Users, Award, Clock, Percent } from 'lucide-react';
import P5Animation from './P5Animation';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutStatsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="w-full py-12 bg-[#1A1F2C] text-white md:py-[70px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left side: Network visualization with P5Animation */}
          <div className="md:w-1/2 animate-fade-in">
            <div className="bg-[#1A1F2C] border border-purple-500/20 p-1 rounded-lg h-full">
              <div className={`w-full ${isMobile ? 'max-h-[50vh]' : 'h-full min-h-[400px]'} rounded relative overflow-hidden`}>
                <P5Animation />
              </div>
            </div>
          </div>
          
          {/* Right side: About text and stats */}
          <div className="md:w-1/2 flex flex-col justify-center animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 relative">
              Evolving Since <span className="gradient-text">2009</span>, Leading in AI Today
              <span className="absolute left-0 bottom-[-15px] w-24 h-1 bg-purple-500 rounded-full"></span>
            </h2>
            
            <div className="space-y-6 mt-8">
              <p className="text-gray-300">
                Our 40+ member team combines talented human experts with cutting-edge AI tools to deliver 
                solutions that blend the best of human creativity and artificial intelligence.
              </p>
              
              <p className="text-gray-300">
                With over a decade of experience in digital innovation, we've grown alongside emerging 
                technologies to establish ourselves as leaders in AI-enhanced digital services.
              </p>
              
              <p className="text-gray-300">
                Our 95% client retention rate and 4+ year average relationships demonstrate how our unique 
                AI-human partnership approach consistently delivers breakthrough solutions that exceed expectations.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {/* Stat 1 */}
              <div className="bg-[#242836] p-6 rounded-lg flex flex-col items-center justify-center animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300">40</h3>
                <p className="text-xs sm:text-sm text-gray-400 text-center">Human + AI Experts</p>
              </div>
              
              {/* Stat 2 */}
              <div className="bg-[#242836] p-6 rounded-lg flex flex-col items-center justify-center animate-fade-in" style={{
              animationDelay: '0.4s'
            }}>
                <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300">15+</h3>
                <p className="text-xs sm:text-sm text-gray-400 text-center">Innovation Awards</p>
              </div>
              
              {/* Stat 3 */}
              <div className="bg-[#242836] p-6 rounded-lg flex flex-col items-center justify-center animate-fade-in" style={{
              animationDelay: '0.5s'
            }}>
                <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300 text-center">&gt; 4 Years</h3>
                <p className="text-xs sm:text-sm text-gray-400 text-center">Avg. Client Relationship</p>
              </div>
              
              {/* Stat 4 */}
              <div className="bg-[#242836] p-6 rounded-lg flex flex-col items-center justify-center animate-fade-in" style={{
              animationDelay: '0.6s'
            }}>
                <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                  <Percent className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300">95%</h3>
                <p className="text-xs sm:text-sm text-gray-400 text-center">Client Retention Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;

