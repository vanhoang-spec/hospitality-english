export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
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
      crm_events: {
        Row: {
          du_lieu: Json;
          id: number;
          loai: string;
          luc: string;
        };
        Insert: {
          du_lieu: Json;
          id?: never;
          loai: string;
          luc?: string;
        };
        Update: {
          du_lieu?: Json;
          id?: never;
          loai?: string;
          luc?: string;
        };
        Relationships: [];
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
      orders: {
        Row: {
          amount: number;
          code: string;
          confirmed_by: string | null;
          created_at: string;
          crm_ref: string | null;
          currency: string;
          discount_amount: number;
          discount_pct: number;
          grace_until: string | null;
          id: string;
          kind: string;
          link_id: string | null;
          list_price: number;
          org_id: string;
          paid_at: string | null;
          partner_id: string | null;
          pay_token: string;
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
          crm_ref?: string | null;
          currency?: string;
          discount_amount?: number;
          discount_pct?: number;
          grace_until?: string | null;
          id?: string;
          kind?: string;
          link_id?: string | null;
          list_price: number;
          org_id: string;
          paid_at?: string | null;
          partner_id?: string | null;
          pay_token?: string;
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
          crm_ref?: string | null;
          currency?: string;
          discount_amount?: number;
          discount_pct?: number;
          grace_until?: string | null;
          id?: string;
          kind?: string;
          link_id?: string | null;
          list_price?: number;
          org_id?: string;
          paid_at?: string | null;
          partner_id?: string | null;
          pay_token?: string;
          payment_ref?: string | null;
          plan_code?: string;
          status?: string;
          term?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_link_id_fkey";
            columns: ["link_id"];
            isOneToOne: false;
            referencedRelation: "signup_links";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "partners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_plan_code_fkey";
            columns: ["plan_code"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["code"];
          },
        ];
      };
      org_details: {
        Row: {
          address: string;
          legal_name: string;
          org_id: string;
          rep_email: string;
          rep_name: string;
          rep_phone: string;
          tax_code: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          address: string;
          legal_name: string;
          org_id: string;
          rep_email: string;
          rep_name: string;
          rep_phone: string;
          tax_code: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          address?: string;
          legal_name?: string;
          org_id?: string;
          rep_email?: string;
          rep_name?: string;
          rep_phone?: string;
          tax_code?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "org_details_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "organizations";
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
      organizations: {
        Row: {
          created_at: string;
          id: string;
          kind: string;
          name: string;
          partner_id: string | null;
          seat_limit: number;
          signup_link_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          kind?: string;
          name: string;
          partner_id?: string | null;
          seat_limit?: number;
          signup_link_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          kind?: string;
          name?: string;
          partner_id?: string | null;
          seat_limit?: number;
          signup_link_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_signup_link_id_fkey";
            columns: ["signup_link_id"];
            isOneToOne: false;
            referencedRelation: "signup_links";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "partners";
            referencedColumns: ["id"];
          },
        ];
      };
      partners: {
        Row: {
          active: boolean;
          created_at: string;
          created_by: string | null;
          crm_ref: string | null;
          demo_org_id: string | null;
          demo_user_id: string | null;
          email: string | null;
          id: string;
          name: string;
          note: string | null;
          phone: string | null;
          status_changed_at: string | null;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          created_by?: string | null;
          crm_ref?: string | null;
          demo_org_id?: string | null;
          demo_user_id?: string | null;
          email?: string | null;
          id?: string;
          name: string;
          note?: string | null;
          phone?: string | null;
          status_changed_at?: string | null;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          created_by?: string | null;
          crm_ref?: string | null;
          demo_org_id?: string | null;
          demo_user_id?: string | null;
          email?: string | null;
          id?: string;
          name?: string;
          note?: string | null;
          phone?: string | null;
          status_changed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "partners_demo_org_id_fkey";
            columns: ["demo_org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partners_demo_user_id_fkey";
            columns: ["demo_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      password_reset_tokens: {
        Row: {
          created_at: string;
          email: string | null;
          expires_at: string;
          id: string;
          purpose: string;
          token_hash: string;
          used_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          expires_at: string;
          id?: string;
          purpose?: string;
          token_hash: string;
          used_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          expires_at?: string;
          id?: string;
          purpose?: string;
          token_hash?: string;
          used_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "password_reset_tokens_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
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
          email: string | null;
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
          email?: string | null;
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
          email?: string | null;
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
          crm_customer_ref: string | null;
          crm_ref: string | null;
          department: string | null;
          discount_amount: number | null;
          discount_pct: number | null;
          discount_scope: string | null;
          expires_at: string | null;
          group_id: string | null;
          id: string;
          invite_kind: string | null;
          kind: string;
          label: string | null;
          max_uses: number | null;
          org_id: string | null;
          partner_id: string | null;
          plan_code: string | null;
          prefill: Json | null;
          price: number | null;
          revoked_at: string | null;
          term: string | null;
          token: string;
          trial_days: number | null;
          use_count: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          crm_customer_ref?: string | null;
          crm_ref?: string | null;
          department?: string | null;
          discount_amount?: number | null;
          discount_pct?: number | null;
          discount_scope?: string | null;
          expires_at?: string | null;
          group_id?: string | null;
          id?: string;
          invite_kind?: string | null;
          kind: string;
          label?: string | null;
          max_uses?: number | null;
          org_id?: string | null;
          partner_id?: string | null;
          plan_code?: string | null;
          prefill?: Json | null;
          price?: number | null;
          revoked_at?: string | null;
          term?: string | null;
          token: string;
          trial_days?: number | null;
          use_count?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          crm_customer_ref?: string | null;
          crm_ref?: string | null;
          department?: string | null;
          discount_amount?: number | null;
          discount_pct?: number | null;
          discount_scope?: string | null;
          expires_at?: string | null;
          group_id?: string | null;
          id?: string;
          invite_kind?: string | null;
          kind?: string;
          label?: string | null;
          max_uses?: number | null;
          org_id?: string | null;
          partner_id?: string | null;
          plan_code?: string | null;
          prefill?: Json | null;
          price?: number | null;
          revoked_at?: string | null;
          term?: string | null;
          token?: string;
          trial_days?: number | null;
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
            foreignKeyName: "signup_links_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "partners";
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
          crm_ref: string | null;
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
          crm_ref?: string | null;
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
          crm_ref?: string | null;
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
          crm_customer_ref: string | null;
          crm_ref: string | null;
          department: string | null;
          discount_amount: number | null;
          discount_pct: number | null;
          discount_scope: string | null;
          expires_at: string | null;
          group_id: string | null;
          id: string;
          invite_kind: string | null;
          kind: string;
          label: string | null;
          max_uses: number | null;
          org_id: string | null;
          partner_id: string | null;
          plan_code: string | null;
          prefill: Json | null;
          price: number | null;
          revoked_at: string | null;
          term: string | null;
          token: string;
          trial_days: number | null;
          use_count: number;
        }[];
        SetofOptions: {
          from: "*";
          to: "signup_links";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      crm_cap_goi: {
        Args: {
          p_crm_ref: string;
          p_org: string;
          p_plan: string;
          p_price: number;
          p_term: string;
        };
        Returns: {
          bat_dau: string;
          da_xu_ly_truoc: boolean;
          ket_thuc: string;
        }[];
      };
      crm_luu_doi_tac: {
        Args: { p_active: boolean; p_name: string; p_partner_ref: string };
        Returns: {
          active: boolean;
          demo_user_id: string;
          partner_id: string;
          tao_moi: boolean;
        }[];
      };
      crm_luu_link: {
        Args: {
          p_crm_ref: string;
          p_discount_amount: number;
          p_discount_pct: number;
          p_discount_scope: string;
          p_expires_at: string;
          p_kind: string;
          p_max_uses: number;
          p_new_token: string;
          p_open: boolean;
          p_partner_name: string;
          p_partner_ref: string;
          p_trial_days: number;
        };
        Returns: {
          link_id: string;
          link_token: string;
          tao_moi: boolean;
        }[];
      };
      crm_moi_khach_san: {
        Args: {
          p_crm_ref: string;
          p_customer_ref: string;
          p_days: number;
          p_expires_at: string;
          p_invite_kind: string;
          p_new_token: string;
          p_open: boolean;
          p_plan: string;
          p_prefill: Json;
        };
        Returns: {
          da_dung: boolean;
          link_id: string;
          link_token: string;
          tao_moi: boolean;
        }[];
      };
      current_org_id: { Args: never; Returns: string };
      is_org_admin: { Args: { target_org: string }; Returns: boolean };
      is_super_admin: { Args: never; Returns: boolean };
      org_is_active: { Args: { target: string }; Returns: boolean };
      org_of: { Args: { target_profile: string }; Returns: string };
      org_seat_limit: { Args: { target: string }; Returns: number };
      partner_is_live: { Args: { p_partner: string }; Returns: boolean };
      password_reset_claim: {
        Args: { p_token_hash: string };
        Returns: {
          token_id: string;
          user_id: string;
        }[];
      };
      password_reset_request: {
        Args: { p_minutes?: number; p_phone: string; p_token_hash: string };
        Returns: {
          email: string;
          full_name: string;
        }[];
      };
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
