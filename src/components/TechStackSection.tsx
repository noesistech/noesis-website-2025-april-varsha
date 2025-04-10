
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechCategory } from '@/types/supabase';
import { Card } from '@/components/ui/card';

export interface TechStackSectionProps {
  title: string;
  categories: TechCategory[];
}

const TechStackSection: React.FC<TechStackSectionProps> = ({
  title,
  categories = [] // Provide a default empty array
}) => {
  const [activeTab, setActiveTab] = useState('tech');

  // Add null check before filtering
  const techStack = categories?.filter(category => !category.is_cloud_stack) || [];
  const cloudStack = categories?.filter(category => category.is_cloud_stack) || [];
  
  return (
    <section id="tech-stack" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="section-title">
          Our <span className="gradient-text">Technology Stack</span>
        </h2>
        
        <Tabs defaultValue="tech" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
            <TabsList className="glass p-1">
              <TabsTrigger 
                value="tech" 
                className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 data-[state=active]:bg-noesis-purple data-[state=active]:text-white text-base sm:text-lg" 
                onClick={() => setActiveTab('tech')}
              >
                Tech Stack
              </TabsTrigger>
              <TabsTrigger 
                value="cloud" 
                className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 data-[state=active]:bg-noesis-blue data-[state=active]:text-white text-base sm:text-lg" 
                onClick={() => setActiveTab('cloud')}
              >
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {techStack.map(category => (
                <Card key={category.key} className="glass-card bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-noesis-purple/30 transition-all">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {category.technologies?.map(tech => (
                      <span 
                        key={tech.id} 
                        className="bg-white/10 px-3 py-1.5 rounded-full text-sm md:text-base text-white/90 hover:bg-noesis-purple/20 transition-colors"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              {cloudStack.map(category => (
                <Card key={category.key} className="glass-card bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-noesis-blue/30 transition-all">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {category.technologies?.map(tech => (
                      <span 
                        key={tech.id} 
                        className="bg-white/10 px-3 py-1.5 rounded-full text-sm md:text-base text-white/90 hover:bg-noesis-blue/20 transition-colors"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TechStackSection;
