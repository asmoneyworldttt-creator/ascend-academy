import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  };

  const benefits = [
    "Lifetime access to courses",
    "24/7 mentor support",
    "Income opportunities",
    "Community access",
  ];

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
            Start Your Journey to <span className="text-primary">Financial Freedom</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed max-w-lg">
            Join thousands of successful learners who have transformed their careers and achieved their income goals.
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-secondary-foreground/90">
                <CheckCircle className="w-5 h-5 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/">
              <img src={logo} alt="Skill Learners" className="h-16 w-auto mx-auto mb-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold font-display text-center mb-2">Create an Account</h2>
            <p className="text-muted-foreground text-center mb-8">Enter your details to get started</p>

            <form onSubmit={handleSubmit} className="space-y-5" action="request_handler.php" method="post">
              <div>
                <label className="block text-sm font-medium mb-2">Sponsor ID (Optional)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-muted-foreground font-medium">
                    3T
                  </span>
                  <input
                    type="text"
                    name="sps_id"
                    pattern="[0-9]{6}"
                    value={formData.sponsorId}
                    onChange={(e) => setFormData({ ...formData, sponsorId: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-r-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Sponsor ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="user_mob"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="user_password"
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

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <Button type="submit" name="register_btn" variant="hero" size="lg" className="w-full">
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
