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
import { X, Filter, Check } from 'lucide-react';
import ArabicText from '@/components/ArabicText';

// Mock data for categories and locations
const categories = [
  { id: 'all', nameAr: 'جميع الفئات', nameEn: 'All Categories' },
  { id: 'real_estate', nameAr: 'العقارات', nameEn: 'Real Estate' },
  { id: 'cars', nameAr: 'سيارات', nameEn: 'Cars' },
  { id: 'electronics', nameAr: 'إلكترونيات', nameEn: 'Electronics' },
  { id: 'furniture', nameAr: 'أثاث', nameEn: 'Furniture' },
  { id: 'jobs', nameAr: 'وظائف', nameEn: 'Jobs' },
  { id: 'services', nameAr: 'خدمات', nameEn: 'Services' },
];

const locations = [
  { id: 'all', nameAr: 'جميع المناطق', nameEn: 'All Locations' },
  { id: 'damascus', nameAr: 'دمشق', nameEn: 'Damascus' },
  { id: 'aleppo', nameAr: 'حلب', nameEn: 'Aleppo' },
  { id: 'homs', nameAr: 'حمص', nameEn: 'Homs' },
  { id: 'hama', nameAr: 'حماة', nameEn: 'Hama' },
  { id: 'latakia', nameAr: 'اللاذقية', nameEn: 'Latakia' },
  { id: 'tartus', nameAr: 'طرطوس', nameEn: 'Tartus' },
];

const sortOptions = [
  { id: 'newest', nameAr: 'الأحدث', nameEn: 'Newest' },
  { id: 'oldest', nameAr: 'الأقدم', nameEn: 'Oldest' },
  { id: 'price_high_low', nameAr: 'السعر: من الأعلى إلى الأقل', nameEn: 'Price: High to Low' },
  { id: 'price_low_high', nameAr: 'السعر: من الأقل إلى الأعلى', nameEn: 'Price: Low to High' },
];

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
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, 10000]);
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
    if (priceRange[0] > 0 || priceRange[1] < 10000) count++;
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
      showPromotedOnly,
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
    setPriceRange([0, 10000]);
    setSortBy('newest');
    setSearchWithin('');
    setShowPromotedOnly(false);
    setShowWithImagesOnly(false);
    
    if (onFilterChange) {
      onFilterChange({
        category: 'all',
        location: 'all',
        priceRange: [0, 10000],
        sortBy: 'newest',
        searchWithin: '',
        showPromotedOnly: false,
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
    
    if (priceRange[0] > 0 || priceRange[1] < 10000) {
      filters.push({
        id: 'price',
        label: `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`,
        onRemove: () => setPriceRange([0, 10000]),
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
        label: language === 'ar' ? 'الإعلانات المميزة فقط' : 'Promoted Only',
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
            className="flex items-center gap-1 px-3 py-1 bg-syrian-green/10 border-syrian-green/20"
          >
            <span>{filter.label}</span>
            <button 
              onClick={filter.onRemove}
              className="text-syrian-dark/60 hover:text-syrian-dark"
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
            className="text-syrian-dark/60 hover:text-syrian-dark hover:bg-syrian-green/10"
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
  };
  
  // Handle search within change
  const handleSearchWithinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWithin(e.target.value);
  };
  
  // Handle show promoted only change
  const handleShowPromotedOnly = (value: string) => {
    // Fix the type conversion - ensure we're passing a boolean
    setShowPromotedOnly(value === 'true');
  };
  
  // Handle show with images only change
  const handleShowWithImagesOnly = (value: string) => {
    // Fix the type conversion - ensure we're passing a boolean
    setShowWithImagesOnly(value === 'true');
  };
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`
                  flex items-center gap-2 
                  ${activeFilterCount > 0 ? 'border-syrian-green text-syrian-green' : ''}
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
              className={`w-full sm:max-w-md ${language === 'ar' ? 'rtl' : 'ltr'}`}
            >
              <SheetHeader>
                <SheetTitle>
                  {language === 'ar' ? (
                    <ArabicText text={t('filters')} />
                  ) : (
                    t('filters')
                  )}
                </SheetTitle>
                <SheetDescription>
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
                  <Label>
                    {language === 'ar' ? (
                      <ArabicText text={t('category')} />
                    ) : (
                      t('category')
                    )}
                  </Label>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label>
                    {language === 'ar' ? (
                      <ArabicText text={t('location')} />
                    ) : (
                      t('location')
                    )}
                  </Label>
                  <Select value={location} onValueChange={handleLocationChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                    <Label>
                      {language === 'ar' ? (
                        <ArabicText text={t('priceRange')} />
                      ) : (
                        t('priceRange')
                      )}
                    </Label>
                    <span className="text-sm text-gray-500">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-24"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Sort By */}
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? (
                      <ArabicText text={t('sortBy')} />
                    ) : (
                      t('sortBy')
                    )}
                  </Label>
                  <Select value={sortBy} onValueChange={handleSortByChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {getName(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                {/* Additional Filters */}
                <Accordion type="single" collapsible defaultValue="additional">
                  <AccordionItem value="additional">
                    <AccordionTrigger>
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
                          <Label>
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
                          />
                        </div>
                        
                        {/* Show Promoted Only */}
                        <div className="flex items-center justify-between">
                          <Label>
                            {language === 'ar' ? (
                              <ArabicText text={t('showPromotedOnly')} />
                            ) : (
                              t('showPromotedOnly')
                            )}
                          </Label>
                          <Switch
                            checked={showPromotedOnly}
                            onCheckedChange={(checked) => handleShowPromotedOnly(String(checked))}
                          />
                        </div>
                        
                        {/* Show With Images Only */}
                        <div className="flex items-center justify-between">
                          <Label>
                            {language === 'ar' ? (
                              <ArabicText text={t('showWithImagesOnly')} />
                            ) : (
                              t('showWithImagesOnly')
                            )}
                          </Label>
                          <Switch
                            checked={showWithImagesOnly}
                            onCheckedChange={(checked) => handleShowWithImagesOnly(String(checked))}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <SheetFooter className="mt-6 flex-row justify-between">
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {getName(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* View Toggle (Grid/List) - Placeholder */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-syrian-green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon">
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
