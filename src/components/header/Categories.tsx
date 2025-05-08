
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Car, Tv, Sofa, Briefcase, Wrench, ShoppingBag, Shirt } from 'lucide-react';

const Categories = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Extract category from URL if on a category page
    if (location.pathname.startsWith('/category/')) {
      const categoryName = location.pathname.split('/').pop();
      console.log("Current category from URL:", categoryName);
      setActiveCategory(categoryName || null);
    } else {
      setActiveCategory(null);
    }
  }, [location]);

  // These must match the front-end routing paths
  const categories = [
    { name: 'all', label: t('all'), icon: Home },
    { name: 'real_estate', label: t('realEstate'), icon: Home },
    { name: 'cars', label: t('cars'), icon: Car },
    { name: 'clothes', label: t('clothes'), icon: Shirt },
    { name: 'electronics', label: t('electronics'), icon: Tv },
    { name: 'furniture', label: t('furniture'), icon: Sofa },
    { name: 'jobs', label: t('jobs'), icon: Briefcase },
    { name: 'services', label: t('services'), icon: Wrench },
  ];
  
  return (
    <div className="flex justify-center overflow-x-auto pb-3 mb-5">
      <div className={`inline-flex ${language === 'ar' ? 'space-x-reverse rtl' : ''} px-2 gap-5 md:gap-7`}>
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.name === 'all' ? '/' : `/category/${category.name}`}
            className={`
              flex flex-col items-center px-6 py-3 rounded-lg transition-all duration-200
              ${activeCategory === category.name || (category.name === 'all' && !activeCategory)
                ? 'bg-syrian-green text-white shadow-md transform hover:scale-105' 
                : 'bg-white hover:bg-syrian-green/10 border border-syrian-green/20 hover:border-syrian-green/50 hover:shadow-md transform hover:scale-105'
              }
            `}
          >
            <category.icon 
              size={28} 
              strokeWidth={1.5}
              className={`mb-2 ${activeCategory === category.name || (category.name === 'all' && !activeCategory) ? 'text-white' : 'text-syrian-green'}`} 
            />
            
            <span className="text-sm font-medium whitespace-nowrap">
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
