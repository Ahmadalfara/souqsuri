
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';
import { uploadFile } from '@/utils/supabaseStorage';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string, 
  updates: Partial<Omit<Profile, 'id' | 'updated_at'>>
): Promise<Profile | null> => {
  try {
    // Update the profile in the database
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};

export const uploadProfilePicture = async (userId: string, file: File): Promise<string | null> => {
  try {
    // Upload the file to storage
    const imageUrl = await uploadFile(file, 'profiles', userId);
    
    if (!imageUrl) {
      throw new Error('Failed to upload profile picture');
    }
    
    // Update the profile with the new image URL
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        profile_picture: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return null;
  }
};

export const getEmailFromUserId = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .maybeSingle();
      
    if (error || !data) {
      return null;
    }
    
    return data.email || null;
  } catch (error) {
    console.error('Error getting email from user ID:', error);
    return null;
  }
};
