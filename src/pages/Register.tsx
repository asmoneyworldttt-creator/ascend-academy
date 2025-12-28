import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, GraduationCap, Wallet, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sponsorId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", formData);
    // Navigate to success page with user data
    navigate("/registration-success");
  };

  const benefits = [
    { icon: GraduationCap, text: "Lifetime access to all courses" },
    { icon: Users, text: "24/7 community & mentor support" },
    { icon: Wallet, text: "Earn through referral program" },
    { icon: Sparkles, text: "Exclusive bonus content" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Premium Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        <div className="absolute top-32 left-16 w-80 h-80 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-24 w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-emerald/10 blur-3xl animate-pulse delay-300" />
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
            style={{
              top: `${15 + i * 10}%`,
              left: `${8 + i * 10}%`,
              animation: `float ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full">
          <Link to="/" className="mb-10">
            <img src={logo} alt="Skill Learners" className="h-16 w-auto" />
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-bold font-display mb-6 leading-tight">
            Start Your Journey to{" "}
            <span className="text-gradient-teal">Financial Freedom</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-md">
            Join thousands of learners who transformed their careers and achieved their income goals.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 group hover:border-accent/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <benefit.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Glassmorphic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-background via-background to-muted/30 min-h-screen lg:min-h-0 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <Link to="/">
              <img src={logo} alt="Skill Learners" className="h-12 w-auto mx-auto mb-3" />
            </Link>
            <h1 className="text-xl font-bold font-display">
              Join <span className="text-gradient-teal">Skill Learners</span>
            </h1>
          </div>

          {/* Glass Card Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-[2rem] blur-xl opacity-50" />
            
            <div className="relative glass-card p-6 md:p-8 rounded-3xl border border-border/50 backdrop-blur-xl">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/25">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold font-display">Create Your Account</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" action="request_handler.php" method="post">
                {/* Sponsor ID */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Sponsor ID <span className="text-muted-foreground">(Optional)</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border/50 bg-muted/50 text-muted-foreground font-bold text-sm backdrop-blur-sm">
                      3T
                    </span>
                    <input
                      type="text"
                      name="sps_id"
                      pattern="[0-9]{6}"
                      value={formData.sponsorId}
                      onChange={(e) => setFormData({ ...formData, sponsorId: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-r-xl bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50 text-sm"
                      placeholder="Sponsor ID"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50 text-sm"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone in 2 columns on larger screens */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Mobile</label>
                    <input
                      type="tel"
                      name="user_mob"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50 text-sm"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="user_password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all pr-12 backdrop-blur-sm placeholder:text-muted-foreground/50 text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    required
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">Terms & Conditions</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <Button type="submit" name="register_btn" variant="hero" size="lg" className="w-full bg-gradient-to-r from-accent to-teal-dark hover:from-accent/90 hover:to-teal-dark/90">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-accent font-semibold hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Back to Home */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link to="/" className="hover:text-accent transition-colors">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;