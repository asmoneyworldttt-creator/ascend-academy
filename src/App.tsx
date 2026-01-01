import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AIChatbot from "@/components/AIChatbot";

// Lazy load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserHome = lazy(() => import("./pages/UserHome"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliateDashboard"));
const UserCourses = lazy(() => import("./pages/UserCourses"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));
const PaymentGateway = lazy(() => import("./pages/PaymentGateway"));
const LearnersPage = lazy(() => import("./pages/affiliate/LearnersPage"));
const IncomeReportPage = lazy(() => import("./pages/affiliate/IncomeReportPage"));
const WalletPage = lazy(() => import("./pages/affiliate/WalletPage"));
const LeaderboardPage = lazy(() => import("./pages/affiliate/LeaderboardPage"));
const TasksPage = lazy(() => import("./pages/affiliate/TasksPage"));
const ProfilePage = lazy(() => import("./pages/affiliate/ProfilePage"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const SubmitCoursePage = lazy(() => import("./pages/affiliate/SubmitCoursePage"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />
              <Route path="/payment" element={<PaymentGateway />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
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
              <Route path="/dashboard/submit-course" element={
                <ProtectedRoute>
                  <SubmitCoursePage />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <AIChatbot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
