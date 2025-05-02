
import { supabase } from '@/integrations/supabase/client';

// Create a storage bucket if it doesn't exist
export const ensureStorageBucketsExist = async (): Promise<void> => {
  try {
    // Check if the listings bucket exists
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets();
    
    if (error) {
      throw error;
    }
    
    // Create listings bucket if it doesn't exist
    if (!buckets.some(bucket => bucket.name === 'listings')) {
      const { error: createBucketError } = await supabase
        .storage
        .createBucket('listings', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
          fileSizeLimit: 2 * 1024 * 1024 // 2MB
        });
      
      if (createBucketError) {
        throw createBucketError;
      }
      
      console.log('Created listings bucket');
    }
    
    // Create profiles bucket if it doesn't exist
    if (!buckets.some(bucket => bucket.name === 'profiles')) {
      const { error: createBucketError } = await supabase
        .storage
        .createBucket('profiles', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
          fileSizeLimit: 1 * 1024 * 1024 // 1MB
        });
      
      if (createBucketError) {
        throw createBucketError;
      }
      
      console.log('Created profiles bucket');
    }
  } catch (error) {
    console.error('Error ensuring storage buckets exist:', error);
    throw error;
  }
};

// Upload a file to storage and return the public URL
export const uploadFile = async (file: File, bucketName: string, folder = ''): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    const { data: urlData } = await supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);
      
    return urlData?.publicUrl || null;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Delete a file from storage
export const deleteFile = async (url: string, bucketName: string): Promise<boolean> => {
  try {
    // Extract file path from URL
    const path = url.split(`/${bucketName}/`)[1];
    if (!path) return false;
    
    const { error } = await supabase
      .storage
      .from(bucketName)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};
