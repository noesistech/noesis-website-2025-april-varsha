
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  return (
    <section id="chatbot" className="page-section bg-gradient-to-b from-gray-900/90 to-noesis-dark/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="section-title">
            Chat with <span className="text-noesis-purple">Neo, our homegrown AI agent</span>
          </h2>
          <p className="flex items-center justify-center gap-2 mb-0 text-center text-gray-300 max-w-2xl mx-auto text-lg">
            Powered by <img src="/lovable-uploads/24e53c8a-718d-4f88-a554-d21b1d882516.png" alt="Brainstormer" className="h-16" />
          </p>
          <p className="section-subtitle mt-2">
            Neo is available 24/7 to help answer your questions and assist with your inquiries.
          </p>
        </div>

        <div className="mx-auto" style={{
          minHeight: '500px',
          maxHeight: '700px'
        }}>
          <MessageProvider>
            <ChatBot embedded={true} />
          </MessageProvider>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
