
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './header/Logo';
import Categories from './header/Categories';
import AuthButtons from './header/AuthButtons';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="flex flex-col py-4 px-6 bg-white border-b border-syrian-green/20 shadow-sm sticky top-0 z-20">
      {/* Upper header with logo, language switcher and auth buttons */}
      <div className="flex items-center justify-between mb-4">
        <Logo />

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-syrian-dark p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
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
