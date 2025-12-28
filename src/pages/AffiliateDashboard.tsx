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
  Clock
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

const stats = [
  { icon: Users, label: "Total Referrals", value: affiliateData.totalReferrals, color: "from-primary to-gold-dark" },
  { icon: UserCheck, label: "Active Members", value: affiliateData.activeReferrals, color: "from-emerald to-emerald-light" },
  { icon: UserPlus, label: "Pending", value: affiliateData.pendingReferrals, color: "from-accent to-teal-dark" },
  { icon: Wallet, label: "Wallet Balance", value: `₹${affiliateData.walletBalance.toLocaleString()}`, color: "from-purple-500 to-purple-600" },
];

const recentReferrals = [
  { name: "Priya S.", plan: "Gold", date: "2 days ago", status: "active", earnings: 750 },
  { name: "Rahul V.", plan: "Silver", date: "5 days ago", status: "active", earnings: 300 },
  { name: "Ananya P.", plan: "Diamond", date: "1 week ago", status: "active", earnings: 1500 },
  { name: "Vikram K.", plan: "Starter", date: "2 weeks ago", status: "pending", earnings: 0 },
];

const achievements = [
  { icon: Star, title: "First Referral", description: "Made your first referral", unlocked: true },
  { icon: Target, title: "5 Referrals", description: "Referred 5 members", unlocked: true },
  { icon: Award, title: "Silver Partner", description: "Reached Silver level", unlocked: true },
  { icon: TrendingUp, title: "₹10K Milestone", description: "Earned ₹10,000+", unlocked: false },
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
              <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
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
        <div className="glass-card p-8 rounded-3xl mb-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm mb-4">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">{affiliateData.level}</span>
              </div>
              <h1 className="text-3xl font-bold font-display mb-2">Affiliate Dashboard</h1>
              <p className="text-muted-foreground">
                Share, earn, and grow your income with our referral program
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center p-4 bg-card/50 rounded-2xl">
                <p className="text-sm text-muted-foreground">Commission Rate</p>
                <p className="text-2xl font-bold text-primary">{affiliateData.commissionRate}</p>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-2xl">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-emerald">₹{affiliateData.thisMonthEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
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
          <h2 className="text-xl font-bold font-display mb-4">Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-muted/50 rounded-xl p-4 flex items-center">
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
          {/* Recent Referrals */}
          <div className="lg:col-span-2">
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

          {/* Achievements & Activity */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      achievement.unlocked ? "bg-primary/5" : "bg-muted/30 opacity-60"
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
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Check className="w-4 h-4 text-emerald ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Overview */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Total Earnings</h3>
              <div className="text-center py-6">
                <p className="text-4xl font-bold text-gradient-gold">
                  ₹{affiliateData.totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Lifetime earnings from referrals</p>
              </div>
              <Button variant="outline" className="w-full">
                Withdraw to Wallet
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
