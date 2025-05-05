
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ArabicText from './ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'ar' ? 'ابحث عن أي شيء...' : 'Search for anything...'}
          className={`w-full py-3 pl-4 ${language === 'ar' ? 'pr-12 text-right' : 'pr-4 pl-12'} 
                     rounded-lg border border-gray-300 focus:border-syrian-green focus:ring focus:ring-syrian-green/20 
                     focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700
                     dark:text-white dark:placeholder-gray-400`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        <button 
          type="submit"
          className={`absolute top-1/2 transform -translate-y-1/2 ${language === 'ar' ? 'right-3' : 'left-3'} 
                     text-gray-500 hover:text-syrian-green transition-colors`}
          aria-label={language === 'ar' ? 'بحث' : 'Search'}
        >
          <Search size={20} />
        </button>
      </div>
      
      <div className="flex mt-2 text-xs text-gray-500 dark:text-gray-400 justify-between">
        <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <span className="font-medium">
            {language === 'ar' ? <ArabicText text="تصفح:" /> : "Browse:"}
          </span>
          <a href="/category/real_estate" className="hover:text-syrian-green hover:underline">
            {language === 'ar' ? <ArabicText text="عقارات" /> : "Real Estate"}
          </a>
          <a href="/category/cars" className="hover:text-syrian-green hover:underline">
            {language === 'ar' ? <ArabicText text="سيارات" /> : "Cars"}
          </a>
          <a href="/category/electronics" className="hover:text-syrian-green hover:underline">
            {language === 'ar' ? <ArabicText text="إلكترونيات" /> : "Electronics"}
          </a>
        </div>
        
        <a href="/advanced-search" className="text-syrian-green hover:underline">
          {language === 'ar' ? <ArabicText text="بحث متقدم" /> : "Advanced Search"}
        </a>
      </div>
    </form>
  );
};

export default SearchBar;
