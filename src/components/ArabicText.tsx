import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArabicTextProps {
  text: string;
  className?: string;
  size?: 'small' | 'normal' | 'large' | 'xl' | '2xl' | '3xl';
  translateKey?: string;
  textAr?: string; // Added for bilingual content from DB
  textEn?: string; // Added for bilingual content from DB
}

const ArabicText = ({ text, className, size = 'normal', translateKey, textAr, textEn }: ArabicTextProps) => {
  const { language, t } = useLanguage();
  
  const sizeClasses = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl'
  };
  
  // Determine which text to display based on the available options and current language
  let displayText = text; // Default to the provided text
  
  // If we have explicit Arabic and English versions, use those based on language
  if (language === 'ar' && textAr) {
    displayText = textAr;
  } else if (language === 'en' && textEn) {
    displayText = textEn;
  }
  // Otherwise, if a translation key is provided, use it
  else if (translateKey) {
    displayText = t(translateKey);
  }
  // The default case is to just use the provided text, already set above

  return (
    <span className={cn(
      'font-arabic',
      language === 'ar' ? 'rtl' : '',
      sizeClasses[size],
      className
    )}>
      {displayText}
    </span>
  );
};

export default ArabicText;
