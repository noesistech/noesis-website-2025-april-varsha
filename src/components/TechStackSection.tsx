import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechCategory } from '@/types/supabase';
export interface TechStackSectionProps {
  title: string;
  categories: TechCategory[];
}
const TechStackSection: React.FC<TechStackSectionProps> = ({
  title,
  categories
}) => {
  const [activeTab, setActiveTab] = useState('tech');

  // Filter categories into tech stack and cloud stack
  const techStack = categories.filter(category => !category.is_cloud_stack);
  const cloudStack = categories.filter(category => category.is_cloud_stack);
  return <section id="tech-stack" className="py-10 sm:py-16 relative overflow-hidden md:py-[30px]">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <h2 className="section-title">{title}</h2>
        
        <Tabs defaultValue="tech" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <TabsList className="glass">
              <TabsTrigger value="tech" className="data-[state=active]:bg-noesis-purple data-[state=active]:text-white px-3 sm:px-4 md:px-6" onClick={() => setActiveTab('tech')}>
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="cloud" className="data-[state=active]:bg-noesis-blue data-[state=active]:text-white px-3 sm:px-4 md:px-6" onClick={() => setActiveTab('cloud')}>
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {techStack.map(category => <div key={category.key} className="glass-card">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 md:mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map(tech => <span key={tech.id} className="bg-white/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white/80 hover:bg-noesis-purple/20 transition-colors">
                        {tech.name}
                      </span>)}
                  </div>
                </div>)}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {cloudStack.map(category => <div key={category.key} className="glass-card">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 md:mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map(tech => <span key={tech.id} className="bg-white/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white/80 hover:bg-noesis-blue/20 transition-colors">
                        {tech.name}
                      </span>)}
                  </div>
                </div>)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>;
};
export default TechStackSection;