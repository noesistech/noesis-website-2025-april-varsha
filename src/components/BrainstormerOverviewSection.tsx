
import React from 'react';
import { MessageSquare, Users, FileCode, Database, Globe, Brain, Code, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import AIProductCard from './AIProductCard';

interface PlatformFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BrainstormerOverviewSection = () => {
  const brainstormerProFeatures: PlatformFeature[] = [
    {
      icon: <MessageSquare className="h-6 w-6 text-noesis-purple" />,
      title: "AI-Enhanced Group Chat",
      description: "Foster real-time collaboration with AI-assisted conversations for creative brainstorming."
    },
    {
      icon: <Users className="h-6 w-6 text-noesis-purple" />,
      title: "Customizable AI Solutions",
      description: "Tailor AI bots to meet specific team requirements for personalized assistance."
    },
    {
      icon: <Globe className="h-6 w-6 text-noesis-purple" />,
      title: "Integrated Internet Access",
      description: "Incorporate external internet resources into discussions for up-to-date information."
    }
  ];

  const brainstormerStudioFeatures: PlatformFeature[] = [
    {
      icon: <Code className="h-6 w-6 text-noesis-purple" />,
      title: "Low-Code Development",
      description: "Create AI agents with minimal coding, accessible to all teams."
    },
    {
      icon: <Database className="h-6 w-6 text-noesis-purple" />,
      title: "Data Integration",
      description: "Connect documents, databases, and third-party systems seamlessly."
    },
    {
      icon: <BarChart className="h-6 w-6 text-noesis-purple" />,
      title: "Bot Monitoring & Analytics",
      description: "Track, analyze, and improve AI agent performance with comprehensive tools."
    }
  ];

  const proUseCases = [
    "Marketing & Content Creation",
    "Employee Onboarding & HR",
    "Campaign Development",
    "Team Collaboration",
    "Market Research"
  ];

  const studioUseCases = [
    "HR Automation",
    "IT Support",
    "Customer Service",
    "Sales & Lead Generation",
    "Healthcare Assistance"
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
            Our flagship AI platforms designed to transform workflow efficiency and enhance AI capabilities across your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Brainstormer Pro */}
          <AIProductCard 
            title="Brainstormer Pro"
            description="Leverage Brainstormer Pro to enhance workflow and drive productivity within a secure, collaborative environment. Make your organization AI-enabled with our enterprise-grade solution."
            logoUrl="/public/images/brainstormer-pro-logo.svg"
            ctaText="Explore Brainstormer Pro"
            ctaUrl="/brainstormer-pro"
          />

          {/* Brainstormer Studio */}
          <AIProductCard 
            title="Brainstormer Studio"
            description="Your gateway to effortless AI agent creation. Build, iterate, and deploy AI text and voice agents with our intuitive low-code/no-code platform for creative and enterprise environments."
            logoUrl="/public/images/brainstormer-studio-logo.svg"
            ctaText="Explore Brainstormer Studio"
            ctaUrl="/brainstormer-studio"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          {/* Pro Features & Use Cases */}
          <div>
            <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl h-full">
              <h3 className="text-2xl font-semibold text-white mb-4">Brainstormer Pro Features</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {brainstormerProFeatures.map((feature, index) => (
                  <Card key={index} className="bg-[#1D212B]/80 border border-white/10 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-noesis-purple/20 p-3 rounded-lg w-fit">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h4 className="text-xl font-semibold text-white mb-3">Common Use Cases</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {proUseCases.map((useCase, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noesis-purple rounded-full"></span>
                    {useCase}
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="noesis" 
                  size="lg"
                  className="shadow-lg hover:shadow-noesis-purple/50"
                  asChild
                >
                  <Link to="/brainstormer-pro">
                    Explore Brainstormer Pro
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Studio Features & Use Cases */}
          <div>
            <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl h-full">
              <h3 className="text-2xl font-semibold text-white mb-4">Brainstormer Studio Features</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {brainstormerStudioFeatures.map((feature, index) => (
                  <Card key={index} className="bg-[#1D212B]/80 border border-white/10 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-noesis-purple/20 p-3 rounded-lg w-fit">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h4 className="text-xl font-semibold text-white mb-3">Common Use Cases</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {studioUseCases.map((useCase, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noesis-purple rounded-full"></span>
                    {useCase}
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="noesis" 
                  size="lg"
                  className="shadow-lg hover:shadow-noesis-purple/50"
                  asChild
                >
                  <Link to="/brainstormer-studio">
                    Explore Brainstormer Studio
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
