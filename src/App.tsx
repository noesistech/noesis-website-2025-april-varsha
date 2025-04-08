
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentPage from "@/pages/ContentPage";
import Index from "@/pages/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ContentProvider } from "@/contexts/ContentContext";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorDisplay } from "./components/ui/error";

// Error boundary wrapper component with proper TypeScript interface
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryWrapper extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { 
    hasError: false, 
    error: null 
  };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("React Error Boundary caught an error:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorDisplay message={this.state.error?.message || "An unexpected error occurred"} />;
    }
    
    return this.props.children;
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <ErrorBoundaryWrapper>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Index />
                </Suspense>
              } />
              <Route path="/content" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ContentPage />
                </Suspense>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </ErrorBoundaryWrapper>
      </ContentProvider>
    </QueryClientProvider>
  );
}

export default App;
