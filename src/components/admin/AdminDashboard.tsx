import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  CreditCard,
  DollarSign,
  BookOpen,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  payments: any[];
  users: any[];
  withdrawals: any[];
  courseSubmissions: any[];
  onNavigate: (tab: string) => void;
}

export const AdminDashboard = ({
  payments,
  users,
  withdrawals,
  courseSubmissions,
  onNavigate,
}: AdminDashboardProps) => {
  const pendingPayments = payments.filter((p) => p.status === "pending");
  const approvedPayments = payments.filter((p) => p.status === "approved");
  const rejectedPayments = payments.filter((p) => p.status === "rejected");
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending");
  const pendingCourses = courseSubmissions.filter((c) => c.status === "pending");
  const activeUsers = users.filter((u) => u.has_purchased);

  const totalRevenue = approvedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingValue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingWithdrawalValue = pendingWithdrawals.reduce(
    (sum, w) => sum + w.amount,
    0
  );

  // Recent activity
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl font-bold mb-2">Welcome to Admin Control Center 🎛️</h1>
          <p className="text-muted-foreground">
            Manage payments, users, and course submissions all in one place.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald" />
          </div>
          <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-orange-500">
              {pendingPayments.length} pending
            </span>
          </div>
          <p className="text-2xl font-bold">₹{pendingValue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-emerald">
              {activeUsers.length} active
            </span>
          </div>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-500">
              {pendingWithdrawals.length} requests
            </span>
          </div>
          <p className="text-2xl font-bold">₹{pendingWithdrawalValue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate("payments")}
          className={cn(
            "glass-card p-5 rounded-2xl text-left transition-all duration-300",
            pendingPayments.length > 0
              ? "ring-2 ring-orange-500/30 hover:ring-orange-500/50"
              : "hover:shadow-elevated"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold">Payment Requests</p>
                <p className="text-sm text-muted-foreground">Review & approve</p>
              </div>
            </div>
            {pendingPayments.length > 0 && (
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold">
                {pendingPayments.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-primary text-sm font-medium mt-2">
            Manage Payments <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => onNavigate("courses")}
          className={cn(
            "glass-card p-5 rounded-2xl text-left transition-all duration-300",
            pendingCourses.length > 0
              ? "ring-2 ring-accent/30 hover:ring-accent/50"
              : "hover:shadow-elevated"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-teal-dark flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold">Course Submissions</p>
                <p className="text-sm text-muted-foreground">Review & publish</p>
              </div>
            </div>
            {pendingCourses.length > 0 && (
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
                {pendingCourses.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-accent text-sm font-medium mt-2">
            Review Courses <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => onNavigate("withdrawals")}
          className={cn(
            "glass-card p-5 rounded-2xl text-left transition-all duration-300",
            pendingWithdrawals.length > 0
              ? "ring-2 ring-purple-500/30 hover:ring-purple-500/50"
              : "hover:shadow-elevated"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold">Withdrawal Requests</p>
                <p className="text-sm text-muted-foreground">Process payments</p>
              </div>
            </div>
            {pendingWithdrawals.length > 0 && (
              <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm font-bold">
                {pendingWithdrawals.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-purple-500 text-sm font-medium mt-2">
            Process Withdrawals <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Payment Activity
          </h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("payments")}>
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {recentPayments.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              No recent payment activity
            </p>
          ) : (
            recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="font-bold text-primary-foreground text-sm">
                      {((payment as any).profiles?.full_name || "U").charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {(payment as any).profiles?.full_name || "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.plan_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald">
                    ₹{payment.amount.toLocaleString()}
                  </span>
                  {payment.status === "pending" && (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                  {payment.status === "approved" && (
                    <CheckCircle className="w-4 h-4 text-emerald" />
                  )}
                  {payment.status === "rejected" && (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
