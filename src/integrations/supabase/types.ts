export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
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
        Relationships: [
          {
            foreignKeyName: "access_rules_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "access_rules_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      active_sessions: {
        Row: {
          last_seen: string;
          session_id: string;
          user_agent: string | null;
          user_id: string;
        };
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
        Relationships: [
          {
            foreignKeyName: "active_sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "admin_actions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "attempts_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attempts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      group_members: {
        Row: {
          added_at: string;
          group_id: string;
          user_id: string;
        };
        Insert: {
          added_at?: string;
          group_id: string;
          user_id: string;
        };
        Update: {
          added_at?: string;
          group_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "group_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "groups_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
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
      org_settings: {
        Row: {
          org_id: string;
          sequential_mode: boolean;
          updated_at: string;
        };
        Insert: {
          org_id: string;
          sequential_mode?: boolean;
          updated_at?: string;
        };
        Update: {
          org_id?: string;
          sequential_mode?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "org_settings_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          amount: number;
          code: string;
          confirmed_by: string | null;
          created_at: string;
          currency: string;
          discount_pct: number;
          id: string;
          link_id: string | null;
          list_price: number;
          org_id: string;
          paid_at: string | null;
          partner_id: string | null;
          payment_ref: string | null;
          plan_code: string;
          status: string;
          term: string;
          user_id: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          confirmed_by?: string | null;
          created_at?: string;
          currency?: string;
          discount_pct?: number;
          id?: string;
          link_id?: string | null;
          list_price: number;
          org_id: string;
          paid_at?: string | null;
          partner_id?: string | null;
          payment_ref?: string | null;
          plan_code: string;
          status?: string;
          term: string;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          confirmed_by?: string | null;
          created_at?: string;
          currency?: string;
          discount_pct?: number;
          id?: string;
          link_id?: string | null;
          list_price?: number;
          org_id?: string;
          paid_at?: string | null;
          partner_id?: string | null;
          payment_ref?: string | null;
          plan_code?: string;
          status?: string;
          term?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          name: string;
          note: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          name: string;
          note?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          name?: string;
          note?: string | null;
        };
        Relationships: [];
      };
      payment_accounts: {
        Row: {
          account_name: string | null;
          account_no: string | null;
          bank_bin: string | null;
          bank_name: string | null;
          id: number;
          note: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          account_name?: string | null;
          account_no?: string | null;
          bank_bin?: string | null;
          bank_name?: string | null;
          id?: number;
          note?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          account_name?: string | null;
          account_no?: string | null;
          bank_bin?: string | null;
          bank_name?: string | null;
          id?: number;
          note?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          seat_limit: number;
          updated_at: string;
          kind: string;
          partner_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          seat_limit?: number;
          updated_at?: string;
          kind?: string;
          partner_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          seat_limit?: number;
          updated_at?: string;
          kind?: string;
          partner_id?: string | null;
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
      plan_prices: {
        Row: {
          currency: string;
          plan_code: string;
          price: number;
          term: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          currency?: string;
          plan_code: string;
          price?: number;
          term: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          currency?: string;
          plan_code?: string;
          price?: number;
          term?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plan_prices_plan_code_fkey";
            columns: ["plan_code"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["code"];
          },
        ];
      };
      plans: {
        Row: {
          code: string;
          seats: number;
          sort_order: number;
        };
        Insert: {
          code: string;
          seats: number;
          sort_order?: number;
        };
        Update: {
          code?: string;
          seats?: number;
          sort_order?: number;
        };
        Relationships: [];
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
      signup_links: {
        Row: {
          created_at: string;
          created_by: string | null;
          department: string | null;
          expires_at: string | null;
          group_id: string | null;
          id: string;
          kind: string;
          label: string | null;
          discount_pct: number | null;
          partner_id: string | null;
          trial_days: number | null;
          max_uses: number | null;
          org_id: string | null;
          plan_code: string | null;
          price: number | null;
          revoked_at: string | null;
          term: string | null;
          token: string;
          use_count: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          department?: string | null;
          expires_at?: string | null;
          group_id?: string | null;
          id?: string;
          kind: string;
          label?: string | null;
          discount_pct?: number | null;
          partner_id?: string | null;
          trial_days?: number | null;
          max_uses?: number | null;
          org_id?: string | null;
          plan_code?: string | null;
          price?: number | null;
          revoked_at?: string | null;
          term?: string | null;
          token: string;
          use_count?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          department?: string | null;
          expires_at?: string | null;
          group_id?: string | null;
          id?: string;
          kind?: string;
          label?: string | null;
          discount_pct?: number | null;
          partner_id?: string | null;
          trial_days?: number | null;
          max_uses?: number | null;
          org_id?: string | null;
          plan_code?: string | null;
          price?: number | null;
          revoked_at?: string | null;
          term?: string | null;
          token?: string;
          use_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "signup_links_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "signup_links_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "signup_links_plan_code_fkey";
            columns: ["plan_code"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["code"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "study_sessions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          created_at: string;
          created_by: string | null;
          currency: string;
          ends_at: string;
          id: string;
          kind: string;
          org_id: string;
          plan_code: string;
          price: number | null;
          starts_at: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          currency?: string;
          ends_at: string;
          id?: string;
          kind: string;
          org_id: string;
          plan_code: string;
          price?: number | null;
          starts_at?: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          currency?: string;
          ends_at?: string;
          id?: string;
          kind?: string;
          org_id?: string;
          plan_code?: string;
          price?: number | null;
          starts_at?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_plan_code_fkey";
            columns: ["plan_code"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["code"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      award_stars: { Args: { delta: number }; Returns: number };
      claim_signup_link: {
        Args: { link_token: string };
        Returns: {
          created_at: string;
          created_by: string | null;
          department: string | null;
          expires_at: string | null;
          group_id: string | null;
          id: string;
          kind: string;
          label: string | null;
          discount_pct: number | null;
          partner_id: string | null;
          trial_days: number | null;
          max_uses: number | null;
          org_id: string | null;
          plan_code: string | null;
          price: number | null;
          revoked_at: string | null;
          term: string | null;
          token: string;
          use_count: number;
        }[];
        SetofOptions: {
          from: "*";
          to: "signup_links";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      current_org_id: { Args: never; Returns: string };
      is_org_admin: { Args: { target_org: string }; Returns: boolean };
      is_super_admin: { Args: never; Returns: boolean };
      org_is_active: { Args: { target: string }; Returns: boolean };
      org_of: { Args: { target_profile: string }; Returns: string };
      org_seat_limit: { Args: { target: string }; Returns: number };
      release_signup_link: { Args: { link_id: string }; Returns: undefined };
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
