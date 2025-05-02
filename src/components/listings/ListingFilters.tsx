
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import ArabicText from '../ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, X, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import LocationSelector from './LocationSelector';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ListingFiltersProps {
  onFilter: (filters: {
    priceRange: [number, number];
    governorate_id?: string;
    district_id?: string;
    sortBy: string;
    keywords?: string;
    category?: string;
    condition?: string[];
    urgent?: boolean;
    currency?: string;
  }) => void;
  className?: string;
}

const ListingFilters = ({ onFilter, className = '' }: ListingFiltersProps) => {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [governorateId, setGovernorateId] = useState<string>('');
  const [districtId, setDistrictId] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [keywords, setKeywords] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [condition, setCondition] = useState<string[]>([]);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('SYP');

  // Update price range when min/max inputs change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Adjust max price range based on currency
  useEffect(() => {
    if (currency === 'USD') {
      setMaxPrice(prev => prev > 1000 ? 1000 : prev);
    } else {
      // For SYP, allow higher values
      setMaxPrice(prev => prev < 10000 ? 1000000 : prev);
    }
  }, [currency]);

  const handleConditionChange = (value: string) => {
    setCondition(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onFilter({
      priceRange: [minPrice, maxPrice],
      governorate_id: governorateId || undefined,
      district_id: districtId || undefined,
      sortBy,
      keywords,
      category,
      condition,
      urgent,
      currency
    });
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(currency === 'USD' ? 1000 : 1000000);
    setGovernorateId('');
    setDistrictId('');
    setSortBy('newest');
    setKeywords('');
    setCategory('');
    setCondition([]);
    setUrgent(false);
    setCurrency('SYP');
    
    onFilter({
      priceRange: [0, currency === 'USD' ? 1000 : 1000000],
      sortBy: 'newest',
      currency: 'SYP'
    });
  };

  return (
    <Card className={`${className} overflow-hidden transition-all`}>
      <div className="p-4 border-b border-syrian-green/20 flex justify-between items-center">
        <h3 className="font-bold text-syrian-dark flex items-center">
          <Filter className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {language === 'ar' ? (
            <ArabicText text={t('filterResults')} />
          ) : (
            t('filterResults')
          )}
        </h3>
        {isMobile && (
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
        )}
      </div>

      <div className={`p-4 space-y-6 ${isExpanded ? 'block' : (isMobile ? 'hidden' : 'block')}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
              <SelectItem value="all">
                {language === 'ar' ? (
                  <ArabicText text={t('allCategories')} />
                ) : (
                  "All Categories"
                )}
              </SelectItem>
              <SelectItem value="real_estate">
                {language === 'ar' ? (
                  <ArabicText text={t('realEstate')} />
                ) : (
                  t('realEstate')
                )}
              </SelectItem>
              <SelectItem value="cars">
                {language === 'ar' ? (
                  <ArabicText text={t('cars')} />
                ) : (
                  t('cars')
                )}
              </SelectItem>
              <SelectItem value="electronics">
                {language === 'ar' ? (
                  <ArabicText text={t('electronics')} />
                ) : (
                  t('electronics')
                )}
              </SelectItem>
              <SelectItem value="furniture">
                {language === 'ar' ? (
                  <ArabicText text={t('furniture')} />
                ) : (
                  t('furniture')
                )}
              </SelectItem>
              <SelectItem value="jobs">
                {language === 'ar' ? (
                  <ArabicText text={t('jobs')} />
                ) : (
                  t('jobs')
                )}
              </SelectItem>
              <SelectItem value="services">
                {language === 'ar' ? (
                  <ArabicText text={t('services')} />
                ) : (
                  t('services')
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency Selection */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('currency')} />
            ) : (
              t('currency')
            )}
          </Label>
          <RadioGroup 
            value={currency} 
            onValueChange={(value) => {
              setCurrency(value);
              // Reset price range when currency changes
              setMinPrice(0);
              setMaxPrice(value === 'USD' ? 1000 : 1000000);
            }}
            className="flex space-x-4 rtl:space-x-reverse"
          >
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
              <RadioGroupItem value="SYP" id="currency-syp" />
              <Label htmlFor="currency-syp">
                {language === 'ar' ? t('syrianPound') : t('syrianPound')}
              </Label>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
              <RadioGroupItem value="USD" id="currency-usd" />
              <Label htmlFor="currency-usd" className="flex items-center">
                <DollarSign className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                USD
              </Label>
            </div>
          </RadioGroup>
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
          </div>

          <div className={`flex ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4 pt-2`}>
            <Input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2"
              placeholder="Min"
            />
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2"
              placeholder="Max"
            />
          </div>
        </div>
        
        {/* Location Selector Component */}
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'block text-right' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('location')} />
            ) : (
              t('location')
            )}
          </Label>
          <LocationSelector 
            onGovernorateChange={setGovernorateId}
            onDistrictChange={setDistrictId}
          />
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
                  <ArabicText text={t('condition')} />
                ) : (
                  t('condition')
                )}
              </Label>
              <div className="space-y-2">
                <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
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
                      <ArabicText text={t('new')} />
                    ) : (
                      t('new')
                    )}
                  </label>
                </div>
                <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
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
                      <ArabicText text={t('used')} />
                    ) : (
                      t('used')
                    )}
                  </label>
                </div>
              </div>
            </div>
            
            {/* Urgent checkbox */}
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
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
        
        <div className={`pt-2 flex flex-wrap gap-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
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
            <X className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
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
