
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove }) => {
  const { language } = useLanguage();
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm sm:px-3 bg-syrian-green/10 border-syrian-green/20 dark:bg-syrian-green/20 dark:border-syrian-green/30 max-w-[200px] sm:max-w-none ${language === 'ar' ? 'flex-row-reverse' : ''}`}
    >
      <span className="dark:text-white truncate">{label}</span>
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        className="text-syrian-dark/60 hover:text-syrian-dark dark:text-white/60 dark:hover:text-white flex-shrink-0"
        aria-label={language === 'ar' ? 'إزالة الفلتر' : 'Remove filter'}
        title={language === 'ar' ? 'إزالة' : 'Remove'}
      >
        <X size={14} />
      </button>
    </Badge>
  );
};

export default FilterBadge;
