
// This file contains security-related utility functions for Supabase

/**
 * Current Supabase RLS policies:
 * 
 * 1. Profiles table:
 *    - Users can read their own profile
 *    - Users can update their own profile
 *    - Admins can view all profiles (if admin role is added in the future)
 * 
 * These policies are implemented directly in Supabase and this file serves
 * as documentation for the application's security model.
 */

export const checkUserOwnership = async (userId: string, resourceId: string): Promise<boolean> => {
  if (!userId || !resourceId) return false;
  return userId === resourceId;
};

export const isAuthEnabled = (): boolean => {
  return true; // Authentication is enabled for this application
};
