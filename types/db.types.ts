export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      current_room: {
        Row: {
          created_at: string;
          id: string;
          room_id: string | null;
          uid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          room_id?: string | null;
          uid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          room_id?: string | null;
          uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_current_room_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_current_room_uid_fkey";
            columns: ["uid"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["uid"];
          }
        ];
      };
      room: {
        Row: {
          break_time: number | null;
          created_at: string;
          end_time: string | null;
          focus_time: number | null;
          id: string;
          is_async: boolean | null;
          is_public: boolean | null;
          participants: string[] | null;
          room_creator: string | null;
          room_name: string | null;
          start_time: string | null;
        };
        Insert: {
          break_time?: number | null;
          created_at?: string;
          end_time?: string | null;
          focus_time?: number | null;
          id?: string;
          is_async?: boolean | null;
          is_public?: boolean | null;
          participants?: string[] | null;
          room_creator?: string | null;
          room_name?: string | null;
          start_time?: string | null;
        };
        Update: {
          break_time?: number | null;
          created_at?: string;
          end_time?: string | null;
          focus_time?: number | null;
          id?: string;
          is_async?: boolean | null;
          is_public?: boolean | null;
          participants?: string[] | null;
          room_creator?: string | null;
          room_name?: string | null;
          start_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_room_room_creator_fkey";
            columns: ["room_creator"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["uid"];
          }
        ];
      };
      room_logs: {
        Row: {
          created_at: string;
          exit_time: string | null;
          id: number;
          join_time: string | null;
          room_id: string | null;
          uid: string | null;
        };
        Insert: {
          created_at?: string;
          exit_time?: string | null;
          id?: number;
          join_time?: string | null;
          room_id?: string | null;
          uid?: string | null;
        };
        Update: {
          created_at?: string;
          exit_time?: string | null;
          id?: number;
          join_time?: string | null;
          room_id?: string | null;
          uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_room_logs_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_room_logs_uid_fkey";
            columns: ["uid"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["uid"];
          }
        ];
      };
      user: {
        Row: {
          created_at: string;
          karma_score: number | null;
          name: string | null;
          uid: string;
          user_type: string | null;
        };
        Insert: {
          created_at?: string;
          karma_score?: number | null;
          name?: string | null;
          uid?: string;
          user_type?: string | null;
        };
        Update: {
          created_at?: string;
          karma_score?: number | null;
          name?: string | null;
          uid?: string;
          user_type?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
