
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const SearchBar = ({ className, variant = 'default' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex items-center w-full ${className}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="relative flex-1">
        <Input
          className={`
            ${variant === 'default' ? 'py-6 pl-10' : 'py-2 pl-10'} 
            pr-4
            bg-white border-gray-300 focus:border-blue-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-white
          `}
          placeholder={language === 'ar' ? "ماذا تبحث عن؟" : "What are you looking for?"}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search 
          className={`
            absolute ${language === 'ar' ? 'right-3' : 'left-3'} 
            top-1/2 transform -translate-y-1/2 
            text-gray-400
          `}
          size={variant === 'default' ? 20 : 16}
        />
        {searchQuery && (
          <button 
            type="button"
            onClick={clearSearch}
            className={`
              absolute ${language === 'ar' ? 'left-10' : 'right-10'} 
              top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600
            `}
          >
            <X size={variant === 'default' ? 18 : 14} />
          </button>
        )}
      </div>
      
      {variant === 'default' && (
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
        >
          {language === 'ar' ? "بحث" : "Search"}
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
