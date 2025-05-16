
import { supabase } from '@/integrations/supabase/client';
import { NormalizedAd, SearchParams } from '@/types/normalized';

export async function searchNormalizedAds(params: SearchParams = {}): Promise<NormalizedAd[]> {
  try {
    const { data, error } = await supabase.rpc('search_normalized_ads', {
      search_query: params.search_query || null,
      category_filter: params.category_id || null,
      location_filter: params.location_id || null,
      currency_filter: params.currency_id || null,
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
    // We use our search function to get the ad with all joined data
    const { data, error } = await supabase.rpc('search_normalized_ads', {
      search_query: null,
      category_filter: null,
      location_filter: null,
      currency_filter: null,
      min_price: null,
      max_price: null,
      sort_field: 'created_at',
      sort_direction: 'desc',
      page_size: 1,
      page_number: 1
    }).eq('id', id);

    if (error) {
      console.error('Error getting normalized ad:', error);
      throw error;
    }

    return data && data.length > 0 ? data[0] : null;
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
