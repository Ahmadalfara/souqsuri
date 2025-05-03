
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Listing } from '@/services/listingService';
import ListingCard from './ListingCard';
import EmptyListingState from './EmptyListingState';

interface ListingsListProps {
  listings: Listing[];
  onToggleStatus: (listingId: string, currentStatus: string) => Promise<void>;
  onDeleteClick: (listingId: string) => void;
}

const ListingsList = ({ listings, onToggleStatus, onDeleteClick }: ListingsListProps) => {
  const { language } = useLanguage();

  if (listings.length === 0) {
    return <EmptyListingState />;
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <ListingCard 
          key={listing.id}
          listing={listing}
          onToggleStatus={onToggleStatus}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default ListingsList;
