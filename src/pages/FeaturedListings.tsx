
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedListings } from '@/services/listings/search';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import ListingGrid from '@/components/listings/ListingGrid';
import LoadingState from '@/components/listings/LoadingState';
import EmptyState from '@/components/listings/EmptyState';

const FeaturedListings = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const { data: listings, isLoading, error, refetch } = useQuery({
    queryKey: ['featuredListings'],
    queryFn: () => getFeaturedListings(12),
    retry: 1,
    meta: {
      onSuccess: () => {
        console.info('Successfully retrieved featured listings');
      },
      onError: (error) => {
        console.error('Failed to fetch featured listings:', error);
        toast({
          variant: "destructive",
          title: language === 'ar' ? "خطأ في جلب الإعلانات" : "Error fetching listings",
          description: language === 'ar' 
            ? "حدث خطأ أثناء جلب الإعلانات المميزة. يرجى المحاولة مرة أخرى لاحقاً."
            : "An error occurred while fetching featured listings. Please try again later."
        });
      }
    }
  });

  const pageTitle = language === 'ar' ? 'الإعلانات المميزة' : 'Featured Listings';
  const pageDescription = language === 'ar' 
    ? 'اكتشف أفضل العروض المميزة المتاحة حالياً'
    : 'Discover the best featured offers available now';
  const noListingsTitle = language === 'ar' 
    ? 'لا توجد إعلانات مميزة حالياً'
    : 'No featured listings available now';
  const noListingsDescription = language === 'ar'
    ? 'سيتم إضافة إعلانات مميزة قريباً'
    : 'Featured listings will be added soon';

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text={pageTitle} size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text={pageDescription} />
            </p>
          </div>

          {isLoading ? (
            <LoadingState count={6} />
          ) : error ? (
            <EmptyState
              titleAr="حدث خطأ أثناء جلب الإعلانات"
              title="Error loading listings"
              descriptionAr="يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً"
              description="Please refresh the page or try again later"
              action={() => window.location.reload()}
              actionLabelAr="تحديث الصفحة"
              actionLabel="Refresh Page"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
          ) : (
            <>
              {listings && listings.length > 0 ? (
                <ListingGrid listings={listings} />
              ) : (
                <EmptyState
                  titleAr={noListingsTitle}
                  title="No featured listings available now"
                  descriptionAr={noListingsDescription}
                  description="Featured listings will be added soon"
                />
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
