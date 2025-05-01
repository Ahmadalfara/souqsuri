
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useIsMobile } from '@/hooks/use-mobile';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: Theme | null;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  systemTheme: null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check for system dark mode preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const systemTheme: Theme = prefersDarkMode ? 'dark' : 'light';
  const isMobile = useIsMobile();
  
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // If user has a saved preference, use it
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Always default to light theme, regardless of system preference
    return 'light';
  });

  useEffect(() => {
    // Update document theme class based on selected theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // If on mobile and dark mode isn't available, make it available
  useEffect(() => {
    if (isMobile) {
      // Make dark mode available, but don't switch to it automatically
      // The user can still choose dark mode if they prefer
      const darkModeBtn = document.getElementById('dark-mode-toggle');
      if (darkModeBtn) {
        darkModeBtn.classList.remove('hidden');
      }
    }
  }, [isMobile]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
