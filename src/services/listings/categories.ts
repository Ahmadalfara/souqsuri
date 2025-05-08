
import { supabase } from '@/integrations/supabase/client';
import { ListingWithRelations } from '@/types/supabase';

/**
 * Get all available categories
 * @returns Promise with array of categories
 */
export const getCategories = async () => {
  try {
    // For now we'll return the hardcoded categories since we don't have a categories table yet
    // This can be updated later when a categories table is added to Supabase
    return [
      { id: 'real_estate', nameEn: 'Real Estate', nameAr: 'عقارات', count: 0 },
      { id: 'cars', nameEn: 'Cars', nameAr: 'سيارات', count: 0 },
      { id: 'electronics', nameEn: 'Electronics', nameAr: 'الكترونيات', count: 0 },
      { id: 'furniture', nameEn: 'Furniture', nameAr: 'أثاث', count: 0 },
      { id: 'jobs', nameEn: 'Jobs', nameAr: 'وظائف', count: 0 },
      { id: 'services', nameEn: 'Services', nameAr: 'خدمات', count: 0 },
      { id: 'fashion', nameEn: 'Fashion', nameAr: 'أزياء', count: 0 },
      { id: 'books', nameEn: 'Books', nameAr: 'كتب', count: 0 },
      { id: 'pets', nameEn: 'Pets', nameAr: 'حيوانات أليفة', count: 0 },
      { id: 'sports', nameEn: 'Sports', nameAr: 'رياضة', count: 0 }
    ];
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

/**
 * Get category count from Supabase
 * @param categoryId The category ID to count listings for
 * @returns Promise with the count of listings in that category
 */
export const getCategoryCount = async (categoryId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('category', categoryId);
      
    if (error) {
      console.error(`Error counting listings for category ${categoryId}:`, error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error(`Error counting listings for category ${categoryId}:`, error);
    return 0;
  }
};

/**
 * Get listings by category from Supabase
 * @param categoryId The category ID to filter by
 * @param limit Maximum number of listings to return
 * @returns Array of listings filtered by category
 */
export const getListingsByCategory = async (
  categoryId: string,
  limit: number = 12
): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*),
        user:user_id(*)
      `)
      .eq('category', categoryId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error(`Error fetching listings for category ${categoryId}:`, error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching listings for category ${categoryId}:`, error);
    throw error;
  }
};
