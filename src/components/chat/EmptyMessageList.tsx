
import React from 'react';
import { useMessageContext } from '@/contexts/MessageContext';

interface EmptyMessageListProps {
  handleSuggestionClick: (text: string) => void;
}

const EmptyMessageList = ({ handleSuggestionClick }: EmptyMessageListProps) => {
  const { prompts, connectionStatus } = useMessageContext();

  const defaultPrompts = [
    "What services does Noesis offer?",
    "How can I join the Noesis team?",
    "I'm interested in partnering with Noesis",
    "Tell me about your AI & Cloud solutions",
    "How can I contact the team?",
    "What makes Noesis different?",
    "Show me recent success stories"
  ];

  // Make sure we always have prompts to display
  const displayPrompts = prompts && prompts.length > 0 ? prompts : defaultPrompts;

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

  return (
    <div className="flex flex-col h-full justify-center items-center px-4 py-6">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold mb-2">Get Started</h4>
        <p className="text-white/70 text-sm">Ask me anything about Noesis.tech's services or AI solutions</p>
      </div>
      
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(getPromptText(prompt))}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-left text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={connectionStatus !== 'connected'}
          >
            {getPromptText(prompt)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyMessageList;
