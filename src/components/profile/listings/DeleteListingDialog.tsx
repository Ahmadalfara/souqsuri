
import React from 'react';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteListingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteListingDialog = ({ isOpen, onOpenChange, onConfirm }: DeleteListingDialogProps) => {
  const { language } = useLanguage();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {language === 'ar' ? (
              <ArabicText text="حذف الإعلان" />
            ) : (
              "Delete Listing"
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {language === 'ar' ? (
              <ArabicText text="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الإعلان نهائياً." />
            ) : (
              "This action cannot be undone. The listing will be permanently deleted."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {language === 'ar' ? (
              <ArabicText text="إلغاء" />
            ) : (
              "Cancel"
            )}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            {language === 'ar' ? (
              <ArabicText text="حذف" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteListingDialog;
