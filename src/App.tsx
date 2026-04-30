import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/ChatWidget";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/internal/ProtectedRoute";
import RouteFallback from "@/components/RouteFallback";
import Index from "./pages/Index";

// Public pages — lazy
const CamperTaxatie = lazy(() => import("./pages/CamperTaxatie"));
const MotorTaxatie = lazy(() => import("./pages/MotorTaxatie"));
const OldtimerTaxatie = lazy(() => import("./pages/OldtimerTaxatie"));
const YoungtimerTaxatie = lazy(() => import("./pages/YoungtimerTaxatie"));
const FoodtruckTaxatie = lazy(() => import("./pages/FoodtruckTaxatie"));
const Schadevaststelling = lazy(() => import("./pages/Schadevaststelling"));
const BpmVoorbereiding = lazy(() => import("./pages/BpmVoorbereiding"));
const BpmTaxatie = lazy(() => import("./pages/BpmTaxatie"));
const BpmMotorTaxatie = lazy(() => import("./pages/BpmMotorTaxatie"));
const BpmCamperTaxatie = lazy(() => import("./pages/BpmCamperTaxatie"));
const WevTaxatie = lazy(() => import("./pages/WevTaxatie"));
const WevStappenplan = lazy(() => import("./pages/WevStappenplan"));
const VerzekeringstaxatieInfo = lazy(() => import("./pages/VerzekeringstaxatieInfo"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const StappenplanBpmAangifte = lazy(() => import("./pages/StappenplanBpmAangifte"));
const CamperTaxatieStappenplan = lazy(() => import("./pages/CamperTaxatieStappenplan"));
const VerzekeringstaxatieStappenplan = lazy(() => import("./pages/VerzekeringstaxatieStappenplan"));
const Nieuws = lazy(() => import("./pages/Nieuws"));
const OverOns = lazy(() => import("./pages/OverOns"));
const CamperInformatieformulier = lazy(() => import("./pages/CamperInformatieformulier"));

// Internal pages — lazy
const Login = lazy(() => import("./pages/internal/Login"));
const Dashboard = lazy(() => import("./pages/internal/Dashboard"));
const Reports = lazy(() => import("./pages/internal/Reports"));
const Reminders = lazy(() => import("./pages/internal/Reminders"));
const Rapportage = lazy(() => import("./pages/internal/Rapportage"));
const Customers = lazy(() => import("./pages/internal/Customers"));
const CustomerDetail = lazy(() => import("./pages/internal/CustomerDetail"));
const NewReport = lazy(() => import("./pages/internal/NewReport"));
const ReportDetail = lazy(() => import("./pages/internal/ReportDetail"));
const EditReport = lazy(() => import("./pages/internal/EditReport"));
const PDFCover = lazy(() => import("./pages/internal/PDFCover"));
const PDFVehicleData = lazy(() => import("./pages/internal/PDFVehicleData"));
const PDFAppraisalFindings = lazy(() => import("./pages/internal/PDFAppraisalFindings"));
const PDFValuation = lazy(() => import("./pages/internal/PDFValuation"));
const PDFPhotos = lazy(() => import("./pages/internal/PDFPhotos"));
const PDFPreview = lazy(() => import("./pages/internal/PDFPreview"));

const queryClient = new QueryClient();

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{node}</Suspense>
);

const router = createBrowserRouter([
  // Public website routes
  { path: "/", element: <Index /> },
  { path: "/camper-taxatie", element: withSuspense(<CamperTaxatie />) },
  { path: "/motor-taxatie", element: withSuspense(<MotorTaxatie />) },
  { path: "/oldtimer-taxatie", element: withSuspense(<OldtimerTaxatie />) },
  { path: "/youngtimer-taxatie", element: withSuspense(<YoungtimerTaxatie />) },
  { path: "/foodtruck-taxatie", element: withSuspense(<FoodtruckTaxatie />) },
  { path: "/schadevaststelling", element: withSuspense(<Schadevaststelling />) },
  { path: "/bpm-voorbereiding", element: withSuspense(<BpmVoorbereiding />) },
  { path: "/bpm-taxatie", element: withSuspense(<BpmTaxatie />) },
  { path: "/bpm-motor-taxatie", element: withSuspense(<BpmMotorTaxatie />) },
  { path: "/bpm-camper-taxatie", element: withSuspense(<BpmCamperTaxatie />) },
  { path: "/wev-taxatie", element: withSuspense(<WevTaxatie />) },
  { path: "/wev-stappenplan", element: withSuspense(<WevStappenplan />) },
  { path: "/verzekeringstaxatie", element: withSuspense(<VerzekeringstaxatieInfo />) },
  { path: "/verzekeringstaxatie-info", element: <Navigate to="/verzekeringstaxatie" replace /> },
  { path: "/contact", element: withSuspense(<Contact />) },
  { path: "/faq", element: withSuspense(<FAQ />) },
  { path: "/blog", element: <Navigate to="/nieuws" replace /> },
  { path: "/stappenplan-bpm-aangifte", element: withSuspense(<StappenplanBpmAangifte />) },
  { path: "/camper-taxatie-stappenplan", element: withSuspense(<CamperTaxatieStappenplan />) },
  { path: "/camper-informatieformulier", element: withSuspense(<CamperInformatieformulier />) },
  { path: "/verzekering-stappenplan", element: withSuspense(<VerzekeringstaxatieStappenplan />) },
  { path: "/nieuws", element: withSuspense(<Nieuws />) },
  { path: "/over-ons", element: withSuspense(<OverOns />) },
  { path: "/werkwijze", element: <Navigate to="/over-ons" replace /> },

  // Internal routes - Login is public
  { path: "/intern/login", element: withSuspense(<Login />) },

  // Internal routes - Protected
  { path: "/intern/dashboard", element: withSuspense(<ProtectedRoute><Dashboard /></ProtectedRoute>) },
  { path: "/intern/rapporten", element: withSuspense(<ProtectedRoute><Reports /></ProtectedRoute>) },
  { path: "/intern/herinneringen", element: withSuspense(<ProtectedRoute><Reminders /></ProtectedRoute>) },
  { path: "/intern/rapportage", element: withSuspense(<ProtectedRoute><Rapportage /></ProtectedRoute>) },
  { path: "/intern/klanten", element: withSuspense(<ProtectedRoute><Customers /></ProtectedRoute>) },
  { path: "/intern/klanten/:id", element: withSuspense(<ProtectedRoute><CustomerDetail /></ProtectedRoute>) },
  { path: "/intern/nieuw-rapport", element: withSuspense(<ProtectedRoute><NewReport /></ProtectedRoute>) },
  { path: "/intern/rapport/:id", element: withSuspense(<ProtectedRoute><ReportDetail /></ProtectedRoute>) },
  { path: "/intern/rapport/:id/bewerken", element: withSuspense(<ProtectedRoute><EditReport /></ProtectedRoute>) },
  { path: "/intern/pdf/voorblad/:id", element: withSuspense(<ProtectedRoute><PDFCover /></ProtectedRoute>) },
  { path: "/intern/pdf/voertuiggegevens/:id", element: withSuspense(<ProtectedRoute><PDFVehicleData /></ProtectedRoute>) },
  { path: "/intern/pdf/taxateurbevindingen/:id", element: withSuspense(<ProtectedRoute><PDFAppraisalFindings /></ProtectedRoute>) },
  { path: "/intern/pdf/waarde/:id", element: withSuspense(<ProtectedRoute><PDFValuation /></ProtectedRoute>) },
  { path: "/intern/pdf/fotos/:id", element: withSuspense(<ProtectedRoute><PDFPhotos /></ProtectedRoute>) },
  { path: "/intern/pdf/preview/:id", element: withSuspense(<ProtectedRoute><PDFPreview /></ProtectedRoute>) },

  // Catch-all
  { path: "*", element: withSuspense(<NotFound />) },
]);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
          <ChatWidget />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
