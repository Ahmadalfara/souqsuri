
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ArabicText from './ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const SearchBar = ({ className, variant = 'default' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البحث' : 'Search Error',
        description: language === 'ar' ? 'الرجاء إدخال كلمة للبحث' : 'Please enter a search term',
        variant: "destructive",
      });
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex items-center space-x-2 w-full ${className}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className={`relative flex-1 ${isFocused ? 'ring-2 ring-syrian-green rounded-lg' : ''}`}>
        <Input
          className={`
            ${language === 'ar' ? 'pl-10 pr-3 text-right' : 'pr-10 pl-3'} 
            ${variant === 'default' ? 'py-6' : 'py-2'} 
            bg-white border-syrian-green/20 focus:border-syrian-green
            transition-all ${isFocused ? 'shadow-sm' : ''}
          `}
          placeholder={t('searchFor')}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search 
          className={`
            absolute ${language === 'ar' ? 'right-3' : 'left-3'} 
            top-1/2 transform -translate-y-1/2 
            ${isFocused ? 'text-syrian-green' : 'text-syrian-green/60'} 
            transition-colors
          `}
          size={variant === 'default' ? 20 : 16}
        />
      </div>
      <Button 
        type="submit" 
        className={`
          bg-syrian-green hover:bg-syrian-dark text-white 
          ${variant === 'default' ? 'py-6 px-8' : 'py-2 px-4'}
          transition-all hover:shadow-md
        `}
      >
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
