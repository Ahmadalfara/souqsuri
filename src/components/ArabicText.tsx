
import React from 'react';
import { cn } from '@/lib/utils';

interface ArabicTextProps {
  text: string;
  className?: string;
  size?: 'small' | 'normal' | 'large' | 'xl' | '2xl' | '3xl';
}

const ArabicText = ({ text, className, size = 'normal' }: ArabicTextProps) => {
  const sizeClasses = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl'
  };

  return (
    <span className={cn(
      'font-arabic rtl',
      sizeClasses[size],
      className
    )}>
      {text}
    </span>
  );
};

export default ArabicText;
