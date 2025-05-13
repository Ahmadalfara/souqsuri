
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatLargeNumber } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import ArabicText from '@/components/ArabicText';

// Increased price range to 100 billion SYP
const MAX_PRICE = 100000000000; // 100 billion

interface FilterPriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({ value, onChange }) => {
  const { language, direction } = useLanguage();
  
  // Format price for display using our utility
  const formatPrice = (price: number) => {
    return formatLargeNumber(price, language as 'en' | 'ar', 'SYP');
  };
  
  const handlePriceRangeChange = (newValue: number[]) => {
    onChange([newValue[0], newValue[1]]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    
    if (newValue >= value[1]) {
      toast({
        title: language === 'ar' ? 'خطأ في نطاق السعر' : 'Price Range Error',
        description: language === 'ar' 
          ? 'يجب أن يكون الحد الأدنى أقل من الحد الأقصى' 
          : 'Minimum price should be less than maximum price',
        variant: "destructive",
      });
      return;
    }
    
    onChange([newValue, value[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    
    if (newValue <= value[0]) {
      toast({
        title: language === 'ar' ? 'خطأ في نطاق السعر' : 'Price Range Error',
        description: language === 'ar' 
          ? 'يجب أن يكون الحد الأقصى أكبر من الحد الأدنى' 
          : 'Maximum price should be greater than minimum price',
        variant: "destructive",
      });
      return;
    }
    
    onChange([value[0], newValue]);
  };

  // Reset price range
  const handleReset = () => {
    onChange([0, MAX_PRICE / 10]);
    toast({
      title: language === 'ar' ? 'تم إعادة ضبط نطاق السعر' : 'Price Range Reset',
      description: language === 'ar' ? 'تم إعادة ضبط نطاق السعر بنجاح' : 'Price range has been reset successfully',
    });
  };
  
  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <Label className="dark:text-white">
          {language === 'ar' ? <ArabicText text="نطاق السعر" /> : 'Price Range'}
        </Label>
        <button 
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-syrian-green dark:text-gray-400 dark:hover:text-syrian-green"
        >
          {language === 'ar' ? <ArabicText text="إعادة ضبط" /> : 'Reset'}
        </button>
      </div>
      
      <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatPrice(value[0])}
        </span>
        <span className="text-sm font-medium text-syrian-green">⟷</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatPrice(value[1])}
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
      
      <div className={`flex justify-between gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Input
            type="number"
            value={value[0]}
            onChange={handleMinPriceChange}
            className={`w-full ${direction === 'rtl' ? 'text-right pl-16' : 'pr-16'} dark:bg-gray-700 dark:text-white dark:border-gray-600`}
            dir={direction}
          />
          <span className={`absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 ${direction === 'rtl' ? 'left-2' : 'right-2'}`}>
            {language === 'ar' ? 'ل.س' : 'SYP'}
          </span>
        </div>
        <div className="relative flex-1">
          <Input
            type="number"
            value={value[1]}
            onChange={handleMaxPriceChange}
            className={`w-full ${direction === 'rtl' ? 'text-right pl-16' : 'pr-16'} dark:bg-gray-700 dark:text-white dark:border-gray-600`}
            dir={direction}
          />
          <span className={`absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 ${direction === 'rtl' ? 'left-2' : 'right-2'}`}>
            {language === 'ar' ? 'ل.س' : 'SYP'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterPriceRange;
export { MAX_PRICE };
