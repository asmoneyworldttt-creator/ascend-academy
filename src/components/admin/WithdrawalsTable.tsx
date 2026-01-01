import {
  Check,
  X,
  Search,
  Filter,
  ChevronDown,
  Download,
  Calendar,
  Banknote,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Json } from "@/integrations/supabase/types";

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  status: string | null;
  created_at: string;
  bank_details: Json | null;
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
}

interface WithdrawalsTableProps {
  withdrawals: Withdrawal[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onApproveWithdrawal: (withdrawalId: string) => void;
  onRejectWithdrawal: (withdrawalId: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const WithdrawalsTable = ({
  withdrawals,
  searchTerm,
  onSearchChange,
  onApproveWithdrawal,
  onRejectWithdrawal,
  statusFilter,
  onStatusFilterChange,
}: WithdrawalsTableProps) => {
  const filteredWithdrawals = withdrawals.filter((w) => {
    const matchesSearch =
      (w as any).profiles?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (w as any).profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-emerald/10 text-emerald border-emerald/20">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getBankDetails = (bankDetails: Json | null) => {
    if (!bankDetails || typeof bankDetails !== "object") return null;
    const details = bankDetails as Record<string, any>;
    return details;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("approved")}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("rejected")}>
                Rejected
              </DropdownMenuItem>
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
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  User
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Amount
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Bank Details
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Date
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Status
                </th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredWithdrawals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Banknote className="w-12 h-12 text-muted-foreground/50" />
                      <p className="font-medium">No withdrawals found</p>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm
                          ? "Try a different search term"
                          : "No pending withdrawals"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWithdrawals.map((withdrawal) => {
                  const bankDetails = getBankDetails(withdrawal.bank_details);
                  return (
                    <tr
                      key={withdrawal.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                            <span className="font-bold text-primary-foreground text-sm">
                              {((withdrawal as any).profiles?.full_name || "U").charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {(withdrawal as any).profiles?.full_name || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(withdrawal as any).profiles?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-xl text-emerald">
                          ₹{withdrawal.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        {bankDetails ? (
                          <div className="text-sm space-y-1">
                            <p className="font-medium">{bankDetails.accountName || "N/A"}</p>
                            <p className="text-muted-foreground font-mono text-xs">
                              {bankDetails.accountNumber || "N/A"}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {bankDetails.bankName || ""} • {bankDetails.ifsc || ""}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No bank details
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(withdrawal.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {withdrawal.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => onRejectWithdrawal(withdrawal.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-emerald hover:bg-emerald/10"
                                onClick={() => onApproveWithdrawal(withdrawal.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalsTable;
