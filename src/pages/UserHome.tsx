import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Wallet, 
  BookOpen, 
  Users, 
  Bell,
  TrendingUp,
  Gift,
  PlayCircle,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Megaphone,
  Copy,
  ExternalLink,
  Zap,
  BarChart3,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// Mock user data (would come from PHP backend)
const userData = {
  name: "John Doe",
  agentId: "3T123456",
  email: "john@example.com",
  plan: "Gold",
  walletBalance: 2500,
  upgradeBalance: 1200,
  totalEarnings: 15000,
  coursesCompleted: 3,
  totalCourses: 12,
  referrals: 5,
  activeReferrals: 3,
  joinDate: "2024-01-15",
};

// Ads data (from PHP)
const adsData = [
  { 
    id: 1, 
    type: "image", 
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
    content: "🔥 New Course Launch: AI Mastery",
    link: "/dashboard/courses"
  },
  { 
    id: 2, 
    type: "image", 
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    content: "💰 Refer & Earn Up to 30%!",
    link: "/dashboard/affiliate"
  },
];

const announcements = [
  "🎉 New AI Course launching next week! Get early access.",
  "💰 Refer 3 friends this month and get ₹500 bonus!",
  "📚 Live webinar on E-commerce strategies - Register now!",
  "🏆 Top 10 earners this month will receive special badges!",
  "✨ Premium support now available 24/7 for Gold+ members!",
];

const quickActions = [
  { icon: User, label: "Profile", href: "/dashboard/profile", color: "from-primary to-gold-dark", desc: "View & edit" },
  { icon: Users, label: "Affiliate Wallet", href: "/dashboard/affiliate", color: "from-accent to-teal-dark", desc: "Your team" },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/courses", color: "from-purple-500 to-purple-600", desc: "Continue learning" },
];

