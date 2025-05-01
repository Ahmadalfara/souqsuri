
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArabicTextProps {
  text: string;
  className?: string;
  size?: 'small' | 'normal' | 'large' | 'xl' | '2xl' | '3xl';
  translateKey?: string;
}

const ArabicText = ({ text, className, size = 'normal', translateKey }: ArabicTextProps) => {
  const { language, t } = useLanguage();
  
  const sizeClasses = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl'
  };
  
  // If a translation key is provided, use it
  const displayText = translateKey ? t(translateKey) : text;
  
  // If the current language is English and no translation key was provided, 
  // we should try to find the translation for the Arabic text
  const finalText = language === 'en' && !translateKey ? 
    // Try to find an English translation for this Arabic text
    displayText : 
    displayText;

  return (
    <span className={cn(
      'font-arabic',
      language === 'ar' ? 'rtl' : '',
      sizeClasses[size],
      className
    )}>
      {finalText}
    </span>
  );
};

export default ArabicText;
