
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchSuggestions from '@/components/SearchSuggestions';
import ListingFilters from '@/components/listings/ListingFilters';

interface SearchBarProps {
  className?: string;
  onSearch?: (searchParams: URLSearchParams) => void;
  initialQuery?: string;
}

const SearchBar = ({ className = '', onSearch, initialQuery = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showInlineFilters, setShowInlineFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Initialize filters from URL on component mount
  useEffect(() => {
    const initialFilters: Record<string, any> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'q') {
        if (key === 'condition') {
          if (!initialFilters.condition) {
            initialFilters.condition = [];
          }
          initialFilters.condition.push(value);
        } else if (initialFilters[key] && Array.isArray(initialFilters[key])) {
          initialFilters[key].push(value);
        } else if (initialFilters[key]) {
          initialFilters[key] = [initialFilters[key], value];
        } else {
          initialFilters[key] = value;
        }
      }
    }
    setFilters(initialFilters);
  }, [searchParams]);

  // Set initial query from props
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    performSearch();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    
    // Small delay to allow the query to update before search
    setTimeout(() => {
      performSearch();
    }, 10);
  };

  const performSearch = () => {
    // Build query parameters from filters and search query
    const params = new URLSearchParams();
    
    if (query.trim()) params.set('q', query.trim());
    
    // Add all filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v.toString()));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    // Either call the onSearch callback or navigate to the search page
    if (onSearch) {
      onSearch(params);
    } else {
      navigate(`/search?${params.toString()}`);
    }
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters({...filters, ...newFilters});
    
    // Apply filters immediately if we're on the search page
    if (window.location.pathname.includes('/search')) {
      setTimeout(() => {
        performSearch();
      }, 10);
    }
  };

  const toggleFilters = () => {
    setShowInlineFilters(!showInlineFilters);
  };

  return (
    <div className={`w-full relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ابحث هنا...' : 'Search...'}
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
        
        {/* Filter Toggle Button */}
        <Button
          type="button"
          variant="outline"
          className={`px-3 py-6 border-2 hover:bg-syrian-green/5 rounded-lg transition-colors
                     ${showInlineFilters ? 'border-syrian-green bg-syrian-green/5' : 'border-syrian-green/20'}`}
          aria-label="Filter"
          onClick={toggleFilters}
        >
          {showInlineFilters ? (
            <X size={20} className="text-syrian-green" />
          ) : (
            <Filter size={20} className="text-syrian-green" />
          )}
        </Button>
        
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

      {/* Inline filters panel */}
      {showInlineFilters && (
        <div className="absolute z-40 mt-2 w-full bg-white rounded-lg border border-syrian-green/20 shadow-lg p-4 dark:bg-gray-800">
          <ListingFilters
            initialFilters={filters}
            onFilterChange={handleFilterChange}
            className="p-0"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
