
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ListingForm from './ListingForm';
import ArabicText from '../ArabicText';

interface CreateListingSheetProps {
  children: React.ReactNode;
}

const CreateListingSheet = ({ children }: CreateListingSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-right">
          <SheetTitle>
            <ArabicText text="إضافة إعلان جديد" size="large" />
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <ListingForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateListingSheet;
