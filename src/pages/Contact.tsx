
import React, { useEffect } from 'react';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SubpageHero from '@/components/SubpageHero';
import { useContent } from '@/contexts/ContentContext';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistantBanner from '@/components/AIAssistantBanner';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const { contactSection } = useContent();
  const location = useLocation();

  useEffect(() => {
    // Check if we should scroll to the contact form
    if (location.state && location.state.scrollToContactForm) {
      // Use a small timeout to ensure the page has fully rendered
      setTimeout(() => {
        const contactSectionElement = document.getElementById('contact');
        if (contactSectionElement) {
          // Scroll to the top of the contact section with a small offset for the header
          window.scrollTo({
            top: contactSectionElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-16">
        <SubpageHero
          title="Get in Touch"
          subtitle={contactSection.subtitle}
          gradientText="Touch"
          backgroundEffect="orange"
        />
        
        {/* Contact form and info section */}
        <ContactSection />
        
        {/* AI Assistant Banner */}
        <AIAssistantBanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
