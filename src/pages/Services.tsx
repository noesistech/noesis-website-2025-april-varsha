
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
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section with updated subtitle */}
        <SubpageHero 
          title="Our Services" 
          subtitle="We combine human creativity with AI precision to deliver
exceptional solutions tailored to your needs." 
          gradientText="Services" 
          backgroundEffect="blue" 
        />

        {/* Services Grid - New Component */}
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
        
        {/* Why Choose Noesis Section */}
        <section className="bg-[#1A1F2C] py-16 sm:py-0">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Why <span className="text-noesis-purple">Choose Noesis?</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
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
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">AI Capabilities</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
            </div>
            <AICapabilitiesSection 
              title={aiCapabilitiesSection.title} 
              capabilities={aiCapabilities} 
              products={aiProducts} 
              productsSection={aiProductsSection} 
            />
          </div>
        </section>
        
        {/* Technology Stack Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-noesis-purple">Tech Stack</span>
              </h2>
              <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
            </div>
            <TechStackSection 
              title={techStackSection.title} 
              categories={techCategories} 
              subtitle={techStackSection.subtitle} 
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 py-16 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-[#2A2F3C]/70 backdrop-blur-sm rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 text-center">
                Get in touch with us today to discuss how our services can help you achieve your goals.
              </p>
              <div className="flex justify-center">
                <Button variant="noesis" size="lg" className="shadow-lg hover:shadow-noesis-purple/50" asChild>
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
