
import React from 'react';
import { cn } from '@/lib/utils';

interface ArabicBorderProps {
  className?: string;
  children: React.ReactNode;
}

const ArabicBorder = ({ className, children }: ArabicBorderProps) => {
  return (
    <div className={cn(
      'relative border-4 gold-border rounded-md p-6 bg-arabic-cream/50',
      className
    )}>
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-arabic-cream px-4">
        <div className="w-6 h-6 bg-arabic-gold rounded-full" />
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-arabic-cream px-4">
        <div className="w-6 h-6 bg-arabic-gold rounded-full" />
      </div>
      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-arabic-cream py-4">
        <div className="w-6 h-6 bg-arabic-gold rounded-full" />
      </div>
      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-arabic-cream py-4">
        <div className="w-6 h-6 bg-arabic-gold rounded-full" />
      </div>
      {children}
    </div>
  );
};

export default ArabicBorder;
