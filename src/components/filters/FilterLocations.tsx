
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

// Updated Syrian governorates
const locations = [
  { id: 'all', nameAr: 'جميع المناطق', nameEn: 'All Locations' },
  { id: 'damascus', nameAr: 'دمشق', nameEn: 'Damascus' },
  { id: 'damascus_countryside', nameAr: 'ريف دمشق', nameEn: 'Damascus Countryside' },
  { id: 'aleppo', nameAr: 'حلب', nameEn: 'Aleppo' },
  { id: 'homs', nameAr: 'حمص', nameEn: 'Homs' },
  { id: 'hama', nameAr: 'حماة', nameEn: 'Hama' },
  { id: 'latakia', nameAr: 'اللاذقية', nameEn: 'Latakia' },
  { id: 'tartus', nameAr: 'طرطوس', nameEn: 'Tartus' },
  { id: 'idlib', nameAr: 'إدلب', nameEn: 'Idlib' },
  { id: 'deir_ez_zor', nameAr: 'دير الزور', nameEn: 'Deir ez-Zor' },
  { id: 'raqqa', nameAr: 'الرقة', nameEn: 'Raqqa' },
  { id: 'hasakah', nameAr: 'الحسكة', nameEn: 'Hasakah' },
  { id: 'daraa', nameAr: 'درعا', nameEn: 'Daraa' },
  { id: 'sweida', nameAr: 'السويداء', nameEn: 'Sweida' },
  { id: 'quneitra', nameAr: 'القنيطرة', nameEn: 'Quneitra' }
];

interface FilterLocationsProps {
  value: string;
  onChange: (value: string) => void;
}

const FilterLocations: React.FC<FilterLocationsProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  
  // Get name based on language
  const getName = (item: any) => {
    return language === 'ar' ? item.nameAr : item.nameEn;
  };
  
  return (
    <div className="space-y-2">
      <Label className="dark:text-white">
        {language === 'ar' ? 'الموقع' : 'Location'}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <ScrollArea className="h-60">
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {getName(loc)}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterLocations;
export { locations };
