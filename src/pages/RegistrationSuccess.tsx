import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, ArrowLeft, Copy, Shield, Sparkles, User, Phone, MapPin, Key, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface UserData {
  name: string;
  agentId: string;
  password: string;
  email: string;
  phone: string;
  sponsorId?: string;
  country?: string;
  state?: string;
  address?: string;
  pincode?: string;
  plan?: string;
}

const RegistrationSuccess = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Get data from navigation state or use defaults
  const userData: UserData = location.state?.userData || {
    name: "John Doe",
    agentId: "3T123456",
    password: "••••••••",
    email: "john@example.com",
    phone: "+91 9876543210",
    sponsorId: "3T000001",
    country: "India",
    state: "Maharashtra",
    address: "123 Main Street, Mumbai",
    pincode: "400001",
    plan: "Gold",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald/5 via-background to-primary/5" />
      <div className="fixed top-1/4 left-10 w-64 h-64 rounded-full bg-emerald/10 blur-3xl animate-pulse" />
      <div className="fixed bottom-1/4 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse delay-500" />
      
      {/* Confetti-like particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="fixed w-2 h-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--emerald))' : 'hsl(var(--accent))',
            opacity: 0.3,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      <div className="relative max-w-2xl mx-auto py-8 z-10">
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

        {/* Success Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald/30 via-primary/20 to-emerald/30 rounded-[2rem] blur-xl opacity-60" />
          
          <div className="relative glass-card p-6 lg:p-8 rounded-3xl border border-emerald/20">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald-light animate-ping opacity-20" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg shadow-emerald/30 animate-scale-in">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold font-display">
                  Welcome to <span className="text-gradient-gold">Skill Learners!</span>
                </h1>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Your registration is complete! Here's your account summary.
              </p>
            </div>

            {/* Credentials Card - Highlighted */}
            <div className="bg-gradient-to-r from-primary/10 via-card to-primary/10 rounded-2xl p-5 mb-6 border-2 border-primary/30 shadow-lg">
              <h3 className="font-bold text-center mb-4 flex items-center justify-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <span className="text-lg">Your Login Credentials</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Agent ID (Username)</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-primary">{userData.agentId}</span>
                    <button 
                      onClick={() => copyToClipboard(userData.agentId, "Agent ID")}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Password</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">{userData.password}</span>
                    <button 
                      onClick={() => copyToClipboard(userData.password, "Password")}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-primary/80 mt-3 font-medium">
                ⚠️ Please save these credentials securely. You'll need them to login.
              </p>
            </div>

            {/* Account Details */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-border/50">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Account Summary</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <DetailRow icon={User} label="Full Name" value={userData.name} />
                <DetailRow icon={Mail} label="Email" value={userData.email} />
                <DetailRow icon={Phone} label="Phone" value={userData.phone} />
                {userData.sponsorId && (
                  <DetailRow icon={User} label="Sponsor ID" value={userData.sponsorId} />
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
                {userData.plan && (
                  <DetailRow icon={Sparkles} label="Selected Plan" value={userData.plan} highlight />
                )}
                <DetailRow icon={Calendar} label="Registration Date" value={new Date().toLocaleDateString()} />
              </div>
            </div>

            {/* Email Verification Notice */}
            <div className="glass-card p-5 rounded-xl mb-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-teal-dark flex items-center justify-center shrink-0 shadow-lg shadow-accent/25">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-accent">Verify Your Email</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A verification link has been sent to <strong className="text-foreground">{userData.email}</strong>. 
                    Please verify your email before logging in.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Warning */}
            <div className="bg-destructive/10 rounded-xl p-4 mb-6 border border-destructive/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div className="text-sm text-destructive/90">
                  <strong>Important:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Save your Agent ID and Password securely</li>
                    <li>Verify your email before attempting to login</li>
                    <li>Do not share your credentials with anyone</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login" className="flex-1">
                <Button variant="hero" size="lg" className="w-full bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald/90 hover:to-emerald-light/90">
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
      <p className={`font-medium text-sm truncate ${highlight ? 'text-primary' : ''}`}>{value}</p>
    </div>
  </div>
);

export default RegistrationSuccess;
