
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Send, WifiOff, RefreshCw } from 'lucide-react';
import { useMessageContext } from '@/contexts/MessageContext';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MessageInputProps {
  sendMessage: (text: string) => void;
  handlePromptClick: (text: string) => void;
  initialMsg: boolean;
}

const MessageInput = ({ sendMessage, handlePromptClick, initialMsg }: MessageInputProps) => {
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
      
      console.log("Sending message:", message);
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
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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

  const displayPrompts = prompts && prompts.length > 0 
    ? prompts.slice(0, 4) 
    : [
      "What services does Noesis offer?",
      "How can I join the Noesis team?",
      "I'm interested in partnering with Noesis",
      "Tell me about your AI & Cloud solutions"
    ];

  return (
    <div className="relative">
     
      {(!message || message.length < 2) && (displayPrompts.length > 0 && displayPrompts.some(p => (p && p["Question"])))  &&  initialMsg && (
        
        <div className="thin-scrollbar absolute -top-12 left-0 right-0 flex overflow-auto gap-2 px-2 py-2 z-10 bg-noesis-darker/95 backdrop-blur-md rounded border-noesis-purple/30 shadow-lg mb-4">
         {displayPrompts.map((prompt, index) => 
            <button
              key={index}
              onClick={() => handlePromptClick(typeof prompt === "object" && prompt ? prompt["Question"] : prompt)}
              className="px-3 pt-[4px] py-[6px] bg-white/10 hover:bg-white/20 rounded-full text-sm sm:text-md text-white/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDisabled && messageStreaming}
            >
              {typeof prompt === "object" && prompt ? prompt["Question"] : prompt}
            </button>
          )}
        </div>
      )}
      
      <div className="border-t border-gray-700/50 px-0 py-3 sm:p-3 sm:px-0">
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
            disabled={isDisabled && messageStreaming}
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
