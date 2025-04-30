
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionsSection from '@/components/SolutionsSection';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Solutions = () => {
  const { solutionsSection, solutionItems } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative bg-[#1A1F2C] py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Our <span className="text-noesis-purple">Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Tailored AI solutions designed to solve your most complex business challenges.
              </p>
            </div>
          </div>

          {/* Background gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-noesis-purple/20 rounded-full filter blur-[120px] opacity-50" />
        </section>

        {/* Solutions Section */}
        <SolutionsSection 
          title={solutionsSection.title} 
          subtitle={solutionsSection.subtitle} 
          solutions={solutionItems} 
        />

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
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
