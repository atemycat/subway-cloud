import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Index from "./pages/Index";
import GamePage from "./pages/GamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle refresh redirects
const RefreshHandler = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the page was refreshed
    const pageAccessedByReload = (
      (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance.getEntriesByType('navigation').some(nav => (nav as any).type === 'reload')
    );

    // If it was refreshed and we're not on the homepage, redirect to main domain
    if (pageAccessedByReload && location.pathname !== '/') {
      window.location.href = 'https://subwaysurfgames.com';
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RefreshHandler>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RefreshHandler>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;