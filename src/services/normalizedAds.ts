
import { supabase } from '@/integrations/supabase/client';
import { NormalizedAd, SearchParams } from '@/types/normalized';

export async function searchNormalizedAds(params: SearchParams = {}): Promise<NormalizedAd[]> {
  try {
    // Use a more secure approach by setting explicit parameters without NULL values
    const { data, error } = await supabase.rpc('search_normalized_ads', {
      search_query: params.search_query || '',
      category_filter: params.category_id || '',
      location_filter: params.location_id || '',
      currency_filter: params.currency_id || '',
      min_price: params.min_price === undefined ? null : params.min_price,
      max_price: params.max_price === undefined ? null : params.max_price,
      sort_field: params.sort_field || 'created_at',
      sort_direction: params.sort_direction || 'desc',
      page_size: params.page_size || 20,
      page_number: params.page_number || 1
    });

    if (error) {
      console.error('Error searching normalized ads:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchNormalizedAds:', error);
    return [];
  }
}

export async function createNormalizedAd(ad: Partial<NormalizedAd>): Promise<NormalizedAd | null> {
  try {
    const { data, error } = await supabase
      .from('normalized_ads')
      .insert(ad)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating normalized ad:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createNormalizedAd:', error);
    return null;
  }
}

export async function getNormalizedAdById(id: string): Promise<NormalizedAd | null> {
  try {
    // Fixed approach: don't use search_rpc for single item retrieval
    const { data, error } = await supabase
      .from('normalized_ads')
      .select(`
        *,
        currency:currencies(name, symbol),
        location:locations(name),
        category:categories(name),
        user:profiles(name, profile_picture)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting normalized ad:', error);
      throw error;
    }

    // Transform the response to match NormalizedAd type
    const normalizedAd: NormalizedAd = {
      ...data,
      currency_name: data.currency?.name || '',
      currency_symbol: data.currency?.symbol || '',
      location_name: data.location?.name || '',
      category_name: data.category?.name || '',
      user_name: data.user?.name || '',
      user_profile_picture: data.user?.profile_picture || ''
    };

    return normalizedAd;
  } catch (error) {
    console.error('Error in getNormalizedAdById:', error);
    return null;
  }
}

export async function updateNormalizedAd(id: string, updates: Partial<NormalizedAd>): Promise<NormalizedAd | null> {
  try {
    const { data, error } = await supabase
      .from('normalized_ads')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating normalized ad:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateNormalizedAd:', error);
    return null;
  }
}

export async function deleteNormalizedAd(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('normalized_ads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting normalized ad:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteNormalizedAd:', error);
    return false;
  }
}

export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
}

export async function fetchLocations() {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchLocations:', error);
    return [];
  }
}

export async function fetchCurrencies() {
  try {
    const { data, error } = await supabase
      .from('currencies')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchCurrencies:', error);
    return [];
  }
}
