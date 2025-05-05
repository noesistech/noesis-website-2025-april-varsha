import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechCategory } from '@/types/supabase';
import { Card } from '@/components/ui/card';
export interface TechStackSectionProps {
  title: string;
  categories: TechCategory[];
  subtitle?: string;
}
const TechStackSection: React.FC<TechStackSectionProps> = ({
  title,
  categories = [],
  subtitle
}) => {
  const [activeTab, setActiveTab] = useState('tech');

  // Add null check before filtering
  const techStack = categories?.filter(category => !category.is_cloud_stack) || [];
  const cloudStack = categories?.filter(category => category.is_cloud_stack) || [];
  return <section className="page-section sm:py-24 overflow-hidden relative py-[10px]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        <Tabs defaultValue="tech" value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
            <TabsList className="glass p-1">
              <TabsTrigger value="tech" className="px-2 py-1 sm:px-4 sm:py-2 md:px-8 md:py-3 data-[state=active]:bg-noesis-purple data-[state=active]:text-white text-sm sm:text-base md:text-lg" onClick={() => setActiveTab('tech')}>
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="cloud" className="px-2 py-1 sm:px-4 sm:py-2 md:px-8 md:py-3 data-[state=active]:bg-noesis-purple data-[state=active]:text-white text-sm sm:text-base md:text-lg" onClick={() => setActiveTab('cloud')}>
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map(category => <Card key={category.id} className="bg-[#1e1e24]/90 border-0 overflow-hidden rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-noesis-purple mb-6">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map(item => <span key={item.id} className="bg-gray-800/80 text-white/90 px-4 py-2 text-sm rounded-full">
                        {item.name}
                      </span>)}
                  </div>
                </Card>)}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cloudStack.map(category => <Card key={category.id} className="bg-[#1e1e24]/90 border-0 overflow-hidden rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-noesis-purple mb-6">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies?.map(item => <span key={item.id} className="bg-gray-800/80 text-white/90 px-4 py-2 text-sm rounded-full">
                        {item.name}
                      </span>)}
                  </div>
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>;
};
export default TechStackSection;