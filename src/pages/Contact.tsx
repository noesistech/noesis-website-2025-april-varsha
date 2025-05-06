
import React from 'react';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SubpageHero from '@/components/SubpageHero';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';
import ChatBotSection from '@/components/ChatBotSection';

const Contact = () => {
  const { contactSection } = useContent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16">
        <SubpageHero
          title="Get in Touch"
          subtitle="Ready to transform your business with AI-powered solutions?"
          gradientText="Touch"
          backgroundEffect="orange"
        />
        
        {/* New layout structure with columns for contact details and form */}
        <ContactSection />
        
        {/* AI Assistant Section */}
        <ChatBotSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
