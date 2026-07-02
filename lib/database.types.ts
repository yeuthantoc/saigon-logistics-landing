// =============================================================
// Kiểu dữ liệu DB — viết tay khớp supabase/schema.sql.
// Dùng làm generic cho supabase-js: createServerClient<Database>().
// Khi đổi schema, cập nhật cả file này. (Có thể thay bằng
// `supabase gen types typescript` nếu dùng Supabase CLI.)
// =============================================================

export type LeadStatus = 'new' | 'called' | 'quoted' | 'won' | 'lost';
export type OrderStatus =
  | 'received'
  | 'picked_up'
  | 'in_transit'
  | 'customs'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed';
export type LeadSource = 'web' | 'zalo' | 'hotline' | 'direct';
export type UserRole = 'admin' | 'sale' | 'viewer';

/** Một mốc trong orders.status_history (jsonb). */
export interface StatusHistoryEntry {
  status: OrderStatus;
  note: string;
  timestamp: string; // ISO
  updated_by: string | null; // profile id
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: UserRole;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: UserRole;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string;
          route: string;
          weight_kg: number | null;
          note: string | null;
          source: LeadSource;
          status: LeadStatus;
          assigned_to: string | null;
          internal_note: string | null;
          quoted_price: number | null;
          follow_up_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone: string;
          route: string;
          weight_kg?: number | null;
          note?: string | null;
          source?: LeadSource;
          status?: LeadStatus;
          assigned_to?: string | null;
          internal_note?: string | null;
          quoted_price?: number | null;
          follow_up_at?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string | null;
          tracking_code: string;
          customer_name: string;
          customer_phone: string;
          route: string;
          weight_kg: number;
          price: number;
          status: OrderStatus;
          status_history: StatusHistoryEntry[];
          sender_address: string | null;
          receiver_address: string | null;
          receiver_country: string | null;
          estimated_delivery: string | null;
          actual_delivery: string | null;
          assigned_to: string | null;
          note: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id?: string | null;
          tracking_code: string;
          customer_name: string;
          customer_phone: string;
          route: string;
          weight_kg: number;
          price: number;
          status?: OrderStatus;
          status_history?: StatusHistoryEntry[];
          sender_address?: string | null;
          receiver_address?: string | null;
          receiver_country?: string | null;
          estimated_delivery?: string | null;
          actual_delivery?: string | null;
          assigned_to?: string | null;
          note?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
        Relationships: [];
      };
      rate_config: {
        Row: {
          route: string;
          name: string;
          base: number;
          per_kg: number;
          eta: string | null;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          route: string;
          name: string;
          base: number;
          per_kg: number;
          eta?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['rate_config']['Insert']>;
        Relationships: [];
      };
      app_settings: {
        Row: { key: string; value: string | null; updated_at: string };
        Insert: { key: string; value?: string | null; updated_at?: string };
        Update: Partial<Database['public']['Tables']['app_settings']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Alias tiện dùng khắp app
export type Lead = Database['public']['Tables']['leads']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type RateConfigRow = Database['public']['Tables']['rate_config']['Row'];
