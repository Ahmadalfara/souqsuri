
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, Filter } from 'lucide-react';
import ArabicText from './ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

// Mock search results for immediate display
const mockSearchData = [
  { id: 1, title: 'هاتف آيفون مستعمل', title_en: 'iPhone Used', category: 'إلكترونيات', price: '400', location: 'دمشق', currency: 'USD' },
  { id: 2, title: 'شقة للإيجار في منطقة المزة', title_en: 'Apartment for Rent in Mazzeh', category: 'العقارات', price: '300', location: 'حلب', currency: 'SYP' },
  { id: 3, title: 'سيارة مرسيدس 2020', title_en: 'Mercedes 2020', category: 'سيارات', price: '15000', location: 'حمص', currency: 'USD' },
  { id: 4, title: 'أريكة جلدية بحالة ممتازة', title_en: 'Leather Sofa in Excellent Condition', category: 'أثاث', price: '250', location: 'اللاذقية', currency: 'SYP' },
  { id: 5, title: 'لابتوب ديل XPS جديد', title_en: 'Dell XPS Laptop New', category: 'إلكترونيات', price: '1200', location: 'دمشق', currency: 'USD' },
];

// قائمة المحافظات السورية
const syrianGovernorates = [
  { id: 'damascus', nameAr: 'دمشق', nameEn: 'Damascus' },
  { id: 'aleppo', nameAr: 'حلب', nameEn: 'Aleppo' },
  { id: 'homs', nameAr: 'حمص', nameEn: 'Homs' },
  { id: 'hama', nameAr: 'حماة', nameEn: 'Hama' },
  { id: 'latakia', nameAr: 'اللاذقية', nameEn: 'Latakia' },
  { id: 'tartus', nameAr: 'طرطوس', nameEn: 'Tartus' },
  { id: 'daraa', nameAr: 'درعا', nameEn: 'Daraa' },
  { id: 'idlib', nameAr: 'إدلب', nameEn: 'Idlib' },
  { id: 'alhasakah', nameAr: 'الحسكة', nameEn: 'Al-Hasakah' },
  { id: 'deirezZor', nameAr: 'دير الزور', nameEn: 'Deir ez-Zor' },
  { id: 'quneitra', nameAr: 'القنيطرة', nameEn: 'Quneitra' },
  { id: 'alraqqa', nameAr: 'الرقة', nameEn: 'Al-Raqqah' },
  { id: 'assuwaida', nameAr: 'السويداء', nameEn: 'As-Suwayda' },
  { id: 'ruraldamascus', nameAr: 'ريف دمشق', nameEn: 'Rural Damascus' },
];

