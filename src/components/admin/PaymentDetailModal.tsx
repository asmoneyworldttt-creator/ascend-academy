import { X, Check, Calendar, CreditCard, User, Mail, Phone, Hash, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface PaymentDetailModalProps {
  payment: Payment;
  onClose: () => void;
  onApprove: (payment: Payment) => void;
  onReject: (paymentId: string) => void;
}

export const PaymentDetailModal = ({
  payment,
  onClose,
  onApprove,
  onReject,
}: PaymentDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass-card rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Payment Details</h3>
            <p className="text-sm text-muted-foreground">
              Review and verify payment information
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-primary-foreground">
              {((payment as any).profiles?.full_name || "U").charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">
              {(payment as any).profiles?.full_name || "Unknown User"}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {(payment as any).profiles?.email || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs">Plan</span>
            </div>
            <p className="font-bold text-primary">{payment.plan_name}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs">Amount</span>
            </div>
            <p className="font-bold text-2xl text-emerald">
              ₹{payment.amount.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Hash className="w-4 h-4" />
              <span className="text-xs">UTR/Transaction ID</span>
            </div>
            <p className="font-mono text-sm">{payment.transaction_id || "N/A"}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Submitted On</span>
            </div>
            <p className="font-medium text-sm">
              {new Date(payment.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Screenshot */}
        {payment.screenshot_url && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Image className="w-4 h-4" />
              <span className="text-sm font-medium">Payment Screenshot</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img
                src={payment.screenshot_url}
                alt="Payment proof"
                className="w-full h-auto max-h-[400px] object-contain bg-muted/30"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        {payment.status === "pending" && (
          <div className="flex gap-3">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => onReject(payment.id)}
            >
              <X className="w-4 h-4 mr-2" /> Reject Payment
            </Button>
            <Button
              className="flex-1 bg-emerald hover:bg-emerald/90"
              onClick={() => onApprove(payment)}
            >
              <Check className="w-4 h-4 mr-2" /> Approve Payment
            </Button>
          </div>
        )}

        {payment.status !== "pending" && (
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground">
              This payment has been{" "}
              <span
                className={
                  payment.status === "approved"
                    ? "text-emerald font-medium"
                    : "text-destructive font-medium"
                }
              >
                {payment.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailModal;
