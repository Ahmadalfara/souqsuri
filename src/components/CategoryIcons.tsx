
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Car, Shirt, Home, Sofa, Baby, Briefcase, Smartphone, Gift, Tag } from 'lucide-react';

interface CategoryIconProps {
  icon: React.ReactNode;
  name: string;
  label: string;
  labelEn: string;
}

const CategoryIcon = ({ icon, name, label, labelEn }: CategoryIconProps) => {
  const { language } = useLanguage();
  
  return (
    <Link to={`/category/${name}`} className="flex flex-col items-center group">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-red-600 mb-2 group-hover:bg-red-100 transition-colors">
        {icon}
      </div>
      <span className="text-sm text-center">
        {language === 'ar' ? (
          <ArabicText text={label} />
        ) : (
          labelEn
        )}
      </span>
    </Link>
  );
};

const CategoryIcons = () => {
  const { language, t } = useLanguage();
  
  const categories = [
    { name: 'cars', icon: <Car size={24} />, label: 'سيارات', labelEn: 'Vehicles' },
    { name: 'clothes', icon: <Shirt size={24} />, label: 'ملابس', labelEn: 'Clothes' },
    { name: 'real_estate', icon: <Home size={24} />, label: 'عقارات', labelEn: 'Real Estate' },
    { name: 'furniture', icon: <Sofa size={24} />, label: 'أثاث', labelEn: 'Furniture' },
    { name: 'kids', icon: <Baby size={24} />, label: 'أطفال', labelEn: 'Kids' },
    { name: 'jobs', icon: <Briefcase size={24} />, label: 'وظائف', labelEn: 'Jobs' },
    { name: 'electronics', icon: <Smartphone size={24} />, label: 'إلكترونيات', labelEn: 'Electronics' },
    { name: 'hobbies', icon: <Gift size={24} />, label: 'هوايات', labelEn: 'Hobbies' },
    { name: 'all', icon: <Tag size={24} />, label: 'الكل', labelEn: 'All' }
  ];

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? (
              <ArabicText text="اكتشف فئاتنا" />
            ) : (
              "Explore our categories"
            )}
          </h2>
          <Link to="/categories" className="text-blue-600 hover:underline text-sm">
            {language === 'ar' ? (
              <ArabicText text="جميع الفئات" />
            ) : (
              "All categories"
            )}
          </Link>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {categories.map((category) => (
            <CategoryIcon
              key={category.name}
              icon={category.icon}
              name={category.name}
              label={category.label}
              labelEn={category.labelEn}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
