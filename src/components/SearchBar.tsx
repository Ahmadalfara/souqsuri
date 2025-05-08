
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchSuggestions from '@/components/SearchSuggestions';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ListingFilters from '@/components/listings/ListingFilters';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filters, setFilters] = useState({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  // Common search terms for demo purposes
  const commonSearches = [
    { en: 'apartment for rent', ar: 'شقة للإيجار' },
    { en: 'used toyota', ar: 'تويوتا مستعملة' },
    { en: 'iphone', ar: 'آيفون' },
    { en: 'washing machine', ar: 'غسالة' },
    { en: 'laptop', ar: 'لابتوب' },
    { en: 'furniture', ar: 'أثاث' },
    { en: 'refrigerator', ar: 'ثلاجة' },
    { en: 'job offer', ar: 'عرض عمل' },
    { en: 'office space', ar: 'مساحة مكتبية' },
    { en: 'villa', ar: 'فيلا' }
  ];

  // Effect to close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (query.length >= 1) {
      const currentLang = language === 'ar' ? 'ar' : 'en';
      const filteredSuggestions = commonSearches
        .filter(item => 
          item[currentLang as 'ar' | 'en'].toLowerCase().includes(query.toLowerCase())
        )
        .map(item => item[currentLang as 'ar' | 'en']);

      setSuggestions(filteredSuggestions.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, language]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setIsFiltersOpen(false);

    // Build query parameters from filters
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    
    // Add all filter parameters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v.toString()));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={`w-full relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder={t('searchFor')}
            className={`pl-10 pr-4 py-6 w-full border-2 border-syrian-green/20 focus:border-syrian-green rounded-lg bg-white 
                      ${language === 'ar' ? 'text-right pr-10 pl-4' : ''}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.length >= 1) {
                setShowSuggestions(true);
              }
            }}
          />
          <Search 
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 
                        ${language === 'ar' ? 'right-3' : 'left-3'}`} 
            size={20} 
          />
        </div>
        
        {/* Filter Button Sheet */}
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="px-3 py-6 border-2 border-syrian-green/20 hover:border-syrian-green hover:bg-syrian-green/5 rounded-lg"
              aria-label="Filter"
            >
              <Filter size={20} className="text-syrian-green" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side={language === 'ar' ? 'right' : 'left'}
            className="w-full sm:max-w-md"
          >
            <SheetHeader>
              <SheetTitle>{language === 'ar' ? 'فلترة البحث' : 'Search Filters'}</SheetTitle>
              <SheetDescription>
                {language === 'ar' 
                  ? 'حدد معايير البحث لتحسين نتائجك'
                  : 'Set search criteria to refine your results'}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <ListingFilters
                initialFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </SheetContent>
        </Sheet>
        
        <Button
          type="submit"
          className="px-6 py-6 bg-syrian-green hover:bg-syrian-dark text-white rounded-lg"
        >
          {language === 'ar' ? 
            <span className="font-arabic">{t('search')}</span> : 
            t('search')}
        </Button>
      </form>

      {/* Live Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick}
          language={language}
        />
      )}
    </div>
  );
};

export default SearchBar;
