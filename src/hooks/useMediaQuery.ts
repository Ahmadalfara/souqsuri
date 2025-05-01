
import { useState, useEffect } from 'react';

/**
 * A custom hook that returns whether a media query matches
 * 
 * @param query The media query to check
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state if browser is available
  const getMatches = (): boolean => {
    // Check if window is defined (for SSR safety)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  function handleChange() {
    setMatches(getMatches());
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Add listener for subsequent changes
    if (matchMedia.addListener) {
      // For older browsers
      matchMedia.addListener(handleChange);
    } else {
      // Modern browsers
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        // For older browsers
        matchMedia.removeListener(handleChange);
      } else {
        // Modern browsers
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}