const recentCourses = [
  { title: "Digital Marketing Mastery", progress: 75, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop" },
  { title: "AI & Prompt Engineering", progress: 45, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop" },
  { title: "E-commerce Fundamentals", progress: 90, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=120&fit=crop" },
];

// Sample chart data (from PHP)
const earningsData = [
  { month: "Jan", wallet: 1200, upgrade: 500 },
  { month: "Feb", wallet: 1800, upgrade: 700 },
  { month: "Mar", wallet: 2500, upgrade: 1200 },
  { month: "Apr", wallet: 3200, upgrade: 1500 },
];

const growthData = [
  { month: "Jan", users: 2 },
  { month: "Feb", users: 5 },
  { month: "Mar", users: 8 },
  { month: "Apr", users: 12 },
];

const UserHome = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [adProgress, setAdProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ad rotation
  useEffect(() => {
    const adDuration = 5000;
    const progressInterval = setInterval(() => {
      setAdProgress((prev) => {
        if (prev >= 100) {
          setCurrentAd((curr) => (curr + 1) % adsData.length);
          return 0;
        }
        return prev + 2;
      });
    }, adDuration / 50);
    
    return () => clearInterval(progressInterval);
  }, []);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://skilllearners.com/ref/${userData.agentId}`);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Ad Banner */}
      <div className="relative bg-gradient-to-r from-primary/10 via-card to-accent/10 overflow-hidden">
        <Link to={adsData[currentAd].link} className="block">
          <div className="container mx-auto px-4">
            <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden rounded-b-2xl">
              <img 
                src={adsData[currentAd].src}
                alt="Advertisement"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold mb-2 inline-block">
                  <Megaphone className="w-3 h-3 inline mr-1" />
                  SPECIAL OFFER
                </span>
                <p className="text-xl md:text-2xl font-bold mt-2">{adsData[currentAd].content}</p>
              </div>
            </div>
          </div>
        </Link>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-primary/50 transition-all duration-100" style={{ width: `${adProgress}%` }} />
      </div>

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-lg font-bold text-primary-foreground">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-sm">{userData.name}</p>
                <p className="text-xs text-muted-foreground">{userData.agentId}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* News Ticker */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gradient-to-r from-primary to-gold-dark text-primary-foreground rounded-full text-xs font-bold shrink-0 shadow-sm">
              <Zap className="w-3 h-3 inline mr-1" />
              LIVE
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-marquee whitespace-nowrap flex gap-8">
                {[...announcements, ...announcements].map((a, i) => (
                  <span key={i} className="inline-block">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">
                Welcome back, <span className="text-gradient-gold">{userData.name.split(" ")[0]}!</span> 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your learning journey? You're doing great!
              </p>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="text-center p-4 bg-card/50 rounded-2xl border border-border/50 flex-1 lg:flex-initial">
                <p className="text-xs text-muted-foreground">Current Plan</p>
                <p className="text-xl font-bold text-gradient-gold">{userData.plan}</p>
              </div>
              <Button variant="hero" onClick={() => navigate("/dashboard/courses")} className="flex-1 lg:flex-initial">
                Continue Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="glass-card p-4 md:p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <action.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">{action.label}</h3>
              <p className="text-xs text-muted-foreground hidden md:block">{action.desc}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Stats & Charts */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="glass-card p-4 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="w-6 h-6 md:w-8 md:h-8 text-emerald" />
                  <span className="text-xs px-2 py-0.5 bg-emerald/10 text-emerald rounded-full hidden md:inline">Available</span>
                </div>
                <p className="text-xl md:text-2xl font-bold">₹{userData.walletBalance.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Wallet Balance</p>
              </div>
              
              <div className="glass-card p-4 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full hidden md:inline">Upgrade</span>
                </div>
                <p className="text-xl md:text-2xl font-bold">₹{userData.upgradeBalance.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Auto Upgrade</p>
              </div>
              
              <div className="glass-card p-4 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                  <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded-full hidden md:inline">Total</span>
                </div>
                <p className="text-xl md:text-2xl font-bold">₹{userData.totalEarnings.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total Income</p>
              </div>
              
              <div className="glass-card p-4 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full hidden md:inline">Team</span>
                </div>
                <p className="text-xl md:text-2xl font-bold">{userData.referrals}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total Referrals</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Earnings Chart */}
              <div className="glass-card p-5 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold font-display flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Earnings Overview
                  </h2>
                </div>
                <div className="h-40 flex items-end justify-between gap-2 px-2">
                  {earningsData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 items-end justify-center h-28">
                        <div 
                          className="w-3 bg-gradient-to-t from-primary to-primary/50 rounded-t-sm transition-all duration-500"
                          style={{ height: `${(data.wallet / 3500) * 100}%` }}
                        />
                        <div 
                          className="w-3 bg-gradient-to-t from-accent to-accent/50 rounded-t-sm transition-all duration-500"
                          style={{ height: `${(data.upgrade / 3500) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary" /> Wallet</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-accent" /> Upgrade</span>
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="glass-card p-5 md:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold font-display flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-accent" />
                    User Growth
                  </h2>
                </div>
                <div className="h-40 flex items-end justify-between gap-4 px-2">
                  {growthData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex justify-center items-end h-28">
                        <div 
                          className="w-8 bg-gradient-to-t from-emerald to-emerald/50 rounded-t-lg transition-all duration-500 relative group"
                          style={{ height: `${(data.users / 15) * 100}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            {data.users}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="glass-card p-5 md:p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-bold font-display">Learning Progress</h2>
                <Link to="/dashboard/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {recentCourses.map((course) => (
                  <div key={course.title} className="flex items-center gap-3 md:gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-12 md:w-20 md:h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm md:text-base truncate">{course.title}</h3>
                      <div className="flex items-center gap-3 mt-1 md:mt-2">
                        <div className="flex-1 h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-primary shrink-0">{course.progress}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <PlayCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Referral & Bonuses */}
          <div className="space-y-6">
            {/* Referral Card */}
            <div className="glass-card p-5 md:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg">
                    <Gift className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Invite & Earn</h3>
                    <p className="text-xs text-muted-foreground">Get 10-30% per referral</p>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-3 rounded-xl mb-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Your Referral Link</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1.5 rounded flex-1 truncate">
                      skilllearners.com/ref/{userData.agentId}
                    </code>
                    <Button variant="outline" size="sm" onClick={copyReferralLink}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <Button variant="hero" className="w-full">
                  Share & Earn
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Skill Level Progress */}
            <div className="glass-card p-5 md:p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Your Skill Level</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20">
                  <Star className="w-7 h-7 text-primary-foreground" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-lg">Advanced</p>
                  <p className="text-sm text-muted-foreground">Level 3 of 5</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full w-3/5 bg-gradient-gold rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground">Complete 2 more courses to reach Expert level</p>
            </div>

            {/* Upcoming Events */}
            <div className="glass-card p-5 md:p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Live Q&A Session</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Webinar: E-commerce Tips</p>
                    <p className="text-xs text-muted-foreground">Friday, 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;