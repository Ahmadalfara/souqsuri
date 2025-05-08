
import React from 'react';
import { ListingWithRelations } from '@/types/supabase';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: any[];
  displayCurrency?: 'SYP' | 'USD';
  formatPrice?: (price: number, currency: string) => string;
}

const ListingGrid = ({ 
  listings, 
  displayCurrency, 
  formatPrice 
}: ListingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          displayCurrency={displayCurrency}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
