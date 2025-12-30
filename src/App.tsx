import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/UserHome";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import UserCourses from "./pages/UserCourses";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import PaymentGateway from "./pages/PaymentGateway";
import LearnersPage from "./pages/affiliate/LearnersPage";
import IncomeReportPage from "./pages/affiliate/IncomeReportPage";
import WalletPage from "./pages/affiliate/WalletPage";
import LeaderboardPage from "./pages/affiliate/LeaderboardPage";
import TasksPage from "./pages/affiliate/TasksPage";
import ProfilePage from "./pages/affiliate/ProfilePage";
import AdminPanel from "./pages/admin/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/payment" element={<PaymentGateway />} />
            
            {/* Protected Routes */}
            <Route path="/user-home" element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/affiliate" element={
              <ProtectedRoute>
                <AffiliateDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/courses" element={
              <ProtectedRoute>
                <UserCourses />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/learners" element={
              <ProtectedRoute>
                <LearnersPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/income/:type" element={
              <ProtectedRoute>
                <IncomeReportPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/wallet" element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/leaderboard" element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/tasks" element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
