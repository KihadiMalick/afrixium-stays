// Types générés de la base de données Supabase
// À régénérer après chaque migration via : supabase gen types typescript
// (ou manuellement comme ici pour le setup en ligne)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {

      // ---- PROFILES ----
      profiles: {
        Row: {
          id:           string;
          email:        string;
          first_name:   string;
          last_name:    string;
          phone:        string | null;
          avatar_url:   string | null;
          role:         "guest" | "host" | "admin";
          is_verified:  boolean;
          created_at:   string;
          updated_at:   string;
        };
        Insert: {
          id:           string;
          email:        string;
          first_name:   string;
          last_name:    string;
          phone?:       string | null;
          avatar_url?:  string | null;
          role?:        "guest" | "host" | "admin";
          is_verified?: boolean;
          created_at?:  string;
          updated_at?:  string;
        };
        Update: {
          first_name?:  string;
          last_name?:   string;
          phone?:       string | null;
          avatar_url?:  string | null;
          role?:        "guest" | "host" | "admin";
          is_verified?: boolean;
          updated_at?:  string;
        };
        Relationships: [];
      };

      // ---- LISTINGS ----
      listings: {
        Row: {
          id:               string;
          host_id:          string;
          title:            string;
          slug:             string;
          description:      string;
          property_type:    string;
          status:           "draft" | "published" | "paused" | "archived";
          location:         string;
          city:             string;
          country:          string;
          latitude:         number | null;
          longitude:        number | null;
          price_per_night:  number;
          cleaning_fee:     number;
          max_guests:       number;
          bedrooms:         number;
          bathrooms:        number;
          amenities:        string[];
          images:           string[];
          cover_image:      string | null;
          is_featured:      boolean;
          min_stay_nights:  number;
          max_stay_nights:  number;
          rating_average:   number;
          rating_count:     number;
          created_at:       string;
          updated_at:       string;
        };
        Insert: {
          id?:              string;
          host_id:          string;
          title:            string;
          slug:             string;
          description:      string;
          property_type:    string;
          status?:          "draft" | "published" | "paused" | "archived";
          location:         string;
          city:             string;
          country:          string;
          latitude?:        number | null;
          longitude?:       number | null;
          price_per_night:  number;
          cleaning_fee?:    number;
          max_guests:       number;
          bedrooms:         number;
          bathrooms:        number;
          amenities?:       string[];
          images?:          string[];
          cover_image?:     string | null;
          is_featured?:     boolean;
          min_stay_nights?: number;
          max_stay_nights?: number;
        };
        Update: {
          title?:           string;
          description?:     string;
          status?:          "draft" | "published" | "paused" | "archived";
          price_per_night?: number;
          cleaning_fee?:    number;
          amenities?:       string[];
          images?:          string[];
          cover_image?:     string | null;
          is_featured?:     boolean;
          updated_at?:      string;
        };
        Relationships: [];
      };

      // ---- BOOKINGS ----
      bookings: {
        Row: {
          id:                       string;
          listing_id:               string;
          guest_id:                 string;
          check_in:                 string;
          check_out:                string;
          guests:                   number;
          status:                   "pending" | "confirmed" | "cancelled" | "completed" | "refunded";
          price_per_night:          number;
          cleaning_fee:             number;
          service_fee:              number;
          total_price:              number;
          points_earned:            number;
          stripe_payment_intent_id: string | null;
          guest_message:            string | null;
          created_at:               string;
          updated_at:               string;
        };
        Insert: {
          id?:                      string;
          listing_id:               string;
          guest_id:                 string;
          check_in:                 string;
          check_out:                string;
          guests:                   number;
          status?:                  "pending" | "confirmed" | "cancelled" | "completed" | "refunded";
          price_per_night:          number;
          cleaning_fee:             number;
          service_fee:              number;
          total_price:              number;
          points_earned:            number;
          stripe_payment_intent_id?: string | null;
          guest_message?:           string | null;
        };
        Update: {
          status?:                  "pending" | "confirmed" | "cancelled" | "completed" | "refunded";
          stripe_payment_intent_id?: string | null;
          updated_at?:              string;
        };
        Relationships: [];
      };

      // ---- REWARDS_BALANCES ----
      rewards_balances: {
        Row: {
          id:               string;
          user_id:          string;
          total_points:     number;
          tier:             "Bronze" | "Silver" | "Gold" | "Platinum";
          lifetime_points:  number;
          updated_at:       string;
        };
        Insert: {
          id?:              string;
          user_id:          string;
          total_points?:    number;
          tier?:            "Bronze" | "Silver" | "Gold" | "Platinum";
          lifetime_points?: number;
        };
        Update: {
          total_points?:    number;
          tier?:            "Bronze" | "Silver" | "Gold" | "Platinum";
          lifetime_points?: number;
          updated_at?:      string;
        };
        Relationships: [];
      };

      // ---- REWARDS_TRANSACTIONS ----
      rewards_transactions: {
        Row: {
          id:          string;
          user_id:     string;
          booking_id:  string | null;
          type:        "earned_booking" | "redeemed" | "bonus" | "expired" | "referral";
          points:      number;
          description: string;
          created_at:  string;
        };
        Insert: {
          id?:         string;
          user_id:     string;
          booking_id?: string | null;
          type:        "earned_booking" | "redeemed" | "bonus" | "expired" | "referral";
          points:      number;
          description: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };

      // ---- CHAT_THREADS ----
      chat_threads: {
        Row: {
          id:               string;
          guest_id:         string;
          admin_id:         string | null;
          booking_id:       string | null;
          subject:          string;
          status:           "open" | "closed" | "pending";
          last_message:     string | null;
          last_message_at:  string | null;
          is_read_guest:    boolean;
          is_read_admin:    boolean;
          created_at:       string;
          updated_at:       string;
        };
        Insert: {
          id?:              string;
          guest_id:         string;
          admin_id?:        string | null;
          booking_id?:      string | null;
          subject:          string;
          status?:          "open" | "closed" | "pending";
        };
        Update: {
          admin_id?:        string | null;
          status?:          "open" | "closed" | "pending";
          last_message?:    string | null;
          last_message_at?: string | null;
          is_read_guest?:   boolean;
          is_read_admin?:   boolean;
          updated_at?:      string;
        };
        Relationships: [];
      };

      // ---- CHAT_MESSAGES ----
      chat_messages: {
        Row: {
          id:          string;
          thread_id:   string;
          sender_id:   string;
          sender_role: "guest" | "host" | "admin";
          content:     string;
          is_read:     boolean;
          created_at:  string;
        };
        Insert: {
          id?:         string;
          thread_id:   string;
          sender_id:   string;
          sender_role: "guest" | "host" | "admin";
          content:     string;
          is_read?:    boolean;
        };
        Update: {
          is_read?: boolean;
        };
        Relationships: [];
      };

    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums:     Record<string, never>;
  };
}
