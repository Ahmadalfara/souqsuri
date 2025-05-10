
import React from 'react';
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
  
  return (
    <Accordion type="single" collapsible defaultValue="additional">
      <AccordionItem value="additional" className="border-b-0">
        <AccordionTrigger className="dark:text-white hover:no-underline">
          {language === 'ar' ? (
            <ArabicText text={t('additionalFilters')} />
          ) : (
            t('additionalFilters')
          )}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {/* Search Within */}
            <div className="space-y-2">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text={t('searchWithin')} />
                ) : (
                  t('searchWithin')
                )}
              </Label>
              <Input
                value={searchWithin}
                onChange={(e) => onSearchWithinChange(e.target.value)}
                placeholder={language === 'ar' ? 'البحث ضمن النتائج' : 'Search within results'}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            {/* Show Promoted Only */}
            <div className="flex items-center justify-between">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text={t('showPromotedOnly')} />
                ) : (
                  t('showPromotedOnly')
                )}
              </Label>
              <Switch
                checked={showPromotedOnly}
                onCheckedChange={onPromotedChange}
              />
            </div>
            
            {/* Show With Images Only */}
            <div className="flex items-center justify-between">
              <Label className="dark:text-white">
                {language === 'ar' ? (
                  <ArabicText text={t('showWithImagesOnly')} />
                ) : (
                  t('showWithImagesOnly')
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
