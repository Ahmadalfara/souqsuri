
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`relative ${className}`}
          aria-label="Select language"
        >
          <Globe className="h-5 w-5" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-syrian-green text-[8px] font-bold text-white flex items-center justify-center">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`${theme === 'dark' ? 'dark' : ''} min-w-[140px]`}>
        <DropdownMenuItem onClick={() => setLanguage('ar')} className="flex items-center justify-between">
          <span className={`flex items-center ${language === 'ar' ? 'text-syrian-green font-bold' : ''}`}>
            <span className="mr-2 text-lg">🟢</span>
            العربية
            {language === 'ar' && <span className="ml-2">✓</span>}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center justify-between">
          <span className={`flex items-center ${language === 'en' ? 'text-syrian-green font-bold' : ''}`}>
            <span className="mr-2 text-lg">🇺🇸</span>
            English
            {language === 'en' && <span className="ml-2">✓</span>}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
