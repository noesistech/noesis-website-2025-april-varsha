
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Package, ArrowRight } from 'lucide-react';
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

  return <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section with updated subtitle */}
        <SubpageHero title="Our Services" subtitle="We combine human creativity with AI precision to deliver
exceptional solutions tailored to your needs." gradientText="Services" backgroundEffect="blue" />

        {/* Services Overview Grid */}
        <section className="py-16 bg-[#1A1F2C]" id="services">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What We <span className="text-noesis-purple">Offer</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
            </div>
            
            <ServiceGrid services={serviceItems} title="What We Offer" />
          </div>
        </section>
        
        {/* Individual Service Sections */}
        {/* UI/UX Section */}
        <section id="uiux" className="py-16 bg-[#1A1F2C]/90">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(uiuxService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{uiuxService.title}</h3>
                  <p className="text-gray-300">{uiuxService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">User Research</h4>
                    <p className="text-gray-300">Deep user research to understand your target audience's needs, behaviors, and pain points.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Intuitive Design</h4>
                    <p className="text-gray-300">Creating interfaces that feel natural and intuitive while maintaining visual consistency.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Accessibility</h4>
                    <p className="text-gray-300">Ensuring your digital products are accessible to all users, including those with disabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Web Development Section */}
        <section id="webdev" className="py-16 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(webdevService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{webdevService.title}</h3>
                  <p className="text-gray-300">{webdevService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Frontend Development</h4>
                    <p className="text-gray-300">Creating responsive, interactive user interfaces using modern frameworks like React, Vue, and Angular.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Backend Development</h4>
                    <p className="text-gray-300">Building robust server-side systems that power your applications with security and performance.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Mobile App Development</h4>
                    <p className="text-gray-300">Creating cross-platform mobile applications with React Native or native development for iOS and Android.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Graphics and Content Section */}
        <section id="graphics" className="py-16 bg-[#1A1F2C]/90">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(graphicsService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{graphicsService.title}</h3>
                  <p className="text-gray-300">{graphicsService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Brand Identity</h4>
                    <p className="text-gray-300">Developing cohesive visual identities that communicate your brand's values and personality.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Content Creation</h4>
                    <p className="text-gray-300">Producing engaging, SEO-optimized content that connects with your target audience.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Digital Marketing Materials</h4>
                    <p className="text-gray-300">Creating visuals for social media, email campaigns, and digital advertising platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Cloud Services Section */}
        <section id="cloud" className="py-16 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(cloudService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{cloudService.title}</h3>
                  <p className="text-gray-300">{cloudService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Cloud Infrastructure</h4>
                    <p className="text-gray-300">Designing and implementing scalable cloud architecture on AWS, Azure, or Google Cloud.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">CI/CD Pipelines</h4>
                    <p className="text-gray-300">Setting up automated development workflows that ensure reliable, frequent deployment.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Performance Optimization</h4>
                    <p className="text-gray-300">Monitoring and optimizing infrastructure for cost-effectiveness and optimal performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Customized Solutions Section */}
        <section id="ai" className="py-16 bg-[#1A1F2C]/90">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(aiService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{aiService.title}</h3>
                  <p className="text-gray-300">{aiService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Custom AI Models</h4>
                    <p className="text-gray-300">Developing and training machine learning models specific to your business needs.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">NLP & Computer Vision</h4>
                    <p className="text-gray-300">Implementing language processing and image recognition systems for advanced data analysis.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">AI Integration</h4>
                    <p className="text-gray-300">Seamlessly incorporating AI capabilities into your existing systems and workflows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI-Enhanced Staff Solutions Section */}
        <section id="staff" className="py-16 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/2">
                <div className="bg-[#222732] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                    {getIconByName(staffService.icon_name)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{staffService.title}</h3>
                  <p className="text-gray-300">{staffService.description}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-4">
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Talent Matching</h4>
                    <p className="text-gray-300">Connecting you with professionals who have the exact skills your project needs.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Flexible Engagement Models</h4>
                    <p className="text-gray-300">Options ranging from short-term contractors to dedicated full-time team members.</p>
                  </div>
                  <div className="bg-[#222732]/70 p-5 rounded-xl border border-white/5">
                    <h4 className="text-xl font-semibold text-white mb-2">Team Augmentation</h4>
                    <p className="text-gray-300">Seamlessly integrating expert professionals into your existing team structure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
