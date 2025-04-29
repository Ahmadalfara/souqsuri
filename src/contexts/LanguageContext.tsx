
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simple translation dictionary
const translations: Record<string, Record<string, string>> = {
  ar: {
    // Navigation
    'home': 'الرئيسية',
    'login': 'تسجيل الدخول',
    'register': 'إنشاء حساب',
    'addListing': 'إضافة إعلان',
    'search': 'بحث',
    'myAccount': 'حسابي',
    'favorites': 'المفضلة',
    'messages': 'الرسائل',
    'logout': 'تسجيل الخروج',
    
    // Categories
    'categories': 'الفئات',
    'realEstate': 'العقارات',
    'cars': 'سيارات',
    'electronics': 'إلكترونيات',
    'furniture': 'أثاث',
    'jobs': 'وظائف',
    'services': 'خدمات',
    
    // Listing form
    'listingTitle': 'عنوان الإعلان',
    'category': 'الفئة',
    'price': 'السعر (ل.س)',
    'description': 'وصف الإعلان',
    'location': 'الموقع',
    'images': 'صور الإعلان',
    'addImage': 'أضف صورة',
    'phone': 'رقم الهاتف',
    'publish': 'نشر الإعلان',
    
    // Auth
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'name': 'الاسم الكامل',
    'phoneNumber': 'رقم الهاتف',
    'terms': 'أوافق على الشروط والأحكام',
    
    // Search
    'searchFor': 'ابحث عن منتجات أو خدمات...',
    'searchResults': 'نتائج البحث عن:',
    'noResults': 'لا توجد نتائج للبحث',
    'tryAgain': 'حاول البحث بكلمات مختلفة',
    
    // User profile
    'myListings': 'إعلاناتي',
    'addNewListing': 'إضافة إعلان جديد',
    'accountSettings': 'إعدادات الحساب',
    'member': 'عضو منذ',
    
    // Misc
    'active': 'نشط',
    'inactive': 'غير نشط',
    'views': 'مشاهدة',
    'edit': 'تعديل',
    'activate': 'تنشيط',
    'deactivate': 'إيقاف',
    'seller': 'البائع',
  },
  en: {
    // Navigation
    'home': 'Home',
    'login': 'Login',
    'register': 'Register',
    'addListing': 'Add Listing',
    'search': 'Search',
    'myAccount': 'My Account',
    'favorites': 'Favorites',
    'messages': 'Messages',
    'logout': 'Logout',
    
    // Categories
    'categories': 'Categories',
    'realEstate': 'Real Estate',
    'cars': 'Cars',
    'electronics': 'Electronics',
    'furniture': 'Furniture',
    'jobs': 'Jobs',
    'services': 'Services',
    
    // Listing form
    'listingTitle': 'Listing Title',
    'category': 'Category',
    'price': 'Price (SYP)',
    'description': 'Description',
    'location': 'Location',
    'images': 'Images',
    'addImage': 'Add Image',
    'phone': 'Phone',
    'publish': 'Publish Listing',
    
    // Auth
    'email': 'Email',
    'password': 'Password',
    'name': 'Full Name',
    'phoneNumber': 'Phone Number',
    'terms': 'I agree to the Terms and Conditions',
    
    // Search
    'searchFor': 'Search for products or services...',
    'searchResults': 'Search results for:',
    'noResults': 'No search results found',
    'tryAgain': 'Try searching with different keywords',
    
    // User profile
    'myListings': 'My Listings',
    'addNewListing': 'Add New Listing',
    'accountSettings': 'Account Settings',
    'member': 'Member since',
    
    // Misc
    'active': 'Active',
    'inactive': 'Inactive',
    'views': 'views',
    'edit': 'Edit',
    'activate': 'Activate',
    'deactivate': 'Deactivate',
    'seller': 'Seller',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  direction: 'rtl',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Arabic
  const [language, setLanguageState] = useState<Language>('ar');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Check if language is saved in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
    
    // Update document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
