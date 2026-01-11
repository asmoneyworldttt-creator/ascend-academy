export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          is_broadcast: boolean
          message: string
          target_users: string[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_broadcast?: boolean
          message: string
          target_users?: string[] | null
        }
        Update: {
          created_at?: string
          id?: string
          is_broadcast?: boolean
          message?: string
          target_users?: string[] | null
        }
        Relationships: []
      }
      ads_management: {
        Row: {
          ads_title: string
          ads_vendor: string | null
          created_at: string
          id: string
          is_active: boolean
          media_url: string | null
        }
        Insert: {
          ads_title: string
          ads_vendor?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          media_url?: string | null
        }
        Update: {
          ads_title?: string
          ads_vendor?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          media_url?: string | null
        }
        Relationships: []
      }
      agent_income: {
        Row: {
          created_at: string
          id: string
          total_income: number
          updated_at: string
          user_id: string
          wallet: number
        }
        Insert: {
          created_at?: string
          id?: string
          total_income?: number
          updated_at?: string
          user_id: string
          wallet?: number
        }
        Update: {
          created_at?: string
          id?: string
          total_income?: number
          updated_at?: string
          user_id?: string
          wallet?: number
        }
        Relationships: []
      }
      app_tasks: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          is_active: boolean
          optional_url_1: string | null
          optional_url_2: string | null
          proof_type: string
          requirements: string | null
          task_amount: number
          task_description: string | null
          task_title: string
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          optional_url_1?: string | null
          optional_url_2?: string | null
          proof_type?: string
          requirements?: string | null
          task_amount?: number
          task_description?: string | null
          task_title: string
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          optional_url_1?: string | null
          optional_url_2?: string | null
          proof_type?: string
          requirements?: string | null
          task_amount?: number
          task_description?: string | null
          task_title?: string
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_holder: string | null
          account_number: string | null
          bank_name: string | null
          created_at: string
          id: string
          ifsc_code: string | null
          updated_at: string
          upi_id: string | null
          usdt_address: string | null
          user_id: string
        }
        Insert: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
          updated_at?: string
          upi_id?: string | null
          usdt_address?: string | null
          user_id: string
        }
        Update: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
          updated_at?: string
          upi_id?: string | null
          usdt_address?: string | null
          user_id?: string
        }
        Relationships: []
      }
      completed_app_tasks: {
        Row: {
          admin_notes: string | null
          created_at: string
          file_paths: string[] | null
          id: string
          payment_status: string
          processed_at: string | null
          task_id: string
          user_id: string
          user_id_proof: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          file_paths?: string[] | null
          id?: string
          payment_status?: string
          processed_at?: string | null
          task_id: string
          user_id: string
          user_id_proof?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          file_paths?: string[] | null
          id?: string
          payment_status?: string
          processed_at?: string | null
          task_id?: string
          user_id?: string
          user_id_proof?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "completed_app_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "app_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      completed_whatsapp_tasks: {
        Row: {
          admin_notes: string | null
          created_at: string
          file_paths: string[] | null
          id: string
          payment_status: string
          processed_at: string | null
          task_id: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          file_paths?: string[] | null
          id?: string
          payment_status?: string
          processed_at?: string | null
          task_id: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          file_paths?: string[] | null
          id?: string
          payment_status?: string
          processed_at?: string | null
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_whatsapp_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          course_id: string
          created_at: string
          episode_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          course_id: string
          created_at?: string
          episode_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          course_id?: string
          created_at?: string
          episode_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_submissions: {
        Row: {
          admin_notes: string | null
          contact_number: string
          course_description: string
          course_link: string
          created_at: string
          email: string
          id: string
          price: number | null
          reviewed_at: string | null
          status: string | null
          user_id: string
          username: string
          whatsapp_number: string
        }
        Insert: {
          admin_notes?: string | null
          contact_number: string
          course_description: string
          course_link: string
          created_at?: string
          email: string
          id?: string
          price?: number | null
          reviewed_at?: string | null
          status?: string | null
          user_id: string
          username: string
          whatsapp_number: string
        }
        Update: {
          admin_notes?: string | null
          contact_number?: string
          course_description?: string
          course_link?: string
          created_at?: string
          email?: string
          id?: string
          price?: number | null
          reviewed_at?: string | null
          status?: string | null
          user_id?: string
          username?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          course_file: string | null
          course_name: string
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_active: boolean
          level: string | null
          package: string | null
          price: number
          thumbnail: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          course_file?: string | null
          course_name: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean
          level?: string | null
          package?: string | null
          price?: number
          thumbnail?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          course_file?: string | null
          course_name?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean
          level?: string | null
          package?: string | null
          price?: number
          thumbnail?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      payment_proofs: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          id: string
          payment_type: string
          processed_at: string | null
          proof_image: string | null
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          id?: string
          payment_type?: string
          processed_at?: string | null
          proof_image?: string | null
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          id?: string
          payment_type?: string
          processed_at?: string | null
          proof_image?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          admin_notes: string | null
          amount: number
          approved_at: string | null
          created_at: string
          id: string
          plan_name: string
          screenshot_url: string | null
          status: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          approved_at?: string | null
          created_at?: string
          id?: string
          plan_name: string
          screenshot_url?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          approved_at?: string | null
          created_at?: string
          id?: string
          plan_name?: string
          screenshot_url?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          id: string
          image_1: string | null
          image_2: string | null
          image_3: string | null
          is_active: boolean
          price: number
          product_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: string
          image_1?: string | null
          image_2?: string | null
          image_3?: string | null
          is_active?: boolean
          price: number
          product_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: string
          image_1?: string | null
          image_2?: string | null
          image_3?: string | null
          is_active?: boolean
          price?: number
          product_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          country: string | null
          created_at: string
          dob: string | null
          downline_count: number | null
          email: string | null
          full_name: string | null
          has_purchased: boolean | null
          id: string
          package: string | null
          password_visible: string | null
          phone: string | null
          pincode: string | null
          purchased_plan: string | null
          referral_code: string | null
          referred_by: string | null
          sponsor_id: string | null
          state: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          downline_count?: number | null
          email?: string | null
          full_name?: string | null
          has_purchased?: boolean | null
          id?: string
          package?: string | null
          password_visible?: string | null
          phone?: string | null
          pincode?: string | null
          purchased_plan?: string | null
          referral_code?: string | null
          referred_by?: string | null
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          downline_count?: number | null
          email?: string | null
          full_name?: string | null
          has_purchased?: boolean | null
          id?: string
          package?: string | null
          password_visible?: string | null
          phone?: string | null
          pincode?: string | null
          purchased_plan?: string | null
          referral_code?: string | null
          referred_by?: string | null
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_income: {
        Row: {
          amount: number
          created_at: string
          id: string
          task_id: string
          task_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          task_id: string
          task_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          task_id?: string
          task_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_history: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          reference_id: string | null
          reference_type: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_tasks: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          media_url: string | null
          requirements: string | null
          task_amount: number
          task_description: string | null
          task_title: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          media_url?: string | null
          requirements?: string | null
          task_amount?: number
          task_description?: string | null
          task_title: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          media_url?: string | null
          requirements?: string | null
          task_amount?: number
          task_description?: string | null
          task_title?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          admin_notes: string | null
          amount: number
          bank_details: Json | null
          created_at: string
          id: string
          processed_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          bank_details?: Json | null
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          bank_details?: Json | null
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
