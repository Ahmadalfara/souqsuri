
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { ListingWithRelations } from '@/types/supabase';
import { formatLargeNumber } from '@/lib/utils';

interface ListingCardProps {
  listing: any;
  isFeatured?: boolean;
  displayCurrency?: 'SYP' | 'USD';
  formatPrice?: (price: number, currency: string) => string;
  compact?: boolean; // Added compact prop
}

const ListingCard = ({ 
  listing, 
  isFeatured = false,
  displayCurrency = 'SYP',
  formatPrice,
  compact = false // Set default to false
}: ListingCardProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Helper function to get location display string
  const getLocationString = (listing: any) => {
    if (listing.governorate && listing.district) {
      return language === 'ar' 
        ? `${listing.governorate.name_ar} - ${listing.district.name_ar}`
        : `${listing.governorate.name_en || listing.governorate.name_ar} - ${listing.district.name_en || listing.district.name_ar}`;
    } else if (listing.governorate) {
      return language === 'ar'
        ? listing.governorate.name_ar
        : (listing.governorate.name_en || listing.governorate.name_ar);
    }
    return '';
  };

  const detailsButtonText = language === 'ar' ? 'التفاصيل' : 'Details';
  const featuredLabel = language === 'ar' ? 'مميز' : 'Featured';
  
  // Format price with our new utility or use provided formatter
  const getPriceDisplay = () => {
    // Default currency from the listing or fallback to SYP
    const currency = listing.currency === 'USD' ? 'USD' : 'SYP';
    
    // Use custom formatter if provided, otherwise use our utility
    if (formatPrice) {
      return formatPrice(listing.price, currency);
    }
    
    // Use the new formatLargeNumber utility
    return formatLargeNumber(
      listing.price, 
      language as 'en' | 'ar',
      displayCurrency || currency as 'SYP' | 'USD'
    );
  };

  return (
    <Card 
      className="overflow-hidden border border-syrian-gold/30 hover:border-syrian-gold transition-colors hover:shadow-lg"
    >
      {(isFeatured || listing.is_featured) && (
        <div className="absolute top-0 right-0 bg-syrian-gold text-white text-xs px-2 py-1 rounded-bl-lg">
          <ArabicText text={featuredLabel} />
        </div>
      )}
      <CardHeader className="p-0">
        <div className={`${compact ? 'h-36' : 'h-48'} overflow-hidden`}>
          <img 
            src={listing.images && listing.images.length > 0 ? listing.images[0] : '/placeholder.svg'} 
            alt={listing.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </CardHeader>
      <CardContent className={`${compact ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'} mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <ArabicText 
            text={listing.title} 
            textEn={listing.title_en || listing.title}
          />
        </h3>
        <p className={`text-syrian-dark/70 line-clamp-2 ${compact ? 'text-sm' : 'text-base'} ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <ArabicText 
            text={listing.description} 
            textEn={listing.description_en || listing.description}
          />
        </p>
        <p className={`text-syrian-green font-bold mt-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <ArabicText 
            text={getPriceDisplay()}
          />
        </p>
      </CardContent>
      <CardFooter className={`${compact ? 'p-3 pt-0' : 'p-4 pt-0'} flex justify-between items-center ${compact ? 'flex-col space-y-2' : ''}`}>
        <Button 
          variant="outline"
          size={compact ? "sm" : "default"}
          onClick={() => navigate(`/listing/${listing.id}`)}
          className={compact ? "w-full" : ""}
        >
          <ArabicText text={detailsButtonText} />
        </Button>
        <div className={`text-${compact ? 'xs' : 'sm'} text-gray-500 ${compact ? 'w-full text-center' : ''}`}>
          <ArabicText 
            text={getLocationString(listing)} 
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
