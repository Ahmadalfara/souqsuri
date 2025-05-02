
import { supabase } from '@/integrations/supabase/client';
import { Database, Listing, ListingWithRelations } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type { Listing, ListingWithRelations } from '@/types/supabase';

interface ListingFilters {
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
}

export const addListing = async (
  listing: Omit<Database['public']['Tables']['listings']['Insert'], 'id' | 'created_at' | 'views'>, 
  imageFiles: File[]
): Promise<string | null> => {
  try {
    // First upload images to Supabase storage
    const imageUrls: string[] = [];
    
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `listings/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('listings')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }
      
      // Get the public URL for the uploaded file
      const { data: urlData } = await supabase
        .storage
        .from('listings')
        .getPublicUrl(filePath);
        
      if (urlData) {
        imageUrls.push(urlData.publicUrl);
      }
    }
    
    // Create the listing with image URLs
    const { data, error } = await supabase
      .from('listings')
      .insert({
        ...listing,
        images: imageUrls,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error adding listing:', error);
    throw error;
  }
};

export const getUserListings = async (userId: string): Promise<Listing[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting user listings:', error);
    throw error;
  }
};

export const getFeaturedListings = async (count = 8): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*),
        user:user_id(*)
      `)
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(count);
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting featured listings:', error);
    throw error;
  }
};

export const getListingsByCategory = async (category: string, count = 12): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*),
        user:user_id(*)
      `)
      .eq('category', category)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(count);
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting listings by category:', error);
    throw error;
  }
};

export const getListing = async (id: string): Promise<ListingWithRelations | null> => {
  try {
    // First get the listing
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*),
        user:user_id(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    // Update view count
    const { error: updateError } = await supabase
      .from('listings')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', id);
      
    if (updateError) {
      console.error('Error updating view count:', updateError);
    }
    
    return data;
  } catch (error) {
    console.error('Error getting listing:', error);
    throw error;
  }
};

export const searchListings = async (filters: ListingFilters): Promise<ListingWithRelations[]> => {
  try {
    let query = supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*),
        user:user_id(*)
      `)
      .eq('status', 'active');
    
    // Apply filters
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }
    
    if (filters.governorate_id) {
      query = query.eq('governorate_id', filters.governorate_id);
    }
    
    if (filters.district_id) {
      query = query.eq('district_id', filters.district_id);
    }
    
    if (filters.urgent === true) {
      query = query.eq('is_featured', true);
    }
    
    if (filters.currency) {
      query = query.eq('currency', filters.currency);
    }
    
    // Apply price range filters
    if (filters.priceMin !== undefined) {
      query = query.gte('price', filters.priceMin);
    }
    
    if (filters.priceMax !== undefined) {
      query = query.lte('price', filters.priceMax);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'views':
          query = query.order('views', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    let results = data || [];
    
    // Client-side filtering for text search
    if (filters.query) {
      const searchQuery = filters.query.toLowerCase();
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery) ||
        listing.description.toLowerCase().includes(searchQuery)
      );
    }
    
    // Get current language for sorting by language preference
    const currentLanguage = localStorage.getItem('language') || 'ar';
    
    // Sort by current language (this would need a language field in the listing that we don't currently have)
    // Could be added later if needed
    
    return results;
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
};

export const updateListing = async (id: string, data: Partial<Listing>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('listings')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

export const toggleListingStatus = async (id: string, status: 'active' | 'sold' | 'pending'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('listings')
      .update({ 
        status,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error toggling listing status:', error);
    throw error;
  }
};

export const deleteListing = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};

export const addListingToFavorites = async (userId: string, listingId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, listing_id: listingId });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error adding listing to favorites:', error);
    throw error;
  }
};

export const removeListingFromFavorites = async (userId: string, listingId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('listing_id', listingId);
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error removing listing from favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId: string): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        listing_id,
        listing:listing_id(
          *,
          governorate:governorate_id(*),
          district:district_id(*),
          user:user_id(*)
        )
      `)
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    // Filter out any null listings and properly extract the listing data
    const listings = data
      ?.map(item => item.listing)
      .filter(Boolean) as ListingWithRelations[];
      
    return listings || [];
  } catch (error) {
    console.error('Error getting user favorites:', error);
    throw error;
  }
};

export const isListingFavorited = async (userId: string, listingId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .maybeSingle();
      
    if (error) {
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking if listing is favorited:', error);
    throw error;
  }
};

export const getGovernorates = async (): Promise<Database['public']['Tables']['governorates']['Row'][]> => {
  try {
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .order('name_ar', { ascending: true });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting governorates:', error);
    throw error;
  }
};

export const getDistricts = async (governorateId: string): Promise<Database['public']['Tables']['districts']['Row'][]> => {
  try {
    const { data, error } = await supabase
      .from('districts')
      .select('*')
      .eq('governorate_id', governorateId)
      .order('name_ar', { ascending: true });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting districts:', error);
    throw error;
  }
};

export const reportListing = async (userId: string, listingId: string, reason: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        listing_id: listingId,
        reason
      });
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error reporting listing:', error);
    throw error;
  }
};
