
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

interface FloatingChatButtonProps {
  onClick?: () => void;
  pulseAnimation?: boolean;
}

const FloatingChatButton = ({ onClick, pulseAnimation = true }: FloatingChatButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  
  // Handle scroll behavior - hide the button when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
        // Scrolling down and past threshold - hide button
        setIsVisible(false);
      } else {
        // Scrolling up or near top - show button
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollTop);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
      return;
    }
    
    if (location.pathname === '/') {
      // If already on homepage, scroll to the chatbot section
      const chatbotElement = document.getElementById('chatbot');
      if (chatbotElement) {
        chatbotElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to homepage without using query params
      navigate('/');
      
      // Set a small timeout to wait for navigation to complete before scrolling
      setTimeout(() => {
        const chatbotElement = document.getElementById('chatbot');
        if (chatbotElement) {
          chatbotElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };
  
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 transition-all duration-300",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
    )}>
      <div className="relative">
        {pulseAnimation && (
          <span className="absolute inset-0 rounded-full animate-ping bg-noesis-purple/50 z-0"></span>
        )}
        <Button 
          onClick={handleClick}
          className={cn(
            "h-14 w-14 rounded-full bg-noesis-purple hover:bg-noesis-purple/90",
            "text-white shadow-lg flex items-center justify-center z-10",
            "relative transition-transform duration-200 hover:scale-105",
            "border-2 border-white/20"
          )}
          aria-label="Chat with AI Assistant"
        >
          <Bot size={24} />
        </Button>
      </div>
    </div>
  );
};

export default FloatingChatButton;
