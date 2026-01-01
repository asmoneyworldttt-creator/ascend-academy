import { useState } from "react";
import { Shield, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RoleManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  currentRole?: string;
  onRoleUpdated: () => void;
}

const RoleManagementDialog = ({
  isOpen,
  onClose,
  userId,
  userName,
  currentRole = "user",
  onRoleUpdated,
}: RoleManagementDialogProps) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateRole = async () => {
    setIsLoading(true);
    try {
      // First, delete existing role
      const { error: deleteError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        throw deleteError;
      }

      // Insert new role
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: selectedRole as "admin" | "moderator" | "user",
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Role Updated",
        description: `${userName}'s role has been updated to ${selectedRole}`,
      });

      onRoleUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <ShieldCheck className="w-4 h-4 text-red-500" />;
      case "moderator":
        return <Shield className="w-4 h-4 text-orange-500" />;
      default:
        return <ShieldX className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Manage User Role
          </DialogTitle>
          <DialogDescription>
            Change the role for <span className="font-medium text-foreground">{userName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-bold text-primary-foreground">
                  {userName?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-muted-foreground">
                  Current role: {currentRole}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("user")}
                      <span>User</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Standard access
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="moderator">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("moderator")}
                      <span>Moderator</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Limited admin access
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("admin")}
                      <span>Admin</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Full access
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole === "admin" && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-500">
                  <strong>Warning:</strong> Admin users have full access to the admin panel including user management, payments, and system settings.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateRole}
            disabled={isLoading || selectedRole === currentRole}
            className="bg-gradient-to-r from-primary to-accent"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Role"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleManagementDialog;
