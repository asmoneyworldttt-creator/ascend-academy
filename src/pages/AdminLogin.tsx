import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Lock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  // Check if already logged in and is admin
  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      if (user) {
        const { data } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });
        if (data === true) {
          navigate("/admin");
        }
      }
    };
    checkAdminAndRedirect();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        const { data: isAdminData } = await supabase.rpc("has_role", {
          _user_id: sessionData.session.user.id,
          _role: "admin",
        });

        if (isAdminData === true) {
          toast({
            title: "Welcome, Admin",
            description: "Successfully logged into admin panel",
          });
          navigate("/admin");
        } else {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You do not have admin privileges",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-background to-orange-950/10" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-card/80 backdrop-blur-xl shadow-2xl shadow-red-500/5">
          {/* Admin Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-sm">
              Authorized personnel only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-red-500/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-red-500/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Access Admin Panel
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              This area is restricted. Unauthorized access attempts are logged.
            </p>
          </div>
        </div>

        {/* Regular User Link */}
        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Not an admin? <span className="text-primary">User Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
