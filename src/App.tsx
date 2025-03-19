
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentPage from "@/pages/ContentPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { ContentProvider } from "@/contexts/ContentContext";
import NotFound from "./pages/NotFound";

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
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ContentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ContentProvider>
    </QueryClientProvider>
  );
}

export default App;
