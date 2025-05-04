
import { supabase } from '@/integrations/supabase/client';
import { Listing, ListingWithRelations } from '@/types/supabase';

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
    
    // Extract listings correctly with proper type safety
    const listings: ListingWithRelations[] = [];
    
    // Process each favorite and safely extract the listing
    data?.forEach(item => {
      if (item.listing && typeof item.listing === 'object' && !Array.isArray(item.listing)) {
        listings.push(item.listing as unknown as ListingWithRelations);
      }
    });
      
    return listings;
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
