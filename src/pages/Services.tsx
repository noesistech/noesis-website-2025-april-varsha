
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Package, 
  ArrowRight, 
  ExternalLink, 
  Eye, 
  UserRound, 
  Accessibility, 
  Palette, 
  FileText, 
  GitBranch, 
  BarChart2, 
  Languages, 
  Boxes, 
  PlusSquare, 
  RotateCcw,
  Cloud,
  BrainCircuit,
  Users,
  ImageIcon,
  MousePointerClick
} from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getIconByName, serviceIconColors } from '@/components/hero/ServiceCard';
import TechStackSection from '@/components/TechStackSection';
import AICapabilitiesSection from '@/components/AICapabilitiesSection';
import { useLocation } from 'react-router-dom';
import SubpageHero from '@/components/SubpageHero';
import HowWeWorkSection from '@/components/HowWeWorkSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ServiceGrid from '@/components/ServiceGrid';
import AIProductCard from '@/components/AIProductCard';
import ContactBanner from '@/components/ContactBanner';
import ChatBotSection from '@/components/ChatBotSection';
import ServiceDetailSection from '@/components/ServiceDetailSection';

const Services = () => {
  const {
    serviceItems,
    servicesSection,
    techStackSection,
    techCategories,
    aiCapabilitiesSection,
    aiCapabilities,
    aiProducts,
    aiProductsSection
  } = useContent();
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that element
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # character
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100); // Small delay to ensure DOM is ready
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Filter service items by ID to create individual service sections
  const getServiceById = (id: string) => {
    return serviceItems.find(service => service.id === id || service.id.includes(id));
  };

  const uiuxService = getServiceById('uiux') || serviceItemsData[0];
  const webdevService = getServiceById('webdev') || serviceItemsData[1];
  const graphicsService = getServiceById('graphics') || serviceItemsData[2];
  const cloudService = getServiceById('cloud') || serviceItemsData[3];
  const aiService = getServiceById('ai') || serviceItemsData[4];
  const staffService = getServiceById('staff') || serviceItemsData[5];

  // Handle smooth scrolling to service sections
  const scrollToService = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section with updated subtitle */}
        <SubpageHero title="Our Services" subtitle="We combine human creativity with AI precision to deliver
