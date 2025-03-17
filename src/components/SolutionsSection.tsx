
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
    title: 'Learning Management System',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>User friendly interface with features like Course creation and Management</li>
        <li>Create different types of assessments with automated grading systems</li>
        <li>Detailed Analytics and Reporting feature</li>
        <li>Provides Third party integrations and Custom Branding</li>
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
        <li>Our proprietary AI platform</li>
        <li>Brainstormer Pro: Building customised chatGPTs for businesses</li>
        <li>Brainstormer Studio: A low code/No code tool to rapidly build generative AI bots</li>
        <li>Create AI agents that automate tasks and workflows in strategy, finance, and HR for global organisations</li>
      </ul>
    ),
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'ecommerce',
    icon: <ShoppingBag className="h-10 w-10" />,
    title: 'eCommerce',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>We excel in website design, platform development, integrations, and performance optimization</li>
        <li>Expertise in building Theme-based, Shopify and Magento based e-commerce websites</li>
        <li>Our team members have played pivotal roles in the growth of renowned companies like MamaEarth, HyugaLife, Nykaa, Zomato, The Body Shop, The Souled Store, CaratLane, and more</li>
        <li>Outstanding average ROAS of 8-9%</li>
      </ul>
    ),
    color: 'from-pink-500/20 to-pink-600/20',
  },
  {
    id: 'chatbots',
    icon: <MessageSquare className="h-10 w-10" />,
    title: 'ChatBots',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>Customized Chatbots specific to your use case</li>
        <li>Experience features like Team Collaboration and Web Search</li>
        <li>Upload documents in the Knowledge base for the bot to leverage the information while giving answers</li>
        <li>Available in more than 14+ Indic Languages</li>
      </ul>
    ),
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    id: 'creative',
    icon: <Wand2 className="h-10 w-10" />,
    title: 'Creative Technology',
    description: (
      <ul className="list-disc pl-5 space-y-1 text-white/80">
        <li>AI powered Chatbots integrable with Websites, WhatsApp, Instagram and Facebook</li>
        <li>Fun and interactive solutions to support marketing campaigns like Quizzes, Instagram Filters and much more</li>
        <li>AR/VR solutions</li>
        <li>Educatainment Mobile Apps/Web Apps</li>
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
