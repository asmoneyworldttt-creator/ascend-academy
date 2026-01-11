import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Loader2, Bell, Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

import AdminSidebar from "@/components/admin/skilllearners/AdminSidebar";
import AdminDashboard from "@/components/admin/skilllearners/AdminDashboard";
import UserListTable from "@/components/admin/skilllearners/UserListTable";
import UserActions from "@/components/admin/skilllearners/UserActions";
import PaymentSettings from "@/components/admin/skilllearners/PaymentSettings";
import CourseRequestsApproval from "@/components/admin/skilllearners/CourseRequestsApproval";
import IncomeManagement from "@/components/admin/moneyworld/IncomeManagement";
import WalletManagement from "@/components/admin/moneyworld/WalletManagement";
import TaskManagement from "@/components/admin/moneyworld/TaskManagement";
import TaskCompletion from "@/components/admin/moneyworld/TaskCompletion";
import CoursesManagement from "@/components/admin/moneyworld/CoursesManagement";
import ProductsManagement from "@/components/admin/moneyworld/ProductsManagement";
import AdsManagement from "@/components/admin/moneyworld/AdsManagement";
import BankDetailsView from "@/components/admin/moneyworld/BankDetailsView";
import MessagesManagement from "@/components/admin/moneyworld/MessagesManagement";
import AdminProfile from "@/components/admin/moneyworld/AdminProfile";
import PackagePurchaseApproval from "@/components/admin/moneyworld/PackagePurchaseApproval";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type TabType = 
  | "dashboard" 
  | "all-students" 
  | "active-students" 
  | "inactive-students"
  | "course-only-students"
  | "package-requests"
  | "course-requests"
  | "level-income"
  | "global-income"
  | "referral-income"
  | "other-income"
  | "deposit-requests"
  | "withdrawal-requests"
  | "wallet-history"
  | "adjust-balance"
  | "create-task"
  | "task-verification"
  | "courses"
  | "products"
  | "ads"
  | "bank-details"
  | "messages"
  | "payment-settings"
  | "profile"
  | "block-student"
  | "delete-student";

