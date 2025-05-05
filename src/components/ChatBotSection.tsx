
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ask Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300">
            Have questions about our services or need help finding the right solution? 
            Our AI assistant is here to help.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ChatBot embedded minimized />
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
