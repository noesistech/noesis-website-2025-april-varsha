
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import FloatingChatButton from './components/chat/FloatingChatButton';
import { MessageProvider } from './contexts/MessageContext';

// Handle URL parameters and scrolling
const AppContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check for hash navigation to the chat section - only if hash exists
    if (location.hash === '#chatbot') {
      setTimeout(() => {
        const chatbotSection = document.getElementById('chatbot');
        if (chatbotSection) {
          chatbotSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Small delay to ensure the section is loaded
    }
  }, [location.hash]); // Only trigger when hash changes, not on every location change
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      {/* Floating Chat Button - appears on all pages */}
      <FloatingChatButton />
    </>
  );
};

function App() {
  return (
    <Router>
      <MessageProvider>
        <ScrollToTop />
        <AppContent />
        <Toaster />
      </MessageProvider>
    </Router>
  );
}

export default App;
