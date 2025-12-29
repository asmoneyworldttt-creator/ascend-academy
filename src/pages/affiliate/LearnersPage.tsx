import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search,
  Filter,
  Calendar,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AffiliateSidebar from "@/components/layout/AffiliateSidebar";

// Mock data
const learnersData = [
  { id: "3T789456", name: "Priya Sharma", email: "priya@example.com", registeredDate: "2024-12-15", status: "active", package: "Gold", purchaseDate: "2024-12-16" },
  { id: "3T789457", name: "Rahul Verma", email: "rahul@example.com", registeredDate: "2024-12-14", status: "active", package: "Silver", purchaseDate: "2024-12-14" },
  { id: "3T789458", name: "Ananya Patel", email: "ananya@example.com", registeredDate: "2024-12-13", status: "inactive", package: null, purchaseDate: null },
  { id: "3T789459", name: "Vikram Kumar", email: "vikram@example.com", registeredDate: "2024-12-12", status: "active", package: "Diamond", purchaseDate: "2024-12-12" },
  { id: "3T789460", name: "Neha Singh", email: "neha@example.com", registeredDate: "2024-12-10", status: "inactive", package: null, purchaseDate: null },
  { id: "3T789461", name: "Arjun Reddy", email: "arjun@example.com", registeredDate: "2024-12-08", status: "active", package: "Starter", purchaseDate: "2024-12-09" },
];

const LearnersPage = () => {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [search, setSearch] = useState("");

  const filteredLearners = learnersData.filter(learner => {
    const matchesFilter = filter === "all" || learner.status === filter;
    const matchesSearch = learner.name.toLowerCase().includes(search.toLowerCase()) || 
                         learner.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: learnersData.length,
    active: learnersData.filter(l => l.status === "active").length,
    inactive: learnersData.filter(l => l.status === "inactive").length,
  };

  return (
    <AffiliateSidebar>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">Learners / Students</h1>
          <p className="text-muted-foreground">Manage and track your referred users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`glass-card p-4 rounded-2xl text-left transition-all ${filter === "all" ? "ring-2 ring-primary" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Referrals</p>
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`glass-card p-4 rounded-2xl text-left transition-all ${filter === "active" ? "ring-2 ring-emerald" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Active (Purchased)</p>
          </button>

          <button
            onClick={() => setFilter("inactive")}
            className={`glass-card p-4 rounded-2xl text-left transition-all ${filter === "inactive" ? "ring-2 ring-destructive" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive to-destructive/70 flex items-center justify-center mb-3">
              <UserX className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.inactive}</p>
            <p className="text-sm text-muted-foreground">Inactive</p>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-4 font-semibold text-sm">User ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm hidden md:table-cell">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm">Reg. Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm hidden lg:table-cell">Package</th>
                </tr>
              </thead>
              <tbody>
                {filteredLearners.map((learner) => (
                  <tr key={learner.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{learner.id}</code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-foreground">{learner.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{learner.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground hidden md:table-cell">{learner.email}</td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {learner.registeredDate}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        learner.status === "active" 
                          ? "bg-emerald/10 text-emerald" 
                          : "bg-destructive/10 text-destructive"
                      }`}>
                        {learner.status === "active" ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {learner.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      {learner.package ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          <ShoppingCart className="w-3 h-3" />
                          {learner.package}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLearners.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No learners found</p>
            </div>
          )}
        </div>
      </div>
    </AffiliateSidebar>
  );
};

export default LearnersPage;
