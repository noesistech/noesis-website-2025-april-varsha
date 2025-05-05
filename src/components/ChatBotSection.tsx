
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section id="chatbot" className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Chat with Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 mb-8">
            Ask questions about our services or get quick answers about how we can help your business.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <MessageProvider>
            <ChatBot minimized={true} />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
