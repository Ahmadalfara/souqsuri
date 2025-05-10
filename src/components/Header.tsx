
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './header/Logo';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';
import Categories from './header/Categories';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const auth = useAuth();
  const isMobile = useIsMobile();
  
  // Check if auth is available (meaning we're inside AuthProvider)
  const isAuthReady = auth !== undefined;

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isMobile]);
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="flex flex-col bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Fixed top header with logo, language switcher and auth buttons */}
      <div className={`flex items-center justify-between p-3 sm:p-4 bg-white border-b border-syrian-green/20 shadow-sm sticky top-0 z-50
                      dark:bg-gray-900 dark:border-gray-800 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <Logo />

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-syrian-dark dark:text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`hidden md:flex items-center space-x-4 ${language === 'ar' ? 'space-x-reverse flex-row-reverse' : ''}`}>
          <ThemeSwitcher />
          <LanguageSwitcher />
          {isAuthReady && <AuthButtons />}
        </div>
      </div>
      
      {/* Mobile menu (shown on small screens) */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      
      {/* Scrollable content area */}
      <div className="w-full overflow-x-auto scrollbar-hide py-3 px-3 sm:py-4 sm:px-6">
        {/* Search bar */}
        <div className="mb-3 sm:mb-4 max-w-4xl mx-auto">
          <SearchBar />
        </div>

        {/* Categories with horizontal scroll */}
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <Categories />
        </div>
      </div>
    </header>
  );
};

export default Header;
