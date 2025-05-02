
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { toggleListingStatus, deleteListing } from '@/services/listingService';
import { useToast } from '@/components/ui/use-toast';
import CreateListingSheet from '@/components/listings/CreateListingSheet';
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
import { Listing } from '@/services/listingService';

interface UserListingsProps {
  userListings: Listing[];
  setUserListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

const UserListings = ({ userListings, setUserListings }: UserListingsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleListingStatus = async (listingId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'pending' : 'active';
      await toggleListingStatus(listingId, newStatus);
      setUserListings(prevListings => 
        prevListings.map(listing => 
          listing.id === listingId ? { ...listing, status: newStatus } : listing
        )
      );
      toast({
        title: newStatus === 'active' ? t('listingActivated') : t('listingDeactivated'),
        description: newStatus === 'active' ? t('listingNowVisible') : t('listingNowHidden'),
      });
    } catch (error) {
      console.error("Error toggling listing status:", error);
      toast({
        title: t('error'),
        description: t('errorUpdatingListing'),
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (listingId: string) => {
    setDeletingListingId(listingId);
    setIsDialogOpen(true);
  };

  const handleDeleteListing = async () => {
    if (!deletingListingId) return;
    
    try {
      await deleteListing(deletingListingId);
      setUserListings(prevListings => 
        prevListings.filter(listing => listing.id !== deletingListingId)
      );
      toast({
        title: t('listingDeleted'),
        description: t('listingPermanentlyRemoved'),
      });
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: t('error'),
        description: t('errorDeletingListing'),
        variant: "destructive",
      });
    } finally {
      setDeletingListingId(null);
      setIsDialogOpen(false);
    }
  };

  // Helper function to check if a listing is active
  const isListingActive = (listing: Listing): boolean => {
    return listing.status === 'active';
  };

  return (
    <>
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
      
      {userListings.length > 0 ? (
        <div className="space-y-4">
          {userListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4">
                  <img 
                    src={listing.images[0] || "/placeholder.svg"} 
                    alt={listing.title} 
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>
                <div className={`p-4 flex-1 ${language === 'ar' ? 'rtl' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">
                      {language === 'ar' ? (
                        <ArabicText text={listing.title} />
                      ) : (
                        listing.title
                      )}
                    </h4>
                    <Badge className={isListingActive(listing) ? "bg-green-500" : "bg-gray-500"}>
                      {language === 'ar' ? (
                        <ArabicText text={isListingActive(listing) ? "نشط" : "غير نشط"} />
                      ) : (
                        isListingActive(listing) ? "Active" : "Inactive"
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <Badge variant="outline" className="border-syrian-green text-syrian-green">
                      {language === 'ar' ? (
                        <ArabicText text={t(listing.category)} />
                      ) : (
                        t(listing.category)
                      )}
                    </Badge>
                    <span className="text-gray-500 text-sm">
                      {language === 'ar' ? (
                        <ArabicText text={`${listing.views} مشاهدة`} />
                      ) : (
                        `${listing.views} views`
                      )}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-syrian-green">{listing.price} {language === 'ar' ? 'ل.س' : 'SYP'}</p>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/listing/${listing.id}`)}
                    >
                      <Edit size={14} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                      {language === 'ar' ? (
                        <ArabicText text="عرض" size="small" />
                      ) : (
                        "View"
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={isListingActive(listing) ? "text-red-600" : "text-green-600"}
                      onClick={() => handleToggleListingStatus(listing.id!, isListingActive(listing) ? 'active' : 'pending')}
                    >
                      {language === 'ar' ? (
                        <ArabicText text={isListingActive(listing) ? "إيقاف" : "تنشيط"} size="small" />
                      ) : (
                        isListingActive(listing) ? "Deactivate" : "Activate"
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600"
                      onClick={() => confirmDelete(listing.id!)}
                    >
                      <Trash2 size={14} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                      {language === 'ar' ? (
                        <ArabicText text="حذف" size="small" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
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
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <AlertDialogAction onClick={handleDeleteListing} className="bg-red-600 hover:bg-red-700">
              {language === 'ar' ? (
                <ArabicText text="حذف" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserListings;
