import { useState } from "react";
import { Link } from "react-router-dom";
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
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// Mock pending payments
const mockPendingPayments = [
  { 
    id: "PAY001", 
    userId: "3T123456", 
    userName: "John Doe", 
    email: "john@example.com",
    phone: "+91 98765 43210",
    plan: "Digital Marketing Pro", 
    amount: 4499, 
    transactionId: "UPI123456789",
    screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    date: "2024-01-15 10:30 AM",
    status: "pending"
  },
  { 
    id: "PAY002", 
    userId: "3T789012", 
    userName: "Priya Sharma", 
    email: "priya@example.com",
    phone: "+91 87654 32109",
    plan: "Business & Commerce", 
    amount: 2800, 
    transactionId: "UPI987654321",
    screenshot: null,
    date: "2024-01-15 09:15 AM",
    status: "pending"
  },
  { 
    id: "PAY003", 
    userId: "3T345678", 
    userName: "Rahul Kumar", 
    email: "rahul@example.com",
    phone: "+91 76543 21098",
    plan: "Financial Trading Expert", 
    amount: 8599, 
    transactionId: "UPI456789123",
    screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    date: "2024-01-14 04:45 PM",
    status: "pending"
  },
];

// Mock pending tasks
const mockPendingTasks = [
  { 
    id: "TASK001", 
    userId: "3T123456", 
    userName: "John Doe",
    taskType: "WhatsApp Status",
    proof: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    reward: 50,
    date: "2024-01-15 11:00 AM",
    status: "pending"
  },
  { 
    id: "TASK002", 
    userId: "3T789012", 
    userName: "Priya Sharma",
    taskType: "App Install",
    proof: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    reward: 100,
    date: "2024-01-15 08:30 AM",
    status: "pending"
  },
];

// Mock users
const mockUsers = [
  { id: "3T123456", name: "John Doe", email: "john@example.com", plan: "Gold", status: "active", joinDate: "2024-01-01" },
  { id: "3T789012", name: "Priya Sharma", email: "priya@example.com", plan: null, status: "pending", joinDate: "2024-01-10" },
  { id: "3T345678", name: "Rahul Kumar", email: "rahul@example.com", plan: "Diamond", status: "active", joinDate: "2024-01-05" },
  { id: "3T901234", name: "Ananya Patel", email: "ananya@example.com", plan: "Silver", status: "active", joinDate: "2024-01-08" },
];

type TabType = "payments" | "tasks" | "users";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>("payments");
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState(mockPendingPayments);
  const [tasks, setTasks] = useState(mockPendingTasks);
  const [selectedPayment, setSelectedPayment] = useState<typeof mockPendingPayments[0] | null>(null);
  const { toast } = useToast();

  const approvePayment = (paymentId: string) => {
    setPayments(payments.filter(p => p.id !== paymentId));
    setSelectedPayment(null);
    toast({
      title: "Payment Approved ✓",
      description: "User now has access to the purchased plan.",
    });
  };

  const rejectPayment = (paymentId: string) => {
    setPayments(payments.filter(p => p.id !== paymentId));
    setSelectedPayment(null);
    toast({
      title: "Payment Rejected",
      description: "User has been notified of the rejection.",
      variant: "destructive",
    });
  };

  const approveTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast({
      title: "Task Approved ✓",
      description: "Reward credited to user wallet.",
    });
  };

  const tabs = [
    { id: "payments" as TabType, label: "Payment Verification", icon: CreditCard, count: payments.length },
    { id: "tasks" as TabType, label: "Task Approval", icon: ClipboardList, count: tasks.length },
    { id: "users" as TabType, label: "User Management", icon: Users, count: mockUsers.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/user-home" className="p-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage payments, tasks & users</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
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
                <p className="text-2xl font-bold">{payments.length}</p>
                <p className="text-xs text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasks.length}</p>
                <p className="text-xs text-muted-foreground">Pending Tasks</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(payments.reduce((sum, p) => sum + p.amount, 0)).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Pending Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'
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
              placeholder="Search by name, ID, or transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {activeTab === "payments" && (
            <div className="divide-y divide-border">
              {payments.length === 0 ? (
                <div className="p-12 text-center">
                  <Check className="w-12 h-12 text-emerald mx-auto mb-4" />
                  <h3 className="font-bold mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground text-sm">No pending payments to verify.</p>
                </div>
              ) : (
                payments.map((payment) => (
                  <div key={payment.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                          <span className="font-bold text-primary-foreground">{payment.userName.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold">{payment.userName}</p>
                            <span className="text-xs text-muted-foreground">({payment.userId})</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{payment.plan}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg font-medium">
                              ₹{payment.amount.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">UTR: {payment.transactionId}</span>
                            <span className="text-muted-foreground">{payment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => rejectPayment(payment.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-emerald hover:bg-emerald/90"
                          onClick={() => approvePayment(payment.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="divide-y divide-border">
              {tasks.length === 0 ? (
                <div className="p-12 text-center">
                  <Check className="w-12 h-12 text-emerald mx-auto mb-4" />
                  <h3 className="font-bold mb-2">No Pending Tasks</h3>
                  <p className="text-muted-foreground text-sm">All tasks have been reviewed.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {task.proof && (
                          <img 
                            src={task.proof} 
                            alt="Task proof" 
                            className="w-16 h-16 rounded-xl object-cover border border-border"
                          />
                        )}
                        <div>
                          <p className="font-bold">{task.userName}</p>
                          <p className="text-sm text-muted-foreground">{task.taskType}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="px-2 py-1 bg-emerald/10 text-emerald rounded-lg font-medium">
                              +₹{task.reward}
                            </span>
                            <span className="text-muted-foreground">{task.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-emerald hover:bg-emerald/90"
                          onClick={() => approveTask(task.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">User</th>
                    <th className="text-left p-4 font-medium text-sm">Email</th>
                    <th className="text-left p-4 font-medium text-sm">Plan</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                    <th className="text-left p-4 font-medium text-sm">Joined</th>
                    <th className="text-left p-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                            <span className="font-bold text-primary-foreground text-sm">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="p-4">
                        {user.plan ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                            {user.plan}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-emerald/10 text-emerald' 
                            : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button onClick={() => setSelectedPayment(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">{selectedPayment.userName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedPayment.userName}</p>
                  <p className="text-muted-foreground">{selectedPayment.userId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">Plan</p>
                  <p className="font-medium">{selectedPayment.plan}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-bold text-primary">₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{selectedPayment.email}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedPayment.phone}</p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground">Transaction ID / UTR</p>
                <p className="font-mono font-medium">{selectedPayment.transactionId}</p>
              </div>

              {selectedPayment.screenshot && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Payment Screenshot</p>
                  <img 
                    src={selectedPayment.screenshot} 
                    alt="Payment proof" 
                    className="w-full rounded-xl border border-border"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => rejectPayment(selectedPayment.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  className="flex-1 bg-emerald hover:bg-emerald/90"
                  onClick={() => approvePayment(selectedPayment.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;