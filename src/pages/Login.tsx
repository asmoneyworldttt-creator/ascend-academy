import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ agentId: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form will submit to request_handler.php in production
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-gradient-premium overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl float-animation" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-accent/15 blur-3xl float-animation-delayed" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20">
          <Link to="/">
            <img src={logo} alt="Skill Learners" className="h-20 w-auto mb-8" />
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-secondary-foreground mb-6">
            Welcome Back to <span className="text-primary">Skill Learners</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed max-w-lg">
            Continue your journey to financial freedom. Your courses, community, and earning opportunities await.
          </p>
          <div className="flex items-center gap-4 text-secondary-foreground/70">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-gold border-2 border-secondary" />
              ))}
            </div>
            <span>Join 10,000+ active learners</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/">
              <img src={logo} alt="Skill Learners" className="h-16 w-auto mx-auto mb-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold font-display text-center mb-2">Login to Your Account</h2>
            <p className="text-muted-foreground text-center mb-8">Enter your Agent ID & password to continue</p>

            <form onSubmit={handleSubmit} className="space-y-6" action="./request_handler.php" method="post">
              <div>
                <label className="block text-sm font-medium mb-2">Agent ID</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-muted-foreground font-medium">
                    3T
                  </span>
                  <input
                    type="text"
                    name="agent_id"
                    pattern="[0-9]{6}"
                    required
                    value={formData.agentId}
                    onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-r-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="agent_password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link to="/forgot" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" name="login_btn" variant="hero" size="lg" className="w-full">
                Login
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
