import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Search,
  Check,
  X,
  Eye,
  Clock,
  Users,
  CreditCard,
  ClipboardList,
  RefreshCw,
  Filter,
  ChevronDown,
  BookOpen,
  DollarSign,
  Settings,
  FileText,
  Loader2,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

type TabType = "payments" | "users" | "courses" | "withdrawals";

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
}

interface CourseSubmission {
  id: string;
  user_id: string;
  username: string;
  email: string;
  course_link: string;
  course_description: string;
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
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>("payments");
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [courseSubmissions, setCourseSubmissions] = useState<CourseSubmission[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check admin status and fetch data
  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      // Check if user is admin
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

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch pending payments with profiles
      const { data: paymentsData } = await supabase
        .from("payments")
        .select(`*, profiles!payments_user_id_fkey(full_name, email, phone)`)
        .order("created_at", { ascending: false });
      
      if (paymentsData) setPayments(paymentsData as any);

      // Fetch all users
      const { data: usersData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (usersData) setUsers(usersData);

      // Fetch course submissions
      const { data: coursesData } = await supabase
        .from("course_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (coursesData) setCourseSubmissions(coursesData);

      // Fetch withdrawals
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
      // Update payment status
      const { error: paymentError } = await supabase
        .from("payments")
        .update({ status: "approved", approved_at: new Date().toISOString() })
        .eq("id", payment.id);

      if (paymentError) throw paymentError;

      // Update user profile to mark as purchased
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          has_purchased: true, 
          purchased_plan: payment.plan_name 
        })
        .eq("user_id", payment.user_id);

      if (profileError) throw profileError;

      setPayments(payments.map(p => 
        p.id === payment.id ? { ...p, status: "approved" } : p
      ));
      setSelectedPayment(null);
      
      toast({
        title: "Payment Approved ✓",
        description: "User now has access to the purchased plan.",
      });
    } catch (error) {
      console.error("Error approving payment:", error);
      toast({
        title: "Error",
        description: "Failed to approve payment.",
        variant: "destructive",
      });
    }
  };

  const rejectPayment = async (paymentId: string) => {
    try {
      const { error } = await supabase
        .from("payments")
        .update({ status: "rejected" })
        .eq("id", paymentId);

      if (error) throw error;

      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, status: "rejected" } : p
      ));
      setSelectedPayment(null);
      
      toast({
        title: "Payment Rejected",
        description: "User has been notified of the rejection.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  const approveCourse = async (courseId: string, price: number) => {
    try {
      const { error } = await supabase
        .from("course_submissions")
        .update({ status: "approved", price, reviewed_at: new Date().toISOString() })
        .eq("id", courseId);

      if (error) throw error;

      setCourseSubmissions(courseSubmissions.map(c => 
        c.id === courseId ? { ...c, status: "approved", price } : c
      ));
      
      toast({
        title: "Course Approved ✓",
        description: "Course has been published to Top Courses.",
      });
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const approveWithdrawal = async (withdrawalId: string) => {
    try {
      const { error } = await supabase
        .from("withdrawal_requests")
        .update({ status: "approved", processed_at: new Date().toISOString() })
        .eq("id", withdrawalId);

      if (error) throw error;

      setWithdrawals(withdrawals.map(w => 
        w.id === withdrawalId ? { ...w, status: "approved" } : w
      ));
      
      toast({
        title: "Withdrawal Approved ✓",
        description: "Payment will be processed.",
      });
    } catch (error) {
      console.error("Error approving withdrawal:", error);
    }
  };

  const pendingPayments = payments.filter(p => p.status === "pending");
  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");
  const pendingCourses = courseSubmissions.filter(c => c.status === "pending");
  const totalPendingValue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const activeUsers = users.filter(u => u.has_purchased);

  const tabs = [
    { id: "payments" as TabType, label: "Payments", icon: CreditCard, count: pendingPayments.length },
    { id: "users" as TabType, label: "Users", icon: Users, count: users.length },
    { id: "courses" as TabType, label: "Course Submissions", icon: BookOpen, count: pendingCourses.length },
    { id: "withdrawals" as TabType, label: "Withdrawals", icon: DollarSign, count: pendingWithdrawals.length },
  ];

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
      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedPayment(null)} />
          <div className="relative glass-card rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Payment Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{(selectedPayment as any).profiles?.full_name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{(selectedPayment as any).profiles?.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium">{selectedPayment.plan_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-primary">₹{selectedPayment.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">UTR/Transaction ID:</span>
                <span className="font-medium">{selectedPayment.transaction_id || "N/A"}</span>
              </div>
              {selectedPayment.screenshot_url && (
                <div>
                  <p className="text-muted-foreground mb-2">Payment Screenshot:</p>
                  <img src={selectedPayment.screenshot_url} alt="Payment proof" className="w-full rounded-xl border" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="destructive" className="flex-1" onClick={() => rejectPayment(selectedPayment.id)}>
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
              <Button className="flex-1 bg-emerald hover:bg-emerald/90" onClick={() => approvePayment(selectedPayment)}>
                <Check className="w-4 h-4 mr-1" /> Approve
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/user-home" className="p-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Complete Management Control</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAllData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingPayments.length}</p>
                <p className="text-xs text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeUsers.length}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalPendingValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Pending Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-foreground/20' : 'bg-primary/10 text-primary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="divide-y divide-border">
                  {pendingPayments.length === 0 ? (
                    <div className="p-12 text-center">
                      <Check className="w-12 h-12 text-emerald mx-auto mb-4" />
                      <h3 className="font-bold mb-2">All Caught Up!</h3>
                      <p className="text-muted-foreground text-sm">No pending payments to verify.</p>
                    </div>
                  ) : (
                    pendingPayments
                      .filter(p => 
                        (p as any).profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (p as any).profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((payment) => (
                        <div key={payment.id} className="p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                                <span className="font-bold text-foreground">
                                  {((payment as any).profiles?.full_name || "U").charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold">{(payment as any).profiles?.full_name || "Unknown"}</p>
                                <p className="text-sm text-muted-foreground">{payment.plan_name}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg font-medium">
                                    ₹{payment.amount.toLocaleString()}
                                  </span>
                                  <span className="text-muted-foreground">UTR: {payment.transaction_id || "N/A"}</span>
                                  <span className="text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                                <Eye className="w-4 h-4 mr-1" /> View
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => rejectPayment(payment.id)}>
                                <X className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-emerald hover:bg-emerald/90" onClick={() => approvePayment(payment)}>
                                <Check className="w-4 h-4 mr-1" /> Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-sm">User</th>
                        <th className="text-left p-4 font-medium text-sm">Email</th>
                        <th className="text-left p-4 font-medium text-sm">Phone</th>
                        <th className="text-left p-4 font-medium text-sm">Plan</th>
                        <th className="text-left p-4 font-medium text-sm">Referral Code</th>
                        <th className="text-left p-4 font-medium text-sm">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users
                        .filter(u => 
                          u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((profile) => (
                          <tr key={profile.id} className="hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                                  <span className="font-bold text-foreground text-sm">
                                    {(profile.full_name || "U").charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{profile.full_name || "Unknown"}</p>
                                  <p className="text-xs text-muted-foreground">{profile.country || "N/A"}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{profile.email}</td>
                            <td className="p-4 text-sm text-muted-foreground">{profile.phone || "N/A"}</td>
                            <td className="p-4">
                              {profile.has_purchased ? (
                                <span className="px-2 py-1 bg-emerald/10 text-emerald rounded-lg text-xs font-medium">
                                  {profile.purchased_plan}
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded-lg text-xs font-medium">
                                  Free
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-sm font-mono">{profile.referral_code}</td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(profile.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Course Submissions Tab */}
              {activeTab === "courses" && (
                <div className="divide-y divide-border">
                  {pendingCourses.length === 0 ? (
                    <div className="p-12 text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-bold mb-2">No Course Submissions</h3>
                      <p className="text-muted-foreground text-sm">No courses waiting for review.</p>
                    </div>
                  ) : (
                    pendingCourses.map((course) => (
                      <div key={course.id} className="p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-bold">{course.username}</p>
                            <p className="text-sm text-muted-foreground">{course.email}</p>
                            <a href={course.course_link} target="_blank" rel="noopener noreferrer" 
                               className="text-primary text-sm hover:underline">
                              {course.course_link}
                            </a>
                            <p className="text-sm mt-2">{course.course_description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              placeholder="Price ₹" 
                              className="w-24"
                              id={`price-${course.id}`}
                            />
                            <Button size="sm" className="bg-emerald hover:bg-emerald/90"
                              onClick={() => {
                                const priceInput = document.getElementById(`price-${course.id}`) as HTMLInputElement;
                                const price = parseFloat(priceInput?.value || "0");
                                if (price > 0) {
                                  approveCourse(course.id, price);
                                }
                              }}
                            >
                              <Check className="w-4 h-4 mr-1" /> Publish
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Withdrawals Tab */}
              {activeTab === "withdrawals" && (
                <div className="divide-y divide-border">
                  {pendingWithdrawals.length === 0 ? (
                    <div className="p-12 text-center">
                      <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-bold mb-2">No Pending Withdrawals</h3>
                      <p className="text-muted-foreground text-sm">All withdrawals have been processed.</p>
                    </div>
                  ) : (
                    pendingWithdrawals.map((withdrawal) => (
                      <div key={withdrawal.id} className="p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-bold">{(withdrawal as any).profiles?.full_name || "Unknown"}</p>
                            <p className="text-sm text-muted-foreground">{(withdrawal as any).profiles?.email}</p>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                              ₹{withdrawal.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="destructive" size="sm">
                              <X className="w-4 h-4 mr-1" /> Reject
                            </Button>
                            <Button size="sm" className="bg-emerald hover:bg-emerald/90"
                              onClick={() => approveWithdrawal(withdrawal.id)}
                            >
                              <Check className="w-4 h-4 mr-1" /> Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;