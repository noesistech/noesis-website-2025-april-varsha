
import React from 'react';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#1A1F2C]">
      <Header />
      <div className="flex-1 pt-24">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
