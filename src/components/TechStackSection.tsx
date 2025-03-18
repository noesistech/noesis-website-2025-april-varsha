
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechCategory } from '@/types/supabase';

interface TechStackSectionProps {
  title: string;
  categories: TechCategory[];
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ title, categories }) => {
  const [activeTab, setActiveTab] = useState('tech');
  
  // Filter categories into tech stack and cloud stack
  const techStack = categories.filter(category => !category.is_cloud_stack);
  const cloudStack = categories.filter(category => category.is_cloud_stack);
  
  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-16">{title}</h2>
        
        <Tabs defaultValue="tech" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="glass">
              <TabsTrigger 
                value="tech" 
                className="data-[state=active]:bg-noesis-purple data-[state=active]:text-white"
                onClick={() => setActiveTab('tech')}
              >
                Tech Stack
              </TabsTrigger>
              <TabsTrigger 
                value="cloud"
                className="data-[state=active]:bg-noesis-blue data-[state=active]:text-white"
                onClick={() => setActiveTab('cloud')}
              >
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((category) => (
                <div key={category.key} className="glass-card">
                  <h3 className="text-xl font-bold mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map((tech) => (
                      <span 
                        key={tech.id} 
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 hover:bg-noesis-purple/20 transition-colors"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cloudStack.map((category) => (
                <div key={category.key} className="glass-card">
                  <h3 className="text-xl font-bold mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map((tech) => (
                      <span 
                        key={tech.id} 
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 hover:bg-noesis-blue/20 transition-colors"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TechStackSection;
