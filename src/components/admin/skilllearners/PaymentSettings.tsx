import { useState, useEffect } from "react";
import { Loader2, Save, QrCode, Building, CreditCard, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    upi_id: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    account_holder: "",
    usdt_address: "",
    qr_code_url: "",
    payment_instructions: "",
  });
  const { toast } = useToast();

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    setLoading(true);
    // For now, we'll use localStorage since we don't have a settings table
    // In production, this would fetch from a database table
    const savedSettings = localStorage.getItem("payment_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      // Default values
      setSettings({
        upi_id: "skillhonors@upi",
        bank_name: "State Bank of India",
        account_number: "1234567890123456",
        ifsc_code: "SBIN0001234",
        account_holder: "Skill Learners",
        usdt_address: "TRC20_ADDRESS_HERE",
        qr_code_url: "",
        payment_instructions: "Please make the payment and share the transaction ID for verification.",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage (in production, save to database)
      localStorage.setItem("payment_settings", JSON.stringify(settings));
      
      toast({ title: "Settings Saved", description: "Payment settings have been updated successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          UPI Payment Details
        </h2>
        <div className="grid gap-4">
          <div>
            <Label>UPI ID</Label>
            <Input
              value={settings.upi_id}
              onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
              placeholder="yourname@upi"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This UPI ID will be shown to users for making payments
            </p>
          </div>
          <div>
            <Label>QR Code URL (Optional)</Label>
            <Input
              value={settings.qr_code_url}
              onChange={(e) => setSettings({ ...settings, qr_code_url: e.target.value })}
              placeholder="https://your-qr-code-image-url.png"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload your QR code image and paste the URL here
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          Bank Account Details
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Bank Name</Label>
            <Input
              value={settings.bank_name}
              onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
              placeholder="State Bank of India"
            />
          </div>
          <div>
            <Label>Account Holder Name</Label>
            <Input
              value={settings.account_holder}
              onChange={(e) => setSettings({ ...settings, account_holder: e.target.value })}
              placeholder="Skill Learners Pvt Ltd"
            />
          </div>
          <div>
            <Label>Account Number</Label>
            <Input
              value={settings.account_number}
              onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
              placeholder="1234567890123456"
            />
          </div>
          <div>
            <Label>IFSC Code</Label>
            <Input
              value={settings.ifsc_code}
              onChange={(e) => setSettings({ ...settings, ifsc_code: e.target.value })}
              placeholder="SBIN0001234"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
          <Bitcoin className="w-5 h-5 text-primary" />
          Crypto Payment Details
        </h2>
        <div>
          <Label>USDT Address (TRC20)</Label>
          <Input
            value={settings.usdt_address}
            onChange={(e) => setSettings({ ...settings, usdt_address: e.target.value })}
            placeholder="TRC20 wallet address"
            className="font-mono"
          />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold font-display mb-6">Payment Instructions</h2>
        <Textarea
          value={settings.payment_instructions}
          onChange={(e) => setSettings({ ...settings, payment_instructions: e.target.value })}
          placeholder="Enter instructions for users..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          This message will be shown to users on the payment page
        </p>
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Payment Settings
          </>
        )}
      </Button>
    </div>
  );
};

export default PaymentSettings;