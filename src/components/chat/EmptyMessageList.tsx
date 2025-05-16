
import React from 'react';
import { useMessageContext } from '@/contexts/MessageContext';

interface EmptyMessageListProps {
  handleSuggestionClick: (text: string) => void;
}

const EmptyMessageList = ({ handleSuggestionClick }: EmptyMessageListProps) => {
  const { prompts, connectWebsocket, connectionStatus } = useMessageContext();

  const defaultPrompts = [
    "What services does Noesis offer?",
    "How can I join the Noesis team?",
    "I'm interested in partnering with Noesis",
    "Tell me about your AI & Cloud solutions"
  ];

  const displayPrompts = prompts && prompts.length > 0 ? prompts.slice(0, 4) : defaultPrompts;

  return (
    <div className="flex flex-col !h-[450px] justify-start items-center px-4 pt-6 pb-20 !overflow-auto thin-y-scrollbar sm:pt-14 sm:pb-12">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold mb-2">Welcome</h4>
        <p className="text-white/70">Choose a question below to start your conversation, or type your own question</p>
      </div>
      
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(typeof prompt === "object" && prompt ? prompt["Question"] : prompt)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={connectionStatus!="connected"}
          >
            {typeof prompt === "object" && prompt ? prompt["Question"] : prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyMessageList;