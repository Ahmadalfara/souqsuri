
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
  
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // If user has a saved preference, use it; otherwise use system preference
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Use system preference as default
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
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update theme if system preference changes
  useEffect(() => {
    // Only update if the user hasn't explicitly chosen a theme
    if (!localStorage.getItem('theme')) {
      setThemeState(systemTheme);
    }
  }, [systemTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
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
