
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { ListingWithRelations } from '@/types/supabase';

interface ListingCardProps {
  listing: any;
  isFeatured?: boolean;
  displayCurrency?: 'SYP' | 'USD';
  formatPrice?: (price: number, currency: string) => string;
}

const ListingCard = ({ 
  listing, 
  isFeatured = false,
  displayCurrency,
  formatPrice 
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
  
  // Format price if a formatter function is provided, otherwise use default format
  const getPriceDisplay = () => {
    if (formatPrice) {
      return formatPrice(listing.price, listing.currency || 'SYP');
    }
    
    return language === 'ar'
      ? `${listing.price} ${listing.currency || 'دولار'}`
      : `${listing.price} ${listing.currency === 'دولار' ? 'USD' : (listing.currency || 'USD')}`;
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
        <div className="h-48 overflow-hidden">
          <img 
            src={listing.images && listing.images.length > 0 ? listing.images[0] : '/placeholder.svg'} 
            alt={listing.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className={`font-bold text-lg mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <ArabicText 
            text={listing.title} 
            textEn={listing.title_en || listing.title}
          />
        </h3>
        <p className={`text-syrian-dark/70 line-clamp-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
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
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button 
          variant="outline"
          onClick={() => navigate(`/listing/${listing.id}`)}
        >
          <ArabicText text={detailsButtonText} />
        </Button>
        <div className="text-sm text-gray-500">
          <ArabicText 
            text={getLocationString(listing)} 
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
