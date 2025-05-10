
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import AuthSheet from '@/components/auth/AuthSheet';
import CreateListingSheet from '@/components/listings/CreateListingSheet';
import UserMenu from './UserMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const AuthButtons = () => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
      {currentUser ? (
        <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
          <UserMenu />
          
          <CreateListingSheet>
            <Button size="sm" className="bg-syrian-green hover:bg-syrian-dark text-white text-xs sm:text-sm">
              {language === 'ar' ? (
                <ArabicText text="إضافة إعلان" />
              ) : (
                <span>{t('addListing')}</span>
              )}
            </Button>
          </CreateListingSheet>
        </div>
      ) : (
        <>
          <AuthSheet>
            <Button 
              variant="outline"
              size="sm"
              className="border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10 text-xs sm:text-sm"
            >
              <User className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                <span>{t('login')}</span>
              )}
            </Button>
          </AuthSheet>
          
          <AuthSheet defaultTab="register">
            <Button size="sm" className="bg-syrian-green hover:bg-syrian-dark text-white text-xs sm:text-sm">
              {language === 'ar' ? (
                <ArabicText text="إنشاء حساب" />
              ) : (
                <span>{t('register')}</span>
              )}
            </Button>
          </AuthSheet>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
