
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section id="chatbot" className="bg-noesis-darker py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">
              Our AI <span className="gradient-text">Assistant</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience our intelligent AI assistant that can answer your questions about our services, company, and how we can help your business grow.
            </p>
          </div>
          
          <div className="bg-noesis-dark/50 border border-noesis-purple/20 rounded-lg p-4 shadow-lg">
            <MessageProvider>
              <ChatBot embedded={true} />
            </MessageProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
