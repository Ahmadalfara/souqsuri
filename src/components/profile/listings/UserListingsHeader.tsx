
import React from 'react';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import CreateListingSheet from '@/components/listings/CreateListingSheet';

const UserListingsHeader = () => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className={`text-lg font-bold ${language === 'ar' ? 'rtl' : ''}`}>
        {language === 'ar' ? (
          <ArabicText text="إعلاناتي" />
        ) : (
          "My Listings"
        )}
      </h3>
      <CreateListingSheet>
        <Button className="bg-syrian-green hover:bg-syrian-dark">
          {language === 'ar' ? (
            <ArabicText text="إضافة إعلان جديد" />
          ) : (
            "Add New Listing"
          )}
        </Button>
      </CreateListingSheet>
    </div>
  );
};

export default UserListingsHeader;
