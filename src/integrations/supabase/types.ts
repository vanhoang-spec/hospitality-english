export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      lesson_progress: {
        Row: {
          completed_at: string | null;
          created_at: string;
          department_id: string;
          id: string;
          mastered: boolean;
          score_pct: number | null;
          stars: number;
          suite: string;
          updated_at: string;
          user_id: string;
          week_number: number;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          department_id: string;
          id?: string;
          mastered?: boolean;
          score_pct?: number | null;
          stars?: number;
          suite: string;
          updated_at?: string;
          user_id: string;
          week_number: number;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          department_id?: string;
          id?: string;
          mastered?: boolean;
          score_pct?: number | null;
          stars?: number;
          suite?: string;
          updated_at?: string;
          user_id?: string;
          week_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "lesson_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      lessons: {
        Row: {
          created_at: string;
          id: string;
          lesson_order: number;
          scenario_id: string;
          title_en: string;
          title_vi: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          lesson_order: number;
          scenario_id: string;
          title_en: string;
          title_vi: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          lesson_order?: number;
          scenario_id?: string;
          title_en?: string;
          title_vi?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_scenario_id_fkey";
            columns: ["scenario_id"];
            isOneToOne: false;
            referencedRelation: "scenarios";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          seat_limit: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          seat_limit?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          seat_limit?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      groups: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          name: string;
          org_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          name: string;
          org_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          name?: string;
          org_id?: string;
        };
        Relationships: [];
      };
      group_members: {
        Row: { added_at: string; group_id: string; user_id: string };
        Insert: { added_at?: string; group_id: string; user_id: string };
        Update: { added_at?: string; group_id?: string; user_id?: string };
        Relationships: [];
      };
      access_rules: {
        Row: {
          created_at: string;
          department_id: string;
          group_id: string | null;
          id: string;
          org_id: string;
          week_from: number;
          week_to: number;
        };
        Insert: {
          created_at?: string;
          department_id: string;
          group_id?: string | null;
          id?: string;
          org_id: string;
          week_from: number;
          week_to: number;
        };
        Update: {
          created_at?: string;
          department_id?: string;
          group_id?: string | null;
          id?: string;
          org_id?: string;
          week_from?: number;
          week_to?: number;
        };
        Relationships: [];
      };
      attempts: {
        Row: {
          attempt_no: number;
          correct: boolean;
          created_at: string;
          department_id: string;
          id: string;
          is_first_try: boolean;
          item_key: string;
          ms_spent: number | null;
          org_id: string | null;
          suite: string;
          user_id: string;
          week_number: number;
        };
        Insert: {
          attempt_no?: number;
          correct: boolean;
          created_at?: string;
          department_id: string;
          id?: string;
          is_first_try: boolean;
          item_key: string;
          ms_spent?: number | null;
          org_id?: string | null;
          suite: string;
          user_id: string;
          week_number: number;
        };
        Update: {
          attempt_no?: number;
          correct?: boolean;
          created_at?: string;
          department_id?: string;
          id?: string;
          is_first_try?: boolean;
          item_key?: string;
          ms_spent?: number | null;
          org_id?: string | null;
          suite?: string;
          user_id?: string;
          week_number?: number;
        };
        Relationships: [];
      };
      study_sessions: {
        Row: {
          department_id: string | null;
          ended_at: string | null;
          id: string;
          org_id: string | null;
          seconds_active: number;
          started_at: string;
          suite: string | null;
          user_id: string;
          week_number: number | null;
        };
        Insert: {
          department_id?: string | null;
          ended_at?: string | null;
          id?: string;
          org_id?: string | null;
          seconds_active?: number;
          started_at?: string;
          suite?: string | null;
          user_id: string;
          week_number?: number | null;
        };
        Update: {
          department_id?: string | null;
          ended_at?: string | null;
          id?: string;
          org_id?: string | null;
          seconds_active?: number;
          started_at?: string;
          suite?: string | null;
          user_id?: string;
          week_number?: number | null;
        };
        Relationships: [];
      };
      // Hand-written until the generator is next run against the project:
      // see supabase/migrations/20260923120000_plans_subscriptions_sessions.sql.
      plans: {
        Row: { code: string; seats: number; sort_order: number };
        Insert: { code: string; seats: number; sort_order?: number };
        Update: { code?: string; seats?: number; sort_order?: number };
        Relationships: [];
      };
      plan_prices: {
        Row: {
          plan_code: string;
          term: string;
          price: number;
          currency: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          plan_code: string;
          term: string;
          price?: number;
          currency?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          plan_code?: string;
          term?: string;
          price?: number;
          currency?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          created_at: string;
          created_by: string | null;
          ends_at: string;
          id: string;
          kind: string;
          org_id: string;
          plan_code: string;
          starts_at: string;
          status: string;
          price: number | null;
          currency: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          ends_at: string;
          id?: string;
          kind: string;
          org_id: string;
          plan_code: string;
          starts_at?: string;
          status?: string;
          price?: number | null;
          currency?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          ends_at?: string;
          id?: string;
          kind?: string;
          org_id?: string;
          plan_code?: string;
          starts_at?: string;
          status?: string;
          price?: number | null;
          currency?: string;
        };
        Relationships: [];
      };
      org_settings: {
        Row: { org_id: string; sequential_mode: boolean; updated_at: string };
        Insert: { org_id: string; sequential_mode?: boolean; updated_at?: string };
        Update: { org_id?: string; sequential_mode?: boolean; updated_at?: string };
        Relationships: [];
      };
      admin_actions: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string;
          id: string;
          meta: Json;
          org_id: string | null;
          target_user_id: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          meta?: Json;
          org_id?: string | null;
          target_user_id?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          meta?: Json;
          org_id?: string | null;
          target_user_id?: string | null;
        };
        Relationships: [];
      };
      active_sessions: {
        Row: { last_seen: string; session_id: string; user_agent: string | null; user_id: string };
        Insert: {
          last_seen?: string;
          session_id: string;
          user_agent?: string | null;
          user_id: string;
        };
        Update: {
          last_seen?: string;
          session_id?: string;
          user_agent?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      performance_metrics: {
        Row: {
          courtesy_score: number;
          created_at: string;
          crisis_handling_score: number;
          fluency_score: number;
          id: string;
          profile_id: string;
          reflex_speed: number;
          updated_at: string;
        };
        Insert: {
          courtesy_score?: number;
          created_at?: string;
          crisis_handling_score?: number;
          fluency_score?: number;
          id?: string;
          profile_id: string;
          reflex_speed?: number;
          updated_at?: string;
        };
        Update: {
          courtesy_score?: number;
          created_at?: string;
          crisis_handling_score?: number;
          fluency_score?: number;
          id?: string;
          profile_id?: string;
          reflex_speed?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "performance_metrics_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          daily_streak: number;
          department: string | null;
          full_name: string | null;
          id: string;
          job_rank: string;
          last_active_date: string;
          must_change_password: boolean;
          org_id: string | null;
          phone: string | null;
          role: string;
          service_stars: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          daily_streak?: number;
          department?: string | null;
          full_name?: string | null;
          id: string;
          job_rank?: string;
          last_active_date?: string;
          must_change_password?: boolean;
          org_id?: string | null;
          phone?: string | null;
          role?: string;
          service_stars?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          daily_streak?: number;
          department?: string | null;
          full_name?: string | null;
          id?: string;
          job_rank?: string;
          last_active_date?: string;
          must_change_password?: boolean;
          org_id?: string | null;
          phone?: string | null;
          role?: string;
          service_stars?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      review_items: {
        Row: {
          created_at: string;
          department_id: string;
          due_at: string;
          id: string;
          interval_days: number;
          item_key: string;
          item_type: string;
          last_result: boolean | null;
          streak: number;
          updated_at: string;
          user_id: string;
          week_number: number;
        };
        Insert: {
          created_at?: string;
          department_id: string;
          due_at?: string;
          id?: string;
          interval_days?: number;
          item_key: string;
          item_type: string;
          last_result?: boolean | null;
          streak?: number;
          updated_at?: string;
          user_id: string;
          week_number: number;
        };
        Update: {
          created_at?: string;
          department_id?: string;
          due_at?: string;
          id?: string;
          interval_days?: number;
          item_key?: string;
          item_type?: string;
          last_result?: boolean | null;
          streak?: number;
          updated_at?: string;
          user_id?: string;
          week_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "review_items_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      scenarios: {
        Row: {
          created_at: string;
          department_id: string;
          id: string;
          title_en: string;
          title_vi: string;
          week_number: number;
        };
        Insert: {
          created_at?: string;
          department_id: string;
          id?: string;
          title_en: string;
          title_vi: string;
          week_number: number;
        };
        Update: {
          created_at?: string;
          department_id?: string;
          id?: string;
          title_en?: string;
          title_vi?: string;
          week_number?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      award_stars: {
        Args: { delta: number };
        Returns: number;
      };
      org_seat_limit: {
        Args: { target: string };
        Returns: number;
      };
      org_is_active: {
        Args: { target: string };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
