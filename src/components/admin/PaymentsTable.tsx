import { useState } from "react";
import {
  Eye,
  Check,
  X,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Download,
  MoreVertical,
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
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  plan_name: string;
  transaction_id: string | null;
  screenshot_url: string | null;
  status: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  };
}

interface PaymentsTableProps {
  payments: Payment[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewPayment: (payment: Payment) => void;
  onApprovePayment: (payment: Payment) => void;
  onRejectPayment: (paymentId: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const PaymentsTable = ({
  payments,
  searchTerm,
  onSearchChange,
  onViewPayment,
  onApprovePayment,
  onRejectPayment,
  statusFilter,
  onStatusFilterChange,
}: PaymentsTableProps) => {
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      (p as any).profiles?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (p as any).profiles?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      p.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-emerald/10 text-emerald border-emerald/20">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or transaction ID..."
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
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">User</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Plan</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Transaction ID</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Check className="w-12 h-12 text-muted-foreground/50" />
                      <p className="font-medium">No payments found</p>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm ? "Try a different search term" : "All caught up!"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                          <span className="font-bold text-primary-foreground text-sm">
                            {((payment as any).profiles?.full_name || "U").charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {(payment as any).profiles?.full_name || "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(payment as any).profiles?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                        {payment.plan_name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-emerald">
                        ₹{payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        {payment.transaction_id || "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(payment.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(payment.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewPayment(payment)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {payment.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => onRejectPayment(payment.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-emerald hover:bg-emerald/10"
                              onClick={() => onApprovePayment(payment)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
