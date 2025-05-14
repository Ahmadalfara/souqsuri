
import { ListingWithRelations } from '@/types/supabase';
import { advancedSearchListings } from './advancedSearch';
import { searchListings } from './search';

/**
 * Get listings by category ID
 * @param categoryId The category ID to filter by
 * @param limit Maximum number of listings to return
 * @returns Array of listings
 */
export const getListingsByCategoryId = async (categoryId: string, limit: number = 20): Promise<ListingWithRelations[]> => {
  try {
    console.log(`Getting listings for category: ${categoryId}, limit: ${limit}`);
    
    // Try to use the DB function first
    const listings = await advancedSearchListings({
      category_filter: categoryId,
      page_size: limit
    });
    
    console.log(`Retrieved ${listings.length} listings for category ${categoryId} from DB`);
    return listings;
  } catch (error) {
    console.error(`Error fetching category listings from DB for ${categoryId}:`, error);
    
    // Fall back to the mock data approach
    return searchListings({
      category: categoryId,
      limit: limit
    });
  }
};
