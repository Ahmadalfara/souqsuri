
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

// Categories data
const categories = [
  { id: 'all', nameAr: 'جميع الفئات', nameEn: 'All Categories' },
  { id: 'real_estate', nameAr: 'العقارات', nameEn: 'Real Estate' },
  { id: 'cars', nameAr: 'سيارات', nameEn: 'Cars' },
  { id: 'clothes', nameAr: 'ملابس', nameEn: 'Clothes' },
  { id: 'electronics', nameAr: 'إلكترونيات', nameEn: 'Electronics' },
  { id: 'furniture', nameAr: 'أثاث', nameEn: 'Furniture' },
  { id: 'jobs', nameAr: 'وظائف', nameEn: 'Jobs' },
  { id: 'services', nameAr: 'خدمات', nameEn: 'Services' },
];

interface FilterCategoriesProps {
  value: string;
  onChange: (value: string) => void;
}

const FilterCategories: React.FC<FilterCategoriesProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  
  // Get name based on language
  const getName = (item: any) => {
    return language === 'ar' ? item.nameAr : item.nameEn;
  };
  
  return (
    <div className="space-y-2">
      <Label className="dark:text-white">
        {language === 'ar' ? 'الفئة' : 'Category'}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <ScrollArea className="h-60">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {getName(cat)}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterCategories;
export { categories };
