
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1A1F2C] to-[#151922]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Need help? Chat with our AI assistant to get quick answers about our services and solutions.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <MessageProvider>
            <ChatBot />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
