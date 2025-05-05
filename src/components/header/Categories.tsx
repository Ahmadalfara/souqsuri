
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Car, Laptop, Briefcase, User } from 'lucide-react';

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
    { 
      name: 'all', 
      label: language === 'ar' ? 'الكل' : t('all'),
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
    },
    { 
      name: 'real_estate', 
      label: language === 'ar' ? 'العقارات' : t('realEstate'),
      icon: <Building size={20} />
    },
    { 
      name: 'cars', 
      label: language === 'ar' ? 'سيارات' : t('cars'),
      icon: <Car size={20} />
    },
    { 
      name: 'electronics', 
      label: language === 'ar' ? 'إلكترونيات' : t('electronics'),
      icon: <Laptop size={20} />
    },
    { 
      name: 'jobs', 
      label: language === 'ar' ? 'وظائف' : t('jobs'),
      icon: <Briefcase size={20} />
    },
    { 
      name: 'services', 
      label: language === 'ar' ? 'خدمات' : t('services'),
      icon: <User size={20} />
    },
  ];
  
  return (
    <div className={`flex justify-start overflow-x-auto ${language === 'ar' ? 'space-x-reverse rtl' : 'space-x-1'} pb-2`}>
      {categories.map((category) => (
        <Link 
          key={category.name}
          to={`/category/${category.name}`} 
          className={`
            flex items-center whitespace-nowrap px-3 py-2 rounded-md transition-colors
            ${activeCategory === category.name 
              ? 'bg-syrian-green text-white font-bold' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }
          `}
        >
          <span className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`}>{category.icon}</span>
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
