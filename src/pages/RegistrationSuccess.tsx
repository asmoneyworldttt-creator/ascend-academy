import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, ArrowLeft, Copy, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface RegistrationSuccessProps {
  userData?: {
    name: string;
    agentId: string;
    email: string;
    phone: string;
  };
}

const RegistrationSuccess = ({ userData }: RegistrationSuccessProps) => {
  const { toast } = useToast();
  
  // Default data for demo
  const user = userData || {
    name: "John Doe",
    agentId: "3T123456",
    email: "john@example.com",
    phone: "+91 9876543210",
  };

  const copyAgentId = () => {
    navigator.clipboard.writeText(user.agentId);
    toast({
      title: "Copied!",
      description: "Agent ID copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-background to-primary/5" />
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-emerald/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse delay-500" />
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald/30"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <div className="relative w-full max-w-lg z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-14 w-auto mx-auto" />
          </Link>
        </div>

        {/* Success Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald/30 via-primary/20 to-emerald/30 rounded-[2rem] blur-xl opacity-60" />
          
          <div className="relative glass-card p-8 lg:p-10 rounded-3xl text-center border border-emerald/20">
            {/* Success Icon with Animation */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald-light animate-ping opacity-20" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg shadow-emerald/30 animate-scale-in">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold font-display">
                Registration <span className="text-gradient-gold">Successful!</span>
              </h1>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <p className="text-muted-foreground mb-8">
              Welcome to Skill Learners! Please verify your email to activate your account.
            </p>

            {/* User Details Summary */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-6 text-left border border-border/50">
              <h3 className="font-bold mb-4 text-center text-sm uppercase tracking-wider text-muted-foreground">Your Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/20">
                  <span className="text-sm text-muted-foreground">Agent ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-lg">{user.agentId}</span>
                    <button onClick={copyAgentId} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                      <Copy className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="font-medium text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Email Verification Notice */}
            <div className="glass-card p-5 rounded-xl mb-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-teal-dark flex items-center justify-center shrink-0 shadow-lg shadow-accent/25">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-accent">Check Your Email</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We've sent a verification link to <strong className="text-foreground">{user.email}</strong>. Click the link to activate your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-destructive/10 rounded-xl p-4 mb-6 border border-destructive/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive/90 text-left">
                  <strong>Important:</strong> Save your Agent ID (<strong>{user.agentId}</strong>) for login. You cannot access your account until email is verified.
                </p>
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

export default RegistrationSuccess;