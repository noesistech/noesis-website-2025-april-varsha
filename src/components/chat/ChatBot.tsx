
import React, { useState, useEffect } from 'react';
import { useMessageContext } from '@/contexts/MessageContext';
import Dropzone from './Dropzone';
import { toast } from 'sonner';
import FloatingChatButton from './FloatingChatButton';
import ChatContainer from './ChatContainer';
import useChatSetup from '@/hooks/useChatSetup';
import useChatWebSocket from '@/hooks/useChatWebSocket';

interface ChatBotProps {
  embedded?: boolean;
  minimized?: boolean;
}

const ChatBot = ({ embedded = false, minimized = false }: ChatBotProps) => {
  const { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    messageStreaming, 
    setMessageStreaming, 
    chatId,
    connectWebsocket,
  } = useMessageContext();
  
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!minimized);
  
  // Initialize chat setup (bot info, chat history, etc.)
  useChatSetup();
  
  // Set up WebSocket connection
  const { sendMessage, readyState, wsConnected } = useChatWebSocket();
  
  const handleMessageSend = (text: string) => {
    if (isTyping || messageStreaming || !text.trim()) {
      return;
    }
    
    // Expand the chat interface if it's minimized
    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    setHasInteracted(true);
    
    // Add user message to the chat
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Set typing indicators
    setIsTyping(true);
    setMessageStreaming(true);
    
    // Send message via WebSocket
    const success = sendMessage(text);
    
    if (!success) {
      // Fallback if WebSocket is not connected
      toast.error("Connection issues. Please try again.");
      setIsTyping(false);
      setMessageStreaming(false);
    }
  };
  
  const handlePromptClick = (text: string) => {
    handleMessageSend(text);
  };
  
  const handleDrop = (files: File[]) => {
    toast.info(`File functionality has been disabled.`);
  };

  // Embedded chat UI
  if (embedded) {
    return (
      <div className="w-full h-full">
        <Dropzone onDrop={handleDrop}>
          <ChatContainer
            handlePromptClick={handlePromptClick}
            handleMessageSend={handleMessageSend}
            handleDrop={handleDrop}
            embedded={true}
            minimized={minimized}
          />
        </Dropzone>
      </div>
    );
  }
  
  // Floating chat UI - just showing the button that navigates to homepage chatbot section
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FloatingChatButton pulseAnimation={!hasInteracted} />
    </div>
  );
};

export default ChatBot;
