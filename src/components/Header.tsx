
import React, { useState } from 'react';
import { Menu, X, Plus, Search, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './header/Logo';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  
  return (
    <header className={`flex flex-col py-3 px-4 md:px-6 bg-white border-b border-gray-200 sticky top-0 z-20
                       dark:bg-gray-900 dark:border-gray-800 dark:text-white transition-colors duration-300`}>
      {/* Upper header with logo, post ad button and auth buttons */}
      <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <Logo />

        <div className="flex-1 px-4 md:px-8 max-w-3xl mx-auto hidden md:block">
          <SearchBar variant="minimal" />
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-syrian-dark dark:text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`hidden md:flex items-center space-x-4 ${language === 'ar' ? 'space-x-reverse flex-row-reverse' : ''}`}>
          <Link to="/create-listing">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus size={16} />
              {language === 'ar' ? (
                <ArabicText text="نشر إعلان" size="normal" />
              ) : (
                "Post Ad"
              )}
            </Button>
          </Link>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <AuthButtons />
        </div>
      </div>
      
      {/* Mobile menu (shown on small screens) */}
      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;
