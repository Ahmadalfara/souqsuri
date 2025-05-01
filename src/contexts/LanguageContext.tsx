
import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations';
import { Language, Direction, LanguageContextType } from './language-types';

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  direction: 'rtl',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if language is saved in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) 
      ? savedLanguage 
      : 'ar';
  });
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body for global styling
    document.body.classList.remove('lang-ar', 'lang-en');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class for global styling
    document.body.classList.remove('lang-ar', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
