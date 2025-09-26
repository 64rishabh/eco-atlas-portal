import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AtlasPage from "./pages/AtlasPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FileClaimPage from "./pages/FileClaimPage";
import AssetMappingPage from "./pages/AssetMappingPage";
import DecisionSupportPage from "./pages/DecisionSupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/atlas" element={<AtlasPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/file-claim" element={<FileClaimPage />} />
          <Route path="/asset-mapping" element={<AssetMappingPage />} />
          <Route path="/decision-support" element={<DecisionSupportPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
