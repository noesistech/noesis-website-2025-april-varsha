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
  return;
};
export default TechStackSection;