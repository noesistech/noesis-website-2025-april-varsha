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
import HowWeWorkSection from '@/components/HowWeWorkSection';
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
  PaintBucket,
  MessageSquare,
  Lightbulb,
  FileCode,
  RefreshCcw,
  Upload,
  Users2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Helper function to get icon with specific size
const getIconByName = (iconName: string, className: string = "h-6 w-6") => {
  const iconProps = { className };
  
  switch (iconName) {
    case 'Palette':
      return <Palette {...iconProps} className={`${className} text-blue-400`} />;
    case 'Globe':
      return <Globe {...iconProps} className={`${className} text-green-400`} />;
    case 'Image':
      return <Image {...iconProps} className={`${className} text-yellow-400`} />;
    case 'Cloud':
      return <Cloud {...iconProps} className={`${className} text-cyan-400`} />;
    case 'BrainCircuit':
      return <BrainCircuit {...iconProps} className={`${className} text-purple-400`} />;
    case 'Users':
      return <Users {...iconProps} className={`${className} text-orange-400`} />;
    default:
      return <Sparkles {...iconProps} className={`${className} text-noesis-purple`} />;
  }
};

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
  
  const cloudFeatures = [
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
  ];
  
  const aiFeatures = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
      title: "Custom AI Models",
      description: "Tailored artificial intelligence solutions that address your unique business challenges."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-pink-400" />,
      title: "Data Analysis",
      description: "Extract meaningful insights from your data with our AI-powered analytics tools."
    },
    {
      icon: <Bot className="h-6 w-6 text-indigo-400" />,
      title: "Natural Language Processing",
      description: "Advanced text analysis and language processing for enhanced customer interactions."
    }
  ];
  
  const staffingFeatures = [
    {
      icon: <Users className="h-6 w-6 text-orange-400" />,
      title: "Expert Talent Pool",
      description: "Access to 500+ high-quality professionals trained in AI-human collaboration methodologies."
    },
    {
      icon: <Check className="h-6 w-6 text-amber-400" />,
      title: "Flexible Staffing",
      description: "Scale your team up or down based on project requirements with our flexible staffing solutions."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
      title: "Specialized Expertise",
      description: "Teams skilled in AI integration across Frontend, Backend, Fullstack, ML, DevOps and cloud technologies."
    }
  ];

  // Process steps
  const processSteps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-noesis-purple" />,
      title: "Discovery & Consultation",
      description: "We begin by understanding your business goals, challenges, and requirements through in-depth consultation."
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-noesis-blue" />,
      title: "Strategy & Planning",
      description: "Our team develops a comprehensive plan that combines human expertise with AI capabilities to meet your objectives."
    },
    {
      icon: <FileCode className="h-10 w-10 text-noesis-green" />,
      title: "Design & Development",
      description: "We create solutions using our hybrid human-AI approach, ensuring both creativity and technical excellence."
    },
    {
      icon: <RefreshCcw className="h-10 w-10 text-yellow-400" />,
      title: "Testing & Refinement",
      description: "Rigorous testing ensures your solution performs flawlessly across all platforms and use cases."
    },
    {
      icon: <Upload className="h-10 w-10 text-teal-400" />,
      title: "Deployment & Support",
      description: "We handle the launch process and provide ongoing support to ensure continued success."
    },
    {
      icon: <Users2 className="h-10 w-10 text-pink-400" />,
      title: "Collaboration & Growth",
      description: "We maintain an ongoing partnership, continuously improving your solution as your business evolves."
    }
  ];
  
  // Find the specific services
  const uiuxService = serviceItems.find(service => service.title === "UI/UX") || serviceItems[0];
  const webDevService = serviceItems.find(service => service.title === "Web and Application Development") || serviceItems[1];
  const graphicsService = serviceItems.find(service => service.title === "Graphics and Content Creation") || serviceItems[2];
  const cloudService = serviceItems.find(service => service.title === "Cloud Services & DevOps") || serviceItems[3];
  const aiService = serviceItems.find(service => service.title === "AI Customized Solutions") || serviceItems[4];
  const staffService = serviceItems.find(service => service.title === "AI-Enhanced Staff Solutions") || serviceItems[5];
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C]">
      <Header />
      <main className="flex-grow">
        <SubpageHero 
          title="Our Services & Capabilities" 
          subtitle="Discover the comprehensive range of services we offer"
          backgroundEffect="purple"
        />
        
        {/* Services Section with "What We Offer" title */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">What We</span> <span className="text-noesis-purple">Offer</span>
            </h2>
            <div className="w-24 h-1 bg-noesis-purple mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mb-16">
              Click on any service to learn more
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceItems.map((service, index) => (
                <a 
                  href={`#${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} 
                  key={service.id} 
                  className="bg-[#222732]/90 border border-white/10 hover:border-noesis-purple/30 rounded-xl p-8 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-[#1A1F2C] p-5 rounded-full mb-6">
                      {getIconByName(service.icon_name, "h-8 w-8")}
                    </div>
                    <h3 className="text-xl font-bold mb-6 text-white">
                      {service.title}
                    </h3>
                    <span className="text-noesis-purple group-hover:opacity-80 flex items-center">
                      View details <Sparkles className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service Detail Sections */}
        <section id="ui-ux" className="py-16 sm:py-20 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <ServiceDetailSection 
            service={uiuxService}
            features={uiuxFeatures}
            bgColor="from-[#1c212e]/80 to-[#151a25]"
            accentColor="border-blue-500/30"
          />
        </section>
        
        {/* Web Development Service Detail Section */}
        <section id="web-and-application-development" className="py-16 sm:py-20 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <ServiceDetailSection 
            service={webDevService}
            features={webDevFeatures}
            isAlternate={true}
            bgColor="from-[#151a25]/80 to-[#1c212e]"
            accentColor="border-green-500/30"
          />
        </section>
        
        {/* Graphics Service Detail Section */}
        <section id="graphics-and-content-creation" className="py-16 sm:py-20 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <ServiceDetailSection 
            service={graphicsService}
            features={graphicsFeatures}
            bgColor="from-[#1c212e]/80 to-[#151a25]"
            accentColor="border-pink-500/30"
          />
        </section>
        
        {/* Cloud Services Section */}
        <section id="cloud-services-and-devops" className="py-16 sm:py-20 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <ServiceDetailSection 
            service={cloudService}
            features={cloudFeatures}
            isAlternate={true}
            bgColor="from-[#151a25]/80 to-[#1c212e]"
            accentColor="border-cyan-500/30"
          />
        </section>
        
        {/* AI Solutions Section */}
        <section id="ai-customized-solutions" className="py-16 sm:py-20 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <ServiceDetailSection 
            service={aiService}
            features={aiFeatures}
            bgColor="from-[#1c212e]/80 to-[#151a25]"
            accentColor="border-purple-500/30"
          />
        </section>
        
        {/* AI-Enhanced Staff Solutions Section */}
        <section id="ai-enhanced-staff-solutions" className="py-16 sm:py-20 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <ServiceDetailSection 
            service={staffService}
            features={staffingFeatures}
            isAlternate={true}
            bgColor="from-[#151a25]/80 to-[#1c212e]"
            accentColor="border-orange-500/30"
          />
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="text-white">Why Choose</span> <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">Noesis</span><span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">?</span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Our unique approach delivers premium results through our human-AI collaboration
            </p>
            <WhyChooseSection />
          </div>
        </section>
        
        {/* Our Process Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="text-white">Our</span> <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-16">
              Our systematic approach ensures quality results for every project
            </p>
            
            <HowWeWorkSection />
          </div>
        </section>
        
        {/* AI Capabilities Section */}
        <section id="ai-capabilities" className="py-16 sm:py-24 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="text-white">Our</span> <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">AI Capabilities</span>
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
        </section>
        
        {/* AI Products Section */}
        <section id="ai-products" className="py-16 sm:py-24 bg-gradient-to-b from-[#1A1F2C] to-[#151a25]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="text-white">Our</span> <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">AI Products</span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Our suite of AI-powered products designed to transform your business
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiProducts.map((product, index) => (
                <div 
                  key={index}
                  className="bg-[#1e1e24]/90 border border-white/10 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-noesis-purple/20"
                >
                  <div className="flex justify-center mb-6">
                    <img 
                      src={product.logoUrl}
                      alt={product.title}
                      className="h-16 object-contain"
                    />
                  </div>
                  <p className="text-gray-300 text-center mb-6">
                    {product.description}
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href={product.ctaUrl} 
                      className="inline-flex items-center px-5 py-2 rounded-md bg-noesis-purple hover:bg-noesis-purple/90 text-white transition-colors"
                    >
                      {product.ctaText}
                      <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="tech-stack" className="py-16 sm:py-24 bg-gradient-to-b from-[#151a25] to-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              <span className="text-white">Our</span> <span className="bg-gradient-to-r from-[#a074ff] to-[#8257e6] bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              We use cutting-edge technologies to build powerful, scalable solutions
            </p>
          </div>
          <TechStackSection 
            title={techStackSection?.title || "Our Technology Stack"} 
            categories={techCategories}
          />
        </section>
        
        <ContactBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
