
import React from 'react';
import { ListingWithRelations } from '@/types/supabase';
import ListingCard from './ListingCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          displayCurrency={displayCurrency}
          formatPrice={formatPrice}
          compact={isSmallMobile}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
