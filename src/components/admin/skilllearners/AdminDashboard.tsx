import {
  Users,
  UserCheck,
  UserX,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Package,
  CheckSquare,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalWallet: number;
  totalIncome: number;
  referralIncome: number;
  levelIncome: number;
  globalIncome: number;
  totalWithdrawal: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
  pendingTasks: number;
  unreadMessages: number;
  pendingPackages: number;
  pendingCourseRequests: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
  onNavigate: (tab: string) => void;
}

const AdminDashboard = ({ stats, onNavigate }: AdminDashboardProps) => {
  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Inactive Students",
      value: stats.inactiveStudents,
      icon: UserX,
      color: "from-amber-500 to-amber-600",
      trend: "-5%",
      trendUp: false,
    },
    {
      title: "Total Wallet",
      value: `₹${stats.totalWallet.toLocaleString()}`,
      icon: Wallet,
      color: "from-purple-500 to-purple-600",
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Total Income",
      value: `₹${stats.totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-primary to-gold-dark",
      trend: "+22%",
      trendUp: true,
    },
    {
      title: "Total Withdrawal",
      value: `₹${stats.totalWithdrawal.toLocaleString()}`,
      icon: ArrowUpRight,
      color: "from-rose-500 to-rose-600",
      trend: "+10%",
      trendUp: true,
    },
  ];

  const pendingActions = [
    {
      title: "Package Requests",
      count: stats.pendingPackages,
      icon: Package,
      tab: "package-requests",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Course Requests",
      count: stats.pendingCourseRequests,
      icon: BookOpen,
      tab: "course-requests",
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Deposit Requests",
      count: stats.pendingDeposits,
      icon: ArrowDownRight,
      tab: "deposit-requests",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Withdrawal Requests",
      count: stats.pendingWithdrawals,
      icon: ArrowUpRight,
      tab: "withdrawal-requests",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      title: "Task Verification",
      count: stats.pendingTasks,
      icon: CheckSquare,
      tab: "task-verification",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Unread Messages",
      count: stats.unreadMessages,
      icon: MessageSquare,
      tab: "messages",
      color: "text-rose-500 bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10">
        <h1 className="text-2xl font-bold font-display mb-2">
          Welcome to <span className="text-gradient-gold">Skill Learners</span> Admin
        </h1>
        <p className="text-muted-foreground">
          Manage your platform, students, courses, and transactions from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-5 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Pending Actions */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Pending Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pendingActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.tab)}
              className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center group"
            >
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2", action.color)}>
                <action.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                {action.count}
              </p>
              <p className="text-xs text-muted-foreground">{action.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-lg font-bold font-display mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => onNavigate("create-task")}>
            Create New Task
          </Button>
          <Button variant="outline" onClick={() => onNavigate("courses")}>
            Add New Course
          </Button>
          <Button variant="outline" onClick={() => onNavigate("products")}>
            Add Product
          </Button>
          <Button variant="outline" onClick={() => onNavigate("ads")}>
            Post New Ad
          </Button>
          <Button variant="outline" onClick={() => onNavigate("payment-settings")}>
            Update Payment Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;