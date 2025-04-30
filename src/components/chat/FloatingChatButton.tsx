
import React from 'react';
import { Button } from '../ui/button';
import { MessageSquare, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingChatButtonProps {
  onClick: () => void;
  pulseAnimation?: boolean;
}

const FloatingChatButton = ({ onClick, pulseAnimation = true }: FloatingChatButtonProps) => {
  return (
    <div className="relative">
      {pulseAnimation && (
        <span className="absolute inset-0 rounded-full animate-ping bg-noesis-purple/50 z-0"></span>
      )}
      <Button 
        onClick={onClick}
        className={cn(
          "h-14 w-14 rounded-full bg-noesis-purple hover:bg-noesis-purple/90",
          "text-white shadow-lg flex items-center justify-center z-10",
          "relative transition-transform duration-200 hover:scale-105",
          "border-2 border-white/20"
        )}
        aria-label="Open AI Assistant"
      >
        <Bot size={24} />
      </Button>
    </div>
  );
};

export default FloatingChatButton;
