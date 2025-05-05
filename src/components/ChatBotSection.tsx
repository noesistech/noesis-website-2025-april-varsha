
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section id="chatbot" className="py-16 bg-noesis-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Talk to Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Have questions about our services or how we can help your business? 
            Our AI assistant is ready to provide immediate answers and connect you with our team.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <MessageProvider>
            <ChatBot embedded={true} />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