interface Notification {
  id: string;
  type: "payment" | "withdrawal" | "task" | "message";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const MoneyWorldAdmin = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    inactiveAgents: 0,
    totalWallet: 0,
    totalIncome: 0,
    referralIncome: 0,
    levelIncome: 0,
    globalIncome: 0,
    totalWithdrawal: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    pendingTasks: 0,
    unreadMessages: 0,
    pendingPackages: 0,
  });

  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const addNotification = useCallback((type: Notification["type"], title: string, message: string) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 50));
    
    toast({
      title,
      description: message,
    });
  }, [toast]);

  // Check admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate("/admin-login");
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
      fetchStats();
    };

    checkAdminAccess();
  }, [user, navigate, toast]);

  // Fetch dashboard stats
  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, count: totalAgents } = await supabase
        .from("profiles")
        .select("*", { count: "exact" });

      const activeAgents = profiles?.filter(p => p.status !== 'inactive' && p.status !== 'blocked').length || 0;
      const inactiveAgents = profiles?.filter(p => p.status === 'inactive' || p.status === 'blocked').length || 0;

      // Fetch wallet totals
      const { data: walletData } = await supabase
        .from("agent_income")
        .select("wallet, total_income");
      
      const totalWallet = walletData?.reduce((sum, w) => sum + Number(w.wallet || 0), 0) || 0;
      const totalIncome = walletData?.reduce((sum, w) => sum + Number(w.total_income || 0), 0) || 0;

      // Fetch income by type
      const { data: walletHistory } = await supabase
        .from("wallet_history")
        .select("amount, description, status");

      const referralIncome = walletHistory
        ?.filter(w => w.description?.toLowerCase().includes('referral') && w.status === 'credit')
        .reduce((sum, w) => sum + Number(w.amount || 0), 0) || 0;

      const levelIncome = walletHistory
        ?.filter(w => w.description?.toLowerCase().includes('level') && w.status === 'credit')
        .reduce((sum, w) => sum + Number(w.amount || 0), 0) || 0;

      const globalIncome = walletHistory
        ?.filter(w => w.description?.toLowerCase().includes('global') && w.status === 'credit')
        .reduce((sum, w) => sum + Number(w.amount || 0), 0) || 0;

      const totalWithdrawal = walletHistory
        ?.filter(w => w.status === 'debit')
        .reduce((sum, w) => sum + Number(w.amount || 0), 0) || 0;

      // Fetch pending counts
      const { count: pendingDeposits } = await supabase
        .from("payment_proofs")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: pendingWithdrawals } = await supabase
        .from("withdrawal_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: pendingWhatsAppTasks } = await supabase
        .from("completed_whatsapp_tasks")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "pending");

      const { count: pendingAppTasks } = await supabase
        .from("completed_app_tasks")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "pending");

      const { count: unreadMessages } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      const { count: pendingPackages } = await supabase
        .from("package_purchase_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      setStats({
        totalAgents: totalAgents || 0,
        activeAgents,
        inactiveAgents,
        totalWallet,
        totalIncome,
        referralIncome,
        levelIncome,
        globalIncome,
        totalWithdrawal,
        pendingDeposits: pendingDeposits || 0,
        pendingWithdrawals: pendingWithdrawals || 0,
        pendingTasks: (pendingWhatsAppTasks || 0) + (pendingAppTasks || 0),
        unreadMessages: unreadMessages || 0,
        pendingPackages: pendingPackages || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  // Real-time subscriptions
  useEffect(() => {
    if (!isAdmin) return;

    const paymentsChannel = supabase
      .channel("admin-payments")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "payment_proofs" }, 
        (payload) => {
          addNotification("payment", "New Deposit Request", `New deposit of ₹${payload.new.amount} received`);
          fetchStats();
        }
      )
      .subscribe();

    const withdrawalsChannel = supabase
      .channel("admin-withdrawals")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "withdrawal_requests" },
        (payload) => {
          addNotification("withdrawal", "New Withdrawal Request", `Withdrawal of ₹${payload.new.amount} requested`);
          fetchStats();
        }
      )
      .subscribe();

    const messagesChannel = supabase
      .channel("admin-messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          addNotification("message", "New Message", `New message from ${payload.new.name}`);
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentsChannel);
      supabase.removeChannel(withdrawalsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [isAdmin, addNotification]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard stats={stats} onNavigate={setActiveTab} />;
      case "agents":
        return <AgentListTable filter="all" />;
      case "active-agents":
        return <AgentListTable filter="active" />;
      case "inactive-agents":
        return <AgentListTable filter="inactive" />;
      case "package-approvals":
        return <PackagePurchaseApproval onRefresh={fetchStats} />;
      case "level-income":
        return <IncomeManagement type="level" />;
      case "global-income":
        return <IncomeManagement type="global" />;
      case "referral-income":
        return <IncomeManagement type="referral" />;
      case "other-income":
        return <IncomeManagement type="other" />;
      case "add-money":
        return <WalletManagement mode="add" onRefresh={fetchStats} />;
      case "withdraw-money":
        return <WalletManagement mode="withdraw" onRefresh={fetchStats} />;
      case "wallet-history":
        return <WalletManagement mode="history" onRefresh={fetchStats} />;
      case "withdrawal-history":
        return <WalletManagement mode="withdrawal-history" onRefresh={fetchStats} />;
      case "increase-decrease":
        return <WalletManagement mode="adjust" onRefresh={fetchStats} />;
      case "add-task":
        return <TaskManagement />;
      case "task-completion":
        return <TaskCompletion onRefresh={fetchStats} />;
      case "courses":
        return <CoursesManagement />;
      case "products":
        return <ProductsManagement />;
      case "ads":
        return <AdsManagement />;
      case "bank-details":
        return <BankDetailsView />;
      case "messages":
        return <MessagesManagement onRefresh={fetchStats} />;
      case "profile":
        return <AdminProfile />;
      case "block-agent":
        return <AgentActions mode="block" onRefresh={fetchStats} />;
      case "delete-agent":
        return <AgentActions mode="delete" onRefresh={fetchStats} />;
      default:
        return <AdminDashboard stats={stats} onNavigate={setActiveTab} />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<TabType, string> = {
      dashboard: "Dashboard",
      agents: "All Users",
      "active-agents": "Active Users",
      "inactive-agents": "Inactive Users",
      "package-approvals": "Package Approvals",
      "level-income": "Level Income",
      "global-income": "Global Income",
      "referral-income": "Referral Income",
      "other-income": "Other Income",
      "add-money": "Add Money",
      "withdraw-money": "Withdraw Money",
      "wallet-history": "Wallet History",
      "withdrawal-history": "Withdrawal History",
      "increase-decrease": "Adjust Balance",
      "add-task": "Task Management",
      "task-completion": "Task Completion",
      courses: "Courses Management",
      products: "Products",
      ads: "Ads Management",
      "bank-details": "Bank Details",
      messages: "Messages",
      profile: "Admin Profile",
      "block-agent": "Block Agent",
      "delete-agent": "Delete Agent",
    };
    return titles[activeTab] || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab as TabType);
          setMobileSidebarOpen(false);
        }}
        onSignOut={handleSignOut}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        pendingCounts={{
          deposits: stats.pendingDeposits,
          withdrawals: stats.pendingWithdrawals,
          tasks: stats.pendingTasks,
          messages: stats.unreadMessages,
          packages: stats.pendingPackages,
        }}
      />

      {/* Main content */}
      <main className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{getPageTitle()}</h1>
                <p className="text-sm text-muted-foreground">Skill Learners Admin Panel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchStats} 
                disabled={loading}
                className="hidden sm:flex"
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                Refresh
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "p-3 border-b last:border-0 hover:bg-muted/50 cursor-pointer",
                            !n.read && "bg-primary/5"
                          )}
                          onClick={() => {
                            setNotifications(prev => 
                              prev.map(notif => 
                                notif.id === n.id ? { ...notif, read: true } : notif
                              )
                            );
                          }}
                        >
                          <p className="font-medium text-sm">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {n.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-6">
          {loading && activeTab === "dashboard" ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default MoneyWorldAdmin;