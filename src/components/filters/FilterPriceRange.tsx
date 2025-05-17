
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatLargeNumber } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import ArabicText from '@/components/ArabicText';
import { debounce } from 'lodash';

// قيمة سعر عالية جدا - عمليا بلا حدود
const MAX_PRICE = 1000000000000; // تريليون واحد

interface FilterPriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({ value, onChange }) => {
  const { language, direction } = useLanguage();
  
  // حالة محلية للقيم الدنيا/القصوى
  const [minInput, setMinInput] = useState<string>(value[0].toString());
  const [maxInput, setMaxInput] = useState<string>(value[1] === MAX_PRICE ? '∞' : value[1].toString());
  
  // تحديث المدخلات المحلية عند تغير الخصائص
  useEffect(() => {
    setMinInput(value[0].toString());
    setMaxInput(value[1] === MAX_PRICE ? '∞' : value[1].toString());
  }, [value]);
  
  // تنسيق السعر للعرض باستخدام الأداة المساعدة
  const formatPrice = (price: number) => {
    if (price === MAX_PRICE) return language === 'ar' ? 'غير محدود' : 'Unlimited';
    return formatLargeNumber(price, language as 'en' | 'ar', 'SYP');
  };
  
  // حساب الحد الأقصى للعرض لشريط التمرير
  // سنستخدم حداً أعلى معقولاً لواجهة شريط التمرير، ولكن سنسمح بقيم غير محدودة في الإدخال
  const displayMax = 10000000000; // 10 مليار
  
  // تقييد القيمة لشريط التمرير لمنع مشاكل واجهة المستخدم
  const clampForSlider = (value: number) => {
    return Math.min(Math.max(0, value), displayMax);
  };
  
  // التعامل مع تغيير نطاق السعر
  const handlePriceRangeChange = (newValue: number[]) => {
    // تطبيق الدالة المؤجلة
    debouncedOnChange([newValue[0], newValue[1]]);
  };

  // إنشاء دالة مؤجلة لتقليل عدد مرات استدعاء الدالة
  const debouncedOnChange = debounce((newRange: [number, number]) => {
    onChange(newRange);
  }, 300);

  // التعامل مع تغيير الحد الأدنى للسعر
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMinInput(inputValue);
    
    if (inputValue === '') return;
    
    const newValue = parseInt(inputValue) || 0;
    const maxValue = maxInput === '∞' ? MAX_PRICE : parseInt(maxInput) || MAX_PRICE;
    
    if (newValue >= maxValue) {
      toast({
        title: language === 'ar' ? 'خطأ في نطاق السعر' : 'Price Range Error',
        description: language === 'ar' 
          ? 'يجب أن يكون الحد الأدنى أقل من الحد الأقصى' 
          : 'Minimum price should be less than maximum price',
        variant: "destructive",
      });
      return;
    }
    
    debouncedOnChange([newValue, value[1]]);
  };

  // التعامل مع تغيير الحد الأقصى للسعر
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (inputValue === '∞' || inputValue === '') {
      setMaxInput(inputValue);
      if (inputValue === '∞') {
        debouncedOnChange([value[0], MAX_PRICE]);
      }
      return;
    }
    
    setMaxInput(inputValue);
    const newValue = parseInt(inputValue) || MAX_PRICE;
    
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
    
    debouncedOnChange([value[0], newValue]);
  };

  // التعامل مع أحداث فقدان التركيز لتطبيق القيم
  const handleMinBlur = () => {
    if (minInput === '' || isNaN(parseInt(minInput))) {
      setMinInput('0');
      onChange([0, value[1]]);
    }
  };
  
  const handleMaxBlur = () => {
    if (maxInput === '') {
      setMaxInput('∞');
      onChange([value[0], MAX_PRICE]);
    } else if (maxInput !== '∞' && isNaN(parseInt(maxInput))) {
      setMaxInput(MAX_PRICE.toString());
      onChange([value[0], MAX_PRICE]);
    }
  };

  // إعادة ضبط نطاق السعر
  const handleReset = () => {
    const defaultMax = 10000000; // 10 مليون كقيمة افتراضية
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
          {maxInput === '∞' ? (language === 'ar' ? 'غير محدود' : 'Unlimited') : formatPrice(parseInt(maxInput) || 0)}
        </span>
      </div>
      
      <Slider
        value={[
          clampForSlider(parseInt(minInput) || 0), 
          maxInput === '∞' ? displayMax : clampForSlider(parseInt(maxInput) || displayMax)
        ]}
        min={0}
        max={displayMax}
        step={Math.max(1, Math.floor(displayMax / 100))} // تقسيم أكثر تفصيلاً
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