const SearchBar = ({ className, variant = 'default' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Quick filters state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  useEffect(() => {
    // Filter results based on search query, category, location, and currency
    if (searchQuery.trim()) {
      let filtered = mockSearchData.filter(item => {
        // Match by title or category - using correct language
        const titleToCheck = language === 'ar' ? item.title : item.title_en;
        const matchesQuery = titleToCheck.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply category filter if one is selected
        const matchesCategory = !selectedCategory || 
                              selectedCategory === 'all' || 
                              item.category.toLowerCase().includes(selectedCategory.toLowerCase());
        
        // Apply location filter if one is selected
        const matchesLocation = !selectedLocation || 
                              item.location.toLowerCase().includes(selectedLocation.toLowerCase());
        
        // Apply currency filter if one is selected
        const matchesCurrency = !selectedCurrency || 
                              item.currency === selectedCurrency;
        
        return matchesQuery && matchesCategory && matchesLocation && matchesCurrency;
      });
      
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, selectedCategory, selectedLocation, selectedCurrency, language]);

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const queryParams = new URLSearchParams();
      queryParams.append('q', searchQuery);
      
      if (selectedCategory && selectedCategory !== 'all') {
        queryParams.append('category', selectedCategory);
      }
      
      if (selectedLocation) {
        queryParams.append('location', selectedLocation);
      }
      
      if (selectedCurrency) {
        queryParams.append('currency', selectedCurrency);
      }
      
      navigate(`/search?${queryParams.toString()}`);
      setShowResults(false);
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البحث' : 'Search Error',
        description: language === 'ar' ? 'الرجاء إدخال كلمة للبحث' : 'Please enter a search term',
        variant: "destructive",
      });
    }
  };

  const handleResultClick = (id: number) => {
    // Navigate to the specific listing when clicked
    navigate(`/listing/${id}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  // Handle "View all results" button click
  const handleViewAllResults = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const queryParams = new URLSearchParams();
      queryParams.append('q', searchQuery);
      
      if (selectedCategory && selectedCategory !== 'all') {
        queryParams.append('category', selectedCategory);
      }
      
      if (selectedLocation) {
        queryParams.append('location', selectedLocation);
      }
      
      if (selectedCurrency) {
        queryParams.append('currency', selectedCurrency);
      }
      
      navigate(`/search?${queryParams.toString()}`);
      setShowResults(false);
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البحث' : 'Search Error',
        description: language === 'ar' ? 'الرجاء إدخال كلمة للبحث' : 'Please enter a search term',
        variant: "destructive",
      });
    }
  };
  
  // Get currency symbol based on currency
  const getCurrencySymbol = (currency: string) => {
    return currency === 'USD' ? '$' : language === 'ar' ? 'ل.س' : 'SYP';
  };

  // Get the right title based on language
  const getTitle = (item: any) => {
    return language === 'ar' ? item.title : item.title_en;
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form 
        onSubmit={handleSearch} 
        className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : 'space-x-2'} w-full`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className={`relative flex-1 ${isFocused ? 'ring-2 ring-syrian-green rounded-lg' : ''}`}>
          <div className="relative">
            <Input
              className={`
                ${variant === 'default' ? 'py-6 pr-12' : 'py-2 pr-10'} 
                pl-4
                bg-white border-syrian-green/20 focus:border-syrian-green
                transition-all ${isFocused ? 'shadow-sm' : ''}
                dark:bg-gray-800 dark:border-gray-700 dark:text-white
              `}
              placeholder={t('searchFor')}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={clearSearch}
                className={`
                  absolute ${language === 'ar' ? 'left-10' : 'right-10'} 
                  top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-gray-600
                  transition-colors
                `}
              >
                <X size={variant === 'default' ? 18 : 14} />
              </button>
            )}
            <Search 
              className={`
                absolute ${language === 'ar' ? 'left-3' : 'right-3'} 
                top-1/2 transform -translate-y-1/2 
                ${isFocused ? 'text-syrian-green' : 'text-syrian-green/60'} 
                transition-colors
                pointer-events-none
              `}
              size={variant === 'default' ? 20 : 16}
            />
          </div>
        </div>

        {/* Advanced Filter Button */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="px-3">
              <Filter size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-3 p-2">
              <h3 className="text-md font-semibold">
                {language === 'ar' ? (
                  <ArabicText text={t('advancedSearch')} />
                ) : (
                  t('advancedSearch')
                )}
              </h3>
              
              {/* Location Selection - Now with all Syrian governorates */}
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  {language === 'ar' ? (
                    <ArabicText text={t('location')} />
                  ) : (
                    t('location')
                  )}
                </div>
                <Select 
                  value={selectedLocation || ''} 
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ar' ? "اختر المحافظة" : "Select governorate"} />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-60 w-full">
                      <SelectItem value="all">
                        {language === 'ar' ? "جميع المحافظات" : "All Governorates"}
                      </SelectItem>
                      {syrianGovernorates.map((governorate) => (
                        <SelectItem key={governorate.id} value={governorate.id}>
                          {language === 'ar' ? governorate.nameAr : governorate.nameEn}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Currency Selection */}
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  {language === 'ar' ? (
                    <ArabicText text={t('currency')} />
                  ) : (
                    t('currency')
                  )}
                </div>
                <Select 
                  value={selectedCurrency || ''} 
                  onValueChange={setSelectedCurrency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ar' ? "اختر العملة" : "Select currency"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === 'ar' ? "جميع العملات" : "All Currencies"}
                    </SelectItem>
                    <SelectItem value="SYP">
                      {language === 'ar' ? "ليرة سورية" : "Syrian Pound (SYP)"}
                    </SelectItem>
                    <SelectItem value="USD">
                      {language === 'ar' ? "دولار أمريكي" : "US Dollar (USD)"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-syrian-green hover:bg-syrian-dark"
                >
                  {language === 'ar' ? (
                    <ArabicText text={t('applyFilter')} />
                  ) : (
                    t('applyFilter')
                  )}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          type="submit" 
          className={`
            bg-syrian-green hover:bg-syrian-dark text-white 
            ${variant === 'default' ? 'py-6 px-8' : 'py-2 px-4'}
            transition-all hover:shadow-md
            dark:bg-syrian-dark dark:hover:bg-syrian-green
          `}
        >
          {language === 'ar' ? (
            <ArabicText text={t('search')} />
          ) : (
            <span>{t('search')}</span>
          )}
        </Button>
      </form>

      {/* Smart Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Card className={`
          absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 
          shadow-lg rounded-lg border border-gray-200 dark:border-gray-700
          overflow-hidden max-h-80 overflow-y-auto
        `}>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {language === 'ar' ? (
                <ArabicText text={`نتائج البحث (${searchResults.length})`} />
              ) : (
                `Search results (${searchResults.length})`
              )}
            </p>
          </div>
          <ul>
            {searchResults.map((result) => (
              <li 
                key={result.id}
                className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleResultClick(result.id)}
              >
                <div className="p-3 flex justify-between items-center">
                  <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className="font-semibold text-syrian-dark dark:text-white">
                      {language === 'ar' ? 
                        <ArabicText text={result.title} /> : 
                        <span>{result.title_en}</span>
                      }
                    </p>
                    <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-syrian-green/10 text-syrian-green">
                        {language === 'ar' ? <ArabicText text={result.category} /> : result.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {language === 'ar' ? 
                          <ArabicText text={`${result.price} ${getCurrencySymbol(result.currency)}`} /> : 
                          `${getCurrencySymbol(result.currency)}${result.price}`}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {language === 'ar' ? <ArabicText text={result.location} /> : result.location}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="link" 
              className="text-syrian-green text-sm"
              onClick={handleViewAllResults}
            >
              {language === 'ar' ? (
                <ArabicText text="عرض كل النتائج" />
              ) : (
                "View all results"
              )}
            </Button>
          </div>
        </Card>
      )}

      {showResults && searchResults.length === 0 && searchQuery.trim() && (
        <div className={`
          absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 
          shadow-lg rounded-lg border border-gray-200 dark:border-gray-700
          p-4 text-center
        `}>
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'ar' ? (
              <ArabicText text="لا توجد نتائج للبحث" />
            ) : (
              "No results found"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
