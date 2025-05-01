
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
import { Checkbox } from '@/components/ui/checkbox';
import ArabicText from '../ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ListingFiltersProps {
  onFilter: (filters: {
    priceRange: [number, number];
    location: string;
    sortBy: string;
    keywords?: string;
    category?: string;
    condition?: string[];
    urgent?: boolean;
  }) => void;
  className?: string;
}

const ListingFilters = ({ onFilter, className = '' }: ListingFiltersProps) => {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [location, setLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [keywords, setKeywords] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [condition, setCondition] = useState<string[]>([]);
  const [urgent, setUrgent] = useState<boolean>(false);

  const handleConditionChange = (value: string) => {
    setCondition(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      location,
      sortBy,
      keywords,
      category,
      condition,
      urgent
    });
  };

  const handleResetFilters = () => {
    setPriceRange([0, 10000]);
    setLocation('');
    setSortBy('newest');
    setKeywords('');
    setCategory('');
    setCondition([]);
    setUrgent(false);
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
            t('filterResults')
          )}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm flex items-center"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 mr-1" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-1" />
          )}
          {language === 'ar' ? (
            <ArabicText text={isExpanded ? t('lessOptions') : t('moreOptions')} />
          ) : (
            isExpanded ? t('lessOptions') : t('moreOptions')
          )}
        </Button>
      </div>

      <div className={`p-4 space-y-6 ${isExpanded ? 'block' : 'block'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Keywords */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('keywords')} />
            ) : (
              t('keywords')
            )}
          </Label>
          <Input 
            placeholder={language === 'ar' ? "بحث في العنوان أو الوصف" : "Search in title or description"}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        
        {/* Category */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('category')} />
            ) : (
              t('category')
            )}
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? "اختر الفئة" : "Select category"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'ar' ? (
                  <ArabicText text="جميع الفئات" />
                ) : (
                  "All Categories"
                )}
              </SelectItem>
              <SelectItem value="real_estate">
                {language === 'ar' ? (
                  <ArabicText text="عقارات" />
                ) : (
                  "Real Estate"
                )}
              </SelectItem>
              <SelectItem value="cars">
                {language === 'ar' ? (
                  <ArabicText text="سيارات" />
                ) : (
                  "Cars"
                )}
              </SelectItem>
              <SelectItem value="electronics">
                {language === 'ar' ? (
                  <ArabicText text="إلكترونيات" />
                ) : (
                  "Electronics"
                )}
              </SelectItem>
              <SelectItem value="furniture">
                {language === 'ar' ? (
                  <ArabicText text="أثاث" />
                ) : (
                  "Furniture"
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className={language === 'ar' ? 'block text-right' : ''}>
              {language === 'ar' ? (
                <ArabicText text={t('priceRange')} />
              ) : (
                t('priceRange')
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
              <ArabicText text={t('location')} />
            ) : (
              t('location')
            )}
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? t('selectCity') : t('selectCity')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'ar' ? (
                  <ArabicText text={t('allCities')} />
                ) : (
                  t('allCities')
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
              <ArabicText text={t('sortBy')} />
            ) : (
              t('sortBy')
            )}
          </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                {language === 'ar' ? (
                  <ArabicText text={t('newest')} />
                ) : (
                  t('newest')
                )}
              </SelectItem>
              <SelectItem value="price_asc">
                {language === 'ar' ? (
                  <ArabicText text={t('priceLowToHigh')} />
                ) : (
                  t('priceLowToHigh')
                )}
              </SelectItem>
              <SelectItem value="price_desc">
                {language === 'ar' ? (
                  <ArabicText text={t('priceHighToLow')} />
                ) : (
                  t('priceHighToLow')
                )}
              </SelectItem>
              <SelectItem value="views">
                {language === 'ar' ? (
                  <ArabicText text={t('views')} />
                ) : (
                  t('views')
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isExpanded && (
          <>
            {/* Condition checkboxes */}
            <div className="space-y-2">
              <Label className={language === 'ar' ? 'block text-right' : ''}>
                {language === 'ar' ? (
                  <ArabicText text="الحالة" />
                ) : (
                  "Condition"
                )}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="condition-new" 
                    checked={condition.includes('new')}
                    onCheckedChange={() => handleConditionChange('new')}
                  />
                  <label
                    htmlFor="condition-new"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language === 'ar' ? (
                      <ArabicText text="جديد" />
                    ) : (
                      "New"
                    )}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="condition-used" 
                    checked={condition.includes('used')}
                    onCheckedChange={() => handleConditionChange('used')}
                  />
                  <label
                    htmlFor="condition-used"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language === 'ar' ? (
                      <ArabicText text="مستعمل" />
                    ) : (
                      "Used"
                    )}
                  </label>
                </div>
              </div>
            </div>
            
            {/* Urgent checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="urgent" 
                checked={urgent}
                onCheckedChange={(checked) => setUrgent(checked === true)}
              />
              <label
                htmlFor="urgent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {language === 'ar' ? (
                  <ArabicText text="عاجل فقط" />
                ) : (
                  "Urgent only"
                )}
              </label>
            </div>
          </>
        )}
        
        <div className="pt-2 flex flex-wrap gap-2">
          <Button 
            onClick={handleApplyFilters}
            className="flex-1 bg-syrian-green hover:bg-syrian-dark"
          >
            {language === 'ar' ? (
              <ArabicText text={t('applyFilter')} />
            ) : (
              t('applyFilter')
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            {language === 'ar' ? (
              <ArabicText text={t('reset')} />
            ) : (
              t('reset')
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListingFilters;
