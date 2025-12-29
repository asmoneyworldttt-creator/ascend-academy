import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Wallet, 
  BookOpen, 
  Users, 
  Bell,
  Gift,
  PlayCircle,
  ArrowRight,
  ChevronRight,
  Megaphone,
  Copy,
  ExternalLink,
  Zap,
  Star,
  Crown,
  Gem,
  Trophy,
  Sparkles,
  ShoppingCart,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import DailyWelcomePopup from "@/components/DailyWelcomePopup";
import { packages } from "@/data/packages";

// Mock user data (would come from PHP backend)
// Toggle hasPurchased to false to test locked state
const userData = {
  name: "John Doe",
  agentId: "3T123456",
  email: "john@example.com",
  plan: "Gold",
  hasPurchased: true, // Set to false to test locked affiliate features
  purchasedPackages: ["Creator Pack", "Social Media Mastery", "Business & Commerce"],
  walletBalance: 2500,
  totalEarnings: 15000,
  referrals: 5,
  joinDate: "2024-01-15",
};

// Ads data - supports images and videos with redirect links
const adsData = [
  { 
    id: 1, 
    type: "image", 
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    headline: "🔥 New Course Launch: AI Mastery",
    link: "https://youtube.com/@skilllearners"
  },
  { 
    id: 2, 
    type: "image", 
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    headline: "💰 Refer & Earn Up to 30%!",
    link: "/dashboard/affiliate"
  },
  { 
    id: 3, 
    type: "video", 
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    headline: "🎬 Watch Our Success Stories",
    link: "https://youtube.com/@skilllearners"
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
  { icon: User, label: "Profile", href: "/dashboard/profile", color: "from-primary to-gold-dark", desc: "View & edit", locked: false },
  { icon: Wallet, label: "Affiliate Wallet", href: "/dashboard/affiliate", color: "from-accent to-teal-dark", desc: "Your earnings", locked: !userData.hasPurchased },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/courses", color: "from-purple-500 to-purple-600", desc: "Continue learning", locked: false },
  { icon: ShoppingCart, label: "Available Courses", href: "/dashboard/courses", color: "from-emerald to-emerald-light", desc: "Explore plans", locked: false },
];

// Map plan icons
const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Creator Pack": Star,
  "Social Media Mastery": Sparkles,
  "Business & Commerce": Crown,
  "Digital Marketing Pro": Gem,
  "Financial Trading Expert": Trophy,
};

