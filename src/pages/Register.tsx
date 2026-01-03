import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, GraduationCap, Wallet, Users, Crown, Star, Gem, Trophy, Check, Loader2, ChevronDown, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { countries, getStatesByCountry } from "@/data/countries";
import logo from "@/assets/logo.png";

const planData: Record<string, { name: string; displayName: string; nickname: string; tagline: string; icon: React.ComponentType<any>; color: string; benefits: string[] }> = {
  SPARK: { name: "SPARK", displayName: "Spark", nickname: "Pro-Lite", tagline: "Ignite Your Creative Fire", icon: Star, color: "from-orange-500 to-rose-600", benefits: ["100GB+ Editing Assets", "4K Video Templates", "Audio & SFX Library", "Commercial License"] },
  MOMENTUM: { name: "MOMENTUM", displayName: "Momentum", nickname: "Grow-Fast", tagline: "Build Unstoppable Growth", icon: Sparkles, color: "from-cyan-500 to-blue-600", benefits: ["Social Media Courses", "YouTube Monetization", "Instagram Growth", "Content Templates"] },
  SUMMIT: { name: "SUMMIT", displayName: "Summit", nickname: "Biz-Pro", tagline: "Conquer Every Market", icon: Crown, color: "from-emerald-500 to-teal-600", benefits: ["Affiliate Marketing", "E-commerce Training", "Direct Selling", "Sales Funnels"] },
  TITAN: { name: "TITAN", displayName: "Titan", nickname: "Elite-Flow", tagline: "Dominate Digital Marketing", icon: Gem, color: "from-amber-500 to-yellow-500", benefits: ["Digital Marketing Pro", "Facebook & Google Ads", "SEO Mastery", "Lead Generation"] },
  LEGACY: { name: "LEGACY", displayName: "Legacy", nickname: "Ultra-Max", tagline: "Build Generational Wealth", icon: Trophy, color: "from-violet-600 to-purple-700", benefits: ["Financial Trading", "Crypto Basics", "Live Sessions", "Trading Signals"] },
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlanName = searchParams.get("plan");
  const selectedCourse = searchParams.get("course");
  const selectedPlan = selectedPlanName ? planData[selectedPlanName] : null;
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    sponsorId: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    address: "",
    pincode: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [availableStates, setAvailableStates] = useState<string[]>([]);

  // Update states when country changes
  useEffect(() => {
    if (formData.country) {
      const states = getStatesByCountry(formData.country);
      setAvailableStates(states);
      setFormData(prev => ({ ...prev, state: "" }));
    } else {
      setAvailableStates([]);
    }
  }, [formData.country]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate("/user-home", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.name,
      phone: formData.phone,
      referred_by: formData.sponsorId || undefined,
    });

    if (error) {
      let errorMessage = error.message;
      
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please login instead.";
      }
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Registration Successful! 🎉",
      description: "Your account has been created. Redirecting...",
    });

    // Store selected plan/course in sessionStorage for post-login popup
    if (selectedPlanName) {
      sessionStorage.setItem("selectedPlan", selectedPlanName);
    }
    if (selectedCourse) {
      sessionStorage.setItem("selectedCourse", selectedCourse);
    }

    navigate("/registration-success", {
      state: {
        userData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          sponsorId: formData.sponsorId,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          pincode: formData.pincode,
          dob: formData.dob,
          plan: selectedPlanName,
        }
      }
    });
  };

  const benefits = [
    { icon: GraduationCap, text: "Lifetime access to all courses" },
    { icon: Users, text: "24/7 community & mentor support" },
    { icon: Wallet, text: "Earn through referral program" },
    { icon: Sparkles, text: "Exclusive bonus content" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Premium Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        <div className="absolute top-32 left-16 w-80 h-80 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-24 w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl animate-pulse delay-700" />
        
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
          <Link to="/" className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-accent/25 blur-2xl rounded-full" />
            <img src={logo} alt="Skill Learners" className="relative h-20 w-auto drop-shadow-[0_0_20px_rgba(20,184,166,0.5)]" />
          </Link>
          
          {selectedPlan ? (
            <div className="mb-8">
              <div className="glass-card p-6 rounded-2xl border-2 border-accent/30 bg-accent/5 neon-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center shadow-lg`}>
                    <selectedPlan.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-accent font-medium">You are starting your journey with</p>
                    <h3 className="text-2xl font-bold font-tier tracking-wider">{selectedPlan.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedPlan.tagline}</p>
                  </div>
                </div>
                {selectedCourse && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <p className="text-xs text-primary font-medium">🎯 Your Selected Interest</p>
                    <p className="text-sm font-medium">{selectedCourse}</p>
                  </div>
                )}
                <p className="text-muted-foreground text-sm mb-4">Here's what you'll unlock:</p>
                <ul className="space-y-2">
                  {selectedPlan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl xl:text-5xl font-bold font-display mb-6 leading-tight">
                Start Your Journey to{" "}
                <span className="text-gradient-teal">Financial Freedom</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-md">
                Join thousands of learners who transformed their careers.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Glassmorphic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-background via-background to-muted/30 min-h-screen lg:min-h-0 overflow-y-auto">
        <div className="w-full max-w-lg py-6">
          {/* Mobile Logo & Plan Summary */}
          <div className="lg:hidden text-center mb-4">
            <Link to="/" className="relative inline-block">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
              <img src={logo} alt="Skill Learners" className="relative h-14 w-auto mx-auto mb-2 drop-shadow-[0_0_15px_rgba(20,184,166,0.4)]" />
            </Link>
            <h1 className="text-lg font-bold font-display">
              {selectedPlan ? `Join with ${selectedPlan.name} Plan` : <span>Join <span className="text-gradient-teal">Skill Learners</span></span>}
            </h1>
          </div>

          {/* Mobile Plan Summary */}
          {selectedPlan && (
            <div className="lg:hidden glass-card p-4 rounded-xl border border-accent/20 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                  <selectedPlan.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-accent">Selected Plan</p>
                  <p className="font-bold">{selectedPlan.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Glass Card Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-[2rem] blur-xl opacity-50" />
            
            <div className="relative glass-card p-5 md:p-6 rounded-2xl border border-border/50 backdrop-blur-xl">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold font-display">Create Your Account</h2>
                <p className="text-xs text-muted-foreground mt-1">Enter your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Sponsor ID */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Referral Code <span className="text-muted-foreground">(Optional)</span></label>
                  <input
                    type="text"
                    value={formData.sponsorId}
                    onChange={(e) => setFormData({ ...formData, sponsorId: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm uppercase"
                    placeholder="Enter referral code"
                    disabled={isLoading}
                  />
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Full Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Email <span className="text-destructive">*</span></label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                      placeholder="john@example.com"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Mobile <span className="text-destructive">*</span></label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                      placeholder="+91 9876543210"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Date of Birth <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                    disabled={isLoading}
                  />
                </div>

                {/* Country & State - Smart Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Country <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">State <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm appearance-none cursor-pointer disabled:opacity-50"
                        disabled={isLoading || !formData.country}
                      >
                        <option value="">{formData.country ? "Select State" : "Select Country first"}</option>
                        {availableStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Full Address <span className="text-destructive">*</span></label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm resize-none"
                    placeholder="Enter your full address"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Pincode / ZIP Code <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                    placeholder="Enter pincode"
                    disabled={isLoading}
                  />
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Password <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all pr-10 text-sm"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Confirm Password <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all pr-10 text-sm"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">Terms & Conditions</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-accent font-semibold hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Back to Home */}
          <p className="text-center text-sm text-muted-foreground mt-4">
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
