
import React from 'react';
import { Shield, Award, Star, ThumbsUp, Trophy, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ icon, title, description, className }) => {
  return (
    <div className={cn(
      "bg-[#222732] rounded-xl p-6 shadow-lg border border-[#2A2F3C] transition-all duration-300 hover:shadow-xl hover:border-noesis-purple/30 hover:scale-[1.02]",
      className
    )}>
      <div className="flex flex-col items-center">
        <div className="bg-[#1A1F2C] p-3 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white text-center">{title}</h3>
        <p className="text-gray-300 text-center text-sm">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      id: 'human-ai',
      icon: <Shield className="h-10 w-10 text-blue-400" />,
      title: 'Human-AI Collaboration',
      description: 'We combine the creativity and empathy of human expertise with the efficiency and precision of AI technology.'
    },
    {
      id: 'quality',
      icon: <Award className="h-10 w-10 text-amber-400" />,
      title: 'Quality Assurance',
      description: 'Our unique dual-verification process ensures exceptional quality in every deliverable.'
    },
    {
      id: 'custom',
      icon: <Star className="h-10 w-10 text-pink-400" />,
      title: 'Tailored Solutions',
      description: 'Each project is custom-designed to meet your specific goals and challenges.'
    },
    {
      id: 'results',
      icon: <ThumbsUp className="h-10 w-10 text-teal-400" />,
      title: 'Results-Driven',
      description: 'We focus on delivering tangible business outcomes, not just technical outputs.'
    },
    {
      id: 'expertise',
      icon: <Trophy className="h-10 w-10 text-green-400" />,
      title: 'Deep Expertise',
      description: 'Our team brings extensive experience across multiple industries and technologies.'
    },
    {
      id: 'value',
      icon: <Gift className="h-10 w-10 text-noesis-purple" />,
      title: 'Exceptional Value',
      description: 'Our hybrid approach delivers premium results at competitive pricing.'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {reasons.map((reason) => (
        <ReasonCard
          key={reason.id}
          icon={reason.icon}
          title={reason.title}
          description={reason.description}
        />
      ))}
    </div>
  );
};

export default WhyChooseSection;
