
import { supabase } from '@/integrations/supabase/client';
import { Listing, ListingWithRelations } from '@/types/supabase';

export type { Listing, ListingWithRelations } from '@/types/supabase';

/**
 * Core listing service with essential CRUD operations
 */

export const addListing = async (
  listing: Omit<Listing, 'id' | 'created_at' | 'views'>, 
  imageFiles: File[]
): Promise<string | null> => {
  try {
    console.log("Adding listing with data:", listing);
    
    // First upload images to Supabase storage
    const imageUrls: string[] = [];
    
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `listings/${fileName}`;
      
      console.log(`Uploading ${file.name} to ${filePath}`);
      
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
    
    console.log("Image URLs:", imageUrls);
    
    // Create the listing with image URLs
    const { data, error } = await supabase
      .from('listings')
      .insert({
        ...listing,
        images: imageUrls,
        updated_at: new Date().toISOString() // Ensure updated_at is set, even if provided in listing
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error adding listing:', error);
      throw error;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error adding listing:', error);
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
