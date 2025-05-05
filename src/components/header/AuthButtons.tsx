
import React from 'react';
import { User, Plus } from 'lucide-react';
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
    <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
      {currentUser ? (
        <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
          <UserMenu />
          
          <CreateListingSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark text-white flex items-center">
              <Plus className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="أضف إعلانك" />
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
              className="border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
            >
              <User className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                <span>{t('login')}</span>
              )}
            </Button>
          </AuthSheet>
          
          <CreateListingSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark text-white flex items-center">
              <Plus className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="أضف إعلانك" />
              ) : (
                <span>{t('addListing')}</span>
              )}
            </Button>
          </CreateListingSheet>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
