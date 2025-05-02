
import React from 'react';
import { Brain, BrainCircuit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AICapability } from '@/components/AICapabilitiesSection';
import { Link } from 'react-router-dom';

interface AICapabilitiesPreviewSectionProps {
  capabilities: AICapability[];
}

const AICapabilitiesPreviewSection: React.FC<AICapabilitiesPreviewSectionProps> = ({ 
  capabilities 
}) => {
  // Select a few capabilities to showcase
  const previewCapabilities = capabilities.slice(0, 2);
  
  return (
    <section className="page-section relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-noesis-purple/20 rounded-full filter blur-[100px] opacity-30"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-noesis-blue/20 rounded-full filter blur-[120px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title mb-3">
            Cutting-Edge <span className="gradient-text">AI Capabilities</span>
          </h2>
          <p className="section-subtitle">
            Harness the power of artificial intelligence to transform your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {previewCapabilities.map((capability) => (
            <div 
              key={capability.id} 
              className="glass-card relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-30 ${capability.color}`}></div>
              <div className="relative z-10 p-6">
                <div className="bg-white/10 p-3 rounded-lg w-fit mb-4">
                  {capability.icon === 'brain' ? 
                    <Brain className="h-8 w-8 text-purple-400" /> : 
                    <BrainCircuit className="h-8 w-8 text-blue-400" />
                  }
                </div>
                <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                <p className="text-white/80 mb-4">{capability.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {capability.tools.slice(0, 3).map(tool => (
                    <span key={`${capability.id}-${tool}`} className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                  {capability.tools.length > 3 && (
                    <span className="text-white/60 text-xs px-2 py-1">+{capability.tools.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="noesis" 
            size="lg" 
            asChild
            className="shadow-lg hover:shadow-noesis-purple/50"
          >
            <Link to="/services" className="inline-flex items-center gap-2">
              Explore how we work <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesPreviewSection;
