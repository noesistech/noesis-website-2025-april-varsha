
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AIAssistantBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAIAssistantClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on homepage, scroll to the chatbot section
      const chatbotSection = document.getElementById('chatbot');
      if (chatbotSection) {
        chatbotSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage then scroll to chatbot section
      navigate('/');
      setTimeout(() => {
        const chatbotSection = document.getElementById('chatbot');
        if (chatbotSection) {
          chatbotSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-noesis-purple/20 to-noesis-blue/20 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Try Our <span className="text-noesis-purple">AI Assistant</span>
                </h2>
                <p className="text-gray-300">
                  Get immediate answers to your questions with our AI assistant. Available 24/7 to help with your inquiries.
                </p>
              </div>
              
              <Button 
                onClick={handleAIAssistantClick}
                className="bg-noesis-purple hover:bg-noesis-purple/90 text-white px-6 py-3 rounded-md flex items-center justify-center group transition-all"
              >
                <Bot className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Chat with AI Assistant
              </Button>
            </div>
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

export default AIAssistantBanner;
