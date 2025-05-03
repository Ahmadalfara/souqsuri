
import React from 'react';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import CreateListingSheet from '@/components/listings/CreateListingSheet';

const EmptyListingState = () => {
  const { language } = useLanguage();

  return (
    <div className="text-center py-8">
      <p className="text-gray-500">
        {language === 'ar' ? (
          <ArabicText text="لا توجد إعلانات حالياً" />
        ) : (
          "No listings yet"
        )}
      </p>
      <CreateListingSheet>
        <Button className="mt-4 bg-syrian-green hover:bg-syrian-dark">
          {language === 'ar' ? (
            <ArabicText text="أضف إعلانك الأول" />
          ) : (
            "Add Your First Listing"
          )}
        </Button>
      </CreateListingSheet>
    </div>
  );
};

export default EmptyListingState;
