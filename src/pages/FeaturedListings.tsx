
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { useQuery } from '@tanstack/react-query';
import { Listing, getFeaturedListings } from '@/services/listingService';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const FeaturedListings = () => {
  const navigate = useNavigate();
  const { data: listings, isLoading } = useQuery({
    queryKey: ['featuredListings'],
    queryFn: () => getFeaturedListings(12)
  });

  // Helper function to get location display string
  const getLocationString = (listing: any) => {
    if (listing.governorate && listing.district) {
      return `${listing.governorate.name_ar} - ${listing.district.name_ar}`;
    } else if (listing.governorate) {
      return listing.governorate.name_ar;
    }
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="الإعلانات المميزة" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="اكتشف أفضل العروض المميزة المتاحة حالياً" />
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="h-48 w-full" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {listings && listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing: any) => (
                    <Card 
                      key={listing.id}
                      className="overflow-hidden border border-syrian-gold/30 hover:border-syrian-gold transition-colors hover:shadow-lg"
                    >
                      <div className="absolute top-0 right-0 bg-syrian-gold text-white text-xs px-2 py-1 rounded-bl-lg">
                        <ArabicText text="مميز" />
                      </div>
                      <CardHeader className="p-0">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={listing.images[0] || '/placeholder.svg'} 
                            alt={listing.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-right">
                          <ArabicText text={listing.title} />
                        </h3>
                        <p className="text-syrian-dark/70 line-clamp-2 text-right">
                          <ArabicText text={listing.description} />
                        </p>
                        <p className="text-syrian-green font-bold mt-2 text-right">
                          <ArabicText text={`${listing.price} ${listing.currency || 'دولار'}`} />
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <Button 
                          variant="outline"
                          onClick={() => navigate(`/listing/${listing.id}`)}
                        >
                          <ArabicText text="التفاصيل" />
                        </Button>
                        <div className="text-sm text-gray-500">
                          <ArabicText text={getLocationString(listing)} />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="mx-auto w-24 h-24 mb-6 text-syrian-green/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <ArabicText text="لا توجد إعلانات مميزة حالياً" size="large" className="block mb-4 font-bold" />
                  <ArabicText text="سيتم إضافة إعلانات مميزة قريباً" className="text-gray-500" />
                </div>
              )}
            </>
          )}
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default FeaturedListings;
