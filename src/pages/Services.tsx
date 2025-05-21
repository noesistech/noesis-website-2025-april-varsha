
import React from 'react';
import Header from '../components/Header';
import SubpageHero from '../components/SubpageHero';
import ServicesSection from '../components/ServicesSection';
import ServiceDetailSection from '../components/ServiceDetailSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TechStackSection from '../components/TechStackSection';
import Footer from '../components/Footer';
import ContactBanner from '../components/ContactBanner';
import { useContent } from '@/contexts/ContentContext';
import AICapabilitiesSection from '@/components/AICapabilitiesSection';
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
  LayoutGrid,
  Code,
  PaintBucket
} from 'lucide-react';

const Services = () => {
  const { serviceItems, techCategories, techStackSection, aiCapabilities, aiProducts, aiCapabilitiesSection, aiProductsSection } = useContent();
  
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
      icon: <Code className="h-6 w-6 text-green-400" />,
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
  
  const graphicsFeatures = [
    {
      icon: <Image className="h-6 w-6 text-pink-400" />,
      title: "AI-Assisted Visual Design",
      description: "Creative designs enhanced by AI tools for visually stunning graphics and interfaces."
    },
    {
      icon: <PaintBucket className="h-6 w-6 text-orange-400" />,
      title: "Content Creation",
      description: "Compelling content that combines human creativity with AI efficiency for perfect messaging."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-400" />,
      title: "Brand Identity",
      description: "Develop cohesive brand identities that resonate with your target audience."
    }
  ];
  
  // Find the specific services
  const uiuxService = serviceItems.find(service => service.title === "UI/UX") || serviceItems[0];
  const webDevService = serviceItems.find(service => service.title === "Web and Application Development") || serviceItems[1];
  const graphicsService = serviceItems.find(service => service.title === "Graphics and Content Creation") || serviceItems[2];
  const cloudService = serviceItems.find(service => service.title === "Cloud Services & DevOps") || serviceItems[3];
  
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
            imageUrl="/lovable-uploads/83d6e966-1792-4d06-8a94-2e4840a6f17a.png"
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
            imageUrl="/lovable-uploads/b1889f4a-cdf6-40f8-907c-386a883fbeb6.png"
          />
        </section>
        
        {/* Graphics Service Detail Section */}
        <section id="graphics" className="py-16 sm:py-20 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <ServiceDetailSection 
            service={graphicsService}
            features={graphicsFeatures}
            bgColor="from-[#1c212e]/80 to-[#151a25]"
            accentColor="border-pink-500/30"
            imageUrl="/lovable-uploads/af4dc9fd-e708-4fc8-b6e5-d4dee4f5961d.png"
          />
        </section>
        
        {/* Cloud Services Section */}
        <section id="cloud" className="py-16 sm:py-20 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <ServiceDetailSection 
            service={cloudService}
            features={[
              {
                icon: <Cloud className="h-6 w-6 text-cyan-400" />,
                title: "Cloud Infrastructure",
                description: "Robust cloud solutions optimized for performance and scalability."
              },
              {
                icon: <Check className="h-6 w-6 text-teal-400" />,
                title: "DevOps Integration",
                description: "Streamlined development operations with CI/CD pipelines."
              },
              {
                icon: <Bot className="h-6 w-6 text-blue-400" />,
                title: "AI-Powered Scaling",
                description: "Smart resource allocation based on predictive usage patterns."
              }
            ]}
            isAlternate={true}
            bgColor="from-[#151a25]/80 to-[#1c212e]"
            accentColor="border-cyan-500/30"
            imageUrl="/lovable-uploads/9974d449-5315-4593-aa82-cae4ebd2c8cb.png"
          />
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">
                Why Choose Noesis
              </span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Our unique approach delivers premium results through our human-AI collaboration
            </p>
            <WhyChooseSection />
          </div>
        </section>
        
        {/* AI Capabilities Section */}
        <section id="ai-capabilities" className="py-16 sm:py-24 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <div className="container mx-auto px-4 sm:px-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">
                {aiCapabilitiesSection?.title || "Our AI Capabilities"}
              </span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              Leveraging artificial intelligence to enhance every aspect of our services
            </p>
          </div>
          <AICapabilitiesSection
            title={aiCapabilitiesSection?.title || "Our AI Capabilities"}
            capabilities={aiCapabilities || []}
            products={aiProducts || []}
            productsSection={aiProductsSection || {title: "AI Products", subtitle: "Our suite of AI products"}}
          />
        </div>
        
        <div id="tech-stack" className="py-16 sm:py-24 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">
                {techStackSection?.title || "Our Technology Stack"}
              </span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              We use cutting-edge technologies to build powerful, scalable solutions
            </p>
          </div>
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
