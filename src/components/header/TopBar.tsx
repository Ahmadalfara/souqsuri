
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Bookmark, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ArabicText from '@/components/ArabicText';

const TopBar = () => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();
  
  return (
    <div className={`flex items-center justify-between border-b border-syrian-green/10 pb-2 text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-5' : 'space-x-5'}`}>
        {currentUser && (
          <>
            <Link to="/messages" className={`flex items-center text-gray-600 hover:text-syrian-green ${language === 'ar' ? 'flex-row-reverse space-x-reverse space-x-1' : 'space-x-1'}`}>
              <MessageSquare size={16} />
              <span>{language === 'ar' ? 'الرسائل' : 'Messages'}</span>
            </Link>
            
            <Link to="/favorites" className={`flex items-center text-gray-600 hover:text-syrian-green ${language === 'ar' ? 'flex-row-reverse space-x-reverse space-x-1' : 'space-x-1'}`}>
              <Bookmark size={16} />
              <span>{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
            </Link>
            
            <Link to="/my-listings" className={`flex items-center text-gray-600 hover:text-syrian-green ${language === 'ar' ? 'flex-row-reverse space-x-reverse space-x-1' : 'space-x-1'}`}>
              <Package size={16} />
              <span>{language === 'ar' ? 'إعلاناتي' : 'My Ads'}</span>
            </Link>
          </>
        )}
      </div>
      
      <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default TopBar;
