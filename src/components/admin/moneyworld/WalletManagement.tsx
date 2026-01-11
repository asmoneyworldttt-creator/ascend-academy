import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  Calendar,
  Loader2,
  Check,
  X,
  Plus,
  Minus,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WalletManagementProps {
  mode: "add" | "withdraw" | "history" | "withdrawal-history" | "adjust";
  onRefresh: () => void;
}

const WalletManagement = ({ mode, onRefresh }: WalletManagementProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  // Form states for adjust mode
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [mode]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (mode === "add") {
        // Fetch pending deposit proofs
        const { data: proofs, error } = await supabase
          .from("payment_proofs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Fetch user profiles
        const userIds = [...new Set(proofs?.map(p => p.user_id) || [])];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, full_name, email")
          .in("user_id", userIds);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

        const proofsWithProfiles = proofs?.map(p => ({
          ...p,
          profile: profileMap.get(p.user_id),
        })) || [];

        setData(proofsWithProfiles);
      } else if (mode === "withdraw" || mode === "withdrawal-history") {
        // Fetch withdrawal requests
        const { data: withdrawals, error } = await supabase
          .from("withdrawal_requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Fetch user profiles
        const userIds = [...new Set(withdrawals?.map(w => w.user_id) || [])];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, full_name, email")
          .in("user_id", userIds);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

        const withdrawalsWithProfiles = withdrawals?.map(w => ({
          ...w,
          profile: profileMap.get(w.user_id),
        })) || [];

        setData(withdrawalsWithProfiles);
      } else if (mode === "history") {
        // Fetch wallet history
        const { data: history, error } = await supabase
          .from("wallet_history")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);

        if (error) throw error;

        // Fetch user profiles
        const userIds = [...new Set(history?.map(h => h.user_id) || [])];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, full_name")
          .in("user_id", userIds);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p.full_name]) || []);

        const historyWithNames = history?.map(h => ({
          ...h,
          user_name: profileMap.get(h.user_id) || "Unknown",
        })) || [];

        setData(historyWithNames);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleApproveDeposit = async (item: any, paymentType: "INR" | "USDT") => {
    setProcessing(true);
    try {
      // Update payment proof status
      await supabase
        .from("payment_proofs")
        .update({ status: "approved", processed_at: new Date().toISOString() })
        .eq("id", item.id);

      // Get or create agent_income record
      const { data: existingIncome } = await supabase
        .from("agent_income")
        .select("*")
        .eq("user_id", item.user_id)
        .single();

      if (existingIncome) {
        await supabase
          .from("agent_income")
          .update({ wallet: Number(existingIncome.wallet) + Number(item.amount) })
          .eq("user_id", item.user_id);
      } else {
        await supabase
          .from("agent_income")
          .insert({ user_id: item.user_id, wallet: item.amount });
      }

      // Add to wallet history
      await supabase.from("wallet_history").insert({
        user_id: item.user_id,
        amount: item.amount,
        status: "credit",
        description: `Wallet Recharge (${paymentType})`,
        reference_id: item.id,
        reference_type: "deposit",
      });

      toast({ title: "Deposit Approved", description: `₹${item.amount} added to wallet` });
      fetchData();
      onRefresh();
    } catch (error) {
      console.error("Error approving deposit:", error);
      toast({ title: "Error", description: "Failed to approve deposit", variant: "destructive" });
    }
    setProcessing(false);
  };

  const handleRejectDeposit = async (item: any) => {
    setProcessing(true);
    try {
      await supabase
        .from("payment_proofs")
        .update({ status: "rejected", processed_at: new Date().toISOString() })
        .eq("id", item.id);

      toast({ title: "Deposit Rejected", variant: "destructive" });
      fetchData();
      onRefresh();
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
    setProcessing(false);
  };

  const handleApproveWithdrawal = async (item: any) => {
    setProcessing(true);
    try {
      const deduction = Number(item.amount) * 0.05;
      const payableAmount = Number(item.amount) - deduction;

      // Deduct from wallet
      const { data: existingIncome } = await supabase
        .from("agent_income")
        .select("wallet")
        .eq("user_id", item.user_id)
        .single();

      if (existingIncome && Number(existingIncome.wallet) >= Number(item.amount)) {
        await supabase
          .from("agent_income")
          .update({ wallet: Number(existingIncome.wallet) - Number(item.amount) })
          .eq("user_id", item.user_id);

        // Update withdrawal status
        await supabase
          .from("withdrawal_requests")
          .update({
            status: "approved",
            processed_at: new Date().toISOString(),
          })
          .eq("id", item.id);

        // Add to wallet history
        await supabase.from("wallet_history").insert({
          user_id: item.user_id,
          amount: item.amount,
          status: "debit",
          description: "Withdrawal",
          reference_id: item.id,
          reference_type: "withdrawal",
        });

        toast({ title: "Withdrawal Approved", description: `₹${payableAmount} (after 5% deduction)` });
        fetchData();
        onRefresh();
      } else {
        toast({ title: "Insufficient Balance", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast({ title: "Error", description: "Failed to approve withdrawal", variant: "destructive" });
    }
    setProcessing(false);
  };

  const handleRejectWithdrawal = async (item: any) => {
    setProcessing(true);
    try {
      await supabase
        .from("withdrawal_requests")
        .update({ status: "rejected", processed_at: new Date().toISOString() })
        .eq("id", item.id);

      toast({ title: "Withdrawal Rejected", variant: "destructive" });
      fetchData();
      onRefresh();
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
    }
    setProcessing(false);
  };

  const handleAdjustBalance = async (operation: "increase" | "decrease") => {
    if (!agentId || !amount) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    setProcessing(true);
    try {
      // Find user by referral code or user_id
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id")
        .or(`referral_code.eq.${agentId},user_id.eq.${agentId}`)
        .single();

      if (!profile) {
        toast({ title: "Agent not found", variant: "destructive" });
        setProcessing(false);
        return;
      }

      const { data: existingIncome } = await supabase
        .from("agent_income")
        .select("wallet")
        .eq("user_id", profile.user_id)
        .single();

      const currentWallet = Number(existingIncome?.wallet || 0);
      const adjustAmount = Number(amount);
      const newWallet = operation === "increase" 
        ? currentWallet + adjustAmount 
        : currentWallet - adjustAmount;

      if (existingIncome) {
        await supabase
          .from("agent_income")
          .update({ wallet: newWallet })
          .eq("user_id", profile.user_id);
      } else {
        await supabase
          .from("agent_income")
          .insert({ user_id: profile.user_id, wallet: newWallet });
      }

      // Add to wallet history
      await supabase.from("wallet_history").insert({
        user_id: profile.user_id,
        amount: adjustAmount,
        status: operation === "increase" ? "credit" : "debit",
        description: reason || `Manual ${operation} by admin`,
      });

      toast({
        title: `Balance ${operation === "increase" ? "Increased" : "Decreased"}`,
        description: `₹${adjustAmount} ${operation === "increase" ? "added to" : "deducted from"} wallet`,
      });

      setAgentId("");
      setAmount("");
      setReason("");
      onRefresh();
    } catch (error) {
      console.error("Error adjusting balance:", error);
      toast({ title: "Error", description: "Failed to adjust balance", variant: "destructive" });
    }
    setProcessing(false);
  };

  const filteredData = data.filter((item) => {
    const name = item.profile?.full_name || item.user_name || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingItems = mode === "add" || mode === "withdraw" 
    ? filteredData.filter(item => item.status === "pending")
    : filteredData;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Adjust Balance Form
  if (mode === "adjust") {
    return (
      <div className="max-w-md mx-auto">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold">Adjust Wallet Balance</h2>
          <div className="space-y-4">
            <div>
              <Label>Agent ID / Referral Code</Label>
              <Input
                placeholder="Enter agent ID or referral code"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
            </div>
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label>Reason (Optional)</Label>
              <Textarea
                placeholder="Enter reason for adjustment"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => handleAdjustBalance("increase")}
                disabled={processing}
              >
                <Plus className="w-4 h-4 mr-2" />
                Increase
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleAdjustBalance("decrease")}
                disabled={processing}
              >
                <Minus className="w-4 h-4 mr-2" />
                Decrease
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Status: {statusFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("approved")}>Approved</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Agent</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Amount</th>
                {(mode === "add" || mode === "withdraw") && (
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                    {mode === "add" ? "Transaction ID" : "Bank Details"}
                  </th>
                )}
                {mode === "history" && (
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Description</th>
                )}
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Date</th>
                {(mode === "add" || mode === "withdraw") && (
                  <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <p className="font-medium">No records found</p>
                  </td>
                </tr>
              ) : (
                pendingItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="font-bold text-white text-sm">
                            {(item.profile?.full_name || item.user_name || "U").charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {item.profile?.full_name || item.user_name || "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.profile?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "font-bold text-lg",
                        mode === "history"
                          ? item.status === "credit" ? "text-emerald-500" : "text-destructive"
                          : "text-emerald-500"
                      )}>
                        {mode === "history" && (item.status === "credit" ? "+" : "-")}
                        ₹{Number(item.amount).toLocaleString()}
                      </span>
                    </td>
                    {mode === "add" && (
                      <td className="p-4">
                        <p className="font-mono text-sm">{item.transaction_id || "N/A"}</p>
                        {item.proof_image && (
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Proof
                          </Button>
                        )}
                      </td>
                    )}
                    {mode === "withdraw" && (
                      <td className="p-4">
                        {item.bank_details && (
                          <div className="text-sm">
                            <p className="font-medium">{item.bank_details.accountName}</p>
                            <p className="text-muted-foreground font-mono text-xs">
                              {item.bank_details.accountNumber}
                            </p>
                          </div>
                        )}
                      </td>
                    )}
                    {mode === "history" && (
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </td>
                    )}
                    <td className="p-4">
                      {item.status === "pending" && (
                        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>
                      )}
                      {item.status === "approved" && (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Approved</Badge>
                      )}
                      {item.status === "rejected" && (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>
                      )}
                      {item.status === "credit" && (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Credit
                        </Badge>
                      )}
                      {item.status === "debit" && (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Debit
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    {(mode === "add" || mode === "withdraw") && item.status === "pending" && (
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => mode === "add" ? handleRejectDeposit(item) : handleRejectWithdrawal(item)}
                            disabled={processing}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          {mode === "add" ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-emerald-500 hover:bg-emerald-500/10"
                                onClick={() => handleApproveDeposit(item, "INR")}
                                disabled={processing}
                              >
                                INR
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:bg-blue-500/10"
                                onClick={() => handleApproveDeposit(item, "USDT")}
                                disabled={processing}
                              >
                                USDT
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-emerald-500 hover:bg-emerald-500/10"
                              onClick={() => handleApproveWithdrawal(item)}
                              disabled={processing}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Image Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          {selectedItem?.proof_image && (
            <img
              src={selectedItem.proof_image}
              alt="Payment proof"
              className="w-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletManagement;