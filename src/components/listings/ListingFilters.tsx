
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import FilterBadge from '@/components/filters/FilterBadge';
import FilterCategories, { categories } from '@/components/filters/FilterCategories';
import FilterLocations, { locations } from '@/components/filters/FilterLocations';
import FilterPriceRange, { MAX_PRICE } from '@/components/filters/FilterPriceRange';
import FilterSortBy, { sortOptions } from '@/components/filters/FilterSortBy';
import AdditionalFilters from '@/components/filters/AdditionalFilters';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
          <FilterBadge 
            key={filter.id}
            label={filter.label}
            onRemove={filter.onRemove}
          />
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
                <FilterCategories 
                  value={category}
                  onChange={setCategory}
                />
                
                {/* Location Filter */}
                <FilterLocations
                  value={location}
                  onChange={setLocation}
                />
                
                {/* Price Range Filter */}
                <FilterPriceRange
                  value={priceRange}
                  onChange={setPriceRange}
                />
                
                <Separator className="dark:bg-gray-600" />
                
                {/* Sort By */}
                <FilterSortBy
                  value={sortBy}
                  onChange={setSortBy}
                />
                
                <Separator className="dark:bg-gray-600" />
                
                {/* Additional Filters */}
                <AdditionalFilters
                  searchWithin={searchWithin}
                  showPromotedOnly={showPromotedOnly}
                  showWithImagesOnly={showWithImagesOnly}
                  onSearchWithinChange={setSearchWithin}
                  onPromotedChange={setShowPromotedOnly}
                  onImagesOnlyChange={setShowWithImagesOnly}
                />
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
            <Select value={sortBy} onValueChange={(value) => {
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
            }}>
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
