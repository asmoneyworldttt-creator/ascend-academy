import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  // Default data for demo
  const user = userData || {
    name: "John Doe",
    agentId: "3T123456",
    email: "john@example.com",
    phone: "+91 9876543210",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-emerald/15 blur-3xl" />

      <div className="relative w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-16 w-auto mx-auto" />
          </Link>
        </div>

        {/* Success Card */}
        <div className="glass-card p-8 lg:p-12 rounded-3xl text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold font-display mb-3">
            Registration <span className="text-gradient-gold">Successful!</span> 🎉
          </h1>
          <p className="text-muted-foreground mb-8">
            Congratulations! Your account has been created. Please verify your email to activate your account.
          </p>

          {/* User Details Summary */}
          <div className="bg-muted/50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold mb-4 text-center">Your Account Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-card rounded-xl">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-xl">
                <span className="text-muted-foreground">Agent ID</span>
                <span className="font-bold text-primary">{user.agentId}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-xl">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-xl">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Email Verification Notice */}
          <div className="glass-card p-4 rounded-xl mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Verify Your Email</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification link to <strong>{user.email}</strong>. 
                  Please check your inbox and click the link to activate your account.
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-destructive/10 rounded-xl p-4 mb-8">
            <p className="text-sm text-destructive font-medium">
              ⚠️ Important: Please save your Agent ID (<strong>{user.agentId}</strong>) for login. 
              You won't be able to access your account until your email is verified.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login" className="flex-1">
              <Button variant="hero" size="lg" className="w-full">
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

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Didn't receive the email?{" "}
          <button className="text-primary font-medium hover:underline">
            Resend verification email
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
