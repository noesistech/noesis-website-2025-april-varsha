
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';
import PageTransition from './components/PageTransition';

// Wrapper component to apply transitions
const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

export default App;
