
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
            <div className="w-5 h-3 mr-2 bg-green-600 relative overflow-hidden">
              {/* Syrian independence flag with three red stars */}
              <div className="absolute inset-0 flex justify-center">
                <div className="flex space-x-[2px] items-center">
                  <div className="w-1 h-1 bg-red-600 transform rotate-0 rounded-full"></div>
                  <div className="w-1 h-1 bg-red-600 transform rotate-0 rounded-full"></div>
                  <div className="w-1 h-1 bg-red-600 transform rotate-0 rounded-full"></div>
                </div>
              </div>
            </div>
            العربية
            {language === 'ar' && <span className="ml-2">✓</span>}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center justify-between">
          <span className={`flex items-center ${language === 'en' ? 'text-syrian-green font-bold' : ''}`}>
            <div className="w-5 h-3 mr-2 bg-blue-800 relative overflow-hidden">
              {/* American flag representation */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-blue-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white opacity-70 transform rotate-45"></div>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-1.5 w-3 bg-red-600"></div>
              <div className="absolute bottom-0 right-0 h-1.5 w-3 bg-red-600"></div>
            </div>
            English
            {language === 'en' && <span className="ml-2">✓</span>}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
