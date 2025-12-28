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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

// Mock user data
const userData = {
  name: "John Doe",
  agentId: "3T123456",
  email: "john@example.com",
  plan: "Gold",
  walletBalance: 2500,
  totalEarnings: 15000,
  coursesCompleted: 3,
  totalCourses: 12,
  referrals: 5,
  activeReferrals: 3,
  joinDate: "2024-01-15",
};

const announcements = [
  "🎉 New AI Course launching next week! Get early access.",
  "💰 Refer 3 friends this month and get ₹500 bonus!",
  "📚 Live webinar on E-commerce strategies - Register now!",
  "🏆 Top 10 earners this month will receive special badges!",
];

const quickActions = [
  { icon: User, label: "My Profile", href: "/dashboard/profile", color: "from-primary to-gold-dark" },
  { icon: Users, label: "Affiliate Hub", href: "/dashboard/affiliate", color: "from-accent to-teal-dark" },
  { icon: Wallet, label: "My Wallet", href: "/dashboard/wallet", color: "from-emerald to-emerald-light" },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/courses", color: "from-purple-500 to-purple-600" },
];

const recentCourses = [
  { title: "Digital Marketing Mastery", progress: 75, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop" },
  { title: "AI & Prompt Engineering", progress: 45, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop" },
  { title: "E-commerce Fundamentals", progress: 90, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=120&fit=crop" },
];

const UserHome = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Ad Banner */}
      <div className="bg-gradient-to-r from-primary via-gold-dark to-primary text-primary-foreground py-3 text-center">
        <p className="text-sm font-medium animate-pulse">
          🔥 Special Offer: Upgrade to Platinum and get 50% OFF! Limited time only. 
          <Link to="/dashboard/courses" className="ml-2 underline font-bold">Upgrade Now →</Link>
        </p>
      </div>

      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-sm">{userData.name}</p>
                <p className="text-xs text-muted-foreground">{userData.agentId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* News Ticker */}
      <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold shrink-0">
              UPDATES
            </span>
            <div className="overflow-hidden flex-1">
              <p className="animate-marquee whitespace-nowrap">
                {announcements.join("  •  ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">
                Welcome back, <span className="text-gradient-gold">{userData.name.split(" ")[0]}!</span> 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your learning journey? You're doing great!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-xl font-bold text-primary">{userData.plan}</p>
              </div>
              <Button variant="hero" onClick={() => navigate("/dashboard/courses")}>
                Continue Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold group-hover:text-primary transition-colors">{action.label}</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Wallet className="w-8 h-8 text-emerald" />
                  <span className="text-xs px-2 py-1 bg-emerald/10 text-emerald rounded-full">Available</span>
                </div>
                <p className="text-2xl font-bold">₹{userData.walletBalance.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Lifetime</span>
                </div>
                <p className="text-2xl font-bold">₹{userData.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-accent" />
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Team</span>
                </div>
                <p className="text-2xl font-bold">{userData.referrals}</p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-display">Learning Progress</h2>
                <Link to="/dashboard/courses" className="text-primary text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-6">
                {recentCourses.map((course) => (
                  <div key={course.title} className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{course.title}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-primary">{course.progress}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Chart Placeholder */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold font-display mb-6">Earnings Overview</h2>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Earnings chart will appear here once you start earning
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Bonuses */}
          <div className="space-y-8">
            {/* Referral Card */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="flex items-center gap-4 mb-4">
                <Gift className="w-10 h-10 text-primary" />
                <div>
                  <h3 className="font-bold">Invite & Earn</h3>
                  <p className="text-sm text-muted-foreground">Get 10-30% per referral</p>
                </div>
              </div>
              <div className="bg-card/50 p-3 rounded-xl mb-4">
                <p className="text-xs text-muted-foreground mb-1">Your Referral Link</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                    https://skilllearners.com/ref/{userData.agentId}
                  </code>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
              </div>
              <Button variant="hero" className="w-full">
                Share & Earn
              </Button>
            </div>

            {/* Skill Level Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Your Skill Level</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary-foreground" fill="currentColor" />
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
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Live Q&A Session</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-6 h-6 text-accent" />
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
