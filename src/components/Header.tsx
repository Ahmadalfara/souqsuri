
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import AuthSheet from './auth/AuthSheet';
import CreateListingSheet from './listings/CreateListingSheet';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, t } = useLanguage();
  
  return (
    <header className="flex flex-col py-4 px-6 bg-syrian-green/10 border-b border-syrian-green/20">
      {/* Upper header with logo, language switcher and auth buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png" 
                alt="سوقنا" 
                className="w-12 h-12 object-contain" 
              />
            </div>
          </Link>
          <Link to="/">
            {language === 'ar' ? (
              <ArabicText text="سوقنا" className="ml-3 text-syrian-green font-bold" size="large" />
            ) : (
              <span className="ml-3 text-syrian-green font-bold text-lg">Souqna</span>
            )}
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <AuthSheet>
            <Button 
              variant="outline" 
              className="border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
            >
              <User className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                <span>{t('login')}</span>
              )}
            </Button>
          </AuthSheet>
          
          <CreateListingSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark text-white">
              {language === 'ar' ? (
                <ArabicText text="إضافة إعلان" />
              ) : (
                <span>{t('addListing')}</span>
              )}
            </Button>
          </CreateListingSheet>
        </div>
      </div>
      
      {/* Search bar */}
      <SearchBar className="max-w-4xl mx-auto" />
      
      {/* Categories menu */}
      <div className={`flex justify-center mt-4 space-x-6 ${language === 'ar' ? 'rtl' : ''}`}>
        <Link to="/category/real-estate" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="العقارات" />
          ) : (
            <span>{t('realEstate')}</span>
          )}
        </Link>
        <Link to="/category/cars" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="سيارات" />
          ) : (
            <span>{t('cars')}</span>
          )}
        </Link>
        <Link to="/category/electronics" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="إلكترونيات" />
          ) : (
            <span>{t('electronics')}</span>
          )}
        </Link>
        <Link to="/category/furniture" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="أثاث" />
          ) : (
            <span>{t('furniture')}</span>
          )}
        </Link>
        <Link to="/category/jobs" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="وظائف" />
          ) : (
            <span>{t('jobs')}</span>
          )}
        </Link>
        <Link to="/category/services" className="text-syrian-dark hover:text-syrian-green transition-colors">
          {language === 'ar' ? (
            <ArabicText text="خدمات" />
          ) : (
            <span>{t('services')}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
