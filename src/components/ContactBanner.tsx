
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ContactBanner = () => {
  const navigate = useNavigate();

  const handleContactFormClick = () => {
    navigate('/contact');
  };

  const handleAssistantClick = () => {
    // Scroll to the chatbot section
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-noesis-purple/20 to-noesis-blue/20 overflow-hidden relative" style={{ marginBottom: 0, paddingBottom: '4rem' }}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to explore how we can help you leverage AI and technology to achieve your business goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleAssistantClick}
              className="bg-noesis-purple hover:bg-noesis-purple/90 text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat with AI Assistant
            </Button>
            
            <Button 
              onClick={handleContactFormClick}
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                <polyline points="3 7 12 13 21 7"></polyline>
              </svg>
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-noesis-purple/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-noesis-blue/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default ContactBanner;
