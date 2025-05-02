
import React, { useEffect, useRef } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

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
              Since our founding in 2009, Noesis has evolved from a small tech consultancy into a leading innovator at the intersection of human expertise and artificial intelligence.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              Our journey has been marked by continuous adaptation to emerging technologies, strategic growth, and an unwavering commitment to delivering exceptional value to our clients across industries.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              Today, we pride ourselves on our unique approach that combines the creativity and intuition of our talented team with the power and efficiency of cutting-edge AI systems—creating solutions that are truly greater than the sum of their parts.
            </p>
          </div>
          
          {/* Interactive Timeline */}
          <div className="mt-16 relative pt-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-noesis-purple/80 to-noesis-blue/40"></div>
            
            <div className="space-y-32 relative">
              {/* Timeline item 1 */}
              <TimelineItem 
                year="2009"
                leftContent="Founded with a vision to bring cutting-edge technology solutions to businesses"
                rightContent="Established our core team and began delivering custom software solutions to our first clients"
                dotColor="bg-noesis-purple"
                index={0}
              />
              
              {/* Timeline item 2 */}
              <TimelineItem 
                year="2015"
                leftContent="Expanded our services to include mobile development and cloud solutions"
                rightContent="Reached our 50th client milestone and established partnerships with major tech providers"
                dotColor="bg-noesis-blue"
                index={1}
              />
              
              {/* Timeline item 3 */}
              <TimelineItem 
                year="2020"
                leftContent="Began integrating AI technologies into our development process"
                rightContent="Launched our flagship AI-powered product suite, transforming how our clients leverage technology"
                dotColor="bg-noesis-teal"
                index={2}
              />
              
              {/* Timeline item 4 */}
              <TimelineItem 
                year="Today"
                leftContent="Leading the industry with our 40+ member team combining human expertise with advanced AI capabilities"
                rightContent="Continuing to innovate and deliver exceptional solutions that exceed our clients' expectations"
                dotColor="bg-purple-400"
                index={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  year: string;
  leftContent: string;
  rightContent: string;
  dotColor: string;
  index: number;
}

const TimelineItem = ({ year, leftContent, rightContent, dotColor, index }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className="relative">
      {/* Timeline dot */}
      <motion.div 
        className={`absolute left-1/2 transform -translate-x-1/2 -top-3 z-10`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className={`w-6 h-6 ${dotColor} rounded-full border-2 border-white`}></div>
      </motion.div>
      
      {/* Grid for left and right content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left content */}
        <motion.div 
          className="text-right pr-4 md:pr-8 hidden md:block"
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <h3 className="text-xl font-semibold text-noesis-purple">{year}</h3>
          <p className="text-gray-300 mt-2">{leftContent}</p>
        </motion.div>
        
        {/* Right content */}
        <motion.div 
          className="md:pl-4 md:pl-8"
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        >
          <h3 className="text-xl font-semibold text-noesis-purple md:hidden">{year}</h3>
          <p className="text-gray-300 mt-2 md:mt-0">{rightContent}</p>
        </motion.div>
        
        {/* Mobile view - left content appears below the year for better flow */}
        <motion.div 
          className="md:hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          <p className="text-gray-300 mt-2">{leftContent}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyHistory;
