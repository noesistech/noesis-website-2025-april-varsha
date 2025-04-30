
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection = () => {
  return (
    <section id="chatbot" className="py-10 bg-gradient-to-b from-noesis-darkest to-noesis-dark">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="section-title">Experience <span className="gradient-text">Noesis AI Assistant</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-4">
            Interact with our AI assistant to learn more about our services and how we can help your business.
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <MessageProvider>
            <ChatBot embedded={true} minimized={true} />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
