
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Listing } from '@/services/listingService';
import { formatLargeNumber } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
  onToggleStatus: (listingId: string, currentStatus: string) => Promise<void>;
  onDeleteClick: (listingId: string) => void;
}

const ListingCard = ({ listing, onToggleStatus, onDeleteClick }: ListingCardProps) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  // Helper function to check if a listing is active
  const isListingActive = (listing: Listing): boolean => {
    return listing.status === 'active';
  };

  // Format price with our new utility
  const getPriceDisplay = () => {
    const currency = listing.currency === 'USD' ? 'USD' : 'SYP';
    return formatLargeNumber(
      listing.price, 
      language as 'en' | 'ar',
      currency as 'SYP' | 'USD'
    );
  };

  return (
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
          <p className="text-lg font-bold text-syrian-green">{getPriceDisplay()}</p>
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
              onClick={() => onToggleStatus(listing.id!, isListingActive(listing) ? 'active' : 'pending')}
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
              onClick={() => onDeleteClick(listing.id!)}
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
  );
};

export default ListingCard;
