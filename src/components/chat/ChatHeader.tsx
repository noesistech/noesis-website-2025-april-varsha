
import React from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const ChatHeader = ({ title, onClose, showCloseButton = false }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-noesis-purple/10 px-4 py-3 border-b border-noesis-purple/30">
      <h3 className="font-medium text-white">{title}</h3>
      {showCloseButton && onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white/70 hover:text-white"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
