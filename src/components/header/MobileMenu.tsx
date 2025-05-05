
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, MessageSquare, Bookmark, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AuthSheet from '@/components/auth/AuthSheet';
import CreateListingSheet from '@/components/listings/CreateListingSheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { language, t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`md:hidden py-4 border-t border-syrian-green/10 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="flex flex-col space-y-4">
        {currentUser && (
          <>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/messages')}
            >
              <MessageSquare className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="الرسائل" />
              ) : (
                "Messages"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/favorites')}
            >
              <Bookmark className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="المفضلة" />
              ) : (
                "Favorites"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/my-listings')}
            >
              <Package className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="إعلاناتي" />
              ) : (
                "My Ads"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => navigate('/profile')}
            >
              <User className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="الملف الشخصي" />
              ) : (
                "Profile"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start text-destructive"
              onClick={handleLogout}
            >
              <LogOut className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="تسجيل الخروج" />
              ) : (
                "Logout"
              )}
            </Button>
          </>
        )}
        
        {!currentUser && (
          <AuthSheet>
            <Button 
              variant="outline" 
              className="w-full border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
            >
              <User className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                <span>{t('login')}</span>
              )}
            </Button>
          </AuthSheet>
        )}
        
        <CreateListingSheet>
          <Button className="w-full bg-syrian-green hover:bg-syrian-dark text-white">
            {language === 'ar' ? (
              <ArabicText text="إضافة إعلان" />
            ) : (
              <span>{t('addListing')}</span>
            )}
          </Button>
        </CreateListingSheet>
        
        <div className={`flex justify-between mt-4 pt-4 border-t border-syrian-green/10 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <LanguageSwitcher className="self-start" />
          <ThemeSwitcher id="dark-mode-toggle" className="self-start" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
