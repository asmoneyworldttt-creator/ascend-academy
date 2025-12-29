import { useState } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle,
  IndianRupee,
  Bitcoin,
  Building,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import AffiliateSidebar from "@/components/layout/AffiliateSidebar";

const walletHistory = [
  { id: "W001", date: "2024-12-28", type: "credit", description: "Referral Commission", amount: 750, balance: 12500 },
  { id: "W002", date: "2024-12-27", type: "credit", description: "Level Income", amount: 200, balance: 11750 },
  { id: "W003", date: "2024-12-26", type: "debit", description: "Withdrawal to Bank", amount: -2000, balance: 11550 },
  { id: "W004", date: "2024-12-25", type: "credit", description: "Task Reward", amount: 50, balance: 13550 },
  { id: "W005", date: "2024-12-24", type: "credit", description: "Spillover Bonus", amount: 150, balance: 13500 },
];

const withdrawalHistory = [
  { id: "WD001", date: "2024-12-26", amount: 2000, method: "Bank Transfer", status: "approved", processedDate: "2024-12-27" },
  { id: "WD002", date: "2024-12-20", amount: 5000, method: "UPI", status: "approved", processedDate: "2024-12-21" },
  { id: "WD003", date: "2024-12-15", amount: 1500, method: "USDT", status: "pending", processedDate: null },
];

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState<"withdraw" | "history" | "withdrawals">("withdraw");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bank");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const walletBalance = 12500;
  const minWithdraw = 500;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (amount < minWithdraw) {
      toast({ title: "Error", description: `Minimum withdrawal is ₹${minWithdraw}`, variant: "destructive" });
      return;
    }
    if (amount > walletBalance) {
      toast({ title: "Error", description: "Insufficient balance", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    toast({ 
      title: "Withdrawal Requested!", 
      description: `₹${amount} will be processed within 24-48 hours.` 
    });
    setWithdrawAmount("");
  };

  return (
    <AffiliateSidebar>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">Wallet Management</h1>
              <p className="text-muted-foreground">Withdraw earnings & view transaction history</p>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-2xl border border-border/50">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-gradient-gold">₹{walletBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-xl w-fit">
          <Button 
            variant={activeTab === "withdraw" ? "hero" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("withdraw")}
          >
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Withdraw
          </Button>
          <Button 
            variant={activeTab === "history" ? "hero" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("history")}
          >
            <ArrowDownLeft className="w-4 h-4 mr-1" />
            Wallet History
          </Button>
          <Button 
            variant={activeTab === "withdrawals" ? "hero" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("withdrawals")}
          >
            <Clock className="w-4 h-4 mr-1" />
            Withdrawals
          </Button>
        </div>

        {/* Withdraw Form */}
        {activeTab === "withdraw" && (
          <div className="glass-card p-6 rounded-3xl">
            <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Withdraw Money
            </h2>

            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Amount to Withdraw</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    min={minWithdraw}
                    max={walletBalance}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum: ₹{minWithdraw} | Available: ₹{walletBalance.toLocaleString()}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${withdrawMethod === "bank" ? "ring-2 ring-primary" : ""}`}>
                    <RadioGroupItem value="bank" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Bank Transfer</p>
                        <p className="text-xs text-muted-foreground">INR</p>
                      </div>
                    </div>
                  </label>

                  <label className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${withdrawMethod === "upi" ? "ring-2 ring-primary" : ""}`}>
                    <RadioGroupItem value="upi" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">UPI</p>
                        <p className="text-xs text-muted-foreground">INR</p>
                      </div>
                    </div>
                  </label>

                  <label className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${withdrawMethod === "usdt" ? "ring-2 ring-primary" : ""}`}>
                    <RadioGroupItem value="usdt" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                        <Bitcoin className="w-5 h-5 text-emerald" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">USDT (TRC20)</p>
                        <p className="text-xs text-muted-foreground">Crypto</p>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <Button type="submit" variant="hero" className="w-full h-12" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="w-5 h-5 mr-2" />
                    Request Withdrawal
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Withdrawals are processed within 24-48 hours during business days.
            </p>
          </div>
        )}

        {/* Wallet History */}
        {activeTab === "history" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold font-display">Wallet Transaction History</h2>
            </div>
            <div className="divide-y divide-border/50">
              {walletHistory.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-emerald/10' : 'bg-destructive/10'
                    }`}>
                      {txn.type === 'credit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-emerald" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${txn.type === 'credit' ? 'text-emerald' : 'text-destructive'}`}>
                      {txn.type === 'credit' ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Bal: ₹{txn.balance.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Withdrawal History */}
        {activeTab === "withdrawals" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold font-display">Withdrawal Requests</h2>
            </div>
            <div className="divide-y divide-border/50">
              {withdrawalHistory.map((wd) => (
                <div key={wd.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      wd.status === 'approved' ? 'bg-emerald/10' : 'bg-primary/10'
                    }`}>
                      {wd.status === 'approved' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald" />
                      ) : (
                        <Clock className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">₹{wd.amount.toLocaleString()} via {wd.method}</p>
                      <p className="text-xs text-muted-foreground">Requested: {wd.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      wd.status === 'approved' 
                        ? 'bg-emerald/10 text-emerald' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {wd.status}
                    </span>
                    {wd.processedDate && (
                      <p className="text-xs text-muted-foreground mt-1">Processed: {wd.processedDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AffiliateSidebar>
  );
};

export default WalletPage;
