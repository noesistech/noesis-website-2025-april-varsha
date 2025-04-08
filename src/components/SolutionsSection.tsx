
import React, { useRef, useEffect } from 'react';
import { GraduationCap, Cpu, ShoppingBag, MessageSquare, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolutionItem } from '@/types/supabase';

interface SolutionsSectionProps {
  title: string;
  solutions: SolutionItem[];
}

const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  title,
  solutions
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const displaySolutions = solutions && solutions.length > 0 ? solutions.map(solution => ({
    id: solution.id,
    icon: getIconByName(solution.icon_name),
    title: solution.title,
    description: solution.description,
    color: solution.color || 'from-purple-500/20 to-purple-600/20'
  })) : [{
    id: 'lms',
    icon: <GraduationCap className="h-8 w-8" />,
    title: 'AI-Powered Learning Management',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>Human-centered interface enhanced by AI for intuitive course creation</li>
          <li>Smart assessment tools that combine AI grading with human expertise</li>
          <li>AI-driven analytics with human-interpreted reporting</li>
        </ul>,
    color: 'from-blue-500/20 to-blue-600/20'
  }, {
    id: 'brainstormer',
    icon: <Cpu className="h-8 w-8" />,
    title: 'Brainstormer',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>Our proprietary AI platform developed by human AI experts</li>
          <li>Brainstormer Pro: Customized ChatGPT solutions</li>
          <li>Brainstormer Studio: Low-code environment</li>
        </ul>,
    color: 'from-purple-500/20 to-purple-600/20'
  }, {
    id: 'ecommerce',
    icon: <ShoppingBag className="h-8 w-8" />,
    title: 'AI-Enhanced eCommerce',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>Expert human designers directing AI tools for website design</li>
          <li>Specialized teams for Shopify and Magento solutions</li>
          <li>Exceptional 8-9% ROAS achieved through optimization</li>
        </ul>,
    color: 'from-pink-500/20 to-pink-600/20'
  }, {
    id: 'chatbots',
    icon: <MessageSquare className="h-8 w-8" />,
    title: 'Human-Directed AI Chatbots',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>Bespoke AI solutions for your specific business needs</li>
          <li>Team collaboration features to enhance integration</li>
          <li>Support in 14+ Indic languages</li>
        </ul>,
    color: 'from-green-500/20 to-green-600/20'
  }, {
    id: 'creative',
    icon: <Wand2 className="h-8 w-8" />,
    title: 'Creative Technology',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
          <li>Chatbots that blend AI capabilities with human warmth</li>
          <li>Interactive marketing solutions for quizzes and social filters</li>
          <li>AR/VR experiences through human-AI collaboration</li>
        </ul>,
    color: 'from-yellow-500/20 to-yellow-600/20'
  }];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Split the title to apply gradient to "Solutions" part
  const renderTitle = () => {
    if (!title) return "Our Solutions";
    
    const words = title.split(' ');
    const lastWordIndex = words.length - 1;
    
    return (
      <>
        {words.slice(0, lastWordIndex).join(' ')} <span className="gradient-text">{words[lastWordIndex]}</span>
      </>
    );
  };

  return <section id="solutions" ref={sectionRef} className="py-10 sm:py-16 md:py-[20px]">
      <div className="container mx-auto px-3 sm:px-6">
        <h2 className="section-title">{renderTitle()}</h2>
        
        <div className="flex flex-wrap lg:flex-nowrap gap-3 sm:gap-4">
          {displaySolutions.map((solution, index) => <div 
            key={solution.id} 
            ref={el => cardsRef.current[index] = el} 
            className="glass relative overflow-hidden rounded-2xl opacity-0 transition-all duration-500 hover:shadow-lg w-full lg:w-1/5"
          >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", solution.color)}></div>
              <div className="relative z-10 p-3 sm:p-4">
                <div className="bg-white/10 p-2 rounded-full w-fit mb-2 sm:mb-3">
                  {solution.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-left">{solution.title}</h3>
                <div className="text-left">
                  {solution.description}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};

const getIconByName = (iconName: string) => {
  const normalizedIconName = iconName.toLowerCase();
  switch (normalizedIconName) {
    case 'graduation-cap':
    case 'graduationcap':
      return <GraduationCap className="h-8 w-8 text-blue-400" />;
    case 'cpu':
      return <Cpu className="h-8 w-8 text-noesis-purple" />;
    case 'shopping-bag':
    case 'shoppingbag':
      return <ShoppingBag className="h-8 w-8 text-pink-400" />;
    case 'message-square':
    case 'messagesquare':
      return <MessageSquare className="h-8 w-8 text-green-400" />;
    case 'wand':
    case 'wand2':
      return <Wand2 className="h-8 w-8 text-yellow-400" />;
    default:
      console.warn(`Icon name not recognized: ${iconName}`);
      return <Cpu className="h-8 w-8" />;
  }
};

export default SolutionsSection;
