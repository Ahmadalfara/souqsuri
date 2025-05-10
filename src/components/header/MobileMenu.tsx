
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import AuthButtons from './AuthButtons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  
  // Check if we're within AuthProvider context
  let authContext;
  try {
    authContext = useAuth();
  } catch (e) {
    // If we get an error, we're not inside an AuthProvider
    authContext = undefined;
  }
  
  const isAuthReady = authContext !== undefined;
  
  if (!isOpen) return null;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };
  
  return (
    <div className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col p-4 pt-16 overflow-y-auto
                     ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center justify-between mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      
      {isAuthReady && (
        <div className="mb-6">
          <AuthButtons />
        </div>
      )}
      
      <nav className={`flex flex-col space-y-5 ${language === 'ar' ? 'items-end' : 'items-start'}`}>
        {/* Navigation links */}
        <Link to="/" className="font-medium text-lg" onClick={handleLinkClick}>
          {language === 'ar' ? 'الرئيسية' : 'Home'}
        </Link>
        <Link to="/featured-listings" className="font-medium text-lg" onClick={handleLinkClick}>
          {language === 'ar' ? 'الإعلانات المميزة' : 'Featured Listings'}
        </Link>
        <Link to="/contact" className="font-medium text-lg" onClick={handleLinkClick}>
          {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
