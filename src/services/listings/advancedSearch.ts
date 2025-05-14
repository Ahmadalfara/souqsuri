
import { supabase } from '@/integrations/supabase/client';
import { ListingWithRelations } from '@/types/supabase';

export interface SearchListingsParams {
  search_query?: string;
  category_filter?: string;
  min_price?: number;
  max_price?: number;
  currency_filter?: string;
  sort_field?: 'created_at' | 'price' | 'views';
  sort_direction?: 'asc' | 'desc';
  page_size?: number;
  page_number?: number;
  governorate_id_filter?: string;
  district_id_filter?: string;
}

/**
 * Advanced search function that leverages the database function for filtering and sorting
 */
export const advancedSearchListings = async (params: SearchListingsParams): Promise<ListingWithRelations[]> => {
  try {
    console.log('Advanced search with params:', params);
    
    const { data, error } = await supabase
      .rpc('search_listings', {
        search_query: params.search_query || null,
        category_filter: params.category_filter || null,
        min_price: params.min_price || null,
        max_price: params.max_price || null,
        currency_filter: params.currency_filter || null,
        sort_field: params.sort_field || 'created_at',
        sort_direction: params.sort_direction || 'desc',
        page_size: params.page_size || 20,
        page_number: params.page_number || 1,
        governorate_id_filter: params.governorate_id_filter || null,
        district_id_filter: params.district_id_filter || null
      });

    if (error) {
      console.error('Error in advanced search:', error);
      throw new Error(`Error searching listings: ${error.message}`);
    }

    // Map the results to the ListingWithRelations interface
    return data.map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      title: item.title,
      description: item.description,
      price: item.price,
      currency: item.currency,
      images: item.images,
      category: item.category,
      governorate_id: item.governorate_id,
      district_id: item.district_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_featured: item.is_featured,
      status: item.status,
      views: item.views,
      // Add relational data
      governorate: item.governorate_id ? {
        id: item.governorate_id,
        name_ar: item.governorate_name_ar,
        name_en: item.governorate_name_en,
        created_at: item.created_at
      } : undefined,
      district: item.district_id ? {
        id: item.district_id,
        name_ar: item.district_name_ar,
        name_en: item.district_name_en,
        governorate_id: item.governorate_id,
        created_at: item.created_at
      } : undefined,
      user: item.user_id ? {
        id: item.user_id,
        name: item.user_name,
        profile_picture: item.user_profile_picture
      } : undefined
    }));
  } catch (error) {
    console.error('Failed to execute advanced search:', error);
    return [];
  }
};

/**
 * Get featured listings using the advanced search function
 */
export const getFeaturedListingsFromDB = async (limit: number = 12): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorates(*),
        district:districts(*),
        user:profiles(*)
      `)
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    
    return data as unknown as ListingWithRelations[];
  } catch (error) {
    console.error('Error fetching featured listings from DB:', error);
    
    // Fallback to mock data function if DB fetch fails
    const { getFeaturedListings } = await import('./search');
    return getFeaturedListings(limit);
  }
};

/**
 * Helper to format search params from URL SearchParams to the format expected by the API
 */
export const formatSearchParams = (searchParams: URLSearchParams): SearchListingsParams => {
  return {
    search_query: searchParams.get('q') || undefined,
    category_filter: searchParams.get('category') || undefined,
    min_price: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    max_price: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    currency_filter: searchParams.get('currency') || undefined,
    sort_field: searchParams.get('sortBy') === 'newest' ? 'created_at' : 
                searchParams.get('sortBy') === 'price_asc' || searchParams.get('sortBy') === 'price_desc' ? 'price' :
                searchParams.get('sortBy') === 'views' ? 'views' : 'created_at' as any,
    sort_direction: searchParams.get('sortBy') === 'price_asc' ? 'asc' :
                   searchParams.get('sortBy') === 'price_desc' ? 'desc' :
                   searchParams.get('sortBy') === 'oldest' ? 'asc' : 'desc',
    governorate_id_filter: searchParams.get('governorate_id') || undefined,
    district_id_filter: searchParams.get('district_id') || undefined,
    page_number: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  };
};
