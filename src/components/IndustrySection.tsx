
import React, { useState } from 'react';
import { Heart, Briefcase, ShoppingCart, Factory, GraduationCap, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  subtitle,
  industries 
}) => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]?.id || '');

  const getIconByName = (iconName: string) => {
    const normalizedIconName = iconName.toLowerCase();
    switch (normalizedIconName) {
      case 'heart':
        return <Heart className="h-6 w-6 text-red-400" />;
      case 'briefcase':
        return <Briefcase className="h-6 w-6 text-blue-400" />;
      case 'shoppingcart':
        return <ShoppingCart className="h-6 w-6 text-purple-400" />;
      case 'factory':
        return <Factory className="h-6 w-6 text-green-400" />;
      case 'graduationcap':
        return <GraduationCap className="h-6 w-6 text-yellow-400" />;
      case 'building':
        return <Building className="h-6 w-6 text-orange-400" />;
      default:
        return <Heart className="h-6 w-6 text-purple-400" />;
    }
  };

  const selectedIndustry = industries.find(industry => industry.id === activeIndustry) || industries[0];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Industry-Specific <span className="text-noesis-purple">Solutions</span>
          </h2>
          <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto text-base sm:text-lg">
            AI-powered solutions tailored for your industry's unique challenges
          </p>
        </div>

        {/* Industry tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {industries.map((industry) => (
            <Button
              key={industry.id}
              variant={activeIndustry === industry.id ? "noesis" : "secondary"}
              size="sm"
              className="text-xs sm:text-sm"
              onClick={() => setActiveIndustry(industry.id)}
            >
              {industry.title}
            </Button>
          ))}
        </div>

        {/* Selected industry details */}
        {selectedIndustry && (
          <div className={`bg-gradient-radial ${selectedIndustry.color} to-transparent p-1 rounded-xl`}>
            <div className="bg-[#222732] rounded-xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Industry description */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/10 p-2 rounded mr-3">
                      {getIconByName(selectedIndustry.icon_name)}
                    </div>
                    <h3 className="text-xl font-bold text-white">{selectedIndustry.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{selectedIndustry.description}</p>
                  
                  <Button variant="noesis" asChild>
                    <Link to="/contact">Get Industry Solution</Link>
                  </Button>
                </div>
                
                {/* Industry features */}
                <div className="w-full md:w-1/2 bg-[#1A1F2C]/40 rounded-xl p-4 sm:p-6">
                  <h4 className="text-white font-semibold mb-4">Key Capabilities</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedIndustry.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-noesis-purple rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustrySection;
