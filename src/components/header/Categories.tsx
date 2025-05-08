
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '@/components/ArabicText';
import { useCurrentRoute } from '@/hooks/useCurrentRoute'; 
import { Home, Building, Car, Smartphone, Sofa, Briefcase, Wrench, Shirt, Book, Cat, Volleyball } from 'lucide-react';

// Updated categories with correct paths for category pages
const categoryItems = [
  { id: 'all', icon: Home, nameEn: 'Home', nameAr: 'الرئيسية', path: '/' },
  { id: 'real_estate', icon: Building, nameEn: 'Real Estate', nameAr: 'عقارات', path: '/category/real_estate' },
  { id: 'cars', icon: Car, nameEn: 'Cars', nameAr: 'سيارات', path: '/category/cars' },
  { id: 'electronics', icon: Smartphone, nameEn: 'Electronics', nameAr: 'الكترونيات', path: '/category/electronics' },
  { id: 'furniture', icon: Sofa, nameEn: 'Furniture', nameAr: 'أثاث', path: '/category/furniture' },
  { id: 'jobs', icon: Briefcase, nameEn: 'Jobs', nameAr: 'وظائف', path: '/category/jobs' },
  { id: 'services', icon: Wrench, nameEn: 'Services', nameAr: 'خدمات', path: '/category/services' },
  { id: 'fashion', icon: Shirt, nameEn: 'Fashion', nameAr: 'أزياء', path: '/category/fashion' },
  { id: 'books', icon: Book, nameEn: 'Books', nameAr: 'كتب', path: '/category/books' },
  { id: 'pets', icon: Cat, nameEn: 'Pets', nameAr: 'حيوانات أليفة', path: '/category/pets' },
  { id: 'sports', icon: Volleyball, nameEn: 'Sports', nameAr: 'رياضة', path: '/category/sports' },
];

const Categories = () => {
  const { language } = useLanguage();
  const { isActive } = useCurrentRoute();
  
  // Determine if we should use RTL layout
  const isRTL = language === 'ar';
  
  return (
    <div className="w-full">
      <nav 
        className="flex overflow-x-auto custom-scrollbar pb-2"
        style={{ 
          direction: isRTL ? 'rtl' : 'ltr',
          justifyContent: 'flex-start' // Start from the beginning of the direction
        }}
      >
        {categoryItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-lg transition-colors 
                        hover:bg-syrian-green/20 ${isActive(item.path) ? 'bg-syrian-green/10' : ''}`}
            >
              <IconComponent className="text-syrian-green mb-1 h-5 w-5" />
              <span className="text-xs text-center">
                {isRTL ? (
                  <ArabicText text={item.nameAr} />
                ) : (
                  item.nameEn
                )}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Categories;
