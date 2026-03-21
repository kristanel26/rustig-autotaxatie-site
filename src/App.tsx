import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/ChatWidget";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
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
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import StappenplanBpmAangifte from "./pages/StappenplanBpmAangifte";
import CamperTaxatieStappenplan from "./pages/CamperTaxatieStappenplan";
import Nieuws from "./pages/Nieuws";
import OverOns from "./pages/OverOns";

// Internal pages
import Login from "./pages/internal/Login";
import Dashboard from "./pages/internal/Dashboard";
import Reports from "./pages/internal/Reports";
import Reminders from "./pages/internal/Reminders";
import Rapportage from "./pages/internal/Rapportage";
import Customers from "./pages/internal/Customers";
import CustomerDetail from "./pages/internal/CustomerDetail";
import NewReport from "./pages/internal/NewReport";
import ReportDetail from "./pages/internal/ReportDetail";
import EditReport from "./pages/internal/EditReport";
import PDFCover from "./pages/internal/PDFCover";
import PDFVehicleData from "./pages/internal/PDFVehicleData";
import PDFAppraisalFindings from "./pages/internal/PDFAppraisalFindings";
import PDFValuation from "./pages/internal/PDFValuation";
import PDFPhotos from "./pages/internal/PDFPhotos";
import PDFPreview from "./pages/internal/PDFPreview";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Public website routes
  { path: "/", element: <Index /> },
  { path: "/camper-taxatie", element: <CamperTaxatie /> },
  { path: "/motor-taxatie", element: <MotorTaxatie /> },
  { path: "/oldtimer-taxatie", element: <OldtimerTaxatie /> },
  { path: "/youngtimer-taxatie", element: <YoungtimerTaxatie /> },
  { path: "/foodtruck-taxatie", element: <FoodtruckTaxatie /> },
  { path: "/bpm-voorbereiding", element: <BpmVoorbereiding /> },
  { path: "/bpm-taxatie", element: <BpmTaxatie /> },
  { path: "/bpm-motor-taxatie", element: <BpmMotorTaxatie /> },
  { path: "/bpm-camper-taxatie", element: <BpmCamperTaxatie /> },
  { path: "/wev-taxatie", element: <WevTaxatie /> },
  { path: "/verzekeringstaxatie-info", element: <VerzekeringstaxatieInfo /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blog", element: <Blog /> },
  { path: "/stappenplan-bpm-aangifte", element: <StappenplanBpmAangifte /> },
  { path: "/camper-taxatie-stappenplan", element: <CamperTaxatieStappenplan /> },
  { path: "/nieuws", element: <Nieuws /> },
  { path: "/over-ons", element: <OverOns /> },
  { path: "/werkwijze", element: <Navigate to="/over-ons" replace /> },
  
  // Internal routes - Login is public
  { path: "/intern/login", element: <Login /> },
  
  // Internal routes - Protected
  {
    path: "/intern/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/intern/rapporten",
    element: <ProtectedRoute><Reports /></ProtectedRoute>,
  },
  {
    path: "/intern/herinneringen",
    element: <ProtectedRoute><Reminders /></ProtectedRoute>,
  },
  {
    path: "/intern/rapportage",
    element: <ProtectedRoute><Rapportage /></ProtectedRoute>,
  },
  {
    path: "/intern/klanten",
    element: <ProtectedRoute><Customers /></ProtectedRoute>,
  },
  {
    path: "/intern/klanten/:id",
    element: <ProtectedRoute><CustomerDetail /></ProtectedRoute>,
  },
  {
    path: "/intern/nieuw-rapport",
    element: <ProtectedRoute><NewReport /></ProtectedRoute>,
  },
  {
    path: "/intern/rapport/:id",
    element: <ProtectedRoute><ReportDetail /></ProtectedRoute>,
  },
  {
    path: "/intern/rapport/:id/bewerken",
    element: <ProtectedRoute><EditReport /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/voorblad/:id",
    element: <ProtectedRoute><PDFCover /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/voertuiggegevens/:id",
    element: <ProtectedRoute><PDFVehicleData /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/taxateurbevindingen/:id",
    element: <ProtectedRoute><PDFAppraisalFindings /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/waarde/:id",
    element: <ProtectedRoute><PDFValuation /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/fotos/:id",
    element: <ProtectedRoute><PDFPhotos /></ProtectedRoute>,
  },
  {
    path: "/intern/pdf/preview/:id",
    element: <ProtectedRoute><PDFPreview /></ProtectedRoute>,
  },
  
  // Catch-all
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
