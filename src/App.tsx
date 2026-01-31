import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CamperTaxatie from "./pages/CamperTaxatie";
import MotorTaxatie from "./pages/MotorTaxatie";
import BpmVoorbereiding from "./pages/BpmVoorbereiding";
import BpmTaxatie from "./pages/BpmTaxatie";
import WevTaxatie from "./pages/WevTaxatie";
import VerzekeringstaxatieInfo from "./pages/VerzekeringstaxatieInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/camper-taxatie" element={<CamperTaxatie />} />
          <Route path="/motor-taxatie" element={<MotorTaxatie />} />
          <Route path="/bpm-voorbereiding" element={<BpmVoorbereiding />} />
          <Route path="/bpm-taxatie" element={<BpmTaxatie />} />
          <Route path="/wev-taxatie" element={<WevTaxatie />} />
          <Route path="/verzekeringstaxatie-info" element={<VerzekeringstaxatieInfo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
