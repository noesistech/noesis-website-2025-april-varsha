import React from 'react';
import { MessageSquare, Users, Globe, Code, Database, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
interface PlatformFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const BrainstormerOverviewSection = () => {
  const brainstormerProFeatures: PlatformFeature[] = [{
    icon: <MessageSquare className="h-6 w-6 text-noesis-purple" />,
    title: "AI-Enhanced Group Chat",
    description: "Foster real-time collaboration with AI-assisted conversations for creative brainstorming."
  }, {
    icon: <Users className="h-6 w-6 text-noesis-purple" />,
    title: "Customizable AI Solutions",
    description: "Tailor AI bots to meet specific team requirements for personalized assistance."
  }, {
    icon: <Globe className="h-6 w-6 text-noesis-purple" />,
    title: "Integrated Internet Access",
    description: "Incorporate external internet resources into discussions for up-to-date information."
  }];
  const brainstormerStudioFeatures: PlatformFeature[] = [{
    icon: <Code className="h-6 w-6 text-noesis-purple" />,
    title: "Low-Code Development",
    description: "Create AI agents with minimal coding, accessible to all teams."
  }, {
    icon: <Database className="h-6 w-6 text-noesis-purple" />,
    title: "Data Integration",
    description: "Connect documents, databases, and third-party systems seamlessly."
  }, {
    icon: <BarChart className="h-6 w-6 text-noesis-purple" />,
    title: "Bot Monitoring & Analytics",
    description: "Track, analyze, and improve AI agent performance with comprehensive tools."
  }];
  const proUseCases = ["Marketing & Content Creation", "Employee Onboarding & HR", "Campaign Development", "Team Collaboration", "Market Research"];
  const studioUseCases = ["HR Automation", "IT Support", "Customer Service", "Sales & Lead Generation", "Healthcare Assistance"];
  return <section className="py-16 bg-[#1A1F2C] relative overflow-hidden md:py-[10px]">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-noesis-purple/10 rounded-full filter blur-[120px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-noesis-blue/10 rounded-full filter blur-[100px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Brainstormer Platform <span className="text-noesis-purple">Overview</span>
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-base sm:text-lg mt-4 mb-8">
            Unlock the full potential of your organization with our dedicated AI platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Brainstormer Pro Combined Card */}
          <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Logo & Overview */}
              <div className="mb-6">
                <div className="h-14 mb-4 flex items-center">
                  <img src="/images/brainstormer-pro-logo.svg" alt="Brainstormer Pro logo" className="h-full" />
                </div>
                <p className="text-gray-300">
                  Leverage Brainstormer Pro to enhance workflow and drive productivity within a secure, collaborative environment. Make your organization AI-enabled with our enterprise-grade solution.
                </p>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <div className="grid gap-4">
                  {brainstormerProFeatures.map((feature, index) => <div key={index} className="flex items-start gap-3 bg-[#1D212B]/60 p-3 rounded-lg border border-white/5">
                      <div className="bg-noesis-purple/20 p-2 rounded-lg shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                      </div>
                    </div>)}
                </div>
              </div>
              
              {/* Use Cases */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-2">Common Use Cases</h3>
                <div className="bg-[#1D212B]/40 rounded-lg border border-white/5 p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {proUseCases.map((useCase, index) => <li key={index} className="text-gray-300 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-noesis-purple rounded-full"></span>
                        {useCase}
                      </li>)}
                  </ul>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-auto pt-2">
                <Button variant="noesis" size="lg" className="w-full shadow-lg hover:shadow-noesis-purple/50" asChild>
                  <Link to="/brainstormer-pro">
                    Explore Brainstormer Pro
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Brainstormer Studio Combined Card */}
          <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Logo & Overview */}
              <div className="mb-6">
                <div className="h-14 mb-4 flex items-center">
                  <img src="/images/brainstormer-studio-logo.svg" alt="Brainstormer Studio logo" className="h-full" />
                </div>
                <p className="text-gray-300">
                  Your gateway to effortless AI agent creation. Build, iterate, and deploy AI text and voice agents with our intuitive low-code/no-code platform for creative and enterprise environments.
                </p>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <div className="grid gap-4">
                  {brainstormerStudioFeatures.map((feature, index) => <div key={index} className="flex items-start gap-3 bg-[#1D212B]/60 p-3 rounded-lg border border-white/5">
                      <div className="bg-noesis-purple/20 p-2 rounded-lg shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                      </div>
                    </div>)}
                </div>
              </div>
              
              {/* Use Cases */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-2">Common Use Cases</h3>
                <div className="bg-[#1D212B]/40 rounded-lg border border-white/5 p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {studioUseCases.map((useCase, index) => <li key={index} className="text-gray-300 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-noesis-purple rounded-full"></span>
                        {useCase}
                      </li>)}
                  </ul>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-auto pt-2">
                <Button variant="noesis" size="lg" className="w-full shadow-lg hover:shadow-noesis-purple/50" asChild>
                  <Link to="/brainstormer-studio">
                    Explore Brainstormer Studio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BrainstormerOverviewSection;