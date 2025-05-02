
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
  
  return (
    <section className="page-section py-16 sm:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">
            {title.split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? 
                <span key={i} className="gradient-text">{word} </span> : 
                <span key={i}>{word} </span>
            )}
          </h2>
          {subtitle && <p className="mt-4 text-lg text-gray-300/80">{subtitle}</p>}
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
        </div>

        <Tabs defaultValue="tech" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="mx-auto mb-8 bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger value="tech" className="text-sm sm:text-base data-[state=active]:bg-noesis-purple/30 data-[state=active]:text-white">
              Technologies
            </TabsTrigger>
            <TabsTrigger value="cloud" className="text-sm sm:text-base data-[state=active]:bg-noesis-purple/30 data-[state=active]:text-white">
              Cloud Infrastructure
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tech" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {techStack.map((category) => (
                <Card key={category.id} className="bg-gray-800/50 border border-gray-700/50 hover:border-noesis-purple/50 transition-all">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.items?.map((item) => (
                        <li key={item.id} className="text-gray-300/80">
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cloudStack.map((category) => (
                <Card key={category.id} className="bg-gray-800/50 border border-gray-700/50 hover:border-noesis-purple/50 transition-all">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.items?.map((item) => (
                        <li key={item.id} className="text-gray-300/80">
                          {item.name}
                        </li>
                      ))}
                    </ul>
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
