import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, ArrowLeft, Copy, Shield, Sparkles, User, Phone, MapPin, Key, Calendar, Crown, Star, Gem, Trophy, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface UserData {
  name: string;
  email: string;
  phone: string;
  sponsorId?: string;
  country?: string;
  state?: string;
  address?: string;
  pincode?: string;
  dob?: string;
  plan?: string;
}

const planDetails: Record<string, { name: string; price: string; color: string; icon: React.ComponentType<any>; benefits: string[] }> = {
  SPARK: { name: "SPARK", price: "₹2,999", color: "from-orange-500 to-rose-600", icon: Star, benefits: ["100GB+ Editing Assets", "4K Video Templates", "Audio & SFX Library"] },
  MOMENTUM: { name: "MOMENTUM", price: "₹5,999", color: "from-cyan-500 to-blue-600", icon: Sparkles, benefits: ["Social Media Courses", "YouTube Monetization", "Content Templates"] },
  SUMMIT: { name: "SUMMIT", price: "₹9,999", color: "from-emerald-500 to-teal-600", icon: Crown, benefits: ["Affiliate Marketing", "E-commerce Training", "Sales Funnels"] },
  TITAN: { name: "TITAN", price: "₹14,999", color: "from-amber-500 to-yellow-500", icon: Gem, benefits: ["Digital Marketing Pro", "SEO Mastery", "Lead Generation"] },
  LEGACY: { name: "LEGACY", price: "₹24,999", color: "from-violet-600 to-purple-700", icon: Trophy, benefits: ["Financial Trading", "Live Sessions", "Trading Signals"] },
};

const RegistrationSuccess = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  const stateData = location.state?.userData as UserData | undefined;
  
  const userData: UserData = {
    name: stateData?.name || "New User",
    email: stateData?.email || "your@email.com",
    phone: stateData?.phone || "",
    sponsorId: stateData?.sponsorId,
    country: stateData?.country,
    state: stateData?.state,
    address: stateData?.address,
    pincode: stateData?.pincode,
    dob: stateData?.dob,
    plan: stateData?.plan,
  };

  const selectedPlan = userData.plan ? planDetails[userData.plan] : null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald/5 via-background to-primary/5" />
      <div className="fixed top-1/4 left-10 w-64 h-64 rounded-full bg-emerald/15 blur-3xl animate-pulse" />
      <div className="fixed bottom-1/4 right-10 w-80 h-80 rounded-full bg-primary/15 blur-3xl animate-pulse delay-500" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      
      {/* Celebration Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="fixed w-2 h-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--emerald))' : 'hsl(var(--accent))',
            opacity: 0.4,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      <div className="relative max-w-3xl mx-auto py-8 z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img 
              src={logo} 
              alt="Skill Learners" 
              className="h-16 w-auto mx-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" 
            />
          </Link>
        </div>

        {/* Main Success Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald/30 via-primary/20 to-emerald/30 rounded-[2rem] blur-xl opacity-60" />
          
          <div className="relative glass-card p-6 lg:p-10 rounded-3xl border border-emerald/20">
            {/* Success Header with Animation */}
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald-light animate-ping opacity-20" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald/30 to-emerald-light/20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-2xl shadow-emerald/40 animate-scale-in">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <h1 className="text-3xl md:text-4xl font-bold font-display">
                  Welcome to <span className="text-gradient-gold">Skill Learners!</span>
                </h1>
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground text-lg">
                Congratulations, <span className="font-semibold text-foreground">{userData.name}</span>! Your registration is complete.
              </p>
            </div>

            {/* Selected Plan Card - Premium */}
            {selectedPlan && (
              <div className="mb-8">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${selectedPlan.color} p-1`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="relative bg-card/95 backdrop-blur-xl rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center shadow-lg`}>
                          <selectedPlan.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Selected Package</p>
                          <h3 className="text-2xl font-bold font-tier">{selectedPlan.name}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gradient-gold">{selectedPlan.price}</p>
                        <p className="text-xs text-muted-foreground">One-time payment</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlan.benefits.map((benefit, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-full text-xs font-medium">
                          <Gift className="w-3 h-3 text-primary" />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Card - Highlighted */}
            <div className="bg-gradient-to-r from-primary/15 via-card to-primary/15 rounded-2xl p-6 mb-6 border-2 border-primary/30 shadow-lg">
              <h3 className="font-bold text-center mb-4 flex items-center justify-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <span className="text-lg">Your Login Credentials</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Email (Username)</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-lg text-primary truncate">{userData.email}</span>
                    <button 
                      onClick={() => copyToClipboard(userData.email, "Email")}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors shrink-0"
                    >
                      <Copy className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Password</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Your chosen password</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-primary/80 mt-4 font-medium bg-primary/10 rounded-lg py-2">
                ⚠️ Please save these credentials securely. You'll need them to login.
              </p>
            </div>

            {/* Account Details Grid */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-border/50">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Account Summary
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <DetailRow icon={User} label="Full Name" value={userData.name} />
                <DetailRow icon={Mail} label="Email" value={userData.email} />
                <DetailRow icon={Phone} label="Phone" value={userData.phone} />
                {userData.dob && (
                  <DetailRow icon={Calendar} label="Date of Birth" value={new Date(userData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
                )}
                {userData.country && (
                  <DetailRow icon={MapPin} label="Country" value={userData.country} />
                )}
                {userData.state && (
                  <DetailRow icon={MapPin} label="State" value={userData.state} />
                )}
                {userData.address && (
                  <div className="sm:col-span-2">
                    <DetailRow icon={MapPin} label="Address" value={userData.address} />
                  </div>
                )}
                {userData.pincode && (
                  <DetailRow icon={MapPin} label="Pincode" value={userData.pincode} />
                )}
                {userData.sponsorId && (
                  <DetailRow icon={User} label="Referral Code Used" value={userData.sponsorId} highlight />
                )}
                <DetailRow icon={Calendar} label="Registration Date" value={new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
              </div>
            </div>

            {/* Email Verification Notice */}
            <div className="glass-card p-6 rounded-xl mb-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-teal-dark flex items-center justify-center shrink-0 shadow-lg shadow-accent/25">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-accent text-lg">Verify Your Email</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A verification link has been sent to <strong className="text-foreground">{userData.email}</strong>. 
                    Please check your inbox and verify your email before logging in.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Warning */}
            <div className="bg-destructive/10 rounded-xl p-5 mb-6 border border-destructive/20">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                <div className="text-sm text-destructive/90">
                  <strong className="text-destructive">Important Security Notice:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Save your login credentials securely</li>
                    <li>Verify your email before attempting to login</li>
                    <li>Never share your password with anyone</li>
                    {selectedPlan && <li>Complete your payment to activate your {selectedPlan.name} package</li>}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="flex-1">
                <Button variant="hero" size="lg" className="w-full bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald/90 hover:to-emerald-light/90 shadow-lg shadow-emerald/25">
                  Proceed to Login
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Didn't receive the email?{" "}
          <button className="text-accent font-medium hover:underline">
            Resend verification email
          </button>
        </p>
      </div>
    </div>
  );
};

const DetailRow = ({ 
  icon: Icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string;
  highlight?: boolean;
}) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl ${highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'}`}>
    <Icon className={`w-4 h-4 shrink-0 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
    <div className="min-w-0 flex-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-medium text-sm truncate ${highlight ? 'text-primary' : ''}`}>{value || '-'}</p>
    </div>
  </div>
);

export default RegistrationSuccess;
