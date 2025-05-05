
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section className="py-12 bg-noesis-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Have <span className="text-noesis-purple">Questions</span>?
          </h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Our AI assistant is here to help. Ask anything about our services, company, or how we can help with your project.
          </p>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <MessageProvider>
            <ChatBot embedded={true} />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
