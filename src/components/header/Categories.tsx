
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Car, Tv, Sofa, Briefcase, Wrench, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

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
    { name: 'all', label: language === 'ar' ? 'الكل' : t('all'), icon: LayoutGrid },
    { name: 'real_estate', label: language === 'ar' ? 'العقارات' : t('realEstate'), icon: Home },
    { name: 'cars', label: language === 'ar' ? 'سيارات' : t('cars'), icon: Car },
    { name: 'electronics', label: language === 'ar' ? 'إلكترونيات' : t('electronics'), icon: Tv },
    { name: 'furniture', label: language === 'ar' ? 'أثاث' : t('furniture'), icon: Sofa },
    { name: 'jobs', label: language === 'ar' ? 'وظائف' : t('jobs'), icon: Briefcase },
    { name: 'services', label: language === 'ar' ? 'خدمات' : t('services'), icon: Wrench },
  ];
  
  // Animation variants for hover and active states
  const itemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <div className="mb-4 py-2 bg-white dark:bg-gray-900 border-t border-syrian-green/10 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <div className={`flex ${language === 'ar' ? 'justify-end' : 'justify-start'} overflow-x-auto scrollbar-none pb-1`}>
          <div className={`inline-flex ${language === 'ar' ? 'space-x-reverse flex-row-reverse' : 'space-x-2'}`}>
            {categories.map((category) => (
              <motion.div 
                key={category.name}
                whileHover="hover"
                whileTap="tap"
                variants={itemVariants}
              >
                <Link 
                  to={`/category/${category.name}`} 
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all
                    border border-syrian-green/20 dark:border-gray-700
                    ${activeCategory === category.name 
                      ? 'bg-syrian-green text-white dark:bg-syrian-dark' 
                      : 'bg-white dark:bg-gray-800 text-syrian-dark dark:text-gray-200 hover:bg-syrian-green/10 dark:hover:bg-gray-700'}
                  `}
                >
                  <category.icon 
                    size={16} 
                    className={activeCategory === category.name ? 'text-white' : 'text-syrian-green dark:text-syrian-green/80'} 
                  />
                  
                  <span className="text-sm whitespace-nowrap">
                    {language === 'ar' ? (
                      <ArabicText text={category.label} />
                    ) : (
                      category.label
                    )}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
