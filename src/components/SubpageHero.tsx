
import React from 'react';

type SubpageHeroProps = {
  title: string;
  subtitle?: string;
  gradientText?: string;
  backgroundEffect?: 'purple' | 'blue' | 'green' | 'orange';
};

const SubpageHero = ({
  title,
  subtitle,
  gradientText,
  backgroundEffect = 'purple'
}: SubpageHeroProps) => {
  // Get color based on the selected background effect
  const getBackgroundColor = () => {
    switch (backgroundEffect) {
      case 'blue':
        return 'bg-blue-500/20';
      case 'green':
        return 'bg-green-500/20';
      case 'orange':
        return 'bg-orange-500/20';
      case 'purple':
      default:
        return 'bg-noesis-purple/20';
    }
  };

  return <section className="relative bg-[#1A1F2C] py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {gradientText ? <>
                {title.split(gradientText)[0]}
                <span className="text-noesis-purple">{gradientText}</span>
                {title.split(gradientText)[1]}
              </> : title}
          </h1>
          {subtitle && <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>}
        </div>
      </div>

      {/* Background gradient */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${getBackgroundColor()} rounded-full filter blur-[120px] opacity-50`} />
    </section>;
};

export default SubpageHero;
