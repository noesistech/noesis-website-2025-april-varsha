
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
}

const ChatContainer = ({ 
  handlePromptClick, 
  handleMessageSend, 
  handleDrop,
  onClose,
  embedded = false
}: ChatContainerProps) => {
  const { messages } = useMessageContext();
  const initialMsg = messages?.length > 1 ;

  return (
    <div className={`transition-all duration-500 ease-in-out ${messages.length > 1 ? 'max-w-full' : 'max-w-4xl'} mx-auto relative bg-gradient-to-b from-noesis-dark to-noesis-darker border border-noesis-purple/30 rounded-lg shadow-lg ${embedded ? 'w-full' : 'w-full max-w-4xl h-[600px]'} flex flex-col overflow-hidden ${!embedded ? 'animate-fade-in' : ''}`}>
      <ChatHeader 
        title="Neo AI Assistant" 
        onClose={onClose}
        showCloseButton={!embedded}
      />
      
      <div className="flex-1 overflow-auto flex flex-col">
        <div className={`${embedded ? '' : 'flex-1'} overflow-auto`} onClick={(e) => e.stopPropagation()}>
          {messages.length > 1 ? (
            <Messages handlePromptClick={handlePromptClick} />
          ) : (
            <EmptyMessageList handleSuggestionClick={handlePromptClick} />
          )}
        </div>
        <div className="p-3 bg-noesis-darker/100 absolute bottom-0 w-full pb-0" onClick={(e) => e.stopPropagation()}>
          <MessageInput 
            sendMessage={handleMessageSend} 
            handlePromptClick={handlePromptClick}
            initialMsg={initialMsg} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
