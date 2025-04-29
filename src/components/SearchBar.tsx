
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ArabicText from './ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center space-x-2 w-full ${className}`}>
      <div className="relative flex-1">
        <Input
          className={`${language === 'ar' ? 'pl-10 pr-3 text-right' : 'pr-10 pl-3'} py-6 bg-white`}
          placeholder={t('searchFor')}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-syrian-green/60`} />
      </div>
      <Button type="submit" className="bg-syrian-green hover:bg-syrian-dark text-white py-6 px-8">
        {language === 'ar' ? (
          <ArabicText text="بحث" />
        ) : (
          <span>{t('search')}</span>
        )}
      </Button>
    </form>
  );
};

export default SearchBar;
