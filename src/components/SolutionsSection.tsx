import React, { useRef, useEffect } from 'react';
import { GraduationCap, Cpu, ShoppingBag, MessageSquare, Wand2, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolutionItem } from '@/types/supabase';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface SolutionsSectionProps {
  title: string;
  subtitle?: string;
  solutions: SolutionItem[];
}
const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  title,
  subtitle,
  solutions
}) => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displaySolutions = solutions && solutions.length > 0 ? solutions.map(solution => {
    if (solution.id === 'solution-item-6') {
      return {
        id: solution.id,
        icon: getIconByName(solution.icon_name),
        title: solution.title,
        description: <ul className="list-disc pl-5 space-y-1 text-white/80">
            <li>Full-stack development combining human expertise with AI-powered code assistance</li>
            <li>Custom web applications built with modern frameworks and AI optimization</li>
            <li>Mobile-first responsive design approach for seamless cross-platform experiences</li>
            <li>Integration of AI features like chatbots, recommendation systems, and personalization</li>
          </ul>,
        color: solution.color || 'from-orange-500/20 to-orange-600/20'
      };
    }
    return {
      id: solution.id,
      icon: getIconByName(solution.icon_name),
      title: solution.title,
      description: solution.description,
      color: solution.color || 'from-purple-500/20 to-purple-600/20'
    };
  }) : [{
    id: 'lms',
    icon: <GraduationCap className="h-10 w-10" />,
    title: 'AI-Powered Learning Management',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Human-centered interface enhanced by AI for intuitive course creation and management</li>
          <li>Smart assessment tools that combine AI grading with human educational expertise</li>
          <li>AI-driven analytics with human-interpreted reporting for actionable insights</li>
          <li>Customizable branding and integrations overseen by human design specialists</li>
        </ul>,
    color: 'from-blue-500/20 to-blue-600/20'
  }, {
    id: 'brainstormer',
    icon: <Cpu className="h-10 w-10" />,
    title: 'Brainstormer',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Our proprietary AI platform developed by human AI experts</li>
          <li>Brainstormer Pro: Human-designed customized ChatGPT solutions for business needs</li>
          <li>Brainstormer Studio: Low-code environment where human creativity directs AI capabilities</li>
          <li>AI agents orchestrated by human strategists to automate workflows in finance, HR, and strategy</li>
        </ul>,
    color: 'from-purple-500/20 to-purple-600/20'
  }, {
    id: 'ecommerce',
    icon: <ShoppingBag className="h-10 w-10" />,
    title: 'AI-Enhanced eCommerce',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Expert human designers directing AI tools for optimized website design and platform development</li>
          <li>Specialized teams combining AI efficiency with human creativity for Shopify and Magento solutions</li>
          <li>Our human experts with AI support have contributed to brands like MamaEarth, HyugaLife, Nykaa, and more</li>
          <li>Exceptional 8-9% ROAS achieved through AI-human optimization strategies</li>
        </ul>,
    color: 'from-pink-500/20 to-pink-600/20'
  }, {
    id: 'chatbots',
    icon: <MessageSquare className="h-10 w-10" />,
    title: 'Human-Directed AI Chatbots',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Bespoke AI solutions crafted by human experts for your specific business needs</li>
          <li>Team collaboration features designed by humans to enhance AI workflow integration</li>
          <li>Knowledge base management combining AI document processing with human curation</li>
          <li>Human-supervised AI translation services enabling support in 14+ Indic languages</li>
        </ul>,
    color: 'from-green-500/20 to-green-600/20'
  }, {
    id: 'creative',
    icon: <Wand2 className="h-10 w-10" />,
    title: 'AI-Augmented Creative Technology',
    description: <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Chatbots that blend AI capabilities with human warmth for social media and website integration</li>
          <li>Interactive marketing solutions where human creativity guides AI tools for quizzes and social filters</li>
          <li>AR/VR experiences crafted through human-AI collaboration</li>
          <li>Educational apps that combine human teaching expertise with AI engagement mechanics</li>
        </ul>,
    color: 'from-yellow-500/20 to-yellow-600/20'
  }];
  const enhancedDisplaySolutions = displaySolutions.map(solution => {
    if (solution.id === 'solution-item-6') {
      return {
        ...solution,
        description: <ul className="">
          
          
          
          <li>We build custom full-stack web apps with a mobile-first, responsive design approach. Powered by modern frameworks and AI-driven features like chatbots, personalization, and smart recommendations.</li>
        </ul>
      };
    }
    return solution;
  });
  useEffect(() => {
    if (isMobile) return; // Skip animation setup on mobile since we'll use carousel

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
  }, [isMobile]);
  const renderTitle = () => {
    if (!title) return "Our Solutions";
    const words = title.split(' ');
    const lastWordIndex = words.length - 1;
    return <>
        {words.slice(0, lastWordIndex).join(' ')} <span className="gradient-text">{words[lastWordIndex]}</span>
      </>;
  };
  const solutionRows = [];
  for (let i = 0; i < enhancedDisplaySolutions.length; i += 3) {
    solutionRows.push(enhancedDisplaySolutions.slice(i, i + 3));
  }
  return <section id="solutions" ref={sectionRef} className="page-section py-0">
      
    </section>;
};
const getIconByName = (iconName: string) => {
  const normalizedIconName = iconName.toLowerCase();
  switch (normalizedIconName) {
    case 'graduation-cap':
    case 'graduationcap':
      return <GraduationCap className="h-10 w-10 text-blue-400" />;
    case 'cpu':
      return <Cpu className="h-10 w-10 text-noesis-purple" />;
    case 'shopping-bag':
    case 'shoppingbag':
      return <ShoppingBag className="h-10 w-10 text-pink-400" />;
    case 'message-square':
    case 'messagesquare':
      return <MessageSquare className="h-10 w-10 text-green-400" />;
    case 'wand':
    case 'wand2':
      return <Wand2 className="h-10 w-10 text-yellow-400" />;
    case 'code2':
      return <Code2 className="h-10 w-10 text-orange-400" />;
    default:
      console.warn(`Icon name not recognized: ${iconName}`);
      return <Cpu className="h-10 w-10" />;
  }
};
export default SolutionsSection;