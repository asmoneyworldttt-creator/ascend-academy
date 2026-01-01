import {
  Clock,
  Users,
  UserPlus,
  CreditCard,
  TrendingUp,
  DollarSign,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, color, trend, trendUp }: StatsCardProps) => (
  <div className="glass-card p-5 rounded-2xl hover:shadow-elevated transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 mt-2 text-xs font-medium",
            trendUp ? "text-emerald" : "text-destructive"
          )}>
            <TrendingUp className={cn("w-3 h-3", !trendUp && "rotate-180")} />
            {trend}
          </div>
        )}
      </div>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
        color
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

interface AdminStatsCardsProps {
  pendingPayments: number;
  activeUsers: number;
  totalUsers: number;
  pendingValue: number;
  pendingWithdrawals: number;
  pendingCourses: number;
  approvedPaymentsToday: number;
}

export const AdminStatsCards = ({
  pendingPayments,
  activeUsers,
  totalUsers,
  pendingValue,
  pendingWithdrawals,
  pendingCourses,
  approvedPaymentsToday,
}: AdminStatsCardsProps) => {
  const stats = [
    {
      title: "Pending Payments",
      value: pendingPayments,
      icon: Clock,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: Users,
      color: "bg-gradient-to-br from-emerald to-emerald-light",
      trend: "+12% this week",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: UserPlus,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Pending Value",
      value: `₹${pendingValue.toLocaleString()}`,
      icon: CreditCard,
      color: "bg-gradient-to-br from-primary to-gold-dark",
    },
    {
      title: "Pending Withdrawals",
      value: pendingWithdrawals,
      icon: DollarSign,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Course Submissions",
      value: pendingCourses,
      icon: BookOpen,
      color: "bg-gradient-to-br from-accent to-teal-dark",
    },
    {
      title: "Approved Today",
      value: approvedPaymentsToday,
      icon: CheckCircle,
      color: "bg-gradient-to-br from-emerald to-teal-dark",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AdminStatsCards;
