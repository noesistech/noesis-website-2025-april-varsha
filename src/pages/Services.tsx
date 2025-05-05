
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
  
  return <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section with updated subtitle */}
        <SubpageHero title="Our Services" subtitle="We combine human creativity with AI precision to deliver
exceptional solutions tailored to your needs." gradientText="Services" backgroundEffect="blue" />

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
        
        {/* Why Choose Noesis Section - Updated for mobile */}
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
          <div className="container mx-auto px-4 md:px-6">
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
        
        {/* Contact Banner Section */}
        <ContactBanner />
      </main>
      <Footer />
    </div>;
};

export default Services;
