
import React from 'react';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  icon?: React.ReactNode;
  action?: () => void;
  actionLabel?: string;
  actionLabelAr?: string;
}

const EmptyState = ({
  title,
  titleAr,
  description,
  descriptionAr,
  icon,
  action,
  actionLabel,
  actionLabelAr
}: EmptyStateProps) => {
  const { language } = useLanguage();
  
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
  
  const defaultTitle = language === 'ar' ? 'لا توجد نتائج' : 'No results found';
  const defaultDescription = language === 'ar' 
    ? 'لم نتمكن من العثور على أي نتائج مطابقة'
    : 'We couldn\'t find any matching results';
  
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <div className="mx-auto w-24 h-24 mb-6 text-syrian-green/30">
        {icon || defaultIcon}
      </div>
      <h2 className="text-xl font-bold mb-2">
        <ArabicText 
          text={titleAr || defaultTitle}
          textEn={title || defaultTitle}
        />
      </h2>
      <p className="text-gray-500">
        <ArabicText 
          text={descriptionAr || defaultDescription}
          textEn={description || defaultDescription}
        />
      </p>
      
      {action && (
        <Button 
          className="mt-6" 
          onClick={action}
        >
          <ArabicText 
            text={actionLabelAr || 'جرب مرة أخرى'}
            textEn={actionLabel || 'Try again'}
          />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
