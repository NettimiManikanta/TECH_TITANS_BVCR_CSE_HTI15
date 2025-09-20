import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GenderAnalysis from "./pages/GenderAnalysis";
import ParentalEducationAnalysis from "./pages/ParentalEducationAnalysis";
import TestPrepAnalysis from "./pages/TestPrepAnalysis";
import RawDataViewer from "./pages/RawDataViewer";
import NotFound from "./pages/NotFound";
import ParentDashboard from "./pages/ParentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/gender-analysis" element={<GenderAnalysis />} />
          <Route path="/admin/parental-education-analysis" element={<ParentalEducationAnalysis />} />
          <Route path="/admin/test-prep-analysis" element={<TestPrepAnalysis />} />
          <Route path="/admin/raw-data" element={<RawDataViewer />} />
          <Route path="/parent-dashboard" element={<ParentDashboard/>} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard/>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
