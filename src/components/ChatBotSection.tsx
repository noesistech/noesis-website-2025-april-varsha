
import React from 'react';
import ChatBot from './chat/ChatBot';
import { MessageProvider } from '@/contexts/MessageContext';
import { useMessageContext } from '@/contexts/MessageContext';

const ChatBotSection: React.FC = () => {
  const { messages } = useMessageContext();
  const hasMessages = messages.length > 1;
  
  return (
    <section id="chatbot" className="py-12 sm:py-20 bg-gradient-to-b from-gray-900/90 to-noesis-dark/80 pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="section-title">
            Chat with Our <span className="text-noesis-purple">AI Assistant</span>
          </h2>
          <p className="section-subtitle">
            Have questions? Our AI assistant is available 24/7 to help answer your inquiries.
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
