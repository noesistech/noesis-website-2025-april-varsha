
import React from 'react';
import { ServiceItem } from '@/types/supabase';
import { getIconByName } from '@/components/hero/ServiceCard';
import { cn } from '@/lib/utils';

interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceDetailSectionProps {
  service: ServiceItem;
  features: ServiceFeature[];
  isAlternate?: boolean;
  bgColor?: string;
  accentColor?: string;
  imageUrl?: string;
}

const ServiceDetailSection: React.FC<ServiceDetailSectionProps> = ({
  service,
  features,
  isAlternate = false,
  bgColor = "from-[#1c212e] to-[#151a25]",
  accentColor = "border-noesis-purple/30",
  imageUrl
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className={cn("flex flex-col gap-8", isAlternate ? "lg:flex-row-reverse" : "lg:flex-row")}>
        {/* Service Info Card */}
        <div className="lg:w-1/2">
          <div className={cn("rounded-2xl bg-gradient-to-b", bgColor, "border border-white/10 shadow-xl p-8 h-full")}>
            <div className="flex items-center mb-6">
              <div className="bg-[#1A1F2C]/80 p-4 rounded-full mr-4 shadow-lg border border-white/5">
                {getIconByName(service.icon_name)}
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                {service.title}
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {service.description}
            </p>
          </div>
        </div>
        
        {/* Features */}
        <div className="lg:w-1/2">
          {imageUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img src={imageUrl} alt={service.title} className="w-full h-auto object-cover" />
            </div>
          )}
          
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-[#1A1F2C]/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300", 
                  accentColor, 
                  "hover:shadow-lg hover:border-white/20 transform hover:-translate-y-1"
                )}
              >
                <div className="flex items-start">
                  <div className="bg-[#222732] p-3 rounded-lg shadow-inner mr-4 border border-white/5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailSection;
