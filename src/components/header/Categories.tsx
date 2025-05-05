
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Car, Tv, Sofa, Briefcase, Wrench, ShoppingBag } from 'lucide-react';

const Categories = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Extract category from URL if on a category page
    if (location.pathname.startsWith('/category/')) {
      const categoryName = location.pathname.split('/').pop();
      setActiveCategory(categoryName || null);
    } else {
      setActiveCategory(null);
    }
  }, [location]);

  const categories = [
    { name: 'all', label: language === 'ar' ? 'الكل' : t('all'), icon: Home },
    { name: 'real_estate', label: language === 'ar' ? 'العقارات' : t('realEstate'), icon: Home },
    { name: 'cars', label: language === 'ar' ? 'سيارات' : t('cars'), icon: Car },
    { name: 'clothes', label: language === 'ar' ? 'ملابس' : t('clothes'), icon: ShoppingBag },
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics'), icon: Tv },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture'), icon: Sofa },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs'), icon: Briefcase },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services'), icon: Wrench },
  ];
  
  // Single compact view for all screens with more spacing
  return (
    <div className="flex justify-center overflow-x-auto pb-2 mb-4">
      <div className={`inline-flex ${language === 'ar' ? 'space-x-reverse rtl' : ''} px-2 gap-3 md:gap-4`}>
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.name === 'all' ? '/' : `/category/${category.name}`}
            className={`
              flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200
              ${activeCategory === category.name || (category.name === 'all' && !activeCategory)
                ? 'bg-syrian-green text-white shadow-md transform hover:scale-105' 
                : 'bg-white hover:bg-syrian-green/10 border border-syrian-green/20 hover:border-syrian-green/50 hover:shadow-md transform hover:scale-105'
              }
            `}
          >
            <category.icon 
              size={20} 
              className={`mb-1 ${activeCategory === category.name || (category.name === 'all' && !activeCategory) ? 'text-white' : 'text-syrian-green'}`} 
            />
            
            <span className="text-xs whitespace-nowrap font-medium">
              {language === 'ar' ? (
                <ArabicText text={category.label} />
              ) : (
                category.label
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
