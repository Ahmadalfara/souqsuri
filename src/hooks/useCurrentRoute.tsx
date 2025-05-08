
import { useLocation } from 'react-router-dom';

export const useCurrentRoute = () => {
  const location = useLocation();
  
  return {
    path: location.pathname,
    isActive: (path: string) => {
      if (path === '/') {
        return location.pathname === '/';
      }
      return location.pathname.includes(path);
    },
    query: new URLSearchParams(location.search),
  };
};
