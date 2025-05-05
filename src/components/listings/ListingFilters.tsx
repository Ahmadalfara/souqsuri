import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '@/components/ArabicText';
import { X, ArrowDownUp, Wand2 } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector = ({ selectedLocation, onLocationChange }: LocationSelectorProps) => {
  const { language, t } = useLanguage();

  const locations = [
    { id: 'damascus', nameAr: 'دمشق', nameEn: 'Damascus' },
    { id: 'aleppo', nameAr: 'حلب', nameEn: 'Aleppo' },
    { id: 'homs', nameAr: 'حمص', nameEn: 'Homs' },
    { id: 'latakia', nameAr: 'اللاذقية', nameEn: 'Latakia' },
    { id: 'tartus', nameAr: 'طرطوس', nameEn: 'Tartus' },
  ];

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {language === 'ar' ? (
          <ArabicText text={t('location')} />
        ) : (
          t('location')
        )}
      </label>
      <Select value={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger>
          <SelectValue placeholder={
            language === 'ar' ?
              <ArabicText text={t('selectLocation')} /> :
              t('selectLocation')
          } />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[200px] overflow-auto">
            <SelectItem value="all">
              {language === 'ar' ? (
                <ArabicText text={t('allLocations')} />
              ) : (
                t('allLocations')
              )}
            </SelectItem>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {language === 'ar' ? location.nameAr : location.nameEn}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'SYP',
  minimumFractionDigits: 0,
});

interface ListingFiltersProps {
  onFilterChange: (filters: any) => void;
  defaultFilters?: any;
  containerClassName?: string;
}

