import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionsSection from '@/components/SolutionsSection';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubpageHero from '@/components/SubpageHero';

const Solutions = () => {
  const { solutionsSection, solutionItems } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main>
        {/* Hero section */}
        <SubpageHero
          title="Our Solutions"
          subtitle="Tailored AI solutions designed to solve your most complex business challenges."
          gradientText="Solutions"
          backgroundEffect="green"
        />

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
