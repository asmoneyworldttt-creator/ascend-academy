import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/UserHome";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import UserCourses from "./pages/UserCourses";
import RegistrationSuccess from "./pages/RegistrationSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/dashboard/affiliate" element={<AffiliateDashboard />} />
          <Route path="/dashboard/courses" element={<UserCourses />} />
          <Route path="/dashboard/wallet" element={<UserHome />} />
          <Route path="/dashboard/profile" element={<UserHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
