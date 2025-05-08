
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionsSection from '@/components/SolutionsSection';
import IndustrySection from '@/components/IndustrySection';
import BrainstormerOverviewSection from '@/components/BrainstormerOverviewSection';
import { useContent } from '@/contexts/ContentContext';
import { industrySpecificSolutionsData } from '@/data/content/solutions';
import SubpageHero from '@/components/SubpageHero';
import ContactBanner from '@/components/ContactBanner';

const Solutions = () => {
  const { solutionsSection, solutionItems } = useContent();

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
          solutions={solutionItems} 
          highlightLastWord={true}
        />

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
            <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
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
