import {
  Search,
  Filter,
  ChevronDown,
  Download,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  has_purchased: boolean | null;
  purchased_plan: string | null;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  country: string | null;
  state: string | null;
  address: string | null;
  dob: string | null;
  pincode: string | null;
}

interface UsersTableProps {
  users: UserProfile[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  planFilter: string;
  onPlanFilterChange: (plan: string) => void;
  onViewUser: (user: UserProfile) => void;
}

export const UsersTable = ({
  users,
  searchTerm,
  onSearchChange,
  planFilter,
  onPlanFilterChange,
  onViewUser,
}: UsersTableProps) => {
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.referral_code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan =
      planFilter === "all" ||
      (planFilter === "purchased" && u.has_purchased) ||
      (planFilter === "free" && !u.has_purchased);
    
    return matchesSearch && matchesPlan;
  });

  const uniquePlans = [...new Set(users.map((u) => u.purchased_plan).filter(Boolean))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or referral code..."
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
                Plan: {planFilter === "all" ? "All" : planFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onPlanFilterChange("all")}>
                All Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlanFilterChange("purchased")}>
                Purchased
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlanFilterChange("free")}>
                Free Users
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredUsers.length}</span> of{" "}
          <span className="font-medium text-foreground">{users.length}</span> users
        </span>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">User</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Location</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Plan</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Referral Code</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Joined</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((profile) => (
                <tr
                  key={profile.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                        <span className="font-bold text-primary-foreground text-sm">
                          {(profile.full_name || "U").charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {profile.full_name || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {profile.user_id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{profile.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{profile.phone || "N/A"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {profile.state || profile.country || "N/A"}
                    </div>
                  </td>
                  <td className="p-4">
                    {profile.has_purchased ? (
                      <Badge className="bg-emerald/10 text-emerald border-emerald/20">
                        {profile.purchased_plan}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted/50">
                        Free
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {profile.referral_code || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(profile.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => onViewUser(profile)}>
                            <Eye className="w-4 h-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Shield className="w-4 h-4" /> Manage Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
