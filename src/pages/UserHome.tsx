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
  Lock,
  LogOut,
  Menu,
  X,
  Home,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";
import DailyWelcomePopup from "@/components/DailyWelcomePopup";
import PaymentReminderBar from "@/components/PaymentReminderBar";
import PaymentReminderPopup from "@/components/PaymentReminderPopup";
import { packages } from "@/data/packages";

// Ads data
const adsData = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop", headline: "🔥 New Course Launch: AI Mastery", link: "https://youtube.com/@skilllearners" },
  { id: 2, type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop", headline: "💰 Refer & Earn Up to 30%!", link: "/dashboard/affiliate" },
  { id: 3, type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", headline: "🎬 Watch Our Success Stories", link: "https://youtube.com/@skilllearners" },
];

const announcements = [
  "🎉 New AI Course launching next week! Get early access.",
  "💰 Refer 3 friends this month and get ₹500 bonus!",
  "📚 Live webinar on E-commerce strategies - Register now!",
];

const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "IGNITE": Star,
  "VELOCITY": Sparkles,
  "APEX": Crown,
  "ZENITH": Gem,
  "PINNACLE": Trophy,
};

const navItems = [
  { icon: Home, label: "Home", href: "/user-home" },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
  { icon: Wallet, label: "Affiliate", href: "/dashboard/affiliate" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const UserHome = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [adProgress, setAdProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showReminderBar, setShowReminderBar] = useState(true);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  // User data from auth
  const userName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const hasPurchased = profile?.has_purchased || false;
  const referralCode = profile?.referral_code || "";
  const purchasedPlan = profile?.purchased_plan || "";

  const quickActions = [
    { icon: User, label: "Profile", href: "/dashboard/profile", color: "from-primary to-gold-dark", desc: "View & edit", locked: false },
    { icon: Wallet, label: "Affiliate Wallet", href: "/dashboard/affiliate", color: "from-accent to-teal-dark", desc: "Your earnings", locked: !hasPurchased },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/courses", color: "from-purple-500 to-purple-600", desc: "Continue learning", locked: false },
    { icon: ShoppingCart, label: "Available Courses", href: "/dashboard/courses", color: "from-emerald to-emerald-light", desc: "Explore plans", locked: false },
  ];

  // Show payment popup on first login if not purchased
  useEffect(() => {
    if (!hasPurchased && purchasedPlan) {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPaymentPopup');
      if (!hasSeenPopup) {
        setShowPaymentPopup(true);
        sessionStorage.setItem('hasSeenPaymentPopup', 'true');
      }
    }
  }, [hasPurchased, purchasedPlan]);

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
    navigator.clipboard.writeText(`https://skilllearners.com/ref/${referralCode}`);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  const handleAdClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const availableCourses = packages.filter(p => p.name !== purchasedPlan);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Payment Reminder Bar */}
      {!hasPurchased && purchasedPlan && showReminderBar && (
        <PaymentReminderBar 
          planName={purchasedPlan} 
          onClose={() => setShowReminderBar(false)} 
        />
      )}

      {/* Payment Reminder Popup */}
      {showPaymentPopup && !hasPurchased && purchasedPlan && (
        <PaymentReminderPopup 
          planName={purchasedPlan} 
          onClose={() => setShowPaymentPopup(false)} 
        />
      )}

      {/* Welcome Popup */}
      {showWelcome && (
        <DailyWelcomePopup userName={userName.split(" ")[0]} onClose={() => setShowWelcome(false)} />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border animate-slide-in-right shadow-elevated">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-primary-foreground">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-sm text-muted-foreground">{referralCode || "New User"}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={`bg-card/80 backdrop-blur-xl border-b border-border sticky z-50 ${!hasPurchased && purchasedPlan && showReminderBar ? 'top-10' : 'top-0'}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/"><img src={logo} alt="Skill Learners" className="h-10 lg:h-12 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" /></Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button onClick={handleSignOut} className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </button>
            <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-lg font-bold text-primary-foreground">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground">{referralCode || "New User"}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-secondary/50 backdrop-blur-sm border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gradient-to-r from-primary to-gold-dark text-primary-foreground rounded-full text-xs font-bold shrink-0 shadow-sm">
              <Zap className="w-3 h-3 inline mr-1" />LIVE
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-marquee whitespace-nowrap flex gap-8">
                {[...announcements, ...announcements].map((a, i) => (<span key={i} className="inline-block emoji-text">{a}</span>))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">
                Welcome back, <span className="text-gradient-gold">{userName.split(" ")[0]}!</span> 👋
              </h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="text-center p-4 bg-card/50 rounded-2xl border border-border/50 flex-1 lg:flex-initial">
                <p className="text-xs text-muted-foreground">Current Plan</p>
                <p className="text-xl font-bold text-gradient-gold font-tier">{purchasedPlan || "Free"}</p>
              </div>
              <Button variant="hero" onClick={() => navigate("/dashboard/courses")} className="flex-1 lg:flex-initial">
                Continue Learning<ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div onClick={() => handleAdClick(adsData[currentAd].link)} className="relative glass-card rounded-2xl overflow-hidden cursor-pointer group">
            <div className="relative h-40 md:h-52">
              {adsData[currentAd].type === "video" ? (
                <video src={adsData[currentAd].src} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img src={adsData[currentAd].src} alt="Advertisement" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-bold mb-2 inline-flex items-center gap-1"><Megaphone className="w-3 h-3" />AD</span>
                <p className="text-lg md:text-xl font-bold mt-2 emoji-text">{adsData[currentAd].headline}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-primary/50 transition-all duration-100" style={{ width: `${adProgress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.locked ? "#" : action.href} onClick={(e) => {
              if (action.locked) { e.preventDefault(); toast({ title: "Feature Locked 🔒", description: "Purchase a plan to unlock.", variant: "destructive" }); }
            }} className={`glass-card p-4 md:p-5 rounded-2xl group transition-all duration-300 relative ${action.locked ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'}`}>
              {action.locked && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center"><Lock className="w-3 h-3 text-destructive" /></div>}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg ${action.locked ? 'grayscale' : ''}`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{action.label}</h3>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </Link>
          ))}
        </div>

        {hasPurchased ? (
          <div className="glass-card p-4 rounded-2xl mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg"><Gift className="w-5 h-5 text-white" /></div>
                <div><p className="font-bold text-sm">Share & Earn</p><p className="text-xs text-muted-foreground">Earn 10-30% on every referral!</p></div>
              </div>
              <Button variant="outline" size="sm" onClick={copyReferralLink} className="shrink-0"><Copy className="w-4 h-4 mr-2" />Copy Referral Link</Button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-4 rounded-2xl mb-6 border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Lock className="w-5 h-5 text-muted-foreground" /></div>
                <div><p className="font-bold text-sm">🔒 Unlock Referral Earnings</p><p className="text-xs text-muted-foreground">Purchase any plan to start earning!</p></div>
              </div>
              <Button variant="hero" size="sm" onClick={() => navigate("/dashboard/courses")} className="shrink-0"><ShoppingCart className="w-4 h-4 mr-2" />View Plans</Button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display">Available Courses</h2>
            <Link to="/dashboard/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {availableCourses.slice(0, 3).map((course) => {
              const Icon = planIcons[course.name] || Star;
              return (
                <div key={course.name} className="glass-card p-5 rounded-2xl group hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg`}><Icon className="w-6 h-6 text-white" /></div>
                    <div className="flex-1">
                      <h3 className="font-bold font-tier text-sm mb-1">{course.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{course.shortDesc}</p>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/payment")}><ShoppingCart className="w-4 h-4 mr-1" />₹{course.price}</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
