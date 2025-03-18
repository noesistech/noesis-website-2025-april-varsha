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
      about_section: {
        Row: {
          created_at: string | null
          description_1: string
          description_2: string
          description_3: string
          id: string
          image_url: string
          subtitle: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_1: string
          description_2: string
          description_3: string
          id?: string
          image_url: string
          subtitle: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_1?: string
          description_2?: string
          description_3?: string
          id?: string
          image_url?: string
          subtitle?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      client_logos: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          name: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          name: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          name?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      clients_section: {
        Row: {
          clients_subtitle: string
          created_at: string | null
          id: string
          partners_subtitle: string
          testimonials_subtitle: string
          title: string
          updated_at: string | null
        }
        Insert: {
          clients_subtitle: string
          created_at?: string | null
          id?: string
          partners_subtitle: string
          testimonials_subtitle: string
          title: string
          updated_at?: string | null
        }
        Update: {
          clients_subtitle?: string
          created_at?: string | null
          id?: string
          partners_subtitle?: string
          testimonials_subtitle?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          created_at: string | null
          cta_primary_text: string
          cta_secondary_text: string
          id: string
          subtitle: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cta_primary_text: string
          cta_secondary_text: string
          id?: string
          subtitle: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cta_primary_text?: string
          cta_secondary_text?: string
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mission_section: {
        Row: {
          created_at: string | null
          id: string
          mission_description: string
          mission_title: string
          promise_text: string
          promise_title: string
          updated_at: string | null
          vision_description: string
          vision_title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mission_description: string
          mission_title: string
          promise_text: string
          promise_title: string
          updated_at?: string | null
          vision_description: string
          vision_title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mission_description?: string
          mission_title?: string
          promise_text?: string
          promise_title?: string
          updated_at?: string | null
          vision_description?: string
          vision_title?: string
        }
        Relationships: []
      }
      partner_logos: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          name: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          name: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          name?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      service_cards: {
        Row: {
          created_at: string | null
          description: string
          icon_name: string
          id: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          sort_order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_items: {
        Row: {
          created_at: string | null
          description: string
          icon_name: string
          id: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          sort_order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services_section: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      solution_items: {
        Row: {
          color: string
          created_at: string | null
          description: string
          icon_name: string
          id: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          color: string
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          sort_order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      solutions_section: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string | null
          icon_name: string
          id: string
          label: string
          sort_order: number
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          icon_name: string
          id?: string
          label: string
          sort_order: number
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          icon_name?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      tech_categories: {
        Row: {
          created_at: string | null
          id: string
          is_cloud_stack: boolean
          key: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_cloud_stack?: boolean
          key: string
          sort_order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_cloud_stack?: boolean
          key?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tech_stack_section: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      technologies: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          name: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          name: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technologies_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "tech_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author: string
          company: string
          created_at: string | null
          id: string
          position: string
          quote: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          author: string
          company: string
          created_at?: string | null
          id?: string
          position: string
          quote: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          author?: string
          company?: string
          created_at?: string | null
          id?: string
          position?: string
          quote?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
