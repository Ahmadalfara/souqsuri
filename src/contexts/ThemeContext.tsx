
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useIsMobile, useIsTouch } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const isTouch = useIsTouch();
  const { language } = useLanguage();
  
  // Initialize with stored theme or system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme as Theme;
      }
    }
    return systemTheme;
  });

  useEffect(() => {
    // Update document theme class based on selected theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
