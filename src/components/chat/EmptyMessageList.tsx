
import React from 'react';
import { useMessageContext } from '@/contexts/MessageContext';

interface EmptyMessageListProps {
  handleSuggestionClick: (text: string) => void;
}

const EmptyMessageList = ({ handleSuggestionClick }: EmptyMessageListProps) => {
  const { prompts, connectWebsocket } = useMessageContext();

  const defaultPrompts = [
    "What AI services do you offer?",
    "How can AI improve my business processes?",
    "Tell me about your tech stack",
    "What makes Noesis different from other agencies?"
  ];

  const displayPrompts = prompts && prompts.length > 0 ? prompts.slice(0, 4) : defaultPrompts;

  return (
    <div className="flex flex-col h-full justify-center items-center px-4">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold mb-2">Get Started</h4>
        <p className="text-white/70">Ask me anything about Noesis.tech's services or AI solutions</p>
      </div>
      
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(prompt)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!connectWebsocket}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyMessageList;
