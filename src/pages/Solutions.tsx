
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionsSection from '@/components/SolutionsSection';
import IndustrySection from '@/components/IndustrySection';
import BrainstormerOverviewSection from '@/components/BrainstormerOverviewSection';
import AICapabilitiesSection from '@/components/AICapabilitiesSection';
import { useContent } from '@/contexts/ContentContext';
import { industrySpecificSolutionsData } from '@/data/content/solutions';
import SubpageHero from '@/components/SubpageHero';
import ContactBanner from '@/components/ContactBanner';

const Solutions = () => {
  const { solutionsSection, solutionItems, aiCapabilities, aiProducts, aiProductsSection } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section */}
        <SubpageHero
          title="Our Solutions"
          gradientText="Solutions"
          backgroundEffect="green"
          subtitle="Transformative AI technologies built to drive innovation and efficiency for your business"
        />

        {/* Solutions Section */}
        <SolutionsSection 
          title="Core AI Product Offerings" 
          subtitle="Carefully crafted solutions powered by AI to solve your most complex business challenges"
          solutions={solutionItems} 
          highlightLastWord={true}
        />

        {/* AI Capabilities Section - Added here */}
        <section id="ai-capabilities" className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
              Our <span className="text-noesis-purple">AI Capabilities</span>
            </h2>
            <p className="text-center text-gray-300 mt-4 text-base sm:text-lg max-w-3xl mx-auto">
              Cutting-edge artificial intelligence solutions to transform your business
            </p>
          </div>
          <AICapabilitiesSection
            title="AI Capabilities"
            capabilities={aiCapabilities}
            products={aiProducts}
            productsSection={aiProductsSection}
          />
        </section>

        {/* Industry-Specific Solutions Section */}
        <IndustrySection 
          title={industrySpecificSolutionsData.title}
          industries={industrySpecificSolutionsData.industries}
        />

        {/* Brainstormer Platform Overview Section */}
        <section id="brainstormer" className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
              The <span className="text-noesis-purple">Brainstormer Suite</span>
            </h2>
            <p className="text-center text-gray-300 mt-4 text-base sm:text-lg max-w-3xl mx-auto">
              Our flagship AI platform built to transform how businesses leverage artificial intelligence
            </p>
          </div>
          <BrainstormerOverviewSection />
        </section>
        
        {/* Contact Banner */}
        <ContactBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
