
import { useLocation } from 'react-router-dom';

export const useCurrentRoute = () => {
  const location = useLocation();
  
  /**
   * Check if a given path is active
   * @param path The path to check
   * @returns True if the path is active
   */
  const isActive = (path: string) => {
    // Handle exact matches first
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    
    // Handle category pages
    if (path.startsWith('/category/') && location.pathname.startsWith('/category/')) {
      const categoryInPath = path.split('/').pop();
      const categoryInLocation = location.pathname.split('/').pop();
      return categoryInPath === categoryInLocation;
    }
    
    // For search pages with query params
    if (path.startsWith('/search') && location.pathname.startsWith('/search')) {
      const searchParams = new URLSearchParams(location.search);
      const pathParams = new URLSearchParams(path.split('?')[1] || '');
      
      // If category is specified in the path params, check if it matches
      const categoryParam = pathParams.get('category');
      if (categoryParam) {
        return searchParams.get('category') === categoryParam;
      }
      
      // No specific category in path params, so just check if the paths match
      return location.pathname === path.split('?')[0];
    }
    
    // For all other cases
    return (path !== '/' && location.pathname.startsWith(path)) || location.pathname === path;
  };
  
  return { isActive };
};
