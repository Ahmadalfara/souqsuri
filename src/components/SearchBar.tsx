import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import ArabicText from './ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

// Mock search results for immediate display
const mockSearchData = [
  { id: 1, title: 'هاتف آيفون مستعمل', category: 'إلكترونيات', price: '400', location: 'دمشق' },
  { id: 2, title: 'شقة للإيجار في منطقة المزة', category: 'العقارات', price: '300', location: 'حلب' },
  { id: 3, title: 'سيارة مرسيدس 2020', category: 'سيارات', price: '15000', location: 'حمص' },
  { id: 4, title: 'أريكة جلدية بحالة ممتازة', category: 'أثاث', price: '250', location: 'اللاذقية' },
  { id: 5, title: 'لابتوب ديل XPS جديد', category: 'إلكترونيات', price: '1200', location: 'دمشق' },
];

const SearchBar = ({ className, variant = 'default' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter results based on search query
    if (searchQuery.trim()) {
      const filtered = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);

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
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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

  // This function handles the "View all results" button click correctly
  const handleViewAllResults = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البحث' : 'Search Error',
        description: language === 'ar' ? 'الرجاء إدخال كلمة للبحث' : 'Please enter a search term',
        variant: "destructive",
      });
    }
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
            <ArabicText text="بحث" />
          ) : (
            <span>{t('search')}</span>
          )}
        </Button>
      </form>

      {/* Immediate Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className={`
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
                      {language === 'ar' ? <ArabicText text={result.title} /> : result.title}
                    </p>
                    <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-syrian-green/10 text-syrian-green">
                        {language === 'ar' ? <ArabicText text={result.category} /> : result.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {language === 'ar' ? <ArabicText text={`${result.price} دولار`} /> : `$${result.price}`}
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
        </div>
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
