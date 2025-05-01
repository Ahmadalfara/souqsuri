
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Enhanced translation dictionary with additional items
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
    'price': 'السعر',
    'currency': 'العملة',
    'description': 'وصف الإعلان',
    'location': 'الموقع',
    'images': 'صور الإعلان',
    'addImage': 'أضف صورة',
    'phone': 'رقم الهاتف',
    'publish': 'نشر الإعلان',
    'condition': 'الحالة',
    'new': 'جديد',
    'used': 'مستعمل',
    'urgent': 'عاجل',
    
    // Auth
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'name': 'الاسم الكامل',
    'phoneNumber': 'رقم الهاتف',
    'terms': 'أوافق على الشروط والأحكام',
    'guestUser': 'مستخدم زائر',
    'continueAsGuest': 'متابعة كضيف',
    'signInToPost': 'تسجيل الدخول للنشر',
    
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
    'legal': 'قانوني',
    
    // Settings
    'darkMode': 'الوضع الداكن',
    'lightMode': 'الوضع المضيء',
    'language': 'اللغة',
    'settings': 'الإعدادات',
    
    // Loading
    'loading': 'جاري التحميل...',
    'processing': 'جاري المعالجة...',
    'submitting': 'جاري الإرسال...',
    'publishing': 'جاري النشر...',
    
    // Filters
    'priceRange': 'نطاق السعر',
    'filterResults': 'فلترة النتائج',
    'sortBy': 'الترتيب حسب',
    'applyFilter': 'تطبيق الفلتر',
    'reset': 'إعادة ضبط',
    'keywords': 'كلمات مفتاحية',
    'selectCity': 'اختر المدينة',
    'allCities': 'جميع المدن',
    'moreOptions': 'خيارات أكثر',
    'lessOptions': 'عرض أقل',
    'advancedSearch': 'بحث متقدم',
    
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
    
    // Website description
    'siteDescription': 'منصة إعلانات مبوبة سورية تتيح للمستخدمين بيع وشراء المنتجات والخدمات بسهولة وأمان.',
    'siteCategories': 'فئات الإعلانات',
    'siteHowToSell': 'كيفية البيع',
    'siteFeatured': 'الإعلانات المميزة',
    'siteSupport': 'دعم العملاء',
    'siteFaq': 'الأسئلة الشائعة',
    'siteContact': 'اتصل بنا',
    'sitePrivacy': 'سياسة الخصوصية',
    'siteTerms': 'شروط الاستخدام',
    
    // Currency
    'syrianPound': 'ل.س',
    'usd': 'دولار أمريكي',
    'currencySymbol': 'ل.س',
    'changeCurrency': 'تغيير العملة',
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
    'price': 'Price',
    'currency': 'Currency',
    'description': 'Description',
    'location': 'Location',
    'images': 'Images',
    'addImage': 'Add Image',
    'phone': 'Phone',
    'publish': 'Publish Listing',
    'condition': 'Condition',
    'new': 'New',
    'used': 'Used',
    'urgent': 'Urgent',
    
    // Auth
    'email': 'Email',
    'password': 'Password',
    'name': 'Full Name',
    'phoneNumber': 'Phone Number',
    'terms': 'I agree to the Terms and Conditions',
    'guestUser': 'Guest User',
    'continueAsGuest': 'Continue as Guest',
    'signInToPost': 'Sign in to post',
    
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
    'legal': 'Legal',
    
    // Settings
    'darkMode': 'Dark Mode',
    'lightMode': 'Light Mode',
    'language': 'Language',
    'settings': 'Settings',
    
    // Loading
    'loading': 'Loading...',
    'processing': 'Processing...',
    'submitting': 'Submitting...',
    'publishing': 'Publishing...',
    
    // Filters
    'priceRange': 'Price Range',
    'filterResults': 'Filter Results',
    'sortBy': 'Sort By',
    'applyFilter': 'Apply Filter',
    'reset': 'Reset',
    'keywords': 'Keywords',
    'selectCity': 'Select city',
    'allCities': 'All Cities',
    'moreOptions': 'More options',
    'lessOptions': 'Less options',
    'advancedSearch': 'Advanced Search',
    
    // Misc
    'active': 'Active',
    'inactive': 'Inactive',
    'views': 'Views',
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
    
    // Website description
    'siteDescription': 'A Syrian classified ads platform that allows users to buy and sell products and services easily and safely.',
    'siteCategories': 'Ad Categories',
    'siteHowToSell': 'How to Sell',
    'siteFeatured': 'Featured Listings',
    'siteSupport': 'Customer Support',
    'siteFaq': 'FAQ',
    'siteContact': 'Contact Us',
    'sitePrivacy': 'Privacy Policy',
    'siteTerms': 'Terms of Use',
    
    // Currency
    'syrianPound': 'SYP',
    'usd': 'USD',
    'currencySymbol': '$',
    'changeCurrency': 'Change Currency',
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
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if language is saved in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) 
      ? savedLanguage 
      : 'ar';
  });
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body for global styling
    document.body.classList.remove('lang-ar', 'lang-en');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class for global styling
    document.body.classList.remove('lang-ar', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
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
