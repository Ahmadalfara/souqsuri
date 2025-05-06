import { supabase } from '@/integrations/supabase/client';
import { ListingWithRelations } from '@/types/supabase';

interface ListingFilters {
  query?: string;
  category?: string;
  governorate_id?: string;
  district_id?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: string[];
  sortBy?: string;
  urgent?: boolean;
  currency?: string;
}

// Map frontend category names to database enum values
const mapCategoryToEnum = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'real_estate': 'real_estate',
    'cars': 'vehicles',
    'clothes': 'clothing',
    'electronics': 'electronics',
    'furniture': 'furniture',
    'jobs': 'jobs',
    'services': 'services'
  };
  
  console.log(`Mapping category '${category}' to enum value: ${categoryMap[category] || category}`);
  return categoryMap[category] || category;
};

export const getListingsByCategory = async (category: string, count = 12): Promise<ListingWithRelations[]> => {
  try {
    console.log(`Fetching listings by category: ${category}`);
    
    // Modified query to avoid the user_id foreign key issue
    let query = supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    // Only filter by category if it's not 'all'
    if (category && category !== 'all') {
      const dbCategory = mapCategoryToEnum(category);
      console.log(`Applying category filter: ${category} (mapped to: ${dbCategory})`);
      query = query.eq('category', dbCategory);
    } else {
      console.log('Showing all categories - no category filter applied');
    }
    
    // Add limit
    query = query.limit(count);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching listings by category:', error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} listings`, data);
    return data || [];
  } catch (error) {
    console.error('Error getting listings by category:', error);
    throw error;
  }
};

export const getFeaturedListings = async (count = 8): Promise<ListingWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(count);
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting featured listings:', error);
    throw error;
  }
};

export const searchListings = async (filters: ListingFilters): Promise<ListingWithRelations[]> => {
  try {
    console.log("Searching with filters:", filters);
    
    let query = supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('status', 'active');
    
    // Apply category filter only if category is specified and not 'all'
    if (filters.category && filters.category !== 'all' && filters.category !== '') {
      const dbCategory = mapCategoryToEnum(filters.category);
      console.log("Applying category filter:", filters.category, "(mapped to:", dbCategory, ")");
      query = query.eq('category', dbCategory);
    } else {
      console.log("No category filter applied or showing all categories");
    }
    
    if (filters.governorate_id) {
      console.log("Applying governorate filter:", filters.governorate_id);
      query = query.eq('governorate_id', filters.governorate_id);
    }
    
    if (filters.district_id) {
      console.log("Applying district filter:", filters.district_id);
      query = query.eq('district_id', filters.district_id);
    }
    
    if (filters.urgent === true) {
      console.log("Applying urgent filter");
      query = query.eq('is_featured', true);
    }
    
    if (filters.currency) {
      console.log("Applying currency filter:", filters.currency);
      query = query.eq('currency', filters.currency);
    }
    
    // Apply price range filters
    if (filters.priceMin !== undefined && filters.priceMin > 0) {
      console.log("Applying min price filter:", filters.priceMin);
      query = query.gte('price', filters.priceMin);
    }
    
    if (filters.priceMax !== undefined && filters.priceMax > 0) {
      console.log("Applying max price filter:", filters.priceMax);
      query = query.lte('price', filters.priceMax);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      console.log("Applying sort filter:", filters.sortBy);
      switch (filters.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'views':
          query = query.order('views', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    // Execute query
    console.log("Executing search query");
    const { data, error } = await query;
    
    if (error) {
      console.error("Search error:", error);
      throw error;
    }
    
    let results = data || [];
    console.log("Search results before filtering:", results.length);
    
    // Client-side filtering for text search
    if (filters.query) {
      const searchQuery = filters.query.toLowerCase();
      console.log("Applying text search filter:", searchQuery);
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery) ||
        (listing.description && listing.description.toLowerCase().includes(searchQuery))
      );
      console.log("Search results after text filtering:", results.length);
    }
    
    // Client-side filtering for condition
    if (filters.condition && filters.condition.length > 0) {
      console.log("Applying condition filter:", filters.condition);
      results = results.filter(listing => 
        !listing.condition || filters.condition.includes(listing.condition)
      );
      console.log("Search results after condition filtering:", results.length);
    }
    
    return results;
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
};
