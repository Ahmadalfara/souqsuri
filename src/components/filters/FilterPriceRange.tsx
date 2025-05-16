
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatLargeNumber } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import ArabicText from '@/components/ArabicText';

// Extremely high price range - effectively unlimited
const MAX_PRICE = Number.MAX_SAFE_INTEGER;

interface FilterPriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({ value, onChange }) => {
  const { language, direction } = useLanguage();
  
  // Local state for min/max inputs
  const [minInput, setMinInput] = useState<string>(value[0].toString());
  const [maxInput, setMaxInput] = useState<string>(value[1].toString());
  
  // Update local inputs when props change
  useEffect(() => {
    setMinInput(value[0].toString());
    setMaxInput(value[1].toString());
  }, [value]);
  
  // Format price for display using our utility
  const formatPrice = (price: number) => {
    return formatLargeNumber(price, language as 'en' | 'ar', 'SYP');
  };
  
  // Calculate display max for the slider
  // We'll use a reasonable upper limit for the slider UI, but allow unlimited values in the input
  const displayMax = 1000000000000; // 1 trillion
  
  // Clamp value for slider to prevent UI issues
  const clampForSlider = (value: number) => {
    return Math.min(Math.max(0, value), displayMax);
  };
  
  // Handle slider change
  const handlePriceRangeChange = (newValue: number[]) => {
    onChange([newValue[0], newValue[1]]);
  };

  // Handle min price input change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMinInput(inputValue);
    
    if (inputValue === '') return;
    
    const newValue = parseInt(inputValue) || 0;
    if (newValue >= parseInt(maxInput)) {
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

  // Handle max price input change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaxInput(inputValue);
    
    if (inputValue === '') return;
    
    const newValue = parseInt(inputValue) || 0;
    if (newValue <= parseInt(minInput)) {
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

  // Handle blur events to apply the values
  const handleMinBlur = () => {
    if (minInput === '' || isNaN(parseInt(minInput))) {
      setMinInput('0');
      onChange([0, value[1]]);
    }
  };
  
  const handleMaxBlur = () => {
    if (maxInput === '' || isNaN(parseInt(maxInput))) {
      const defaultMax = 1000000000; // 1 billion default
      setMaxInput(defaultMax.toString());
      onChange([value[0], defaultMax]);
    }
  };

  // Reset price range
  const handleReset = () => {
    const defaultMax = 1000000000; // 1 billion default
    onChange([0, defaultMax]);
    setMinInput('0');
    setMaxInput(defaultMax.toString());
    
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
          {formatPrice(parseInt(minInput) || 0)}
        </span>
        <span className="text-sm font-medium text-syrian-green">⟷</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatPrice(parseInt(maxInput) || 0)}
        </span>
      </div>
      
      <Slider
        value={[clampForSlider(value[0]), clampForSlider(value[1])]}
        min={0}
        max={displayMax}
        step={1000000} // Steps of 1 million
        onValueChange={handlePriceRangeChange}
        className="my-6"
      />
      
      <div className={`flex justify-between gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Input
            type="text"
            value={minInput}
            onChange={handleMinPriceChange}
            onBlur={handleMinBlur}
            placeholder="0"
            className={`w-full ${direction === 'rtl' ? 'text-right pl-16' : 'pr-16'} dark:bg-gray-700 dark:text-white dark:border-gray-600`}
            dir={direction}
          />
          <span className={`absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 ${direction === 'rtl' ? 'left-2' : 'right-2'}`}>
            {language === 'ar' ? 'ل.س' : 'SYP'}
          </span>
        </div>
        <div className="relative flex-1">
          <Input
            type="text"
            value={maxInput}
            onChange={handleMaxPriceChange}
            onBlur={handleMaxBlur}
            placeholder="∞"
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
