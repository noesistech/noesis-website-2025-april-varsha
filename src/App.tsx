
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
