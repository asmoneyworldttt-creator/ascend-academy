import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: UserMetadata) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPasswordWithOTP: (email: string) => Promise<{ error: Error | null }>;
  verifyOTPAndResetPassword: (email: string, otp: string, newPassword: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  profile: UserProfile | null;
}

interface UserMetadata {
  full_name: string;
  phone?: string;
  referred_by?: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  referral_code: string | null;
  referred_by: string | null;
  has_purchased: boolean | null;
  purchased_plan: string | null;
  avatar_url: string | null;
  created_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signUp = async (email: string, password: string, metadata: UserMetadata) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: metadata.full_name,
            phone: metadata.phone,
          }
        }
      });

      if (error) {
        return { error };
      }

      // If referred_by is provided, update the profile
      if (metadata.referred_by && data.user) {
        // Find the referrer's profile by referral code
        const { data: referrerProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", metadata.referred_by.toUpperCase())
          .single();

        if (referrerProfile) {
          // Update the new user's profile with referrer info
          await supabase
            .from("profiles")
            .update({ referred_by: referrerProfile.id })
            .eq("user_id", data.user.id);
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Send OTP code for password reset (no clickable link)
  const resetPasswordWithOTP = async (email: string) => {
    try {
      // This sends an OTP code to the user's email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Don't include redirectTo - this will send an OTP code instead of a link
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Verify OTP and set new password
  const verifyOTPAndResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      // First verify the OTP
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery',
      });

      if (verifyError) {
        return { error: verifyError };
      }

      // Now update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        return { error: updateError };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signUp, 
      signIn, 
      signOut, 
      resetPasswordWithOTP, 
      verifyOTPAndResetPassword, 
      updatePassword, 
      profile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
