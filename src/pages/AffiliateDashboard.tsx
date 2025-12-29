import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Users, 
  UserPlus,
  UserCheck,
  Wallet,
  TrendingUp,
  Copy,
  Check,
  ChevronRight,
  Star,
  Award,
  Target,
  Layers,
  PieChart,
  CheckSquare,
  ArrowDownRight,
  Zap,
  Crown,
  Clock,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// Mock affiliate data
const affiliateData = {
  totalReferrals: 15,
  activeReferrals: 8,
  pendingReferrals: 3,
  totalEarnings: 45000,
  thisMonthEarnings: 8500,
  walletBalance: 12500,
  level: "Silver Partner",
  referralCode: "3T123456",
  commissionRate: "15%",
};

// Income Types with real data
const incomeCards = [
  { 
    icon: Users, 
    label: "Referral Income", 
    value: 8500, 
    color: "from-blue-500 to-blue-600",
    description: "Direct referral earnings"
  },
  { 
    icon: Layers, 
    label: "Level Income", 
    value: 5200, 
    color: "from-purple-500 to-purple-600",
    description: "Multi-level team earnings"
  },
  { 
    icon: PieChart, 
    label: "Revenue Share", 
    value: 3800, 
    color: "from-emerald to-emerald-light",
    description: "Share in company profits"
  },
  { 
    icon: CheckSquare, 
    label: "Task Income", 
    value: 1500, 
    color: "from-orange-500 to-amber-500",
    description: "Task completion rewards"
  },
  { 
    icon: Zap, 
    label: "Auto Upgrade", 
    value: 2200, 
    color: "from-primary to-gold-dark",
    description: "Automatic upgrade bonuses"
  },
  { 
    icon: ArrowDownRight, 
    label: "Spillover Income", 
    value: 1800, 
    color: "from-accent to-teal-dark",
    description: "Overflow from upline"
  },
];

const stats = [
  { icon: Users, label: "Total Referrals", value: affiliateData.totalReferrals, color: "from-primary to-gold-dark" },
  { icon: UserCheck, label: "Active Members", value: affiliateData.activeReferrals, color: "from-emerald to-emerald-light" },
  { icon: UserPlus, label: "Pending", value: affiliateData.pendingReferrals, color: "from-accent to-teal-dark" },
  { icon: Wallet, label: "Wallet Balance", value: `₹${affiliateData.walletBalance.toLocaleString()}`, color: "from-purple-500 to-purple-600" },
];

const recentActivity = [
  { action: "Referral Commission", user: "Priya S.", amount: 750, time: "2 hours ago", type: "credit" },
  { action: "Level Income", user: "Team Bonus", amount: 200, time: "5 hours ago", type: "credit" },
  { action: "Withdrawal", user: "Bank Transfer", amount: -2000, time: "1 day ago", type: "debit" },
  { action: "Task Reward", user: "Daily Task", amount: 50, time: "1 day ago", type: "credit" },
  { action: "Spillover", user: "From Rahul V.", amount: 150, time: "2 days ago", type: "credit" },
];

const recentReferrals = [
  { name: "Priya S.", plan: "Gold", date: "2 days ago", status: "active", earnings: 750 },
  { name: "Rahul V.", plan: "Silver", date: "5 days ago", status: "active", earnings: 300 },
  { name: "Ananya P.", plan: "Diamond", date: "1 week ago", status: "active", earnings: 1500 },
  { name: "Vikram K.", plan: "Starter", date: "2 weeks ago", status: "pending", earnings: 0 },
];

const achievements = [
  { icon: Star, title: "First Referral", description: "Made your first referral", unlocked: true, progress: 100 },
  { icon: Target, title: "5 Referrals", description: "Referred 5 members", unlocked: true, progress: 100 },
  { icon: Award, title: "Silver Partner", description: "Reached Silver level", unlocked: true, progress: 100 },
  { icon: TrendingUp, title: "₹10K Milestone", description: "Earned ₹10,000+", unlocked: false, progress: 45 },
];

const AffiliateDashboard = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const referralLink = `https://skilllearners.com/ref/${affiliateData.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const totalIncome = incomeCards.reduce((sum, card) => sum + card.value, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/user-home")} className="p-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/">
              <img src={logo} alt="Skill Learners" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/user-home" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/dashboard/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
            <Link to="/dashboard/affiliate" className="text-primary font-medium">Affiliate</Link>
            <Link to="/dashboard/wallet" className="text-muted-foreground hover:text-foreground transition-colors">Wallet</Link>
            <Link to="/dashboard/profile" className="text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm mb-4">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">{affiliateData.level}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">Affiliate Dashboard</h1>
              <p className="text-muted-foreground">
                Your complete earnings & referral management hub
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center p-4 bg-card/50 rounded-2xl border border-border/50">
                <p className="text-sm text-muted-foreground">Commission Rate</p>
                <p className="text-2xl font-bold text-primary">{affiliateData.commissionRate}</p>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-2xl border border-border/50">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-emerald">₹{affiliateData.thisMonthEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Income Type Cards - The 6 Income Streams */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display">Your Income Streams</h2>
            <span className="text-sm text-muted-foreground">
              Total: <span className="text-primary font-bold">₹{totalIncome.toLocaleString()}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {incomeCards.map((card) => (
              <div 
                key={card.label} 
                className="glass-card p-4 lg:p-5 rounded-2xl group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <card.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <p className="text-lg lg:text-xl font-bold">₹{card.value.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">{card.label}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden lg:block">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 lg:p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Link Card */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Copy className="w-5 h-5 text-primary" />
            Your Referral Link
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-muted/50 rounded-xl p-4 flex items-center border border-border/50">
              <code className="text-sm flex-1 truncate">{referralLink}</code>
            </div>
            <Button variant="hero" onClick={copyToClipboard} className="shrink-0">
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Link
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Share this link with friends and earn {affiliateData.commissionRate} on every successful registration!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity Log */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Log */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-display flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  Recent Activity
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'credit' ? 'bg-emerald/10' : 'bg-destructive/10'
                      }`}>
                        {activity.type === 'credit' ? (
                          <TrendingUp className="w-5 h-5 text-emerald" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        activity.type === 'credit' ? 'text-emerald' : 'text-destructive'
                      }`}>
                        {activity.type === 'credit' ? '+' : ''}₹{Math.abs(activity.amount).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-display">Recent Referrals</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                        <span className="font-bold text-primary-foreground">{referral.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">{referral.plan} Plan • {referral.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === "active" 
                          ? "bg-emerald/10 text-emerald" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {referral.status}
                      </span>
                      {referral.earnings > 0 && (
                        <p className="text-sm font-medium text-emerald mt-1">+₹{referral.earnings}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Progress */}
          <div className="space-y-8">
            {/* Achievements with Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      achievement.unlocked ? "bg-primary/5" : "bg-muted/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.unlocked 
                        ? "bg-gradient-gold" 
                        : "bg-muted"
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-gold rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Check className="w-4 h-4 text-emerald" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total Earnings */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Total Earnings</h3>
              <div className="text-center py-6">
                <p className="text-4xl font-bold text-gradient-gold">
                  ₹{affiliateData.totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Lifetime earnings from all sources</p>
              </div>
              <Button variant="outline" className="w-full">
                Withdraw to Wallet
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Royal Bonus Coming Soon */}
            <div className="glass-card p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-gold/20 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-primary">Royal Bonus</h3>
                <p className="text-sm text-muted-foreground mt-1">Coming Soon!</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Exclusive rewards for top performers
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
