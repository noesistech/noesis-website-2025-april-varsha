import React, { useEffect, useRef } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const CompanyHistory = () => {
  const {
    aboutSection
  } = useContent();
  
  return <section className="w-full bg-[#1A1F2C] py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 py-0">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-[40px]">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Journey</span> Since 2009
          </h2>
          
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full"></div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-base">
              Since our founding in 2009, Noesis has evolved into a pioneering force in digital technology, powered by our 40+ member team of skilled creative technologists, engineers, project managers, and business analysts with a combined 175+ years of experience. Our excellence is reflected in our 95% client retention rate and average relationships exceeding 4 years, as we continue to serve as an innovation partner to leading agencies and consultancies across the globe, blending human expertise with cutting-edge AI capabilities to deliver transformative solutions.
            </p>
          </div>
          
          {/* Interactive Timeline */}
          <div className="mt-16 relative pt-8">
            {/* Vertical timeline line - moved to 20% on mobile */}
            <div className="absolute left-[20%] md:left-1/2 transform -translate-x-[1px] h-full w-[2px] bg-gradient-to-b from-noesis-purple/80 to-noesis-blue/40"></div>
            
            <div className="space-y-24 md:space-y-40 relative">
              {/* Timeline items */}
              <TimelineItem year="2009" leftContent="Founded with a vision to bring cutting-edge technology solutions to businesses" rightContent="Established our core team and began delivering custom software solutions to our first clients" dotColor="bg-noesis-purple" index={0} />
              
              <TimelineItem year="2015" leftContent="Expanded our services to include mobile development and cloud solutions" rightContent="Reached our 50th client milestone and established partnerships with major tech providers" dotColor="bg-noesis-blue" index={1} />
              
              <TimelineItem year="2020" leftContent="Began integrating AI technologies into our development process" rightContent="Launched our flagship AI-powered product suite, transforming how our clients leverage technology" dotColor="bg-noesis-teal" index={2} />
              
              <TimelineItem year="Today" leftContent="Leading the industry with our 40+ member team combining human expertise with advanced AI capabilities" rightContent="Continuing to innovate and deliver exceptional solutions that exceed our clients' expectations" dotColor="bg-purple-400" index={3} />
            </div>
          </div>
        </div>
      </div>
    </section>;
};

interface TimelineItemProps {
  year: string;
  leftContent: string;
  rightContent: string;
  dotColor: string;
  index: number;
}

const TimelineItem = ({
  year,
  leftContent,
  rightContent,
  dotColor,
  index
}: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: "-100px 0px -100px 0px"
  });
  
  return <div ref={ref} className="relative">
      {/* Mobile layout - year on left side, items on right */}
      <div className="md:hidden grid grid-cols-[1fr_4fr] gap-4">
        {/* Year on the left */}
        <motion.div 
          className="text-right relative" 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.3 }}
        >
          <h3 className="text-xl font-semibold text-noesis-purple">
            {year}
          </h3>
        </motion.div>
        
        {/* Content on the right */}
        <div className="pl-6">
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.3 }}
          >
            <p className="text-gray-300">{rightContent}</p>
          </motion.div>
          
          <motion.div 
            className="pt-2 border-t border-gray-700/30"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.3 }}
          >
            <p className="text-gray-300">{leftContent}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Desktop layout - remained unchanged */}
      <div className="hidden md:block">
        {/* Timeline dot - unchanged for desktop */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 z-10" 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.3 }}
        >
          <div className={`w-6 h-6 ${dotColor} rounded-full border-2 border-white shadow-lg shadow-${dotColor}/30`}></div>
        </motion.div>
        
        {/* Content grid - unchanged for desktop */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left content */}
          <motion.div 
            className="text-right pr-12" 
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.3 }}
          >
            <h3 className="text-xl font-semibold text-noesis-purple mb-3">{year}</h3>
            <p className="text-gray-300">{leftContent}</p>
          </motion.div>
          
          {/* Right content */}
          <motion.div 
            className="pl-12" 
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.3 }}
          >
            <h3 className="text-xl font-semibold text-noesis-purple mb-3">{year}</h3>
            <p className="text-gray-300">{rightContent}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Timeline dot for mobile - positioned at 20% */}
      <motion.div 
        className="md:hidden absolute left-[20%] transform -translate-x-1/2 z-10" 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.3 }}
      >
        <div className={`w-5 h-5 ${dotColor} rounded-full border-2 border-white shadow-lg shadow-${dotColor}/30`}></div>
      </motion.div>
    </div>;
};

export default CompanyHistory;
