
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionsSection from '@/components/SolutionsSection';
import IndustrySection from '@/components/IndustrySection';
import BrainstormerOverviewSection from '@/components/BrainstormerOverviewSection';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubpageHero from '@/components/SubpageHero';
import { industrySpecificSolutionsData } from '@/data/content/solutions';
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
        <BrainstormerOverviewSection />

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#1A1F2C]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-b from-[#222732]/90 to-[#1D212B]/80 backdrop-blur-sm rounded-xl p-8 md:p-10 max-w-3xl mx-auto border border-white/10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 text-center">
                Let us help you implement the right solution for your unique needs.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="noesis" 
                  size="lg" 
                  className="shadow-lg hover:shadow-noesis-purple/50" 
                  asChild
                >
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Request Banner */}
        <section className="py-16 bg-gradient-to-r from-noesis-purple/20 via-noesis-blue/10 to-noesis-purple/20 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  Request a <span className="text-noesis-purple">Custom Demo</span>
                </h2>
                <p className="text-gray-300 max-w-2xl">
                  See our AI solutions in action with a personalized demo tailored to your specific business challenges and objectives. Our experts will guide you through relevant features and capabilities.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button 
                  variant="animated"
                  size="lg" 
                  asChild
                >
                  <Link to="/contact?demo=true" className="inline-flex items-center gap-2 px-6">
                    <Calendar className="h-5 w-5" />
                    Schedule Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Banner */}
        <ContactBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
