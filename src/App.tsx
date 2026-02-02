import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/internal/ProtectedRoute";
import Index from "./pages/Index";
import CamperTaxatie from "./pages/CamperTaxatie";
import MotorTaxatie from "./pages/MotorTaxatie";
import OldtimerTaxatie from "./pages/OldtimerTaxatie";
import YoungtimerTaxatie from "./pages/YoungtimerTaxatie";
import FoodtruckTaxatie from "./pages/FoodtruckTaxatie";
import BpmVoorbereiding from "./pages/BpmVoorbereiding";
import BpmTaxatie from "./pages/BpmTaxatie";
import BpmMotorTaxatie from "./pages/BpmMotorTaxatie";
import BpmCamperTaxatie from "./pages/BpmCamperTaxatie";
import WevTaxatie from "./pages/WevTaxatie";
import VerzekeringstaxatieInfo from "./pages/VerzekeringstaxatieInfo";
import NotFound from "./pages/NotFound";

// Internal pages
import Login from "./pages/internal/Login";
import Dashboard from "./pages/internal/Dashboard";
import Reports from "./pages/internal/Reports";
import NewReport from "./pages/internal/NewReport";
import ReportDetail from "./pages/internal/ReportDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public website routes */}
            <Route path="/" element={<Index />} />
            <Route path="/camper-taxatie" element={<CamperTaxatie />} />
            <Route path="/motor-taxatie" element={<MotorTaxatie />} />
            <Route path="/oldtimer-taxatie" element={<OldtimerTaxatie />} />
            <Route path="/youngtimer-taxatie" element={<YoungtimerTaxatie />} />
            <Route path="/foodtruck-taxatie" element={<FoodtruckTaxatie />} />
            <Route path="/bpm-voorbereiding" element={<BpmVoorbereiding />} />
            <Route path="/bpm-taxatie" element={<BpmTaxatie />} />
            <Route path="/bpm-motor-taxatie" element={<BpmMotorTaxatie />} />
            <Route path="/bpm-camper-taxatie" element={<BpmCamperTaxatie />} />
            <Route path="/wev-taxatie" element={<WevTaxatie />} />
            <Route path="/verzekeringstaxatie-info" element={<VerzekeringstaxatieInfo />} />
            
            {/* Internal routes - Login is public */}
            <Route path="/intern/login" element={<Login />} />
            
            {/* Internal routes - Protected */}
            <Route
              path="/intern/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/intern/rapporten"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/intern/nieuw-rapport"
              element={
                <ProtectedRoute>
                  <NewReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/intern/rapport/:id"
              element={
                <ProtectedRoute>
                  <ReportDetail />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
