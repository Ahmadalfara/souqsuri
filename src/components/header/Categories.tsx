
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '@/components/ArabicText';
import { useCurrentRoute } from '@/hooks/useCurrentRoute'; 

// Categories for the navigation
const categoryItems = [
  { id: 'all', iconEn: '🏠', iconAr: '🏠', nameEn: 'Home', nameAr: 'الرئيسية', path: '/' },
  { id: 'real_estate', iconEn: '🏢', iconAr: '🏢', nameEn: 'Real Estate', nameAr: 'عقارات', path: '/search?category=real_estate' },
  { id: 'cars', iconEn: '🚗', iconAr: '🚗', nameEn: 'Cars', nameAr: 'سيارات', path: '/search?category=cars' },
  { id: 'electronics', iconEn: '📱', iconAr: '📱', nameEn: 'Electronics', nameAr: 'الكترونيات', path: '/search?category=electronics' },
  { id: 'furniture', iconEn: '🛋️', iconAr: '🛋️', nameEn: 'Furniture', nameAr: 'أثاث', path: '/search?category=furniture' },
  { id: 'jobs', iconEn: '💼', iconAr: '💼', nameEn: 'Jobs', nameAr: 'وظائف', path: '/search?category=jobs' },
  { id: 'services', iconEn: '🔧', iconAr: '🔧', nameEn: 'Services', nameAr: 'خدمات', path: '/search?category=services' },
  { id: 'fashion', iconEn: '👗', iconAr: '👗', nameEn: 'Fashion', nameAr: 'أزياء', path: '/search?category=fashion' },
  { id: 'books', iconEn: '📚', iconAr: '📚', nameEn: 'Books', nameAr: 'كتب', path: '/search?category=books' },
  { id: 'pets', iconEn: '🐱', iconAr: '🐱', nameEn: 'Pets', nameAr: 'حيوانات أليفة', path: '/search?category=pets' },
  { id: 'sports', iconEn: '⚽', iconAr: '⚽', nameEn: 'Sports', nameAr: 'رياضة', path: '/search?category=sports' },
];

const Categories = () => {
  const { language } = useLanguage();
  const { isActive } = useCurrentRoute();
  
  return (
    <div className="w-full">
      <nav 
        className={`flex ${language === 'ar' ? 'flex-row-reverse' : ''} overflow-x-auto custom-scrollbar pb-2`}
        style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      >
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-lg transition-colors 
                      hover:bg-syrian-green/20 ${isActive(item.path) ? 'bg-syrian-green/10' : ''}`}
          >
            <span className="text-xl mb-1">{language === 'ar' ? item.iconAr : item.iconEn}</span>
            <span className="text-xs text-center">
              {language === 'ar' ? (
                <ArabicText text={item.nameAr} />
              ) : (
                item.nameEn
              )}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Categories;
