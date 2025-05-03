
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { toggleListingStatus, deleteListing } from '@/services/listingService';
import { Listing } from '@/services/listingService';
import UserListingsHeader from './listings/UserListingsHeader';
import ListingsList from './listings/ListingsList';
import DeleteListingDialog from './listings/DeleteListingDialog';

interface UserListingsProps {
  userListings: Listing[];
  setUserListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

const UserListings = ({ userListings, setUserListings }: UserListingsProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
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

  return (
    <>
      <UserListingsHeader />
      
      <ListingsList 
        listings={userListings}
        onToggleStatus={handleToggleListingStatus}
        onDeleteClick={confirmDelete}
      />

      <DeleteListingDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDeleteListing}
      />
    </>
  );
};

export default UserListings;
