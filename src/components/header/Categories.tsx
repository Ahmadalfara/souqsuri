
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Car, Tv, Sofa, Briefcase, Wrench } from 'lucide-react';

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
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics'), icon: Tv },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture'), icon: Sofa },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs'), icon: Briefcase },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services'), icon: Wrench },
  ];
  
  // Mobile View: Pills with icons and text
  const renderMobileCategories = () => (
    <div className={`flex justify-center md:hidden ${language === 'ar' ? 'space-x-reverse rtl' : 'space-x-1'} overflow-x-auto pb-2`}>
      {categories.map((category) => (
        <Link 
          key={category.name}
          to={`/category/${category.name}`} 
          className={`
            whitespace-nowrap px-3 py-2 rounded-full transition-colors flex items-center
            ${activeCategory === category.name 
              ? 'bg-syrian-green text-white font-bold' 
              : 'text-syrian-dark hover:bg-syrian-green/10'
            }
          `}
        >
          <category.icon size={16} className="mr-1" />
          {language === 'ar' ? (
            <ArabicText text={category.label} />
          ) : (
            <span>{category.label}</span>
          )}
        </Link>
      ))}
    </div>
  );

  // Desktop View: Grid with card-style categories
  const renderDesktopCategories = () => (
    <div className="hidden md:grid grid-cols-7 gap-3 px-4 mt-4 mb-6">
      {categories.map((category) => (
        <Link 
          key={category.name}
          to={`/category/${category.name}`}
          className={`
            flex flex-col items-center justify-center p-3 rounded-lg transition-all
            ${activeCategory === category.name 
              ? 'bg-syrian-green text-white shadow-md transform scale-105' 
              : 'bg-white text-syrian-dark hover:bg-syrian-green/10 hover:shadow'
            }
            border border-syrian-green/20
          `}
        >
          <div className={`
            p-3 rounded-full mb-2
            ${activeCategory === category.name 
              ? 'bg-white/20' 
              : 'bg-syrian-green/10'
            }
          `}>
            <category.icon 
              size={24} 
              className={activeCategory === category.name ? 'text-white' : 'text-syrian-green'} 
            />
          </div>
          <div className="text-center">
            {language === 'ar' ? (
              <ArabicText text={category.label} />
            ) : (
              <span>{category.label}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile view */}
      {renderMobileCategories()}
      
      {/* Desktop view */}
      {renderDesktopCategories()}
    </>
  );
};

export default Categories;
