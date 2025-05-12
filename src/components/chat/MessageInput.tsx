import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Send, WifiOff, RefreshCw } from 'lucide-react';
import { useMessageContext } from '@/contexts/MessageContext';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MessageInputProps {
  sendMessage: (text: string) => void;
  handlePromptClick: (text: string) => void;
  customPrompts?: string[];
}

const MessageInput = ({ sendMessage, handlePromptClick, customPrompts = [] }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const { 
    isTyping, 
    messageStreaming,
    connectWebsocket,
    chatId,
    prompts,
    connectionStatus,
    setReconnectionAttempts,
    setConnectWebsocket
  } = useMessageContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Helper function to extract prompt text safely
  const getPromptText = (prompt: string | { Question?: string; question?: string; [key: string]: any }): string => {
    if (typeof prompt === 'string') {
      return prompt;
    }
    
    if (prompt && typeof prompt === 'object') {
      return prompt.Question || prompt.question || JSON.stringify(prompt);
    }
    
    return "What can I help you with?";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !isTyping && !messageStreaming) {
      if (connectionStatus !== 'connected') {
        toast.error("Connection not established. Please wait for reconnection or try refreshing the page.");
        return;
      }
      
      sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } else if (!message.trim()) {
      toast.error("Please enter a message");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea but limit height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleManualReconnect = () => {
    // Reset reconnection attempts and try to reconnect
    setReconnectionAttempts(0);
    setConnectWebsocket(false);
    setTimeout(() => setConnectWebsocket(true), 1000);
    toast.info("Attempting to reconnect...");
  };

  const isDisabled = isTyping || messageStreaming || connectionStatus !== 'connected';
  const buttonClass = message.trim() && !isDisabled 
    ? 'bg-noesis-purple text-white'
    : 'bg-gray-800/50 text-gray-500';

  // Determine which prompts to display
  const displayPrompts = customPrompts.length > 0 
    ? customPrompts 
    : prompts && prompts.length > 0 
      ? prompts.slice(0, 4) 
      : [
          "What AI services do you offer?",
          "How can AI improve my business processes?",
          "Tell me about your tech stack",
          "What makes Noesis different from other agencies?"
        ];

  return (
    <div className="relative">
      {(!message || message.length < 2) && displayPrompts.length > 0 && (
        <div className="thin-scrollbar flex overflow-x-auto gap-2 px-1 py-2 mb-2">
          <div className="flex gap-2">
            {displayPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(getPromptText(prompt))}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs whitespace-nowrap text-white/90 transition-colors"
                disabled={isDisabled}
              >
                {getPromptText(prompt)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-700/50 px-0 py-2">
        <div className="relative flex items-end rounded-lg bg-white/10 p-2">
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent border-0 resize-none px-2 py-1 focus:outline-none text-white thin-y-scrollbar"
            placeholder={
              connectionStatus === 'disconnected' 
                ? "Connection lost. Please wait..." 
                : connectionStatus === 'connecting' 
                ? "Reconnecting to chat service..." 
                : "Ask anything about Noesis.tech's services or AI solutions..."
            }
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ maxHeight: '100px' }}
            disabled={isDisabled}
          />
          
          {connectionStatus === 'disconnected' ? (
            <button 
              onClick={handleManualReconnect}
              className="p-2 rounded-full bg-amber-600 hover:bg-amber-700 ml-2 flex-shrink-0 transition-colors"
              aria-label="Reconnect"
              title="Try to reconnect"
            >
              <RefreshCw size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSend}
              disabled={!message.trim() || isDisabled}
              className={`p-2 rounded-full ${buttonClass} ml-2 flex-shrink-0 transition-colors`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          )}
        </div>
        
        {connectionStatus !== 'connected' && (
          <div className={`flex items-center text-xs mt-1 px-2 ${
            connectionStatus === 'disconnected' ? 'text-red-400' : 'text-amber-400'
          }`}>
            {connectionStatus === 'disconnected' ? (
              <>
                <WifiOff size={12} className="mr-1" />
                Connection lost. Attempting to reconnect...
              </>
            ) : (
              <>
                <RefreshCw size={12} className="mr-1 animate-spin" />
                Connecting to chat service...
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
