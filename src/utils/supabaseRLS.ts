
// This file contains security-related utility functions for Supabase

/**
 * Current Supabase RLS policies:
 * 
 * 1. Profiles table:
 *    - Users can read their own profile
 *    - Users can update their own profile
 *    - Admins can view all profiles (if admin role is added in the future)
 * 
 * 2. Listings table:
 *    - Anyone can view active listings
 *    - Users can create, update, and delete their own listings
 * 
 * 3. Governorates & Districts tables:
 *    - Anyone can view these tables (public reference data)
 *    - Only admins can modify them (future feature)
 * 
 * 4. Favorites table:
 *    - Users can view, create, and delete their own favorites
 * 
 * 5. Messages table:
 *    - Users can view conversations they're part of
 *    - Users can send messages
 *    - Users can only update their own sent messages
 * 
 * 6. Reports table:
 *    - Users can create and view their own reports
 *    - Admins can view and manage all reports (future feature)
 * 
 * The auto-profile creation is handled by the handle_new_user() trigger function
 * which creates a profile entry whenever a new user is registered.
 */

import { supabase } from '@/integrations/supabase/client';

export const checkUserOwnership = async (userId: string, resourceId: string): Promise<boolean> => {
  if (!userId || !resourceId) return false;
  return userId === resourceId;
};

export const isAuthEnabled = (): boolean => {
  return true; // Authentication is enabled for this application
};

// Constant that reflects which resources have RLS enabled
export const RLS_PROTECTED_RESOURCES = {
  PROFILES: 'profiles',
  LISTINGS: 'listings',
  FAVORITES: 'favorites',
  MESSAGES: 'messages',
  REPORTS: 'reports',
  GOVERNORATES: 'governorates',
  DISTRICTS: 'districts',
  // Add more resources as they get RLS protection
};

// Check if a user can modify a listing
export const canModifyListing = async (userId: string, listingId: string): Promise<boolean> => {
  if (!userId || !listingId) return false;
  
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('user_id')
      .eq('id', listingId)
      .maybeSingle();
      
    if (error || !data) {
      return false;
    }
    
    return data.user_id === userId;
  } catch (error) {
    console.error('Error checking if user can modify listing:', error);
    return false;
  }
};

// Check if a user can modify a message
export const canModifyMessage = async (userId: string, messageId: string): Promise<boolean> => {
  if (!userId || !messageId) return false;
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('sender_id')
      .eq('id', messageId)
      .maybeSingle();
      
    if (error || !data) {
      return false;
    }
    
    return data.sender_id === userId;
  } catch (error) {
    console.error('Error checking if user can modify message:', error);
    return false;
  }
};

// Check if a user can access a conversation
export const canAccessConversation = async (userId: string, otherUserId: string): Promise<boolean> => {
  if (!userId || !otherUserId) return false;
  
  try {
    // Check if there are any messages between these users
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`);
      
    if (error) {
      return false;
    }
    
    return count !== null && count > 0;
  } catch (error) {
    console.error('Error checking if user can access conversation:', error);
    return false;
  }
};
