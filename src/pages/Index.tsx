
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GeometricPattern from '@/components/GeometricPattern';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import ListingFilters from '@/components/listings/ListingFilters';
import { getListingsByCategoryId } from '@/services/listings/categorySearch';
import { ListingWithRelations } from '@/types/supabase';
import ArabicText from '@/components/ArabicText';
import { useToast } from '@/hooks/use-toast';
import ListingGrid from '@/components/listings/ListingGrid';
import LoadingState from '@/components/listings/LoadingState';
import EmptyState from '@/components/listings/EmptyState';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const location = useLocation();
  const isCategoryPage = location.pathname.startsWith('/category/');
  const categoryName = isCategoryPage ? location.pathname.split('/').pop() : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main>
          {isCategoryPage ? (
            <CategoryView categoryName={categoryName} />
          ) : (
            <>
              <FeaturesSection />
              <WelcomeSection />
            </>
          )}
        </main>
      </GeometricPattern>
      <Footer />
    </div>
  );
};

interface CategoryViewProps {
  categoryName: string | null;
}

// This component shows listings by category
const CategoryView = ({ categoryName }: CategoryViewProps) => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use React Query for better data fetching, caching and state management
  const { data: listings, isLoading } = useQuery({
    queryKey: ['categoryListings', categoryName],
    queryFn: () => {
      if (!categoryName) return Promise.resolve([]);
      console.log(`Fetching listings for category: ${categoryName}`);
      return getListingsByCategoryId(categoryName, 12);
    },
    enabled: !!categoryName,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (err: any) => {
        console.error('Error fetching category listings:', err);
        setError('Failed to load listings');
        toast({
          title: "Error",
          description: "Failed to load listings. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });
  
  const categoryData = getCategoryData(categoryName, listings?.length || 0);
  
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-4">{categoryData.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-syrian-dark text-right">
              <span className="font-arabic rtl">{categoryData.title}</span>
            </h1>
            <p className="text-gray-600 text-right">
              <span className="font-arabic rtl">{categoryData.count} إعلان</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-syrian-green/10 p-2 rounded text-syrian-green hover:bg-syrian-green/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          </button>
          <button className="bg-syrian-green/10 p-2 rounded text-syrian-green hover:bg-syrian-green/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ListingFilters />
      </div>

      {isLoading ? (
        <LoadingState count={8} />
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="mb-8">
          {listings && listings.length > 0 ? (
            <ListingGrid listings={listings} />
          ) : (
            <EmptyState
              titleAr="لا توجد إعلانات في هذه الفئة حالياً"
              title="No listings found in this category"
              descriptionAr="كن أول من يضيف إعلاناً هنا"
              description="Be the first to add a listing here"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          )}
        </div>
      )}
    </section>
  );
};

const getCategoryData = (categoryName: string | null, count: number = 0) => {
  // Map category names to their data
  switch(categoryName) {
    case 'real_estate':
      return {
        title: 'العقارات',
        count: count,
        icon: '🏠',
      };
    case 'cars':
      return {
        title: 'سيارات',
        count: count,
        icon: '🚗',
      };
    case 'clothes':
      return {
        title: 'ملابس',
        count: count,
        icon: '👕',
      };
    case 'electronics':
      return {
        title: 'إلكترونيات',
        count: count,
        icon: '💻',
      };
    case 'furniture':
      return {
        title: 'أثاث',
        count: count,
        icon: '🛋️',
      };
    case 'jobs':
      return {
        title: 'وظائف',
        count: count,
        icon: '💼',
      };
    case 'services':
      return {
        title: 'خدمات',
        count: count,
        icon: '🔧',
      };
    case 'fashion':
      return {
        title: 'أزياء',
        count: count,
        icon: '👚',
      };
    case 'books':
      return {
        title: 'كتب',
        count: count,
        icon: '📚',
      };
    case 'pets':
      return {
        title: 'حيوانات أليفة',
        count: count,
        icon: '🐱',
      };
    case 'sports':
      return {
        title: 'رياضة',
        count: count,
        icon: '🏀',
      };
    default:
      return {
        title: 'جميع الفئات',
        count: count,
        icon: '📋',
      };
  }
};

export default Index;
