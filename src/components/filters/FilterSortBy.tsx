
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
import { useMediaQuery } from '@/hooks/useMediaQuery';

const sortOptions = [
  { id: 'newest', nameAr: 'الأحدث', nameEn: 'Newest' },
  { id: 'oldest', nameAr: 'الأقدم', nameEn: 'Oldest' },
  { id: 'price_high_low', nameAr: 'السعر: من الأعلى إلى الأقل', nameEn: 'Price: High to Low' },
  { id: 'price_low_high', nameAr: 'السعر: من الأقل إلى الأعلى', nameEn: 'Price: Low to High' },
];

interface FilterSortByProps {
  value: string;
  onChange: (value: string) => void;
}

const FilterSortBy: React.FC<FilterSortByProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Get name based on language
  const getName = (item: any) => {
    return language === 'ar' ? item.nameAr : item.nameEn;
  };
  
  return (
    <div className="space-y-2 w-full">
      <Label className="dark:text-white">
        {language === 'ar' ? 'ترتيب حسب' : 'Sort By'}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600" position={isMobile ? "popper" : "item-aligned"} side={isMobile ? "bottom" : undefined}>
          <ScrollArea className="max-h-60">
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {getName(option)}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSortBy;
export { sortOptions };
