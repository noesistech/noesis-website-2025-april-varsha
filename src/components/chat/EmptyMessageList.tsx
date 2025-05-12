
import React from 'react';
import { useMessageContext } from '@/contexts/MessageContext';

interface EmptyMessageListProps {
  handleSuggestionClick: (text: string) => void;
}

const EmptyMessageList = ({ handleSuggestionClick }: EmptyMessageListProps) => {
  const { prompts, connectionStatus, bot } = useMessageContext();

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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 text-white">Welcome to Noesis AI Assistant</h3>
        <p className="text-white/70 mb-4">Choose a question below to start your conversation, or type your own question</p>
        
        {bot && bot.description && (
          <div className="bg-white/10 p-4 rounded-lg mb-6 max-w-lg mx-auto">
            <p className="text-white/90 text-sm">{bot.description}</p>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(getPromptText(prompt))}
            className="p-3 bg-white/10 hover:bg-noesis-purple/50 hover:scale-[1.02] rounded-lg text-left text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
