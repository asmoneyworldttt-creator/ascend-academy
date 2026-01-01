import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PaymentsTable from "@/components/admin/PaymentsTable";
import UsersTable from "@/components/admin/UsersTable";
import WithdrawalsTable from "@/components/admin/WithdrawalsTable";
import CourseSubmissionsTable from "@/components/admin/CourseSubmissionsTable";
import PaymentDetailModal from "@/components/admin/PaymentDetailModal";
import UserDetailModal from "@/components/admin/UserDetailModal";
import AdminNotifications from "@/components/admin/AdminNotifications";

type TabType = "dashboard" | "payments" | "users" | "courses" | "withdrawals";

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  plan_name: string;
  transaction_id: string | null;
  screenshot_url: string | null;
  status: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  };
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  has_purchased: boolean | null;
  purchased_plan: string | null;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  country: string | null;
  state: string | null;
  address: string | null;
  dob: string | null;
  pincode: string | null;
}

interface CourseSubmission {
  id: string;
  user_id: string;
  username: string;
  email: string;
  course_link: string;
  course_description: string;
  contact_number: string;
  whatsapp_number: string;
  status: string | null;
  price: number | null;
  created_at: string;
}

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  status: string | null;
  created_at: string;
  bank_details: any;
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
}

interface Notification {
  id: string;
  type: "payment" | "withdrawal" | "course";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [courseSubmissions, setCourseSubmissions] = useState<CourseSubmission[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [userPlanFilter, setUserPlanFilter] = useState("all");
  const [withdrawalStatusFilter, setWithdrawalStatusFilter] = useState("all");
  const [courseStatusFilter, setCourseStatusFilter] = useState("all");

  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const addNotification = useCallback((type: "payment" | "withdrawal" | "course", title: string, message: string) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 50));
    
