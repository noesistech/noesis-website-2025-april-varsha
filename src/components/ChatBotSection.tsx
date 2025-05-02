
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection = () => {
  return (
    <section id="chatbot" className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Need <span className="text-noesis-purple">Assistance?</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300">
            Our AI assistant is available 24/7 to answer your questions and help you explore our services
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
