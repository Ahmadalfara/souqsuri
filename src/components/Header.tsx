
import React, { useState } from 'react';
import { Menu, X, Bell, Heart, MessageSquare, User, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './header/Logo';
import Categories from './header/Categories';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ArabicText from './ArabicText';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <header className={`py-3 px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20
                       dark:bg-gray-900 dark:border-gray-800 dark:text-white transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Upper header with logo, search bar and auth buttons */}
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden text-gray-700 dark:text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Logo />
          </div>

          {/* Search bar - Only visible on desktop */}
          <div className="hidden md:block w-full max-w-2xl mx-4">
            <SearchBar className="w-full" />
          </div>
          
          {/* Right-side navigation */}
          <div className={`hidden md:flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-4">
              <Link to="/favorites" className="text-gray-700 hover:text-syrian-green dark:text-gray-300 dark:hover:text-white">
                <span className="flex flex-col items-center">
                  <Heart size={20} />
                  <span className="text-xs mt-1">{language === 'ar' ? <ArabicText text="المفضلة" /> : 'Favorites'}</span>
                </span>
              </Link>
              
              <Link to="/messages" className="text-gray-700 hover:text-syrian-green dark:text-gray-300 dark:hover:text-white">
                <span className="flex flex-col items-center">
                  <MessageSquare size={20} />
                  <span className="text-xs mt-1">{language === 'ar' ? <ArabicText text="الرسائل" /> : 'Messages'}</span>
                </span>
              </Link>
              
              <div className="h-10 border-r border-gray-300 dark:border-gray-700"></div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <AuthButtons />
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <MobileMenu isOpen={mobileMenuOpen} />
        
        {/* Mobile search bar - only visible on mobile */}
        <div className="md:hidden mt-4">
          <SearchBar className="w-full" />
        </div>
        
        {/* Categories menu */}
        <div className="mt-4">
          <Categories />
        </div>
      </div>
    </header>
  );
};

export default Header;
