
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder={t('searchFor')}
            className={`pl-10 pr-4 py-6 w-full border-2 border-syrian-green/20 focus:border-syrian-green rounded-lg bg-white 
                      ${language === 'ar' ? 'text-right pr-10 pl-4' : ''}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search 
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 
                        ${language === 'ar' ? 'right-3' : 'left-3'}`} 
            size={20} 
          />
        </div>
        
        <Button
          type="submit"
          className="px-6 py-6 bg-syrian-green hover:bg-syrian-dark text-white rounded-lg"
        >
          {language === 'ar' ? 
            <span className="font-arabic">{t('search')}</span> : 
            t('search')}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
