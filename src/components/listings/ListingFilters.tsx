
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import ArabicText from '@/components/ArabicText';

// Read from environment or services in a real app
const categories = [
  { id: 'all', nameAr: 'جميع الفئات', nameEn: 'All Categories' },
  { id: 'real_estate', nameAr: 'العقارات', nameEn: 'Real Estate' },
  { id: 'cars', nameAr: 'سيارات', nameEn: 'Cars' },
  { id: 'clothes', nameAr: 'ملابس', nameEn: 'Clothes' },
  { id: 'electronics', nameAr: 'إلكترونيات', nameEn: 'Electronics' },
  { id: 'furniture', nameAr: 'أثاث', nameEn: 'Furniture' },
  { id: 'jobs', nameAr: 'وظائف', nameEn: 'Jobs' },
  { id: 'services', nameAr: 'خدمات', nameEn: 'Services' },
];

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

const sortOptions = [
  { id: 'newest', nameAr: 'الأحدث', nameEn: 'Newest' },
  { id: 'oldest', nameAr: 'الأقدم', nameEn: 'Oldest' },
  { id: 'price_high_low', nameAr: 'السعر: من الأعلى إلى الأقل', nameEn: 'Price: High to Low' },
  { id: 'price_low_high', nameAr: 'السعر: من الأقل إلى الأعلى', nameEn: 'Price: Low to High' },
];

// Increased price range to 100 billion SYP
const MAX_PRICE = 100000000000; // 100 billion

interface ListingFiltersProps {
  onFilterChange?: (filters: any) => void;
  initialFilters?: any;
  className?: string;
}

