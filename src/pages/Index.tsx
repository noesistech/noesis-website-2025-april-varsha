
import React, { useEffect } from "react";
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

// Sample data for TechStackSection to use when not getting data from Supabase
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

const Index = () => {
  useEffect(() => {
    document.title = "Noesis.tech - Creative Technology Solutions";
    
    // Adding debug log to check if component is mounting
    console.log("Index component mounted");
  }, []);

  return (
    <div className="min-h-screen bg-noesis-dark text-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection />
        <SolutionsSection />
        <TechStackSection 
          title="Our Technology Stack" 
          categories={sampleTechCategories} 
        />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
