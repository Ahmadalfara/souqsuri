
import React, { useState, useEffect } from 'react';
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
import { Filter, X, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';

interface ListingFiltersProps {
  onFilter: (filters: {
    priceRange: [number, number];
    location: string;
    area?: string;
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
  const [location, setLocation] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [keywords, setKeywords] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [condition, setCondition] = useState<string[]>([]);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('SYP');
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  // Update areas when governorate changes
  useEffect(() => {
    if (location && location !== 'all') {
      // In a real app, this would come from an API or a more comprehensive dataset
      // Here we're just using some sample areas for different governorates
      const areasByGovernorate: Record<string, string[]> = {
        'damascus': ['cityCenter', 'easternArea', 'westernArea', 'southernArea', 'northernArea'],
        'damascusCountryside': ['douma', 'harasta', 'ghouta', 'zabadani', 'bludan'],
        'aleppo': ['cityCenter', 'azaz', 'afrin', 'jarabulus', 'albab'],
        'homs': ['cityCenter', 'talkalakh', 'qusayr', 'palmyra'],
        'hama': ['cityCenter', 'salamiyah', 'masyaf', 'mahardeh'],
        'latakia': ['cityCenter', 'jableh', 'qardaha', 'kasab'],
        'tartus': ['cityCenter', 'banyas', 'safita', 'arwad'],
      };
      
      // Set available areas based on governorate
      setAvailableAreas(areasByGovernorate[location] || []);
    } else {
      setAvailableAreas([]);
      setArea('');
    }
  }, [location]);

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
      area,
      sortBy,
      keywords,
      category,
      condition,
      urgent,
      currency
    });
  };

  const handleResetFilters = () => {
    setPriceRange([0, 10000]);
    setLocation('');
    setArea('');
    setSortBy('newest');
    setKeywords('');
    setCategory('');
    setCondition([]);
    setUrgent(false);
    setCurrency('SYP');
    onFilter({
      priceRange: [0, 10000],
      location: '',
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
            onValueChange={setCurrency}
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
            <div className="text-sm text-gray-500">
              {language === 'ar' ? (
                <ArabicText text={`${priceRange[0]} - ${priceRange[1]} ${currency === 'USD' ? 'دولار' : 'ل.س'}`} />
              ) : (
                `${currency === 'USD' ? '$' : ''}${priceRange[0]} - ${currency === 'USD' ? '$' : ''}${priceRange[1]}`
              )}
            </div>
          </div>
          
          <Slider
            defaultValue={priceRange}
            value={priceRange}
            min={0}
            max={currency === 'USD' ? 1000 : 1000000}
            step={currency === 'USD' ? 10 : 1000}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-4"
          />

          <div className={`flex ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4 pt-2`}>
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-1/2"
              placeholder="Min"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-1/2"
              placeholder="Max"
            />
          </div>
        </div>
        
        {/* Location - Governorate */}
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
              <SelectItem value="all">
                {language === 'ar' ? (
                  <ArabicText text={t('allCities')} />
                ) : (
                  t('allCities')
                )}
              </SelectItem>
              <SelectItem value="damascus">
                {language === 'ar' ? (
                  <ArabicText text={t('damascus')} />
                ) : (
                  t('damascus')
                )}
              </SelectItem>
              <SelectItem value="damascusCountryside">
                {language === 'ar' ? (
                  <ArabicText text={t('damascusCountryside')} />
                ) : (
                  t('damascusCountryside')
                )}
              </SelectItem>
              <SelectItem value="aleppo">
                {language === 'ar' ? (
                  <ArabicText text={t('aleppo')} />
                ) : (
                  t('aleppo')
                )}
              </SelectItem>
              <SelectItem value="homs">
                {language === 'ar' ? (
                  <ArabicText text={t('homs')} />
                ) : (
                  t('homs')
                )}
              </SelectItem>
              <SelectItem value="hama">
                {language === 'ar' ? (
                  <ArabicText text={t('hama')} />
                ) : (
                  t('hama')
                )}
              </SelectItem>
              <SelectItem value="latakia">
                {language === 'ar' ? (
                  <ArabicText text={t('latakia')} />
                ) : (
                  t('latakia')
                )}
              </SelectItem>
              <SelectItem value="tartus">
                {language === 'ar' ? (
                  <ArabicText text={t('tartus')} />
                ) : (
                  t('tartus')
                )}
              </SelectItem>
              <SelectItem value="idlib">
                {language === 'ar' ? (
                  <ArabicText text={t('idlib')} />
                ) : (
                  t('idlib')
                )}
              </SelectItem>
              <SelectItem value="raqqa">
                {language === 'ar' ? (
                  <ArabicText text={t('raqqa')} />
                ) : (
                  t('raqqa')
                )}
              </SelectItem>
              <SelectItem value="deirEzzor">
                {language === 'ar' ? (
                  <ArabicText text={t('deirEzzor')} />
                ) : (
                  t('deirEzzor')
                )}
              </SelectItem>
              <SelectItem value="hasaka">
                {language === 'ar' ? (
                  <ArabicText text={t('hasaka')} />
                ) : (
                  t('hasaka')
                )}
              </SelectItem>
              <SelectItem value="daraa">
                {language === 'ar' ? (
                  <ArabicText text={t('daraa')} />
                ) : (
                  t('daraa')
                )}
              </SelectItem>
              <SelectItem value="sweida">
                {language === 'ar' ? (
                  <ArabicText text={t('sweida')} />
                ) : (
                  t('sweida')
                )}
              </SelectItem>
              <SelectItem value="quneitra">
                {language === 'ar' ? (
                  <ArabicText text={t('quneitra')} />
                ) : (
                  t('quneitra')
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Area - only show if governorate is selected */}
        {location && location !== 'all' && availableAreas.length > 0 && (
          <div className="space-y-2">
            <Label className={language === 'ar' ? 'block text-right' : ''}>
              {language === 'ar' ? (
                <ArabicText text={t('selectArea')} />
              ) : (
                t('selectArea')
              )}
            </Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? "اختر المنطقة" : "Select area"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  {language === 'ar' ? (
                    <ArabicText text={t('allAreas')} />
                  ) : (
                    t('allAreas')
                  )}
                </SelectItem>
                {availableAreas.map(areaOption => (
                  <SelectItem key={areaOption} value={areaOption}>
                    {language === 'ar' ? (
                      <ArabicText text={t(areaOption)} />
                    ) : (
                      t(areaOption)
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
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
