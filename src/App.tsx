
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import FinanceiroModule from "./pages/modules/FinanceiroModule";
import ValuationModule from "./pages/modules/ValuationModule";
import MacroeconomicoModule from "./pages/modules/MacroeconomicoModule";
import MercadoModule from "./pages/modules/MercadoModule";
import ModelagemModule from "./pages/modules/ModelagemModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check if we're running in production (GitHub Pages)
const isGitHubPages = import.meta.env.MODE === 'production';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isGitHubPages ? (
          // Use HashRouter for GitHub Pages to handle routing correctly
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/financeiro" element={<FinanceiroModule />} />
              <Route path="/valuation" element={<ValuationModule />} />
              <Route path="/macroeconomico" element={<MacroeconomicoModule />} />
              <Route path="/mercado" element={<MercadoModule />} />
              <Route path="/modelagem" element={<ModelagemModule />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        ) : (
          // Use BrowserRouter for development
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/financeiro" element={<FinanceiroModule />} />
              <Route path="/valuation" element={<ValuationModule />} />
              <Route path="/macroeconomico" element={<MacroeconomicoModule />} />
              <Route path="/mercado" element={<MercadoModule />} />
              <Route path="/modelagem" element={<ModelagemModule />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