    // Show toast for immediate feedback
    toast({
      title,
      description: message,
    });
  }, [toast]);

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/user-home");
        return;
      }

      setIsAdmin(true);
      fetchAllData();
    };

    checkAdminAndFetch();
  }, [user, navigate]);

  // Real-time subscriptions
  useEffect(() => {
    if (!isAdmin) return;

    console.log("Setting up realtime subscriptions...");

    // Subscribe to payments changes
    const paymentsChannel = supabase
      .channel("payments-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "payments" },
        async (payload) => {
          console.log("New payment received:", payload);
          // Fetch the payment with profile data
          const { data: newPayment } = await supabase
            .from("payments")
            .select(`*, profiles!payments_user_id_fkey(full_name, email, phone)`)
            .eq("id", payload.new.id)
            .single();
          
          if (newPayment) {
            setPayments((prev) => [newPayment as any, ...prev]);
            addNotification(
              "payment",
              "New Payment Received",
              `${(newPayment as any).profiles?.full_name || "A user"} submitted ₹${newPayment.amount} for ${newPayment.plan_name}`
            );
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "payments" },
        (payload) => {
          console.log("Payment updated:", payload);
          setPayments((prev) =>
            prev.map((p) =>
              p.id === payload.new.id ? { ...p, ...payload.new } : p
            )
          );
        }
      )
      .subscribe();

    // Subscribe to withdrawal requests changes
    const withdrawalsChannel = supabase
      .channel("withdrawals-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "withdrawal_requests" },
        async (payload) => {
          console.log("New withdrawal request received:", payload);
          const { data: newWithdrawal } = await supabase
            .from("withdrawal_requests")
            .select(`*, profiles!withdrawal_requests_user_id_fkey(full_name, email)`)
            .eq("id", payload.new.id)
            .single();
          
          if (newWithdrawal) {
            setWithdrawals((prev) => [newWithdrawal as any, ...prev]);
            addNotification(
              "withdrawal",
              "New Withdrawal Request",
              `${(newWithdrawal as any).profiles?.full_name || "A user"} requested ₹${newWithdrawal.amount}`
            );
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "withdrawal_requests" },
        (payload) => {
          console.log("Withdrawal updated:", payload);
          setWithdrawals((prev) =>
            prev.map((w) =>
              w.id === payload.new.id ? { ...w, ...payload.new } : w
            )
          );
        }
      )
      .subscribe();

    // Subscribe to course submissions changes
    const coursesChannel = supabase
      .channel("courses-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "course_submissions" },
        (payload) => {
          console.log("New course submission:", payload);
          setCourseSubmissions((prev) => [payload.new as any, ...prev]);
          addNotification(
            "course",
            "New Course Submission",
            `${(payload.new as any).username} submitted a course for review`
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "course_submissions" },
        (payload) => {
          console.log("Course submission updated:", payload);
          setCourseSubmissions((prev) =>
            prev.map((c) =>
              c.id === payload.new.id ? { ...c, ...payload.new } : c
            )
          );
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up realtime subscriptions...");
      supabase.removeChannel(paymentsChannel);
      supabase.removeChannel(withdrawalsChannel);
      supabase.removeChannel(coursesChannel);
    };
  }, [isAdmin, addNotification]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: paymentsData } = await supabase
        .from("payments")
        .select(`*, profiles!payments_user_id_fkey(full_name, email, phone)`)
        .order("created_at", { ascending: false });
      
      if (paymentsData) setPayments(paymentsData as any);

      const { data: usersData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (usersData) setUsers(usersData);

      const { data: coursesData } = await supabase
        .from("course_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (coursesData) setCourseSubmissions(coursesData);

      const { data: withdrawalsData } = await supabase
        .from("withdrawal_requests")
        .select(`*, profiles!withdrawal_requests_user_id_fkey(full_name, email)`)
        .order("created_at", { ascending: false });
      
      if (withdrawalsData) setWithdrawals(withdrawalsData as any);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const approvePayment = async (payment: Payment) => {
    try {
      const { error: paymentError } = await supabase
        .from("payments")
        .update({ status: "approved", approved_at: new Date().toISOString() })
        .eq("id", payment.id);

      if (paymentError) throw paymentError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ has_purchased: true, purchased_plan: payment.plan_name })
        .eq("user_id", payment.user_id);

      if (profileError) throw profileError;

      setPayments(payments.map(p => p.id === payment.id ? { ...p, status: "approved" } : p));
      setSelectedPayment(null);
      
      toast({ title: "Payment Approved ✓", description: "User now has access to the purchased plan." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve payment.", variant: "destructive" });
    }
  };

  const rejectPayment = async (paymentId: string) => {
    try {
      await supabase.from("payments").update({ status: "rejected" }).eq("id", paymentId);
      setPayments(payments.map(p => p.id === paymentId ? { ...p, status: "rejected" } : p));
      setSelectedPayment(null);
      toast({ title: "Payment Rejected", variant: "destructive" });
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  const approveCourse = async (courseId: string, price: number) => {
    try {
      await supabase.from("course_submissions").update({ status: "approved", price, reviewed_at: new Date().toISOString() }).eq("id", courseId);
      setCourseSubmissions(courseSubmissions.map(c => c.id === courseId ? { ...c, status: "approved", price } : c));
      toast({ title: "Course Published ✓" });
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const rejectCourse = async (courseId: string) => {
    try {
      await supabase.from("course_submissions").update({ status: "rejected", reviewed_at: new Date().toISOString() }).eq("id", courseId);
      setCourseSubmissions(courseSubmissions.map(c => c.id === courseId ? { ...c, status: "rejected" } : c));
      toast({ title: "Course Rejected", variant: "destructive" });
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const approveWithdrawal = async (withdrawalId: string) => {
    try {
      await supabase.from("withdrawal_requests").update({ status: "approved", processed_at: new Date().toISOString() }).eq("id", withdrawalId);
      setWithdrawals(withdrawals.map(w => w.id === withdrawalId ? { ...w, status: "approved" } : w));
      toast({ title: "Withdrawal Approved ✓" });
    } catch (error) {
      console.error("Error approving withdrawal:", error);
    }
  };

  const rejectWithdrawal = async (withdrawalId: string) => {
    try {
      await supabase.from("withdrawal_requests").update({ status: "rejected", processed_at: new Date().toISOString() }).eq("id", withdrawalId);
      setWithdrawals(withdrawals.map(w => w.id === withdrawalId ? { ...w, status: "rejected" } : w));
      toast({ title: "Withdrawal Rejected", variant: "destructive" });
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const pendingPayments = payments.filter(p => p.status === "pending");

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onApprove={approvePayment}
          onReject={rejectPayment}
        />
      )}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as TabType)}
        onSignOut={handleSignOut}
      />

      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-16" : "ml-64")}>
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchAllData} disabled={loading}>
                <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                Refresh
              </Button>
              <AdminNotifications
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onMarkAllAsRead={markAllNotificationsAsRead}
                onClearAll={clearAllNotifications}
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <AdminDashboard
                  payments={payments}
                  users={users}
                  withdrawals={withdrawals}
                  courseSubmissions={courseSubmissions}
                  onNavigate={(tab) => setActiveTab(tab as TabType)}
                />
              )}
              {activeTab === "payments" && (
                <PaymentsTable
                  payments={payments}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onViewPayment={setSelectedPayment}
                  onApprovePayment={approvePayment}
                  onRejectPayment={rejectPayment}
                  statusFilter={paymentStatusFilter}
                  onStatusFilterChange={setPaymentStatusFilter}
                />
              )}
              {activeTab === "users" && (
                <UsersTable
                  users={users}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  planFilter={userPlanFilter}
                  onPlanFilterChange={setUserPlanFilter}
                  onViewUser={setSelectedUser}
                />
              )}
              {activeTab === "courses" && (
                <CourseSubmissionsTable
                  courses={courseSubmissions}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onApproveCourse={approveCourse}
                  onRejectCourse={rejectCourse}
                  statusFilter={courseStatusFilter}
                  onStatusFilterChange={setCourseStatusFilter}
                />
              )}
              {activeTab === "withdrawals" && (
                <WithdrawalsTable
                  withdrawals={withdrawals}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onApproveWithdrawal={approveWithdrawal}
                  onRejectWithdrawal={rejectWithdrawal}
                  statusFilter={withdrawalStatusFilter}
                  onStatusFilterChange={setWithdrawalStatusFilter}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
