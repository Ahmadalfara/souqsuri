
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
    
    // Footer pages
    'termsOfService': 'شروط الخدمة',
    'privacyPolicy': 'سياسة الخصوصية',
    'contactUs': 'اتصل بنا',
    'aboutUs': 'من نحن',
    'help': 'المساعدة',
    'howToSell': 'كيفية البيع',
    'faq': 'الأسئلة الشائعة',
    'customerSupport': 'دعم العملاء',
    
    // Settings
    'darkMode': 'الوضع الداكن',
    'lightMode': 'الوضع المضيء',
    'language': 'اللغة',
    'settings': 'الإعدادات',
    
    // Loading
    'loading': 'جاري التحميل...',
    'processing': 'جاري المعالجة...',
    'submitting': 'جاري الإرسال...',
    
    // Misc
    'active': 'نشط',
    'inactive': 'غير نشط',
    'views': 'مشاهدة',
    'edit': 'تعديل',
    'activate': 'تنشيط',
    'deactivate': 'إيقاف',
    'seller': 'البائع',
    'yes': 'نعم',
    'no': 'لا',
    'cancel': 'إلغاء',
    'save': 'حفظ',
    'select': 'اختر',
    'confirm': 'تأكيد',
    'delete': 'حذف',
    'update': 'تحديث',
    'all': 'الكل',
    'filter': 'تصفية',
    'sort': 'ترتيب',
    'newest': 'الأحدث',
    'oldest': 'الأقدم',
    'priceLowToHigh': 'السعر من الأقل للأعلى',
    'priceHighToLow': 'السعر من الأعلى للأقل',
    'success': 'تم بنجاح',
    'error': 'حدث خطأ',
    'required': 'مطلوب',
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
    
    // Footer pages
    'termsOfService': 'Terms of Service',
    'privacyPolicy': 'Privacy Policy',
    'contactUs': 'Contact Us',
    'aboutUs': 'About Us',
    'help': 'Help',
    'howToSell': 'How to Sell',
    'faq': 'FAQ',
    'customerSupport': 'Customer Support',
    
    // Settings
    'darkMode': 'Dark Mode',
    'lightMode': 'Light Mode',
    'language': 'Language',
    'settings': 'Settings',
    
    // Loading
    'loading': 'Loading...',
    'processing': 'Processing...',
    'submitting': 'Submitting...',
    
    // Misc
    'active': 'Active',
    'inactive': 'Inactive',
    'views': 'views',
    'edit': 'Edit',
    'activate': 'Activate',
    'deactivate': 'Deactivate',
    'seller': 'Seller',
    'yes': 'Yes',
    'no': 'No',
    'cancel': 'Cancel',
    'save': 'Save',
    'select': 'Select',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'update': 'Update',
    'all': 'All',
    'filter': 'Filter',
    'sort': 'Sort',
    'newest': 'Newest',
    'oldest': 'Oldest',
    'priceLowToHigh': 'Price: Low to High',
    'priceHighToLow': 'Price: High to Low',
    'success': 'Success',
    'error': 'Error',
    'required': 'Required',
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
  }, []);

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
