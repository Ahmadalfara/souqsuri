
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';

// Increased price range to 100 billion SYP
const MAX_PRICE = 100000000000; // 100 billion

interface FilterPriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SY' : 'en-US', {
      style: 'currency',
      currency: 'SYP',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handlePriceRangeChange = (newValue: number[]) => {
    onChange([newValue[0], newValue[1]]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="dark:text-white">
          {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
        </Label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatPrice(value[0])} - {formatPrice(value[1])}
        </span>
      </div>
      
      <Slider
        defaultValue={value}
        min={0}
        max={MAX_PRICE / 10} // Display a more reasonable range in the UI
        step={1000000} // Steps of 1 million
        value={value}
        onValueChange={handlePriceRangeChange}
        className="my-6"
      />
      
      <div className="flex justify-between">
        <Input
          type="number"
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value) || 0, value[1]])}
          className="w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <Input
          type="number"
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value) || 0])}
          className="w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default FilterPriceRange;
export { MAX_PRICE };
