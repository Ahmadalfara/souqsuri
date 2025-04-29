
import React from 'react';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyTabContentProps {
  title: string;
  emptyMessage: string;
}

const EmptyTabContent = ({ title, emptyMessage }: EmptyTabContentProps) => {
  const { language } = useLanguage();

  return (
    <>
      <h3 className={`text-lg font-bold mb-4 ${language === 'ar' ? 'rtl' : ''}`}>
        {language === 'ar' ? (
          <ArabicText text={title} />
        ) : (
          title
        )}
      </h3>
      
      <div className="text-center py-8">
        <p className="text-gray-500">
          {language === 'ar' ? (
            <ArabicText text={emptyMessage} />
          ) : (
            emptyMessage
          )}
        </p>
      </div>
    </>
  );
};

export default EmptyTabContent;