const ListingFilters = ({ 
  onFilterChange, 
  defaultFilters = {}, 
  containerClassName = '' 
}: ListingFiltersProps) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultFilters.category || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(defaultFilters.subCategory || 'all');
  const [priceRange, setPriceRange] = useState<number[]>([defaultFilters.minPrice || 0, defaultFilters.maxPrice || 1000000]);
  const [selectedSort, setSelectedSort] = useState<string>(defaultFilters.sortBy || 'relevance');
  const [selectedLocation, setSelectedLocation] = useState<string>(defaultFilters.location || 'all');
  const [moreOptions, setMoreOptions] = useState<any>(defaultFilters.moreOptions || {});

  useEffect(() => {
    // Initialize filters from defaultFilters prop
    setSelectedCategory(defaultFilters.category || 'all');
    setSelectedSubCategory(defaultFilters.subCategory || 'all');
    setPriceRange([defaultFilters.minPrice || 0, defaultFilters.maxPrice || 1000000]);
    setSelectedSort(defaultFilters.sortBy || 'relevance');
    setSelectedLocation(defaultFilters.location || 'all');
    setMoreOptions(defaultFilters.moreOptions || {});
  }, [defaultFilters]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };
  
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setPriceRange([0, 1000000]);
    setSelectedSort('relevance');
    setSelectedLocation('all');
    setMoreOptions({});
    
    // Apply reset filters
    onFilterChange({
      category: 'all',
      subCategory: 'all',
      minPrice: 0,
      maxPrice: 1000000,
      sortBy: 'relevance',
      location: 'all',
      moreOptions: {},
    });
  };
  
  const handleMoreOptionsChange = (option: string, value: boolean) => {
    setMoreOptions(prev => ({ ...prev, [option]: value }));
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedSubCategory !== 'all') count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 1000000) count++;
    if (selectedSort !== 'relevance') count++;
    if (selectedLocation !== 'all') count++;
    count += Object.keys(moreOptions).length;
    return count;
  };
  
  return (
    <Card className={`p-4 border-syrian-green/20 ${containerClassName}`}>
      {/* Filter Title Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="font-bold text-lg text-syrian-dark">
            {language === 'ar' ? (
              <ArabicText text={t('filters')} />
            ) : (
              t('filters')
            )}
          </h3>
          {getActiveFilterCount() > 0 && (
            <Badge variant="default" className="ml-2 bg-syrian-green">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="text-syrian-green hover:text-syrian-dark hover:bg-syrian-green/10"
          >
            <X className="h-4 w-4 mr-1" />
            {language === 'ar' ? (
              <ArabicText text={t('clearAll')} />
            ) : (
              t('clearAll')
            )}
          </Button>
        )}
      </div>

      {/* Main Filters Section */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {language === 'ar' ? (
              <ArabicText text={t('category')} />
            ) : (
              t('category')
            )}
          </label>
          <Select 
            value={selectedCategory || 'all'} 
            onValueChange={handleCategoryChange}
            defaultValue="all"
          >
            <SelectTrigger>
              <SelectValue placeholder={
                language === 'ar' ? 
                  <ArabicText text={t('selectCategory')} /> :
                  t('selectCategory')
              } />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px] overflow-auto">
                <SelectItem value="all">
                  {language === 'ar' ? (
                    <ArabicText text={t('allCategories')} />
                  ) : (
                    t('allCategories')
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
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        {/* Subcategory Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {language === 'ar' ? (
              <ArabicText text={t('subCategory')} />
            ) : (
              t('subCategory')
            )}
          </label>
          <Select 
            value={selectedSubCategory || 'all'} 
            onValueChange={handleSubCategoryChange}
            defaultValue="all"
          >
            <SelectTrigger>
              <SelectValue placeholder={
                language === 'ar' ? 
                  <ArabicText text={t('selectSubCategory')} /> :
                  t('selectSubCategory')
              } />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px] overflow-auto">
                <SelectItem value="all">
                  {language === 'ar' ? (
                    <ArabicText text={t('allSubCategories')} />
                  ) : (
                    t('allSubCategories')
                  )}
                </SelectItem>
                {/* Add subcategories based on selected category */}
                {selectedCategory === 'real_estate' && (
                  <>
                    <SelectItem value="apartments">
                      {language === 'ar' ? (
                        <ArabicText text="شقق" />
                      ) : (
                        "Apartments"
                      )}
                    </SelectItem>
                    <SelectItem value="villas">
                      {language === 'ar' ? (
                        <ArabicText text="فلل" />
                      ) : (
                        "Villas"
                      )}
                    </SelectItem>
                  </>
                )}
                {selectedCategory === 'cars' && (
                  <>
                    <SelectItem value="sedan">
                      {language === 'ar' ? (
                        <ArabicText text="سيدان" />
                      ) : (
                        "Sedan"
                      )}
                    </SelectItem>
                    <SelectItem value="suv">
                      {language === 'ar' ? (
                        <ArabicText text="SUV" />
                      ) : (
                        "SUV"
                      )}
                    </SelectItem>
                  </>
                )}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        {/* Sort Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {language === 'ar' ? (
              <ArabicText text={t('sortBy')} />
            ) : (
              t('sortBy')
            )}
          </label>
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder={
                language === 'ar' ? 
                  <ArabicText text={t('selectSort')} /> :
                  t('selectSort')
              } />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">
                {language === 'ar' ? (
                  <ArabicText text={t('relevance')} />
                ) : (
                  t('relevance')
                )}
              </SelectItem>
              <SelectItem value="date">
                {language === 'ar' ? (
                  <ArabicText text={t('date')} />
                ) : (
                  t('date')
                )}
              </SelectItem>
              <SelectItem value="priceAsc">
                {language === 'ar' ? (
                  <ArabicText text={t('priceAsc')} />
                ) : (
                  t('priceAsc')
                )}
              </SelectItem>
              <SelectItem value="priceDesc">
                {language === 'ar' ? (
                  <ArabicText text={t('priceDesc')} />
                ) : (
                  t('priceDesc')
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {language === 'ar' ? (
              <ArabicText text={t('priceRange')} />
            ) : (
              t('priceRange')
            )}
          </label>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              {priceFormatter.format(priceRange[0])}
            </span>
            <span className="text-gray-500">
              {priceFormatter.format(priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={priceRange}
            max={1000000}
            step={10000}
            onValueChange={handlePriceChange}
          />
        </div>
        
        {/* Location Filter */}
        <LocationSelector
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
        
        {/* More Filters Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            {language === 'ar' ? (
              <ArabicText text={t('moreFilters')} />
            ) : (
              t('moreFilters')
            )}
          </h4>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={moreOptions.featured || false}
                onCheckedChange={(checked) => handleMoreOptionsChange('featured', checked || false)}
              />
              <label htmlFor="featured" className="text-sm">
                {language === 'ar' ? (
                  <ArabicText text={t('featured')} />
                ) : (
                  t('featured')
                )}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new"
                checked={moreOptions.new || false}
                onCheckedChange={(checked) => handleMoreOptionsChange('new', checked || false)}
              />
              <label htmlFor="new" className="text-sm">
                {language === 'ar' ? (
                  <ArabicText text={t('new')} />
                ) : (
                  t('new')
                )}
              </label>
            </div>
          </div>
        </div>
        
        {/* Apply Button */}
        <Button 
          onClick={() => {
            onFilterChange({
              category: selectedCategory,
              subCategory: selectedSubCategory,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
              sortBy: selectedSort,
              location: selectedLocation,
              moreOptions: moreOptions,
            });
          }}
          className="w-full bg-syrian-green hover:bg-syrian-dark text-white"
        >
          {language === 'ar' ? (
            <ArabicText text={t('applyFilters')} />
          ) : (
            t('applyFilters')
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ListingFilters;
