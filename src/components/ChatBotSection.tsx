
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection = () => {
  return (
    <section id="chatbot" className="pt-8 pb-20 bg-gradient-to-b from-noesis-dark to-noesis-darkest">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="section-title">Experience <span className="gradient-text">Noesis AI Assistant</span></h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
            Interact with our AI assistant to learn more about our services and how we can help your business.
          </p>
        </div>
        
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 p-2 xl:p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
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
