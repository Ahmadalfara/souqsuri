
import { useLocation } from 'react-router-dom';

export const useCurrentRoute = () => {
  const location = useLocation();
  
  return {
    path: location.pathname,
    isActive: (path: string) => {
      // Handle root path exactly
      if (path === '/') {
        return location.pathname === '/';
      }
      
      // Handle paths with query parameters
      if (path.includes('?')) {
        const [pathPart, queryPart] = path.split('?');
        const params = new URLSearchParams(queryPart);
        const currentParams = new URLSearchParams(location.search);
        
        // For category paths, check if we're on the search page and if the category parameter matches
        if (pathPart === '/search' && params.has('category')) {
          return (
            location.pathname === '/search' &&
            currentParams.get('category') === params.get('category')
          );
        }
        
        // For other query params, just check if the path part matches
        return location.pathname.includes(pathPart);
      }
      
      // Special case for featured-listings page
      if (path === '/featured-listings' && location.pathname === '/featured-listings') {
        return true;
      }
      
      // Default path matching
      return location.pathname.includes(path);
    },
    query: new URLSearchParams(location.search),
  };
};
