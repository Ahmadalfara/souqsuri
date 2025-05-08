
import { useLocation } from 'react-router-dom';

export const useCurrentRoute = () => {
  const location = useLocation();
  
  return {
    path: location.pathname,
    isActive: (path: string) => {
      if (path === '/') {
        return location.pathname === '/';
      }
      
      // Handle paths with query parameters
      if (path.includes('?')) {
        const [pathPart, queryPart] = path.split('?');
        const params = new URLSearchParams(queryPart);
        const currentParams = new URLSearchParams(location.search);
        
        // Check if the current URL contains the path
        if (!location.pathname.includes(pathPart) && pathPart !== '/search') {
          return false;
        }
        
        // For category paths, check if the category parameter matches
        if (params.has('category')) {
          return currentParams.get('category') === params.get('category');
        }
      }
      
      return location.pathname.includes(path);
    },
    query: new URLSearchParams(location.search),
  };
};
