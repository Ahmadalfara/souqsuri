
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';
import { User, LogOut, Menu, X } from 'lucide-react';
import AuthSheet from './auth/AuthSheet';
import CreateListingSheet from './listings/CreateListingSheet';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const { language, t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  useEffect(() => {
    // Extract category from URL if on a category page
    if (location.pathname.startsWith('/category/')) {
      const categoryName = location.pathname.split('/').pop();
      setActiveCategory(categoryName || null);
    } else {
      setActiveCategory(null);
    }

    // Close mobile menu when navigating
    setMobileMenuOpen(false);
  }, [location]);

  const categories = [
    { name: 'real_estate', label: language === 'ar' ? 'العقارات' : t('realEstate') },
    { name: 'cars', label: language === 'ar' ? 'سيارات' : t('cars') },
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics') },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture') },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs') },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services') },
  ];
  
  return (
    <header className="flex flex-col py-4 px-6 bg-white border-b border-syrian-green/20 shadow-sm sticky top-0 z-20">
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
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                    <Avatar>
                      <AvatarFallback className="bg-syrian-green text-white">
                        {getInitials(currentUser.displayName || 'User')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {language === 'ar' ? (
                      <ArabicText text="حسابي" />
                    ) : (
                      "My Account"
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    {language === 'ar' ? (
                      <ArabicText text="الملف الشخصي" />
                    ) : (
                      "Profile"
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {language === 'ar' ? (
                      <ArabicText text="تسجيل الخروج" />
                    ) : (
                      "Logout"
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
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
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu (shown on small screens) */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-syrian-green/10">
          <div className="flex flex-col space-y-4">
            <LanguageSwitcher className="self-start" />
            
            {currentUser ? (
              <>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate('/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
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
                  <LogOut className="mr-2 h-4 w-4" />
                  {language === 'ar' ? (
                    <ArabicText text="تسجيل الخروج" />
                  ) : (
                    "Logout"
                  )}
                </Button>
              </>
            ) : (
              <>
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
              </>
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
          </div>
        </div>
      )}
      
      {/* Search bar */}
      <div className="mb-4">
        <SearchBar className="max-w-4xl mx-auto" />
      </div>
      
      {/* Categories menu */}
      <div className={`flex justify-center space-x-1 md:space-x-6 overflow-x-auto pb-2 ${language === 'ar' ? 'rtl' : ''}`}>
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={`/category/${category.name}`} 
            className={`
              whitespace-nowrap px-3 py-2 rounded-full transition-colors
              ${activeCategory === category.name 
                ? 'bg-syrian-green text-white font-bold' 
                : 'text-syrian-dark hover:bg-syrian-green/10'
              }
            `}
          >
            {language === 'ar' ? (
              <ArabicText text={category.label} />
            ) : (
              <span>{category.label}</span>
            )}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
