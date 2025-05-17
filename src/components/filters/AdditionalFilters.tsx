
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '@/components/ArabicText';
import { debounce } from 'lodash';

interface AdditionalFiltersProps {
  searchWithin: string;
  showPromotedOnly: boolean;
  showWithImagesOnly: boolean;
  onSearchWithinChange: (value: string) => void;
  onPromotedChange: (checked: boolean) => void;
  onImagesOnlyChange: (checked: boolean) => void;
}

const AdditionalFilters: React.FC<AdditionalFiltersProps> = ({
  searchWithin,
  showPromotedOnly,
  showWithImagesOnly,
  onSearchWithinChange,
  onPromotedChange,
  onImagesOnlyChange
}) => {
  const { language, t } = useLanguage();
  const [accordionValue, setAccordionValue] = useState<string>("additional");
  const [searchText, setSearchText] = useState(searchWithin);
  
  // دالة مؤجلة لبحث النص داخل النتائج
  const debouncedSearch = debounce((value: string) => {
    onSearchWithinChange(value);
  }, 300);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };
  
  return (
    <Accordion 
      type="single" 
      collapsible 
      value={accordionValue} 
      onValueChange={setAccordionValue}
      className="border-b-0"
    >
      <AccordionItem value="additional" className="border-b-0">
        <AccordionTrigger className="py-2 dark:text-white hover:no-underline">
          {language === 'ar' ? (
            <ArabicText text="خيارات إضافية للتصفية" />
          ) : (
            'Additional Filter Options'
          )}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {/* البحث ضمن النتائج */}
            <div className="space-y-2">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text="البحث ضمن النتائج" />
                ) : (
                  'Search Within Results'
                )}
              </Label>
              <Input
                value={searchText}
                onChange={handleSearchChange}
                placeholder={language === 'ar' ? 'البحث ضمن النتائج' : 'Search within results'}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            {/* إظهار الإعلانات المميزة فقط */}
            <div className="flex items-center justify-between">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text="الإعلانات المميزة فقط" />
                ) : (
                  'Featured Listings Only'
                )}
              </Label>
              <Switch
                checked={showPromotedOnly}
                onCheckedChange={onPromotedChange}
              />
            </div>
            
            {/* إظهار الإعلانات التي تحتوي على صور فقط */}
            <div className="flex items-center justify-between">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text="مع صور فقط" />
                ) : (
                  'With Images Only'
                )}
              </Label>
              <Switch
                checked={showWithImagesOnly}
                onCheckedChange={onImagesOnlyChange}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdditionalFilters;
