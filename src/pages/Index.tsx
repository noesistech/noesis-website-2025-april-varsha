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
import { ServiceItem } from "@/types/supabase";
import { SolutionItem } from "@/types/supabase";
import { Toaster } from "@/components/ui/sonner";
import { LoadingSkeleton } from "@/components/ui/loading";

const sampleTechCategories = [
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

const sampleServiceItems: ServiceItem[] = [
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

const sampleSolutionItems: SolutionItem[] = [
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Noesis.tech - Creative Technology Solutions";
    
    // Adding debug log to check if component is mounting
    console.log("Index component mounted");
    
    // Simulate loading time to show the lithograph animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); // 15 seconds to ensure animation is visible
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-noesis-dark text-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection 
          title="Our Services" 
          services={sampleServiceItems}
        />
        <SolutionsSection 
          title="Our Solutions" 
          solutions={sampleSolutionItems}
        />
        <TechStackSection 
          title="Our Technology Stack" 
          categories={sampleTechCategories} 
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