const UserHome = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [adProgress, setAdProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ad rotation with progress bar
  useEffect(() => {
    const currentAdData = adsData[currentAd];
    const adDuration = currentAdData.type === "video" ? 10000 : 5000;
    
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
  }, [currentAd]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://skilllearners.com/ref/${userData.agentId}`);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  const handleAdClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  // Filter purchased courses
  const purchasedCourses = packages.filter(p => userData.purchasedPackages.includes(p.name));
  const availableCourses = packages.filter(p => !userData.purchasedPackages.includes(p.name));

  return (
    <div className="min-h-screen bg-background">
      {/* Daily Welcome Popup */}
      {showWelcome && (
        <DailyWelcomePopup 
          userName={userData.name.split(" ")[0]} 
          onClose={() => setShowWelcome(false)} 
        />
      )}

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
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
                  <span key={i} className="inline-block emoji-text">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
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

        {/* Ad Display Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Sponsored Ads
            </h2>
            <div className="flex gap-1">
              {adsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentAd(idx); setAdProgress(0); }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentAd ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div 
            onClick={() => handleAdClick(adsData[currentAd].link)}
            className="relative glass-card rounded-2xl overflow-hidden cursor-pointer group"
          >
            <div className="relative h-40 md:h-52">
              {adsData[currentAd].type === "video" ? (
                <video 
                  src={adsData[currentAd].src}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={adsData[currentAd].src}
                  alt="Advertisement"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-bold mb-2 inline-flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  AD
                </span>
                <p className="text-lg md:text-xl font-bold mt-2 emoji-text">{adsData[currentAd].headline}</p>
                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ExternalLink className="w-3 h-3" />
                  Click to learn more
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-primary/50 transition-all duration-100" style={{ width: `${adProgress}%` }} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.locked ? "#" : action.href}
              onClick={(e) => {
                if (action.locked) {
                  e.preventDefault();
                  toast({ 
                    title: "Feature Locked 🔒", 
                    description: "Purchase a membership plan to unlock this feature.",
                    variant: "destructive" 
                  });
                }
              }}
              className={`glass-card p-4 md:p-5 rounded-2xl group transition-all duration-300 relative ${
                action.locked ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'
              }`}
            >
              {action.locked && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-destructive" />
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg ${action.locked ? 'grayscale' : ''}`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{action.label}</h3>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* Referral Link Widget - Only show if purchased */}
        {userData.hasPurchased ? (
          <div className="glass-card p-4 rounded-2xl mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">Share & Earn</p>
                  <p className="text-xs text-muted-foreground">Earn 10-30% on every referral!</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={copyReferralLink} className="shrink-0">
                <Copy className="w-4 h-4 mr-2" />
                Copy Referral Link
              </Button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-4 rounded-2xl mb-6 border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-bold text-sm">🔒 Unlock Referral Earnings</p>
                  <p className="text-xs text-muted-foreground">Purchase any plan to start earning commissions!</p>
                </div>
              </div>
              <Button variant="hero" size="sm" onClick={() => navigate("/dashboard/courses")} className="shrink-0">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Plans
              </Button>
            </div>
          </div>
        )}

        {/* Special Offers Section */}
        <div className="glass-card p-5 rounded-2xl mb-6 border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-bold font-display">Special Offers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-card/50 p-4 rounded-xl">
              <p className="text-sm font-medium emoji-text">🎁 Refer 2 friends & get ₹500 bonus!</p>
              <p className="text-xs text-muted-foreground mt-1">Limited time offer. Terms apply.</p>
            </div>
            <div className="bg-card/50 p-4 rounded-xl">
              <p className="text-sm font-medium emoji-text">⚡ Upgrade today & save 20% extra!</p>
              <p className="text-xs text-muted-foreground mt-1">Use code: UPGRADE20</p>
            </div>
          </div>
        </div>

        {/* My Courses (Purchased) */}
        {purchasedCourses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-display">My Courses</h2>
              <Link to="/dashboard/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {purchasedCourses.map((course) => {
                const Icon = planIcons[course.name] || Star;
                return (
                  <div key={course.name} className="glass-card p-5 rounded-2xl group hover:-translate-y-1 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{course.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{course.shortDesc}</p>
                        <Button variant="hero" size="sm" className="w-full" onClick={() => navigate("/dashboard/courses")}>
                          <PlayCircle className="w-4 h-4 mr-1" />
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Courses (Not Purchased) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display">Available Courses</h2>
            <Link to="/dashboard/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {packages.map((plan) => {
              const Icon = planIcons[plan.name] || Star;
              const isPurchased = userData.purchasedPackages.includes(plan.name);
              return (
                <div 
                  key={plan.name} 
                  className={`snap-center flex-shrink-0 w-[280px] glass-card rounded-2xl p-5 ${
                    plan.popular ? 'ring-2 ring-primary shadow-glow-gold' : ''
                  } ${isPurchased ? 'opacity-60' : ''}`}
                >
                  {plan.popular && (
                    <span className="inline-block px-2 py-0.5 bg-gradient-gold text-primary-foreground text-xs font-bold rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xl font-bold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{plan.shortDesc}</p>
                  <Button 
                    variant={isPurchased ? "outline" : (plan.popular ? "hero" : "outline")} 
                    size="sm" 
                    className="w-full"
                    disabled={isPurchased}
                    onClick={() => !isPurchased && navigate(`/register?plan=${plan.name}`)}
                  >
                    {isPurchased ? "Purchased" : "Buy Now"}
                  </Button>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            ← Swipe to see all plans →
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
