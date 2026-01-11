import { useState, useEffect } from "react";
import { Loader2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CoursesManagement = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", level: "Beginner", duration: "", package: "" });
  const { toast } = useToast();

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    await supabase.from("courses").insert({ course_name: form.name, description: form.description, price: Number(form.price), category: form.category, level: form.level, duration: form.duration, package: form.package });
    toast({ title: "Course Created" });
    setForm({ name: "", description: "", price: "", category: "", level: "Beginner", duration: "", package: "" });
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("courses").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchCourses();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-2xl max-w-lg space-y-4">
        <h3 className="font-bold text-lg">Add Course</h3>
        <div className="grid gap-3">
          <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Level</Label><Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem></SelectContent></Select></div>
            <div><Label>Duration</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 5 hours" /></div>
          </div>
          <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" />Add Course</Button>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Name</th><th className="text-left p-4">Price</th><th className="text-left p-4">Level</th><th className="text-right p-4">Actions</th></tr></thead>
          <tbody>{courses.map(c => <tr key={c.id} className="border-b"><td className="p-4 font-medium">{c.course_name}</td><td className="p-4 text-emerald-500 font-bold">₹{c.price}</td><td className="p-4">{c.level}</td><td className="p-4 text-right"><Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4" /></Button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesManagement;