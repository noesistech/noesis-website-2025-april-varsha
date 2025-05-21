
import React from 'react';
import Header from '../components/Header';
import SubpageHero from '../components/SubpageHero';
import ServicesSection from '../components/ServicesSection';
import ServiceGrid from '../components/ServiceGrid';
import ServiceDetailSection from '../components/ServiceDetailSection';
import TechStackSection from '../components/TechStackSection';
import Footer from '../components/Footer';
import ContactBanner from '../components/ContactBanner';
import { useContent } from '@/contexts/ContentContext';
import { 
  Palette, 
  Globe, 
  Image, 
  Cloud, 
  BrainCircuit, 
  Users,
  Check,
  Sparkles,
  Bot,
  LayoutGrid
} from 'lucide-react';

const Services = () => {
  const { serviceItems, techCategories, techStackSection } = useContent();
  
  // Example features for each service (these would ideally come from content data)
  const uiuxFeatures = [
    {
      icon: <Palette className="h-6 w-6 text-blue-400" />,
      title: "Human-Centered Design",
      description: "We prioritize user needs and behaviors in our design process to create intuitive interfaces."
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-indigo-400" />,
      title: "AI-Enhanced UX Research",
      description: "Leverage AI-powered analytics to gain deeper insights into user behavior and preferences."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-400" />,
      title: "Responsive Interfaces",
      description: "Create seamless experiences across all devices with our responsive design approach."
    }
  ];
  
  const webDevFeatures = [
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: "Custom Web Applications",
      description: "Tailored solutions built with modern frameworks to meet your specific business requirements."
    },
    {
      icon: <Check className="h-6 w-6 text-teal-400" />,
      title: "AI-Enhanced Development",
      description: "Accelerate development and improve code quality with our AI-assisted programming approach."
    },
    {
      icon: <Bot className="h-6 w-6 text-cyan-400" />,
      title: "Intelligent Testing",
      description: "Comprehensive testing with AI-powered tools to ensure reliability and performance."
    }
  ];
  
  // Find the specific services for UI/UX and Web Dev
  const uiuxService = serviceItems.find(service => service.title === "UI/UX") || serviceItems[0];
  const webDevService = serviceItems.find(service => service.title === "Web and Application Development") || serviceItems[1];
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C]">
      <Header />
      <main className="flex-grow">
        <SubpageHero 
          title="Our Services" 
          subtitle="Discover the comprehensive range of services we offer"
          backgroundEffect="purple"
        />
        
        <section className="py-16 sm:py-24">
          <ServicesSection 
            title="Our Services"
            services={serviceItems}
          />
        </section>
        
        {/* UI/UX Service Detail Section */}
        <section id="uiux" className="py-16 sm:py-20 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <ServiceDetailSection 
            service={uiuxService}
            features={uiuxFeatures}
            bgColor="from-[#1c212e]/80 to-[#151a25]"
            accentColor="border-blue-500/30"
          />
        </section>
        
        {/* Web Development Service Detail Section */}
        <section id="webdev" className="py-16 sm:py-20 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <ServiceDetailSection 
            service={webDevService}
            features={webDevFeatures}
            isAlternate={true}
            bgColor="from-[#151a25]/80 to-[#1c212e]"
            accentColor="border-green-500/30"
          />
        </section>
        
        {/* Service Grid Section - All Services */}
        <section className="py-16 sm:py-20 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">
                Complete Service Catalog
              </span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our full range of services designed to accelerate your digital transformation
            </p>
            <ServiceGrid services={serviceItems} />
          </div>
        </section>
        
        <div id="tech-stack" className="py-16 sm:py-24">
          <TechStackSection 
            title={techStackSection?.title || "Our Technology Stack"} 
            categories={techCategories}
          />
        </div>
        
        <ContactBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
