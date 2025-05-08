
import { ListingWithRelations } from '@/types/supabase';
import { searchListings } from './search';

/**
 * Get listings by category using the search service
 * @param category The category ID to filter by
 * @param count Maximum number of listings to return
 * @returns Array of listings filtered by category
 */
export const getListingsByCategoryId = async (
  category: string,
  count: number = 12
): Promise<ListingWithRelations[]> => {
  console.log(`Getting listings for category: ${category}`);
  
  // Use the existing search function with category filter
  const filteredListings = searchListings({
    category,
    sortBy: 'newest'
  });
  
  // Apply limit and return as Promise
  return Promise.resolve(filteredListings.slice(0, count));
};
