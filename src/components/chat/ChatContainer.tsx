
import React from 'react';
import { useMessageContext } from '@/contexts/MessageContext';
import Messages from './Messages';
import MessageInput from './MessageInput';
import EmptyMessageList from './EmptyMessageList';
import ChatHeader from './ChatHeader';

interface ChatContainerProps {
  handlePromptClick: (text: string) => void;
  handleMessageSend: (text: string) => void;
  handleDrop: (files: File[]) => void;
  onClose?: () => void;
  embedded?: boolean;
  minimized?: boolean;
}

const ChatContainer = ({ 
  handlePromptClick, 
  handleMessageSend, 
  handleDrop,
  onClose,
  embedded = false,
  minimized = false
}: ChatContainerProps) => {
  const { messages, hasInteracted } = useMessageContext();

  return (
    <div className={`bg-gradient-to-b from-noesis-dark to-noesis-darker border border-noesis-purple/30 rounded-lg shadow-lg ${embedded ? 'w-full h-full' : 'w-full max-w-5xl h-[600px]'} flex flex-col overflow-hidden ${!embedded ? 'animate-fade-in' : ''}`}>
      {!minimized && (
        <ChatHeader 
          title="Noesis AI Assistant" 
          onClose={onClose}
          showCloseButton={!embedded}
        />
      )}
      
      <div className="flex-1 overflow-hidden flex flex-col">
        {!minimized && hasInteracted && messages.length > 0 ? (
          <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Messages handlePromptClick={handlePromptClick} />
          </div>
        ) : !minimized ? (
          <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <EmptyMessageList 
              handleSuggestionClick={handlePromptClick} 
              handleMessageSend={handleMessageSend}
            />
          </div>
        ) : null}
        
        {/* Message input is only visible when minimized or when user has already interacted */}
        {minimized && (
          <div className={`p-3 bg-noesis-darker/50 ${minimized ? 'rounded-lg' : ''}`} onClick={(e) => e.stopPropagation()}>
            <MessageInput 
              sendMessage={handleMessageSend} 
              handlePromptClick={handlePromptClick}
              customPrompts={[
                "What services does Noesis offer?",
                "How can I join the Noesis team?",
                "I'm interested in partnering with Noesis",
                "Tell me about your AI & Cloud solutions",
                "How can I contact the team?",
                "What makes Noesis different?",
                "Show me recent success stories"
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
