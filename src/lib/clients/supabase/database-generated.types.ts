export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          component_id: number
          created_at: string
          created_by: string | null
          custom: boolean
          description: string | null
          frequency: Database["public"]["Enums"]["frequencies"] | null
          id: number
          name: string
          seasons: Database["public"]["Enums"]["seasons"][] | null
          tags: Json | null
          updated_at: string
          url_slug: string
          video_link: string | null
          video_title: string | null
        }
        Insert: {
          component_id: number
          created_at?: string
          created_by?: string | null
          custom?: boolean
          description?: string | null
          frequency?: Database["public"]["Enums"]["frequencies"] | null
          id?: number
          name: string
          seasons?: Database["public"]["Enums"]["seasons"][] | null
          tags?: Json | null
          updated_at?: string
          url_slug: string
          video_link?: string | null
          video_title?: string | null
        }
        Update: {
          component_id?: number
          created_at?: string
          created_by?: string | null
          custom?: boolean
          description?: string | null
          frequency?: Database["public"]["Enums"]["frequencies"] | null
          id?: number
          name?: string
          seasons?: Database["public"]["Enums"]["seasons"][] | null
          tags?: Json | null
          updated_at?: string
          url_slug?: string
          video_link?: string | null
          video_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "app_component_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      activity_subtasks: {
        Row: {
          activity_id: number
          created_at: string
          description: string
          id: number
        }
        Insert: {
          activity_id: number
          created_at?: string
          description: string
          id?: number
        }
        Update: {
          activity_id?: number
          created_at?: string
          description?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "activity_subtasks_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
      components: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          proactive_service_spend_avg: number | null
          proactive_service_spend_high: number | null
          proactive_service_spend_low: number | null
          reactive_service_spend_avg: number | null
          reactive_service_spend_high: number | null
          reactive_service_spend_low: number | null
          seasons: Database["public"]["Enums"]["seasons"][] | null
          system_id: number
          url_slug: string
          video_link: string | null
          video_title: string | null
          yearly_savings: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          proactive_service_spend_avg?: number | null
          proactive_service_spend_high?: number | null
          proactive_service_spend_low?: number | null
          reactive_service_spend_avg?: number | null
          reactive_service_spend_high?: number | null
          reactive_service_spend_low?: number | null
          seasons?: Database["public"]["Enums"]["seasons"][] | null
          system_id: number
          url_slug: string
          video_link?: string | null
          video_title?: string | null
          yearly_savings?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          proactive_service_spend_avg?: number | null
          proactive_service_spend_high?: number | null
          proactive_service_spend_low?: number | null
          reactive_service_spend_avg?: number | null
          reactive_service_spend_high?: number | null
          reactive_service_spend_low?: number | null
          seasons?: Database["public"]["Enums"]["seasons"][] | null
          system_id?: number
          url_slug?: string
          video_link?: string | null
          video_title?: string | null
          yearly_savings?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "components_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          answer: Database["public"]["Enums"]["answer_types"] | null
          choices: Json[] | null
          created_at: string
          id: number
          question: string
        }
        Insert: {
          answer?: Database["public"]["Enums"]["answer_types"] | null
          choices?: Json[] | null
          created_at?: string
          id?: number
          question: string
        }
        Update: {
          answer?: Database["public"]["Enums"]["answer_types"] | null
          choices?: Json[] | null
          created_at?: string
          id?: number
          question?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          created_at: string
          id: number
          room_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          room_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          room_name?: string | null
        }
        Relationships: []
      }
      spring_tasks: {
        Row: {
          created_at: string
          id: number
          task: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          task?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          task?: string | null
        }
        Relationships: []
      }
      suggested_frequency: {
        Row: {
          created_at: string
          frequency: string | null
          id: number
        }
        Insert: {
          created_at?: string
          frequency?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          frequency?: string | null
          id?: number
        }
        Relationships: []
      }
      systems: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          url_slug: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          url_slug: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          url_slug?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_id: number
          completed_at: string | null
          created_at: string
          deleted_at: string | null
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          activity_id: number
          completed_at?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          activity_id?: number
          completed_at?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_activity_subtasks: {
        Row: {
          activity_subtask_id: number
          completed_at: string | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          activity_subtask_id: number
          completed_at?: string | null
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          activity_subtask_id?: number
          completed_at?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_subtasks_activity_subtask_id_fkey"
            columns: ["activity_subtask_id"]
            isOneToOne: false
            referencedRelation: "activity_subtasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_subtasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_answers: {
        Row: {
          created_at: string
          id: string
          question_id: number
          user_id: string | null
          value_json: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: number
          user_id?: string | null
          value_json?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: number
          user_id?: string | null
          value_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      app_component_stats: {
        Row: {
          completed: number | null
          deleted: number | null
          id: number | null
          season: Database["public"]["Enums"]["seasons"] | null
          system_id: number | null
          undeleted: number | null
        }
        Relationships: [
          {
            foreignKeyName: "components_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      url_encode: {
        Args: {
          str: string
        }
        Returns: string
      }
      url_slugify: {
        Args: {
          str: string
        }
        Returns: string
      }
    }
    Enums: {
      answer_types: "boolean" | "single_choice" | "multiple_choice"
      frequencies: "quarterly" | "yearly" | "seasonally" | "count"
      seasons: "spring" | "summer" | "fall" | "winter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
