
import { ListingWithRelations } from '@/types/supabase';
import { getListingsByCategory } from './categories';

/**
 * Get listings by category using Supabase
 * @param category The category ID to filter by
 * @param count Maximum number of listings to return
 * @returns Array of listings filtered by category
 */
export const getListingsByCategoryId = async (
  category: string,
  count: number = 12
): Promise<ListingWithRelations[]> => {
  console.log(`Getting listings for category: ${category}`);
  
  return getListingsByCategory(category, count);
};
