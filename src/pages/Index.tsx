
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import SolutionsSection from "@/components/SolutionsSection";
import TechStackSection from "@/components/TechStackSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import { useContent } from "@/contexts/ContentContext";
import { ServiceItem, SolutionItem, TechCategory } from "@/types/supabase";
import { Toaster } from "@/components/ui/sonner";
import { LoadingSkeleton } from "@/components/ui/loading";
import { ErrorDisplay } from "@/components/ui/error";

// Fallback data in case content fails to load from Supabase
const fallbackTechCategories: TechCategory[] = [
  {
    id: '1',
    key: 'frontend',
    title: 'Frontend Technologies',
    sort_order: 1,
    is_cloud_stack: false,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: '1', name: 'React', sort_order: 1, category_id: '1', created_at: '', updated_at: '' },
      { id: '2', name: 'Angular', sort_order: 2, category_id: '1', created_at: '', updated_at: '' },
      { id: '3', name: 'Vue.js', sort_order: 3, category_id: '1', created_at: '', updated_at: '' }
    ]
  },
  {
    id: '2',
    key: 'backend',
    title: 'Backend Technologies',
    sort_order: 2,
    is_cloud_stack: false,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: '4', name: 'Node.js', sort_order: 1, category_id: '2', created_at: '', updated_at: '' },
      { id: '5', name: 'Python', sort_order: 2, category_id: '2', created_at: '', updated_at: '' },
      { id: '6', name: 'Java', sort_order: 3, category_id: '2', created_at: '', updated_at: '' }
    ]
  },
  {
    id: '3',
    key: 'cloud',
    title: 'Cloud Services',
    sort_order: 3,
    is_cloud_stack: true,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: '7', name: 'AWS', sort_order: 1, category_id: '3', created_at: '', updated_at: '' },
      { id: '8', name: 'Azure', sort_order: 2, category_id: '3', created_at: '', updated_at: '' },
      { id: '9', name: 'Google Cloud', sort_order: 3, category_id: '3', created_at: '', updated_at: '' }
    ]
  }
];

const fallbackServiceItems: ServiceItem[] = [
  {
    id: 'ui-ux',
    icon_name: 'palette',
    title: 'UI/UX',
    description: 'Create exceptional user experiences through the perfect blend of human-centered design principles and AI-powered insights.',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'web-dev',
    icon_name: 'globe',
    title: 'Web and Application Development',
    description: 'Build cutting-edge digital solutions with our AI-enhanced development process that combines human creativity with machine efficiency.',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
];

const fallbackSolutionItems: SolutionItem[] = [
  {
    id: 'lms',
    icon_name: 'graduation-cap',
    title: 'AI-Powered Learning Management',
    description: 'Human-centered interface enhanced by AI for intuitive course creation and management',
    color: 'from-blue-500/20 to-blue-600/20',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'brainstormer',
    icon_name: 'cpu',
    title: 'Brainstormer',
    description: 'Our proprietary AI platform developed by human AI experts',
    color: 'from-purple-500/20 to-purple-600/20',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
];

const Index = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { loading, error, heroSection, techCategories, serviceItems, solutionItems, hasLoadedAnyContent } = useContent();
  
  useEffect(() => {
    // Update document title and description based on content
    const siteTitle = heroSection?.title 
      ? `${heroSection.title} | Noesis.tech`
      : "Noesis.tech - Creative Technology Solutions";
    
    document.title = siteTitle;
    
    // Update meta description dynamically if we have content
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && heroSection?.subtitle) {
      metaDescription.setAttribute('content', heroSection.subtitle);
    }
    
    // Adding debug log to check if component is mounting
    console.log("Index component mounted");
    
    // Reduced loading time to 1.5 seconds, just enough to show loading state
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [heroSection]);

  if (initialLoading || (loading && !hasLoadedAnyContent)) {
    return <LoadingSkeleton />;
  }

  // Use content from context if available, otherwise use fallback data
  const displayTechCategories = techCategories && techCategories.length > 0 
    ? techCategories 
    : fallbackTechCategories;
    
  const displayServiceItems = serviceItems && serviceItems.length > 0
    ? serviceItems
    : fallbackServiceItems;
    
  const displaySolutionItems = solutionItems && solutionItems.length > 0
    ? solutionItems
    : fallbackSolutionItems;

  return (
    <div className="min-h-screen bg-noesis-dark text-white">
      <Header />
      <main>
        {error && <div className="container mx-auto px-6 pt-4 mt-20">
          <div className="p-4 bg-yellow-800/30 border border-yellow-700 rounded-md text-yellow-200 mb-8">
            <p className="font-medium">Note: {error}</p>
          </div>
        </div>}
        
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection 
          title="Our Services" 
          services={displayServiceItems}
        />
        <SolutionsSection 
          title="Our Solutions" 
          solutions={displaySolutionItems}
        />
        <TechStackSection 
          title="Our Technology Stack" 
          categories={displayTechCategories} 
        />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