exceptional solutions tailored to your needs." gradientText="Services" backgroundEffect="blue" />

        {/* Services Overview Grid - Updated with clickable service cards */}
        <section className="py-16 bg-[#1A1F2C]" id="services">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What We <span className="text-noesis-purple">Offer</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
              <p className="text-gray-300 mb-8">Click on any service to learn more about our offerings</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {serviceItems.map((service, index) => (
                <div 
                  key={service.id}
                  onClick={() => scrollToService(service.id.replace('service-item-', '') || `service-${index + 1}`)}
                  className="bg-gradient-to-b from-[#222732]/95 to-[#1D212B]/85 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 shadow-xl hover:shadow-noesis-purple/30 transition-all duration-300 flex flex-col items-center text-center hover:border-noesis-purple/30 hover:scale-105 group cursor-pointer"
                >
                  <div className={`bg-[#1A1F2C]/90 p-4 rounded-full w-fit mb-4 group-hover:bg-noesis-purple/20 transition-colors duration-300 border border-white/5 group-hover:border-noesis-purple/30`}>
                    <div className={`${serviceIconColors[service.icon_name as keyof typeof serviceIconColors] || 'text-noesis-purple'} group-hover:text-white transition-colors duration-300`}>
                      {getIconByName(service.icon_name)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-noesis-purple transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{service.description.split('.')[0]}.</p>
                  <div className="mt-auto flex items-center text-noesis-purple opacity-70 group-hover:opacity-100">
                    <span className="text-sm">Learn more</span>
                    <MousePointerClick className="h-4 w-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Individual Service Sections */}
        {/* UI/UX Section */}
        <section id="uiux" className="py-16 bg-[#1A1F2C]/90">
          <ServiceDetailSection 
            service={uiuxService} 
            features={[
              {
                icon: <UserRound className="h-6 w-6 text-noesis-blue" />,
                title: "User Research",
                description: "Deep user research to understand your target audience's needs, behaviors, and pain points."
              },
              {
                icon: <Eye className="h-6 w-6 text-noesis-green" />,
                title: "Intuitive Design",
                description: "Creating interfaces that feel natural and intuitive while maintaining visual consistency."
              },
              {
                icon: <Accessibility className="h-6 w-6 text-noesis-yellow" />,
                title: "Accessibility",
                description: "Ensuring your digital products are accessible to all users, including those with disabilities."
              }
            ]} 
            isAlternate={false}
            bgColor="from-[#1c212e] to-[#151a25]" 
            accentColor="border-noesis-blue/30"
            imageUrl="public/lovable-uploads/b1889f4a-cdf6-40f8-907c-386a883fbeb6.png"
          />
        </section>
        
        {/* Web Development Section */}
        <section id="webdev" className="py-16 bg-[#1A1F2C]">
          <ServiceDetailSection 
            service={webdevService} 
            features={[
              {
                icon: <ChevronRight className="h-6 w-6 text-noesis-green" />,
                title: "Frontend Development",
                description: "Creating responsive, interactive user interfaces using modern frameworks like React, Vue, and Angular."
              },
              {
                icon: <Package className="h-6 w-6 text-noesis-blue" />,
                title: "Backend Development",
                description: "Building robust server-side systems that power your applications with security and performance."
              },
              {
                icon: <ExternalLink className="h-6 w-6 text-noesis-yellow" />,
                title: "Mobile App Development",
                description: "Creating cross-platform mobile applications with React Native or native development for iOS and Android."
              }
            ]} 
            isAlternate={true}
            bgColor="from-[#1e2330] to-[#171c27]" 
            accentColor="border-noesis-green/30"
          />
        </section>
        
        {/* Graphics and Content Section */}
        <section id="graphics" className="py-16 bg-[#1A1F2C]/90">
          <ServiceDetailSection 
            service={graphicsService} 
            features={[
              {
                icon: <Palette className="h-6 w-6 text-noesis-purple" />,
                title: "Brand Identity",
                description: "Developing cohesive visual identities that communicate your brand's values and personality."
              },
              {
                icon: <FileText className="h-6 w-6 text-noesis-blue" />,
                title: "Content Creation",
                description: "Producing engaging, SEO-optimized content that connects with your target audience."
              },
              {
                icon: <ImageIcon className="h-6 w-6 text-noesis-yellow" />,
                title: "Digital Marketing Materials",
                description: "Creating visuals for social media, email campaigns, and digital advertising platforms."
              }
            ]} 
            isAlternate={false}
            bgColor="from-[#1c212e] to-[#151a25]" 
            accentColor="border-noesis-yellow/30"
          />
        </section>
        
        {/* Cloud Services Section */}
        <section id="cloud" className="py-16 bg-[#1A1F2C]">
          <ServiceDetailSection 
            service={cloudService} 
            features={[
              {
                icon: <Cloud className="h-6 w-6 text-pink-400" />,
                title: "Cloud Infrastructure",
                description: "Designing and implementing scalable cloud architecture on AWS, Azure, or Google Cloud."
              },
              {
                icon: <GitBranch className="h-6 w-6 text-noesis-blue" />,
                title: "CI/CD Pipelines",
                description: "Setting up automated development workflows that ensure reliable, frequent deployment."
              },
              {
                icon: <BarChart2 className="h-6 w-6 text-noesis-green" />,
                title: "Performance Optimization",
                description: "Monitoring and optimizing infrastructure for cost-effectiveness and optimal performance."
              }
            ]} 
            isAlternate={true}
            bgColor="from-[#1e2330] to-[#171c27]" 
            accentColor="border-pink-400/30"
          />
        </section>
        
        {/* AI Customized Solutions Section */}
        <section id="ai" className="py-16 bg-[#1A1F2C]/90">
          <ServiceDetailSection 
            service={aiService} 
            features={[
              {
                icon: <BrainCircuit className="h-6 w-6 text-noesis-purple" />,
                title: "Custom AI Models",
                description: "Developing and training machine learning models specific to your business needs."
              },
              {
                icon: <Languages className="h-6 w-6 text-noesis-blue" />,
                title: "NLP & Computer Vision",
                description: "Implementing language processing and image recognition systems for advanced data analysis."
              },
              {
                icon: <Boxes className="h-6 w-6 text-noesis-green" />,
                title: "AI Integration",
                description: "Seamlessly incorporating AI capabilities into your existing systems and workflows."
              }
            ]} 
            isAlternate={false}
            bgColor="from-[#1c212e] to-[#151a25]" 
            accentColor="border-noesis-purple/30"
          />
        </section>
        
        {/* AI-Enhanced Staff Solutions Section */}
        <section id="staff" className="py-16 bg-[#1A1F2C]">
          <ServiceDetailSection 
            service={staffService} 
            features={[
              {
                icon: <Users className="h-6 w-6 text-orange-400" />,
                title: "Talent Matching",
                description: "Connecting you with professionals who have the exact skills your project needs."
              },
              {
                icon: <RotateCcw className="h-6 w-6 text-noesis-blue" />,
                title: "Flexible Engagement Models",
                description: "Options ranging from short-term contractors to dedicated full-time team members."
              },
              {
                icon: <PlusSquare className="h-6 w-6 text-noesis-green" />,
                title: "Team Augmentation",
                description: "Seamlessly integrating expert professionals into your existing team structure."
              }
            ]} 
            isAlternate={true}
            bgColor="from-[#1e2330] to-[#171c27]" 
            accentColor="border-orange-400/30"
          />
        </section>
        
        {/* Why Choose Noesis Section */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-3 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Why <span className="text-noesis-purple">Choose Noesis?</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6 sm:mb-8"></div>
            </div>
            <WhyChooseSection />
          </div>
        </section>
        
        {/* How We Work Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Process</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
            </div>
            <HowWeWorkSection />
          </div>
        </section>
        
        {/* AI Capabilities Section */}
        <section className="py-0">
          <div className="container mx-auto px-4 md:px-6 py-[30px]">
            <div className="text-center max-w-3xl mx-auto mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">AI Capabilities</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-2"></div>
            </div>
            <AICapabilitiesSection title={aiCapabilitiesSection.title} capabilities={aiCapabilities} products={aiProducts} productsSection={aiProductsSection} />
          </div>
        </section>
        
        {/* Technology Stack Section */}
        <section className="py-0">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Tech Stack</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-2"></div>
            </div>
            <TechStackSection title={techStackSection.title} categories={techCategories} subtitle={techStackSection.subtitle} />
          </div>
        </section>
        
        {/* AI Products Section */}
        {aiProducts && aiProducts.length > 0 && <section className="py-0">
          <div className="container mx-auto px-4 md:px-6 py-[58px]">
            <div className="text-center max-w-3xl mx-auto mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">AI Products</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
              {aiProducts.map(product => <AIProductCard key={product.id} title={product.title} description={product.description} logoUrl={product.logoUrl || '/placeholder.svg'} logoWidth={product.logoWidth} logoHeight={product.logoHeight} ctaText={product.ctaText} ctaUrl={product.ctaUrl} />)}
            </div>
          </div>
        </section>}
        
        {/* Chatbot Section */}
        <ChatBotSection />
        
        {/* Contact Banner Section */}
        <ContactBanner />
      </main>
      <Footer />
    </div>;
};

// Import needed for the fallback service data
import { serviceItemsData } from '@/data/content/services';

export default Services;
