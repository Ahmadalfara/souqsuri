
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ListingForm from './ListingForm';
import ArabicText from '../ArabicText';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import AuthSheet from '../auth/AuthSheet';

interface CreateListingSheetProps {
  children: React.ReactNode;
}

const CreateListingSheet = ({ children }: CreateListingSheetProps) => {
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Handle close sheet event from ListingForm
  useEffect(() => {
    const handleCloseSheet = () => {
      setOpen(false);
    };

    document.addEventListener('close-sheet', handleCloseSheet);
    return () => {
      document.removeEventListener('close-sheet', handleCloseSheet);
    };
  }, []);

  const handleOpen = (openState: boolean) => {
    if (openState && !currentUser) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Notice",
        description: language === 'ar' 
          ? "يجب تسجيل الدخول أولاً قبل إضافة إعلان" 
          : "You must be logged in to add a listing",
      });
      return;
    }
    setOpen(openState);
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <p className="mb-4">
            {language === 'ar' ? (
              <ArabicText text="يجب تسجيل الدخول أولاً قبل إضافة إعلان جديد" />
            ) : (
              "You need to sign in first before adding a new listing"
            )}
          </p>
          <AuthSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark">
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                "Sign In"
              )}
            </Button>
          </AuthSheet>
        </div>
      );
    }
    
    return (
      <>
        <SheetHeader className={`text-${language === 'ar' ? 'right' : 'left'}`}>
          <SheetTitle>
            {language === 'ar' ? (
              <ArabicText text="إضافة إعلان جديد" size="large" />
            ) : (
              "Add New Listing"
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <ListingForm />
        </div>
      </>
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
};

export default CreateListingSheet;
