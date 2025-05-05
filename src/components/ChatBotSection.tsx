
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section id="chatbot" className="bg-[#171C28] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 mb-8">
            Get instant answers to your questions and explore how we can help with your project needs
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <ChatBot embedded={true} />
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
