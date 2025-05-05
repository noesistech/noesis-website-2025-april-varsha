
import React from 'react';
import { ServiceItem } from '@/types/supabase';
import { useIsMobile } from '@/hooks/use-mobile';
import { getIconByName, serviceIconColors } from '@/components/hero/ServiceCard';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ServiceGridProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ title, subtitle, services = [] }) => {
  const isMobile = useIsMobile();
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-[#1A1F2C]" id="services">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-title mb-6">
          <span className="gradient-text">{title}</span>
        </h2>
        
        {subtitle && (
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg mb-12">
            {subtitle}
          </p>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              className="relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-noesis-purple/30 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300 -z-10 blur-xl"></div>
              <div className="h-full bg-[#222732] hover:bg-[#272c38] border-t border-l border-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-noesis-purple/20">
                <div className="bg-gradient-to-br from-[#2A2F3C] to-[#222732] p-4 rounded-2xl w-fit mb-6 shadow-inner">
                  <div className={serviceIconColors[service.icon_name as keyof typeof serviceIconColors] || 'text-noesis-purple'}>
                    {getIconByName(service.icon_name)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <div className="border-t border-white/10 my-4"></div>
                
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGrid;
