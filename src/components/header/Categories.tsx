
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';

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
    { name: 'real_estate', label: language === 'ar' ? 'العقارات' : t('realEstate') },
    { name: 'cars', label: language === 'ar' ? 'سيارات' : t('cars') },
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics') },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture') },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs') },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services') },
  ];
  
  return (
    <div className={`flex justify-center ${language === 'ar' ? 'space-x-reverse rtl' : 'space-x-1'} md:space-x-6 overflow-x-auto pb-2`}>
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
  );
};

export default Categories;
