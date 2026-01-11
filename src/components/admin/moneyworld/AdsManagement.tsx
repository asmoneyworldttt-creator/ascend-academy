import { useState, useEffect } from "react";
import { Loader2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdsManagement = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", vendor: "" });
  const { toast } = useToast();

  useEffect(() => { fetchAds(); }, []);

  const fetchAds = async () => {
    setLoading(true);
    const { data } = await supabase.from("ads_management").select("*").order("created_at", { ascending: false });
    setAds(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!form.title) { toast({ title: "Enter title", variant: "destructive" }); return; }
    await supabase.from("ads_management").insert({ ads_title: form.title, ads_vendor: form.vendor });
    toast({ title: "Ad Created" });
    setForm({ title: "", vendor: "" });
    fetchAds();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("ads_management").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchAds();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-2xl max-w-lg space-y-4">
        <h3 className="font-bold text-lg">Create Ad</h3>
        <div className="grid gap-3">
          <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Vendor</Label><Input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></div>
          <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" />Post Ad</Button>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">ID</th><th className="text-left p-4">Title</th><th className="text-left p-4">Vendor</th><th className="text-left p-4">Posted</th><th className="text-right p-4">Actions</th></tr></thead>
          <tbody>{ads.map((a, i) => <tr key={a.id} className="border-b"><td className="p-4 font-mono">W{String(i + 1).padStart(3, "0")}</td><td className="p-4 font-medium">{a.ads_title}</td><td className="p-4">{a.ads_vendor || "-"}</td><td className="p-4 text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td><td className="p-4 text-right"><Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(a.id)}><Trash2 className="w-4 h-4" /></Button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdsManagement;