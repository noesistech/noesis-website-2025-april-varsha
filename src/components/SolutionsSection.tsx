
import React, { useRef, useEffect } from 'react';
import { GraduationCap, Cpu, ShoppingBag, MessageSquare, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Solution = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  color: string;
};

const solutions: Solution[] = [
  {
    id: 'lms',
    icon: <GraduationCap className="h-10 w-10" />,
    title: 'AI-Powered Learning Management',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Human-centered interface enhanced by AI for intuitive course creation and management</li>
        <li>Smart assessment tools that combine AI grading with human educational expertise</li>
        <li>AI-driven analytics with human-interpreted reporting for actionable insights</li>
        <li>Customizable branding and integrations overseen by human design specialists</li>
      </ul>
    ),
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'brainstormer',
    icon: <Cpu className="h-10 w-10" />,
    title: 'Brainstormer',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Our proprietary AI platform developed by human AI experts</li>
        <li>Brainstormer Pro: Human-designed customized ChatGPT solutions for business needs</li>
        <li>Brainstormer Studio: Low-code environment where human creativity directs AI capabilities</li>
        <li>AI agents orchestrated by human strategists to automate workflows in finance, HR, and strategy</li>
      </ul>
    ),
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'ecommerce',
    icon: <ShoppingBag className="h-10 w-10" />,
    title: 'AI-Enhanced eCommerce',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Expert human designers directing AI tools for optimized website design and platform development</li>
        <li>Specialized teams combining AI efficiency with human creativity for Shopify and Magento solutions</li>
        <li>Our human experts with AI support have contributed to brands like MamaEarth, HyugaLife, Nykaa, and more</li>
        <li>Exceptional 8-9% ROAS achieved through AI-human optimization strategies</li>
      </ul>
    ),
    color: 'from-pink-500/20 to-pink-600/20',
  },
  {
    id: 'chatbots',
    icon: <MessageSquare className="h-10 w-10" />,
    title: 'Human-Directed AI Chatbots',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Bespoke AI solutions crafted by human experts for your specific business needs</li>
        <li>Team collaboration features designed by humans to enhance AI workflow integration</li>
        <li>Knowledge base management combining AI document processing with human curation</li>
        <li>Human-supervised AI translation services enabling support in 14+ Indic languages</li>
      </ul>
    ),
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    id: 'creative',
    icon: <Wand2 className="h-10 w-10" />,
    title: 'AI-Augmented Creative Technology',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Chatbots that blend AI capabilities with human warmth for social media and website integration</li>
        <li>Interactive marketing solutions where human creativity guides AI tools for quizzes and social filters</li>
        <li>AR/VR experiences crafted through human-AI collaboration</li>
        <li>Educational apps that combine human teaching expertise with AI engagement mechanics</li>
      </ul>
    ),
    color: 'from-yellow-500/20 to-yellow-600/20',
  },
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  
  return (
    <section id="solutions" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-16">Our Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass relative overflow-hidden rounded-2xl opacity-0 transition-all duration-500 hover:shadow-lg"
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-30",
                solution.color
              )}></div>
              <div className="relative z-10 p-6">
                <div className="bg-white/10 p-3 rounded-full w-fit mb-4">
                  {React.cloneElement(solution.icon as React.ReactElement, {
                    className: cn(
                      "h-10 w-10",
                      solution.id === 'lms' ? "text-blue-400" :
                      solution.id === 'brainstormer' ? "text-noesis-purple" :
                      solution.id === 'ecommerce' ? "text-pink-400" :
                      solution.id === 'chatbots' ? "text-green-400" :
                      "text-yellow-400"
                    )
                  })}
                </div>
                <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                <div className="mb-6">
                  {solution.description}
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
