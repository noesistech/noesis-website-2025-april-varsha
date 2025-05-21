
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Bot, ArrowUp } from 'lucide-react';
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Always show the buttons, only conditionally show back-to-top based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      // Show back-to-top button when scrolled past threshold
      if (currentScrollTop > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Always show the chat button regardless of scroll
      setIsVisible(true);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Back to top button - vertically aligned above chat button */}
      <div className={cn(
        "transition-all duration-300",
        showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <Button 
          onClick={scrollToTop}
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white shadow-lg flex items-center justify-center border border-white/10"
          aria-label="Back to top"
        >
          <ArrowUp size={22} />
        </Button>
      </div>
      
      {/* Chat button - always visible */}
      <div className={cn(
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
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
    </div>
  );
};

export default FloatingChatButton;
