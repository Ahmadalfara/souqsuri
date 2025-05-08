export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      districts: {
        Row: {
          id: string
          governorate_id: string
          name_ar: string
          name_en: string
          created_at: string
        }
        Insert: {
          id?: string
          governorate_id: string
          name_ar: string
          name_en: string
          created_at?: string
        }
        Update: {
          id?: string
          governorate_id?: string
          name_ar?: string
          name_en?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          created_at?: string
        }
      }
      governorates: {
        Row: {
          id: string
          name_ar: string
          name_en: string
          created_at: string
        }
        Insert: {
          id?: string
          name_ar: string
          name_en: string
          created_at?: string
        }
        Update: {
          id?: string
          name_ar?: string
          name_en?: string
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number
          images: string[]
          category: string
          governorate_id: string | null
          district_id: string | null
          created_at: string
          updated_at: string
          is_featured: boolean
          status: string
          currency: string
          views: number
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          price: number
          images?: string[]
          category: string
          governorate_id?: string | null
          district_id?: string | null
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          status?: string
          currency?: string
          views?: number
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          price?: number
          images?: string[]
          category?: string
          governorate_id?: string | null
          district_id?: string | null
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          status?: string
          currency?: string
          views?: number
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          listing_id: string | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          listing_id?: string | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          listing_id?: string | null
          content?: string
          read?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          profile_picture: string | null
          created_at: string | null
          email: string | null
          phone: string | null
          location: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          profile_picture?: string | null
          created_at?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          profile_picture?: string | null
          created_at?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          reason: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          reason: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          reason?: string
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      listing_category: 'electronics' | 'vehicles' | 'real_estate' | 'furniture' | 'clothing' | 'jobs' | 'services' | 'pets' | 'hobbies' | 'other'
      listing_status: 'active' | 'sold' | 'pending'
    }
  }
}

export type Governorate = Database['public']['Tables']['governorates']['Row'];
export type District = Database['public']['Tables']['districts']['Row'];
export type Listing = Database['public']['Tables']['listings']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Report = Database['public']['Tables']['reports']['Row'];

export type ListingCategory = Database['public']['Enums']['listing_category'];
export type ListingStatus = Database['public']['Enums']['listing_status'];

export interface ListingWithRelations extends Listing {
  governorate?: Governorate;
  district?: District;
  user?: Profile;
  // Extended fields for mock data
  title_en?: string;
  description_en?: string;
  category_ar?: string;
  category_en?: string;
  condition?: string;
}

// Add the missing ListingFilters interface
export interface ListingFilters {
  query?: string;
  category?: string;
  governorate_id?: string;
  district_id?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: string[];
  sortBy?: string;
  urgent?: boolean;
  currency?: string;
  limit?: number;
}
