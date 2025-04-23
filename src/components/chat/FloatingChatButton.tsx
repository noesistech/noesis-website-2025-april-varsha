
import React from 'react';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-noesis-purple hover:bg-noesis-purple/90 text-white shadow-lg flex items-center justify-center"
    >
      <MessageSquare size={24} />
    </Button>
  );
};

export default FloatingChatButton;
