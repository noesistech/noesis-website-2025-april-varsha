
import React from 'react';
import { useContent } from '@/contexts/ContentContext';

const CompanyHistory = () => {
  const { aboutSection } = useContent();
  
  return (
    <section className="w-full bg-gradient-to-b from-[#1A1F2C] to-[#232736] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Journey</span> Since 2009
          </h2>
          
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full"></div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {aboutSection.description_1}
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              {aboutSection.description_2}
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              {aboutSection.description_3}
            </p>
          </div>
          
          {/* Timeline */}
          <div className="mt-16 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-noesis-purple/80 to-noesis-blue/40"></div>
            
            <div className="space-y-16">
              {/* Timeline item 1 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3">
                  <div className="w-6 h-6 bg-noesis-purple rounded-full border-2 border-white"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-right pr-8 hidden md:block">
                    <h3 className="text-xl font-semibold text-noesis-purple">2009</h3>
                    <p className="text-gray-300 mt-2">Founded with a vision to bring cutting-edge technology solutions to businesses</p>
                  </div>
                  <div className="md:pl-8">
                    <h3 className="text-xl font-semibold text-noesis-purple md:hidden">2009</h3>
                    <p className="text-gray-300 mt-2 md:mt-0">Established our core team and began delivering custom software solutions to our first clients</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 2 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3">
                  <div className="w-6 h-6 bg-noesis-blue rounded-full border-2 border-white"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-8">
                    <h3 className="text-xl font-semibold text-noesis-blue">2015</h3>
                    <p className="text-gray-300 mt-2">Expanded our services to include mobile development and cloud solutions</p>
                  </div>
                  <div className="md:pl-8 hidden md:block">
                    <h3 className="text-xl font-semibold text-noesis-blue">2015</h3>
                    <p className="text-gray-300 mt-2">Reached our 50th client milestone and established partnerships with major tech providers</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 3 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3">
                  <div className="w-6 h-6 bg-noesis-teal rounded-full border-2 border-white"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-right pr-8 hidden md:block">
                    <h3 className="text-xl font-semibold text-noesis-teal">2020</h3>
                    <p className="text-gray-300 mt-2">Began integrating AI technologies into our development process</p>
                  </div>
                  <div className="md:pl-8">
                    <h3 className="text-xl font-semibold text-noesis-teal md:hidden">2020</h3>
                    <p className="text-gray-300 mt-2 md:mt-0">Launched our flagship AI-powered product suite, transforming how our clients leverage technology</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 4 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3">
                  <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-8">
                    <h3 className="text-xl font-semibold text-purple-400">Today</h3>
                    <p className="text-gray-300 mt-2">Leading the industry with our 40+ member team combining human expertise with advanced AI capabilities</p>
                  </div>
                  <div className="md:pl-8 hidden md:block">
                    <h3 className="text-xl font-semibold text-purple-400">Today</h3>
                    <p className="text-gray-300 mt-2">Continuing to innovate and deliver exceptional solutions that exceed our clients' expectations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
