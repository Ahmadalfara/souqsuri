
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface NormalizedAd {
  id: string;
  title: string;
  description: string;
  price: number;
  currency_id: string;
  location_id: string;
  category_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  images: string[];
  
  // Joined fields from the search function
  currency_name?: string;
  currency_symbol?: string;
  location_name?: string;
  category_name?: string;
  user_name?: string;
  user_profile_picture?: string;
}

export interface SearchParams {
  search_query?: string;
  category_id?: string;
  location_id?: string;
  currency_id?: string;
  min_price?: number | null;
  max_price?: number | null;
  sort_field?: 'price' | 'created_at';
  sort_direction?: 'asc' | 'desc';
  page_size?: number;
  page_number?: number;
}
