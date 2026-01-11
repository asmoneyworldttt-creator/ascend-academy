import {
  Users,
  UserCheck,
  UserX,
  Wallet,
  TrendingUp,
  Share2,
  Globe,
  ArrowDownToLine,
  Clock,
  Plus,
  Minus,
  ClipboardList,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TabType } from "@/pages/admin/MoneyWorldAdmin";

interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
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
}

interface MoneyWorldDashboardProps {
  stats: DashboardStats;
  onNavigate: (tab: TabType) => void;
}

const MoneyWorldDashboard = ({ stats, onNavigate }: MoneyWorldDashboardProps) => {
  const statCards = [
    {
      label: "Total Agents",
      value: stats.totalAgents,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      color: "text-blue-500",
      onClick: () => onNavigate("agents"),
    },
    {
      label: "Active Agents",
      value: stats.activeAgents,
      icon: UserCheck,
      gradient: "from-emerald-500 to-emerald-600",
      color: "text-emerald-500",
      onClick: () => onNavigate("active-agents"),
    },
    {
      label: "Inactive Agents",
      value: stats.inactiveAgents,
      icon: UserX,
      gradient: "from-red-500 to-red-600",
      color: "text-red-500",
      onClick: () => onNavigate("inactive-agents"),
    },
    {
      label: "Total Wallet",
      value: `₹${stats.totalWallet.toLocaleString()}`,
      icon: Wallet,
      gradient: "from-amber-500 to-amber-600",
      color: "text-amber-500",
      onClick: () => onNavigate("wallet-history"),
    },
    {
      label: "Total Income",
      value: `₹${stats.totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      color: "text-green-500",
    },
    {
      label: "Referral Income",
      value: `₹${stats.referralIncome.toLocaleString()}`,
      icon: Share2,
      gradient: "from-purple-500 to-purple-600",
      color: "text-purple-500",
      onClick: () => onNavigate("referral-income"),
    },
    {
      label: "Level Income",
      value: `₹${stats.levelIncome.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-600",
      color: "text-indigo-500",
      onClick: () => onNavigate("level-income"),
    },
    {
      label: "Global Income",
      value: `₹${stats.globalIncome.toLocaleString()}`,
      icon: Globe,
      gradient: "from-cyan-500 to-cyan-600",
      color: "text-cyan-500",
      onClick: () => onNavigate("global-income"),
    },
    {
      label: "Total Withdrawals",
      value: `₹${stats.totalWithdrawal.toLocaleString()}`,
      icon: ArrowDownToLine,
      gradient: "from-rose-500 to-rose-600",
      color: "text-rose-500",
      onClick: () => onNavigate("withdrawal-history"),
    },
  ];

  const quickActions = [
    {
      label: "Pending Deposits",
      count: stats.pendingDeposits,
      icon: Plus,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      ringColor: "ring-amber-500/30",
      onClick: () => onNavigate("add-money"),
    },
    {
      label: "Pending Withdrawals",
      count: stats.pendingWithdrawals,
      icon: Minus,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      ringColor: "ring-rose-500/30",
      onClick: () => onNavigate("withdraw-money"),
    },
    {
      label: "Pending Tasks",
      count: stats.pendingTasks,
      icon: ClipboardList,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      ringColor: "ring-purple-500/30",
      onClick: () => onNavigate("task-completion"),
    },
    {
      label: "Unread Messages",
      count: stats.unreadMessages,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      ringColor: "ring-blue-500/30",
      onClick: () => onNavigate("messages"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome to MoneyWorld Admin 🎛️
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Manage your agents, income, wallets, tasks, and more from this centralized control panel.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={cn(
              "glass-card p-4 rounded-2xl text-left transition-all duration-300 hover:shadow-elevated",
              action.count > 0 && `ring-2 ${action.ringColor}`
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.bgColor)}>
                <action.icon className={cn("w-5 h-5", action.color)} />
              </div>
              {action.count > 0 && (
                <span className={cn("text-2xl font-bold", action.color)}>
                  {action.count}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground">{action.label}</p>
            <div className={cn("flex items-center gap-1 text-xs mt-1", action.color)}>
              View <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            disabled={!stat.onClick}
            className={cn(
              "glass-card p-4 rounded-2xl text-left transition-all duration-300",
              stat.onClick && "hover:shadow-elevated cursor-pointer"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn(
                "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                stat.gradient
              )}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate("add-money")}
          className="glass-card p-5 rounded-2xl text-left transition-all duration-300 hover:shadow-elevated group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Add Money</p>
              <p className="text-sm text-muted-foreground">Approve deposit requests</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("withdraw-money")}
          className="glass-card p-5 rounded-2xl text-left transition-all duration-300 hover:shadow-elevated group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Minus className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Withdraw Money</p>
              <p className="text-sm text-muted-foreground">Process withdrawals</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("task-completion")}
          className="glass-card p-5 rounded-2xl text-left transition-all duration-300 hover:shadow-elevated group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Task Completion</p>
              <p className="text-sm text-muted-foreground">Review submitted tasks</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MoneyWorldDashboard;