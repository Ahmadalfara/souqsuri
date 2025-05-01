
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

  // No need to prevent opening if user is not logged in
  // We'll show the login prompt inside the sheet instead
  const handleOpen = (openState: boolean) => {
    setOpen(openState);
  };

  const handleContinueAsGuest = () => {
    // Hide the prompt and show the form
    document.getElementById('listing-form-container')?.classList.remove('hidden');
    document.getElementById('guest-prompt-container')?.classList.add('hidden');
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center" id="guest-prompt-container">
          <p className="mb-4">
            {language === 'ar' ? (
              <ArabicText text="يمكنك تسجيل الدخول أولاً قبل إضافة إعلان جديد" />
            ) : (
              "You can sign in first before adding a new listing"
            )}
          </p>
          <AuthSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark mb-4">
              {language === 'ar' ? (
                <ArabicText text="تسجيل الدخول" />
              ) : (
                "Sign In"
              )}
            </Button>
          </AuthSheet>
          
          <p className="text-sm text-muted-foreground">
            {language === 'ar' ? (
              <ArabicText text="أو يمكنك المتابعة كضيف" />
            ) : (
              "Or you can continue as a guest"
            )}
          </p>
          
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={handleContinueAsGuest}
          >
            {language === 'ar' ? (
              <ArabicText text="الاستمرار كضيف" />
            ) : (
              "Continue as Guest"
            )}
          </Button>
          
          {/* Hidden form container that will be shown when continuing as guest */}
          <div id="listing-form-container" className="hidden w-full">
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
          </div>
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
