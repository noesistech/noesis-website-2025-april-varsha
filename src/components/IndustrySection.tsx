import React from 'react';
import { Heart, Briefcase, ShoppingCart, Factory, GraduationCap, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Industry {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  features: string[];
}

interface IndustrySectionProps {
  title: string;
  subtitle?: string;
  industries: Industry[];
}

const IndustrySection: React.FC<IndustrySectionProps> = ({
  title,
  industries
}) => {
  return (
    <section className="py-16 bg-[#1A1F2C]/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title.split(' ').slice(0, -1).join(' ')} <span className="text-noesis-purple">{title.split(' ').pop()}</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(industry => (
            <div 
              key={industry.id}
              className={cn(
                "bg-gradient-to-b from-[#222732]/95 to-[#1D212B]/85 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-noesis-purple/30 transition-all duration-300",
                "hover:border-noesis-purple/30 hover:scale-105 group"
              )}
            >
              <div className={`bg-[#1A1F2C]/90 p-4 rounded-full w-fit mb-4 group-hover:${industry.color.split(' ')[0]} transition-colors duration-300 border border-white/5 group-hover:border-noesis-purple/30`}>
                {getIndustryIcon(industry.icon_name)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-noesis-purple transition-colors duration-300">
                {industry.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getIndustryIcon = (iconName: string) => {
  const iconClass = "h-8 w-8";

  switch (iconName.toLowerCase()) {
    case 'heart':
      return <Heart className={`${iconClass} text-red-400`} />;
    case 'briefcase':
      return <Briefcase className={`${iconClass} text-blue-400`} />;
    case 'shoppingcart':
      return <ShoppingCart className={`${iconClass} text-purple-400`} />;
    case 'factory':
      return <Factory className={`${iconClass} text-green-400`} />;
    case 'graduationcap':
      return <GraduationCap className={`${iconClass} text-yellow-400`} />;
    case 'building':
      return <Building className={`${iconClass} text-orange-400`} />;
    default:
      return <Building className={`${iconClass} text-noesis-purple`} />;
  }
};

export default IndustrySection;
