import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Users,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  has_purchased: boolean | null;
  purchased_plan: string | null;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  country: string | null;
  state: string | null;
  address: string | null;
  dob: string | null;
  pincode: string | null;
}

interface Payment {
  id: string;
  amount: number;
  plan_name: string;
  status: string | null;
  created_at: string;
  transaction_id: string | null;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
}

interface UserDetailModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const UserDetailModal = ({ user, onClose }: UserDetailModalProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
  });
  const [referredByName, setReferredByName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        // Fetch payment history
        const { data: paymentsData } = await supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.user_id)
          .order("created_at", { ascending: false });

        if (paymentsData) setPayments(paymentsData);

        // Fetch referral stats
        const { data: referralsData } = await supabase
          .from("profiles")
          .select("id, has_purchased")
          .eq("referred_by", user.id);

        if (referralsData) {
          const activeReferrals = referralsData.filter((r) => r.has_purchased).length;
          setReferralStats({
            totalReferrals: referralsData.length,
            activeReferrals,
            totalEarnings: activeReferrals * 100, // Placeholder calculation
          });
        }

        // Fetch referred by name
        if (user.referred_by) {
          const { data: referrerData } = await supabase
            .from("profiles")
            .select("full_name, referral_code")
            .eq("id", user.referred_by)
            .maybeSingle();

          if (referrerData) {
            setReferredByName(referrerData.full_name || referrerData.referral_code || "Unknown");
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [user]);

  const copyReferralCode = () => {
    if (user.referral_code) {
      navigator.clipboard.writeText(user.referral_code);
      toast({ title: "Copied!", description: "Referral code copied to clipboard" });
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-emerald" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-orange-500" />;
    }
  };

  const totalSpent = payments
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">
                {(user.full_name || "U").charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.full_name || "Unknown User"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.has_purchased ? (
                <Badge className="mt-1 bg-emerald/10 text-emerald border-emerald/20">
                  {user.purchased_plan}
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-1">
                  Free User
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              Contact Information
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>
                {[user.address, user.state, user.country, user.pincode]
                  .filter(Boolean)
                  .join(", ") || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>DOB: {user.dob || "N/A"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              Account Details
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>
                Joined: {new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{user.referral_code || "N/A"}</span>
              {user.referral_code && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={copyReferralCode}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>Referred by: {referredByName || "Direct signup"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>User ID: {user.user_id.slice(0, 8)}...</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-muted/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-emerald">
              ₹{totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-primary">
              {referralStats.totalReferrals}
            </p>
            <p className="text-xs text-muted-foreground">Total Referrals</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">
              {referralStats.activeReferrals}
            </p>
            <p className="text-xs text-muted-foreground">Active Referrals</p>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment History
          </h3>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payments found
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium text-sm">{payment.plan_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()} •{" "}
                        {payment.transaction_id || "No TXN ID"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "approved"
                          ? "bg-emerald/10 text-emerald border-emerald/20"
                          : payment.status === "rejected"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                      }
                    >
                      {payment.status || "pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
