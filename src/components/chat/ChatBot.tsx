
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
}

const ChatBot = ({ embedded = false }: ChatBotProps) => {
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
  
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize chat setup (bot info, chat history, etc.)
  useChatSetup();
  
  // Set up WebSocket connection
  const { sendMessage, readyState, wsConnected } = useChatWebSocket();
  
  const handleMessageSend = (text: string) => {
    if (isTyping || messageStreaming || !text.trim()) {
      console.log("Message not sent due to conditions:", { isTyping, messageStreaming, emptyText: !text.trim() });
      return;
    }
    
    // Add user message to the chat
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Set typing indicators
    setIsTyping(true);
    setMessageStreaming(true);
    
    // Send message via WebSocket
    console.log("Attempting to send message:", text, "WebSocket ready state:", readyState);
    const success = sendMessage(text);
    
    if (!success) {
      // Fallback if WebSocket is not connected
      toast.error("Connection issues. Please try again.");
      setIsTyping(false);
      setMessageStreaming(false);
    }
  };
  
  const handlePromptClick = (text: string) => {
    console.log("Prompt clicked:", text, "WebSocket connected:", wsConnected);
    handleMessageSend(text);
  };
  
  const handleDrop = (files: File[]) => {
    toast.info(`File functionality has been disabled.`);
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Log WebSocket status changes for debugging
  useEffect(() => {
    console.log("WebSocket ready state changed:", readyState, "Connected:", wsConnected, "ChatId:", chatId);
  }, [readyState, wsConnected, chatId]);

  // Embedded chat UI
  if (embedded) {
    return (
      <div className="w-full">
        <Dropzone onDrop={handleDrop}>
          <ChatContainer
            handlePromptClick={handlePromptClick}
            handleMessageSend={handleMessageSend}
            handleDrop={handleDrop}
            embedded={true}
          />
        </Dropzone>
      </div>
    );
  }
  
  // Floating chat UI
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FloatingChatButton pulseAnimation={true} />
    </div>
  );
};

export default ChatBot;
