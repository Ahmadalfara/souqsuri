
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './header/Logo';
import Categories from './header/Categories';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <header className={`flex flex-col py-4 px-6 bg-white border-b border-syrian-green/20 shadow-sm sticky top-0 z-20
                       dark:bg-gray-900 dark:border-gray-800 dark:text-white transition-colors duration-300`}>
      {/* Upper header with logo, language switcher and auth buttons */}
      <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
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
          <AuthButtons />
        </div>
      </div>
      
      {/* Mobile menu (shown on small screens) */}
      <MobileMenu isOpen={mobileMenuOpen} />
      
      {/* Search bar */}
      <div className="mb-1">
        <SearchBar className="max-w-4xl mx-auto" />
      </div>
      
      {/* Categories menu - placed directly below search bar */}
      <Categories />
    </header>
  );
};

export default Header;
