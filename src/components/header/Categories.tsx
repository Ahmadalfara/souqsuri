
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Car, Home, Laptop, Sofa, Baby, Shirt, Briefcase, Wrench, Bike, RefreshCcw } from 'lucide-react';

const categoryIcons = {
  all: null,
  vehicles: Car,
  property: Home,
  electronics: Laptop,
  furniture: Sofa,
  kids: Baby,
  clothing: Shirt,
  jobs: Briefcase,
  services: Wrench, 
  hobbies: Bike, // Changed from TennisBall to Bike
  refurbished: RefreshCcw
};

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
    { name: 'all', label: language === 'ar' ? 'الكل' : t('all') },
    { name: 'vehicles', label: language === 'ar' ? 'سيارات' : t('cars') },
    { name: 'property', label: language === 'ar' ? 'عقارات' : t('realEstate') },
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics') },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture') },
    { name: 'kids', label: language === 'ar' ? 'للأطفال' : 'Kids\' Items' },
    { name: 'clothing', label: language === 'ar' ? 'ملابس' : 'Clothing' },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs') },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services') },
    { name: 'hobbies', label: language === 'ar' ? 'هوايات' : 'Hobbies' },
    { name: 'refurbished', label: language === 'ar' ? 'مُجدد' : 'Refurbished' }
  ];
  
  return (
    <div className={`flex justify-center ${language === 'ar' ? 'space-x-reverse rtl' : 'space-x-1'} md:space-x-4 overflow-x-auto pb-2 -mx-6 px-6`}>
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons];
        
        return (
          <Link 
            key={category.name}
            to={`/category/${category.name}`} 
            className={`
              flex flex-col items-center p-2 whitespace-nowrap transition-colors min-w-[60px]
              ${activeCategory === category.name 
                ? 'text-syrian-green font-bold' 
                : 'text-syrian-dark hover:text-syrian-green'
              }
            `}
          >
            {IconComponent && (
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-1
                ${activeCategory === category.name 
                  ? 'bg-syrian-green text-white' 
                  : 'bg-syrian-green/10 text-syrian-green'
                }
              `}>
                <IconComponent size={20} />
              </div>
            )}
            <span className="text-xs">
              {language === 'ar' ? (
                <ArabicText text={category.label} size="small" />
              ) : (
                category.label
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
