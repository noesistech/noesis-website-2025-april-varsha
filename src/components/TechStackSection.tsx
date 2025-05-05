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
  return <section className="page-section sm:py-24 overflow-hidden relative py-0">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        

        <Tabs defaultValue="tech" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <div className="flex justify-center">
            <TabsList className="mb-8 bg-transparent">
              <TabsTrigger value="tech" className="rounded-md text-base sm:text-lg py-3 px-10 data-[state=active]:bg-noesis-purple data-[state=active]:text-white">
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="cloud" className="rounded-md text-base sm:text-lg py-3 px-10 data-[state=active]:bg-noesis-blue data-[state=active]:text-white">
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="space-y-6">
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
          
          <TabsContent value="cloud" className="space-y-6">
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