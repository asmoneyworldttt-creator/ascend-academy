import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowLeft, 
  QrCode, 
  Copy, 
  Check, 
  Upload, 
  Clock,
  Shield,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { packages } from "@/data/packages";

const PaymentGateway = () => {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan") || "Creator Pack";
  const selectedPlan = packages.find(p => p.name === planName) || packages[0];
  
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const upiId = "skillhonors@upi";
  const upiQrData = `upi://pay?pa=${upiId}&pn=Skill%20Honors&am=${selectedPlan.price}&cu=INR`;

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    toast({ title: "Copied!", description: "UPI ID copied to clipboard" });
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast({ title: "Error", description: "Please enter the Transaction ID/UTR", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({ 
      title: "Payment Submitted!", 
      description: "Your payment is under verification. You'll be notified once approved." 
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-3xl max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-emerald animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold font-display mb-2">Payment Under Verification</h1>
          <p className="text-muted-foreground mb-6">
            Your payment for <span className="text-primary font-semibold">{selectedPlan.name}</span> is being verified by our team. 
            This usually takes 15-30 minutes during business hours.
          </p>
          
          <div className="bg-muted/50 rounded-2xl p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              What happens next?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                Admin will verify your Transaction ID
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                You'll receive an email & notification upon approval
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                Course will be unlocked in your dashboard
              </li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/user-home")}>
              Go to Dashboard
            </Button>
            <Button variant="hero" className="flex-1" onClick={() => navigate("/dashboard/courses")}>
              View Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link to="/">
            <img src={logo} alt="Skill Honors" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
          </Link>
          <span className="text-xl font-bold font-display ml-2">Payment</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="glass-card p-6 rounded-3xl h-fit order-2 lg:order-1">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald" />
                Order Summary
              </h2>
              
              <div className={`p-5 rounded-2xl bg-gradient-to-br ${selectedPlan.color} mb-4`}>
                <h3 className="text-xl font-bold text-white mb-1">{selectedPlan.name}</h3>
                <p className="text-white/80 text-sm mb-4">{selectedPlan.shortDesc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">₹{selectedPlan.price.toLocaleString()}</span>
                  <span className="text-white/60 line-through text-sm">₹{selectedPlan.mrp.toLocaleString()}</span>
                </div>
                {selectedPlan.savings > 0 && (
                  <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                    You save ₹{selectedPlan.savings.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">What's Included:</h4>
                {selectedPlan.features.slice(0, 5).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {selectedPlan.includes.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-primary font-medium">+ Includes FREE:</p>
                    {selectedPlan.includes.map((inc, idx) => (
                      <span key={idx} className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-1 mt-1">
                        {inc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-emerald/10 rounded-xl border border-emerald/20">
                <p className="text-sm font-medium text-emerald flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  100% Secure Payment
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your payment details are safe with us. Manual verification ensures no fraud.
                </p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="glass-card p-6 rounded-3xl order-1 lg:order-2">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Pay via UPI
              </h2>

              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4">
                  <div className="w-48 h-48 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Simulated QR Code Pattern */}
                    <div className="absolute inset-2 grid grid-cols-8 gap-0.5">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-white'}`} 
                        />
                      ))}
                    </div>
                    <QrCode className="w-12 h-12 text-muted-foreground absolute" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Scan with any UPI app</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* UPI ID */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Or pay directly to UPI ID:</Label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted/50 rounded-xl p-3 border border-border">
                    <code className="font-mono text-sm">{upiId}</code>
                  </div>
                  <Button variant="outline" size="icon" onClick={copyUPI}>
                    {copiedUPI ? <Check className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
                <p className="text-sm text-muted-foreground">Amount to Pay:</p>
                <p className="text-3xl font-bold text-primary">₹{selectedPlan.price.toLocaleString()}</p>
              </div>

              {/* Transaction ID Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="transactionId" className="text-sm font-medium mb-2 block">
                    Transaction ID / UTR Number *
                  </Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter 12-digit UTR or Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="h-12"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Find this in your UPI app's transaction history
                  </p>
                </div>

                <div>
                  <Label htmlFor="screenshot" className="text-sm font-medium mb-2 block">
                    Payment Screenshot (Optional)
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="screenshot"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="screenshot"
                      className="flex items-center justify-center gap-2 h-12 px-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {screenshot ? screenshot.name : "Upload payment screenshot"}
                      </span>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Submit for Verification
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentGateway;
