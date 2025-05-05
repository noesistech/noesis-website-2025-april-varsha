
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
        element.scrollIntoView({ behavior: 'smooth' });
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
        <ServiceGrid 
          title="What We Offer"
          subtitle="Explore our comprehensive range of services designed to transform your business"
          services={serviceItems}
        />
        
        {/* Why Choose Noesis Section */}
        <WhyChooseSection />
        
        {/* How We Work Section */}
        <HowWeWorkSection />
        
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
