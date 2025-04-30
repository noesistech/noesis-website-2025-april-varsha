
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import ChatBot from './components/chat/ChatBot';
import { MessageProvider } from './contexts/MessageContext';

function App() {
  return (
    <Router>
      <MessageProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        {/* Floating Chat Button - appears on all pages */}
        <ChatBot />
        
        <Toaster />
      </MessageProvider>
    </Router>
  );
}

export default App;
