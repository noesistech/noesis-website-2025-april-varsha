
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-noesis-dark to-noesis-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Chat with Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions about Noesis? Our AI assistant is here to help you learn more about our company, services, and how we can work together.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ChatBot embedded={true} />
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
