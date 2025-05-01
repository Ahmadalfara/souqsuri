
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import ArabicText from '../ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, X } from 'lucide-react';

interface ListingFiltersProps {
  onFilter: (filters: {
    priceRange: [number, number];
    location: string;
    sortBy: string;
  }) => void;
  className?: string;
}

const ListingFilters = ({ onFilter, className = '' }: ListingFiltersProps) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [location, setLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      location,
      sortBy
    });
  };

  const handleResetFilters = () => {
    setPriceRange([0, 10000]);
    setLocation('');
    setSortBy('newest');
    onFilter({
      priceRange: [0, 10000],
      location: '',
      sortBy: 'newest'
    });
  };

  return (
    <Card className={`${className} overflow-hidden transition-all`}>
      <div className="p-4 border-b border-syrian-green/20 flex justify-between items-center">
        <h3 className="font-bold text-syrian-dark flex items-center">
          <Filter className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {language === 'ar' ? (
            <ArabicText text="فلترة النتائج" />
          ) : (
            "Filter Results"
          )}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm"
        >
          {language === 'ar' ? (
            <ArabicText text={isExpanded ? "عرض أقل" : "خيارات أكثر"} />
          ) : (
            isExpanded ? "Less options" : "More options"
          )}
        </Button>
      </div>

      <div className={`p-4 space-y-6 ${isExpanded ? 'block' : 'block'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className={language === 'ar' ? 'block text-right' : ''}>
              {language === 'ar' ? (
                <ArabicText text="نطاق السعر" />
              ) : (
                "Price Range"
              )}
            </Label>
            <div className="text-sm text-gray-500">
              {language === 'ar' ? (
                <ArabicText text={`${priceRange[0]} - ${priceRange[1]} دولار`} />
              ) : (
                `$${priceRange[0]} - $${priceRange[1]}`
              )}
            </div>
          </div>
          
          <Slider
            defaultValue={priceRange}
            min={0}
            max={10000}
            step={100}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-4"
          />
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text="الموقع" />
            ) : (
              "Location"
            )}
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? "اختر المدينة" : "Select city"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'ar' ? (
                  <ArabicText text="جميع المدن" />
                ) : (
                  "All Cities"
                )}
              </SelectItem>
              <SelectItem value="damascus">
                {language === 'ar' ? (
                  <ArabicText text="دمشق" />
                ) : (
                  "Damascus"
                )}
              </SelectItem>
              <SelectItem value="aleppo">
                {language === 'ar' ? (
                  <ArabicText text="حلب" />
                ) : (
                  "Aleppo"
                )}
              </SelectItem>
              <SelectItem value="homs">
                {language === 'ar' ? (
                  <ArabicText text="حمص" />
                ) : (
                  "Homs"
                )}
              </SelectItem>
              <SelectItem value="latakia">
                {language === 'ar' ? (
                  <ArabicText text="اللاذقية" />
                ) : (
                  "Latakia"
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Sort By */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text="الترتيب حسب" />
            ) : (
              "Sort By"
            )}
          </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                {language === 'ar' ? (
                  <ArabicText text="الأحدث" />
                ) : (
                  "Newest"
                )}
              </SelectItem>
              <SelectItem value="price_asc">
                {language === 'ar' ? (
                  <ArabicText text="السعر: الأقل إلى الأعلى" />
                ) : (
                  "Price: Low to High"
                )}
              </SelectItem>
              <SelectItem value="price_desc">
                {language === 'ar' ? (
                  <ArabicText text="السعر: الأعلى إلى الأقل" />
                ) : (
                  "Price: High to Low"
                )}
              </SelectItem>
              <SelectItem value="views">
                {language === 'ar' ? (
                  <ArabicText text="الأكثر مشاهدة" />
                ) : (
                  "Most Viewed"
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isExpanded && (
          <div className="space-y-2">
            <Label className={language === 'ar' ? 'block text-right' : ''}>
              {language === 'ar' ? (
                <ArabicText text="كلمات مفتاحية" />
              ) : (
                "Keywords"
              )}
            </Label>
            <Input 
              placeholder={language === 'ar' ? "بحث في العنوان أو الوصف" : "Search in title or description"} 
            />
          </div>
        )}
        
        <div className="pt-2 flex flex-wrap gap-2">
          <Button 
            onClick={handleApplyFilters}
            className="flex-1 bg-syrian-green hover:bg-syrian-dark"
          >
            {language === 'ar' ? (
              <ArabicText text="تطبيق الفلتر" />
            ) : (
              "Apply Filter"
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            {language === 'ar' ? (
              <ArabicText text="إعادة ضبط" />
            ) : (
              "Reset"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListingFilters;
