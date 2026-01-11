import { useState, useEffect } from "react";
import { Loader2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProductsManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", price: "", discount: "" });
  const { toast } = useToast();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    await supabase.from("products").insert({ product_name: form.name, description: form.description, price: Number(form.price), discount: Number(form.discount || 0) });
    toast({ title: "Product Added" });
    setForm({ name: "", description: "", price: "", discount: "" });
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchProducts();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-2xl max-w-lg space-y-4">
        <h3 className="font-bold text-lg">Add Product</h3>
        <div className="grid gap-3">
          <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
            <div><Label>Discount (₹)</Label><Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} /></div>
          </div>
          <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" />Add Product</Button>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Name</th><th className="text-left p-4">Price</th><th className="text-left p-4">Discount</th><th className="text-right p-4">Actions</th></tr></thead>
          <tbody>{products.map(p => <tr key={p.id} className="border-b"><td className="p-4 font-medium">{p.product_name}</td><td className="p-4 text-emerald-500 font-bold">₹{p.price}</td><td className="p-4">₹{p.discount || 0}</td><td className="p-4 text-right"><Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4" /></Button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;