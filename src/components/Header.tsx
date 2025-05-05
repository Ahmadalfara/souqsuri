
import React, { useState } from 'react';
import { Menu, X, MessageSquare, Bookmark, User } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './header/Logo';
import Categories from './header/Categories';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';
import TopBar from './header/TopBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <header className={`flex flex-col py-4 px-6 bg-white border-b border-syrian-green/20 shadow-sm sticky top-0 z-20
                       dark:bg-gray-900 dark:border-gray-800 dark:text-white transition-colors duration-300`}>
      {/* Top bar with icons */}
      <TopBar />
      
      {/* Main header with logo, search and auth buttons */}
      <div className={`flex items-center justify-between py-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
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
          <AuthButtons />
        </div>
      </div>
      
      {/* Mobile menu (shown on small screens) */}
      <MobileMenu isOpen={mobileMenuOpen} />
      
      {/* Search bar */}
      <div className="mb-4">
        <SearchBar className="max-w-4xl mx-auto" />
      </div>
      
      {/* Categories menu */}
      <Categories />
    </header>
  );
};

export default Header;
