
import React from 'react';
import { Brain, Sparkles, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BrainstormerOverviewSection = () => {
  const features: FeatureItem[] = [
    {
      title: "AI-Powered Content Generation",
      description: "Create high-quality content in seconds with our advanced AI algorithms trained on diverse datasets.",
      icon: <Brain className="h-6 w-6 text-noesis-purple" />
    },
    {
      title: "Natural Language Processing",
      description: "Analyze and understand text with sophisticated language models that capture context and meaning.",
      icon: <Sparkles className="h-6 w-6 text-noesis-purple" />
    },
    {
      title: "Custom Integration APIs",
      description: "Connect Brainstormer with your existing tools and workflows for seamless productivity.",
      icon: <Code className="h-6 w-6 text-noesis-purple" />
    }
  ];

  const useCases = [
    {
      id: "marketing",
      title: "Marketing & Content",
      content: "Create engaging blog posts, social media content, email campaigns, and ad copy that resonates with your target audience."
    },
    {
      id: "business",
      title: "Business Strategy",
      content: "Generate business plans, SWOT analyses, market research summaries, and competitive insights to drive strategic decisions."
    },
    {
      id: "product",
      title: "Product Development",
      content: "Draft product descriptions, feature specifications, user stories, and documentation to accelerate your development cycle."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1A1F2C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-noesis-purple/10 rounded-full filter blur-[120px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-noesis-blue/10 rounded-full filter blur-[100px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Brainstormer Platform <span className="text-noesis-purple">Overview</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
          <p className="text-gray-300">
            Our flagship AI platform designed to accelerate ideation, content creation, and problem-solving across your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Platform Overview */}
          <div>
            <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl h-full">
              <h3 className="text-2xl font-semibold text-white mb-4">Overview</h3>
              <p className="text-gray-300 mb-6">
                Brainstormer is our proprietary AI platform that combines cutting-edge machine learning with human-centered design to deliver powerful creative and analytical capabilities.
              </p>
              <p className="text-gray-300 mb-6">
                Built on transformer-based neural networks and fine-tuned with industry-specific data, Brainstormer can generate ideas, content, and solutions tailored to your unique business challenges.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-[#1D212B]/80 border border-white/10 shadow-lg">
                    <CardContent className="p-4">
                      <div className="bg-noesis-purple/20 p-3 rounded-lg w-fit mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Features & Use Cases */}
          <div>
            <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl h-full">
              <h3 className="text-2xl font-semibold text-white mb-4">Features & Use Cases</h3>
              <p className="text-gray-300 mb-6">
                Discover how Brainstormer can transform your workflows and unleash creativity across your organization.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                {useCases.map((useCase) => (
                  <AccordionItem key={useCase.id} value={useCase.id} className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-noesis-purple">
                      {useCase.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {useCase.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  variant="noesis" 
                  size="lg"
                  className="shadow-lg hover:shadow-noesis-purple/50"
                  asChild
                >
                  <Link to="/brainstormer" className="inline-flex items-center gap-2">
                    Explore Brainstormer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrainstormerOverviewSection;
