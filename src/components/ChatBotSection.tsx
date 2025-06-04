import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';
const ChatBotSection: React.FC = () => {
  return <section id="chatbot" className="page-section bg-gradient-to-b from-gray-900/90 to-noesis-dark/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="section-title">
            Chat with <span className="text-noesis-purple">Neo, our homegrown AI agent</span>
          </h2>
          <p className="section-subtitle">Powered by Brainstormer technology,
Neo is available 24/7 to help answer your questions and assist with your inquiries.</p>
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
    </section>;
};
export default ChatBotSection;