const ListingFilters = ({ onFilterChange, initialFilters = {}, className = '' }: ListingFiltersProps) => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter states
  const [category, setCategory] = useState(initialFilters.category || 'all');
  const [location, setLocation] = useState(initialFilters.location || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || [0, MAX_PRICE / 10]
  );
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'newest');
  const [searchWithin, setSearchWithin] = useState(initialFilters.searchWithin || '');
  const [showPromotedOnly, setShowPromotedOnly] = useState(initialFilters.showPromotedOnly || false);
  const [showWithImagesOnly, setShowWithImagesOnly] = useState(initialFilters.showWithImagesOnly || false);
  
  // Active filter count
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
  // Calculate active filter count
  useEffect(() => {
    let count = 0;
    if (category !== 'all') count++;
    if (location !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < MAX_PRICE) count++;
    if (sortBy !== 'newest') count++;
    if (searchWithin) count++;
    if (showPromotedOnly) count++;
    if (showWithImagesOnly) count++;
    
    setActiveFilterCount(count);
  }, [category, location, priceRange, sortBy, searchWithin, showPromotedOnly, showWithImagesOnly]);
  
  // Apply filters
  const applyFilters = () => {
    const filters = {
      category,
      location,
      priceRange,
      sortBy,
      searchWithin,
      urgent: showPromotedOnly,
      showWithImagesOnly,
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    setIsOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setCategory('all');
    setLocation('all');
    setPriceRange([0, MAX_PRICE / 10]);
    setSortBy('newest');
    setSearchWithin('');
    setShowPromotedOnly(false);
    setShowWithImagesOnly(false);
    
    if (onFilterChange) {
      onFilterChange({
        category: 'all',
        location: 'all',
        priceRange: [0, MAX_PRICE / 10],
        sortBy: 'newest',
        searchWithin: '',
        urgent: false,
        showWithImagesOnly: false,
      });
    }
  };
  
  // Get name based on language
  const getName = (item: any) => {
    return language === 'ar' ? item.nameAr : item.nameEn;
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SY' : 'en-US', {
      style: 'currency',
      currency: 'SYP',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Get active filters for display
  const getActiveFilters = () => {
    const filters = [];
    
    if (category !== 'all') {
      const categoryObj = categories.find(c => c.id === category);
      if (categoryObj) {
        filters.push({
          id: 'category',
          label: getName(categoryObj),
          onRemove: () => setCategory('all'),
        });
      }
    }
    
    if (location !== 'all') {
      const locationObj = locations.find(l => l.id === location);
      if (locationObj) {
        filters.push({
          id: 'location',
          label: getName(locationObj),
          onRemove: () => setLocation('all'),
        });
      }
    }
    
    if (priceRange[0] > 0 || priceRange[1] < MAX_PRICE) {
      filters.push({
        id: 'price',
        label: `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`,
        onRemove: () => setPriceRange([0, MAX_PRICE / 10]),
      });
    }
    
    if (searchWithin) {
      filters.push({
        id: 'searchWithin',
        label: searchWithin,
        onRemove: () => setSearchWithin(''),
      });
    }
    
    if (showPromotedOnly) {
      filters.push({
        id: 'promoted',
        label: language === 'ar' ? 'الإعلانات المميزة فقط' : 'Featured Only',
        onRemove: () => setShowPromotedOnly(false),
      });
    }
    
    if (showWithImagesOnly) {
      filters.push({
        id: 'withImages',
        label: language === 'ar' ? 'مع صور فقط' : 'With Images Only',
        onRemove: () => setShowWithImagesOnly(false),
      });
    }
    
    return filters;
  };
  
  // Render active filters
  const renderActiveFilters = () => {
    const filters = getActiveFilters();
    
    if (filters.length === 0) {
      return null;
    }
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {filters.map((filter) => (
          <Badge 
            key={filter.id} 
            variant="outline" 
            className="flex items-center gap-1 px-3 py-1 bg-syrian-green/10 border-syrian-green/20 dark:bg-syrian-green/20 dark:border-syrian-green/30"
          >
            <span>{filter.label}</span>
            <button 
              onClick={filter.onRemove}
              className="text-syrian-dark/60 hover:text-syrian-dark dark:text-white/60 dark:hover:text-white"
              aria-label="Remove filter"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        
        {filters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-syrian-dark/60 hover:text-syrian-dark hover:bg-syrian-green/10 dark:text-white/60 dark:hover:text-white dark:hover:bg-syrian-green/20"
          >
            {language === 'ar' ? (
              <ArabicText text="مسح الكل" />
            ) : (
              'Clear All'
            )}
          </Button>
        )}
      </div>
    );
  };
  
  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  
  // Handle location change
  const handleLocationChange = (value: string) => {
    setLocation(value);
  };
  
  // Handle sort by change
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    
    // Apply sort immediately for better UX
    if (onFilterChange) {
      onFilterChange({
        category,
        location,
        priceRange,
        sortBy: value,
        searchWithin,
        urgent: showPromotedOnly,
        showWithImagesOnly,
      });
    }
  };
  
  // Handle search within change
  const handleSearchWithinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWithin(e.target.value);
  };
  
  // Handle promoted only toggle
  const handleShowPromotedOnlyChange = (checked: boolean) => {
    setShowPromotedOnly(checked);
  };
  
  // Handle with images only toggle
  const handleShowWithImagesOnlyChange = (checked: boolean) => {
    setShowWithImagesOnly(checked);
  };
  
  return (
    <div className={`${className} dark:text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`
                  flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-700
                  ${activeFilterCount > 0 ? 'border-syrian-green text-syrian-green dark:border-syrian-green dark:text-syrian-green' : ''}
                `}
              >
                <Filter size={16} />
                {language === 'ar' ? (
                  <ArabicText text={t('filters')} />
                ) : (
                  t('filters')
                )}
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 bg-syrian-green text-white">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent 
              side={language === 'ar' ? 'right' : 'left'} 
              className={`w-full sm:max-w-md ${language === 'ar' ? 'rtl' : 'ltr'} dark:bg-gray-800 dark:text-white dark:border-gray-700`}
            >
              <SheetHeader>
                <SheetTitle className="dark:text-white">
                  {language === 'ar' ? (
                    <ArabicText text={t('filters')} />
                  ) : (
                    t('filters')
                  )}
                </SheetTitle>
                <SheetDescription className="dark:text-gray-400">
                  {language === 'ar' ? (
                    <ArabicText text={t('filtersDescription')} />
                  ) : (
                    t('filtersDescription')
                  )}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label className="dark:text-white">
                    {language === 'ar' ? (
                      <ArabicText text={t('category')} />
                    ) : (
                      t('category')
                    )}
                  </Label>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {getName(cat)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Location Filter */}
                <div className="space-y-2">
                  <Label className="dark:text-white">
                    {language === 'ar' ? (
                      <ArabicText text={t('location')} />
                    ) : (
                      t('location')
                    )}
                  </Label>
                  <Select value={location} onValueChange={handleLocationChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {getName(loc)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range Filter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="dark:text-white">
                      {language === 'ar' ? (
                        <ArabicText text={t('priceRange')} />
                      ) : (
                        t('priceRange')
                      )}
                    </Label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={MAX_PRICE / 10} // Display a more reasonable range in the UI
                    step={1000000} // Steps of 1 million
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                </div>
                
                <Separator className="dark:bg-gray-600" />
                
                {/* Sort By */}
                <div className="space-y-2">
                  <Label className="dark:text-white">
                    {language === 'ar' ? (
                      <ArabicText text={t('sortBy')} />
                    ) : (
                      t('sortBy')
                    )}
                  </Label>
                  <Select value={sortBy} onValueChange={handleSortByChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      {sortOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {getName(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="dark:bg-gray-600" />
                
                {/* Additional Filters */}
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
                            onChange={handleSearchWithinChange}
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
                            onCheckedChange={handleShowPromotedOnlyChange}
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
                            onCheckedChange={handleShowWithImagesOnlyChange}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <SheetFooter className="mt-6 flex-row justify-between">
                <SheetClose asChild>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    {language === 'ar' ? (
                      <ArabicText text={t('reset')} />
                    ) : (
                      t('reset')
                    )}
                  </Button>
                </SheetClose>
                <Button onClick={applyFilters} className="bg-syrian-green hover:bg-syrian-dark">
                  {language === 'ar' ? (
                    <ArabicText text={t('apply')} />
                  ) : (
                    t('apply')
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {/* Sort By Quick Select (Desktop) */}
          <div className="hidden md:block">
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {getName(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* View Toggle (Grid/List) */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-syrian-green dark:text-syrian-green dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="12" x2="3" y2="12" />
              <line x1="21" y1="18" x2="3" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Active Filters */}
      {renderActiveFilters()}
    </div>
  );
};

export default ListingFilters;
