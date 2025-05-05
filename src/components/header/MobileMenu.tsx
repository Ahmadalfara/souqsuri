
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Moon, Sun, Heart, MessageSquare, Bell, Plus } from 'lucide-react';
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
    <div className={`md:hidden py-4 bg-white dark:bg-gray-800 rounded-b-lg shadow-md ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex justify-between items-center mb-2">
          <LanguageSwitcher className="self-start" />
          <ThemeSwitcher className="self-start" />
        </div>
        
        {currentUser ? (
          <>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/profile')}
              >
                <User className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {language === 'ar' ? (
                  <ArabicText text="الملف الشخصي" />
                ) : (
                  "Profile"
                )}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/favorites')}
            >
              <Heart className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="المفضلة" />
              ) : (
                "Favorites"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
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
              className="w-full justify-start"
              onClick={() => navigate('/notifications')}
            >
              <Bell className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="الإشعارات" />
              ) : (
                "Notifications"
              )}
            </Button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10"
                onClick={handleLogout}
              >
                <LogOut className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {language === 'ar' ? (
                  <ArabicText text="تسجيل الخروج" />
                ) : (
                  "Logout"
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <AuthSheet>
              <Button 
                variant="outline" 
                className="w-full justify-center border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
              >
                <User className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {language === 'ar' ? (
                  <ArabicText text="تسجيل الدخول" />
                ) : (
                  <span>{t('login')}</span>
                )}
              </Button>
            </AuthSheet>
          </>
        )}
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
          <CreateListingSheet>
            <Button className="w-full bg-syrian-green hover:bg-syrian-dark text-white justify-center">
              <Plus className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? (
                <ArabicText text="إضافة إعلان" />
              ) : (
                <span>{t('addListing')}</span>
              )}
            </Button>
          </CreateListingSheet>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
