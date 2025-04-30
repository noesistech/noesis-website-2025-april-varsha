
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
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative bg-[#1A1F2C] py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Our <span className="text-noesis-purple">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                We combine human creativity with AI precision to deliver exceptional solutions 
                tailored to your needs.
              </p>
            </div>
          </div>

          {/* Background gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-50" />
        </section>

        {/* Services Grid */}
        <section className="bg-[#1A1F2C] py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="section-title mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg mb-12">
              Explore our comprehensive range of services designed to transform your business
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceItems.map((service) => (
                <Card key={service.id} className="bg-[#222732] border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <div className="bg-[#1A1F2C]/80 p-3 rounded-full w-fit mb-4">
                      <div className={serviceIconColors[service.icon_name as keyof typeof serviceIconColors] || 'text-noesis-purple'}>
                        {getIconByName(service.icon_name)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-noesis-purple hover:text-white hover:bg-noesis-purple/20 p-0 flex items-center gap-2">
                      Learn more <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* AI Capabilities Section */}
        <AICapabilitiesSection 
          title={aiCapabilitiesSection.title} 
          capabilities={aiCapabilities} 
          products={aiProducts}
          productsSection={aiProductsSection}
        />
        
        {/* Technology Stack Section */}
        <TechStackSection 
          title={techStackSection.title} 
          categories={techCategories}
          subtitle={techStackSection.subtitle}
        />

        {/* CTA Section */}
        <section className="mt-20 py-16 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-[#2A2F3C]/70 backdrop-blur-sm rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 text-center">
                Get in touch with us today to discuss how our services can help you achieve your goals.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="noesis" 
                  size="lg" 
                  className="shadow-lg hover:shadow-noesis-purple/50" 
                  asChild
                >
                  <a href="/contact" className="inline-flex items-center gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
