import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GeometricPattern from '@/components/GeometricPattern';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import ListingFilters from '@/components/listings/ListingFilters';
import { getListingsByCategory } from '@/services/listings/search';
import { ListingWithRelations } from '@/types/supabase';
import ArabicText from '@/components/ArabicText';
import { useToast } from '@/hooks/use-toast';

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
  const [listings, setListings] = useState<ListingWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCategoryListings = async () => {
      if (!categoryName) return;
      
      try {
        setIsLoading(true);
        setError(null);
        console.log(`Fetching listings for category: ${categoryName}`);
        const data = await getListingsByCategory(categoryName, 12);
        console.log(`Received ${data.length} listings for category ${categoryName}`, data);
        setListings(data);
      } catch (err) {
        console.error('Error fetching category listings:', err);
        setError('Failed to load listings');
        toast({
          title: "Error",
          description: "Failed to load listings. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryListings();
  }, [categoryName, toast]);
  
  const categoryData = getCategoryData(categoryName, listings.length);
  
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
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-syrian-green"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.length > 0 ? (
            listings.map((listing, index) => (
              <CategoryListingCard key={listing.id || index} listing={listing} />
            ))
          ) : (
            // When no listings are found for the category
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">
                <ArabicText text="لا توجد إعلانات في هذه الفئة حالياً" />
              </h3>
              <p className="text-gray-600">
                <ArabicText text="كن أول من يضيف إعلاناً هنا" />
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

interface ListingDisplayProps {
  title: string;
  price?: string | number;
  currency?: string;
  location?: string;
  imageUrl?: string;
  isPromoted?: boolean;
  createdAt?: string | Date;
}

const CategoryListingCard = ({ listing }: { listing: ListingWithRelations }) => {
  // Format creation date
  const formatDate = (dateString?: string | Date): string => {
    if (!dateString) return 'منذ قليل';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    
    return `منذ ${Math.floor(diffDays / 7)} أسبوع`;
  };
  
  // Format price with currency
  const formatPrice = (price?: number | string, currency?: string): string => {
    if (!price) return 'السعر غير محدد';
    
    const currencySymbol = currency === 'USD' ? '$' : (currency === 'SYP' ? 'ل.س' : '');
    return `${price} ${currencySymbol}`;
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-syrian-green/10 hover:shadow-md transition-all hover:border-syrian-green/30">
      <div className="relative">
        <img 
          src={listing.images?.[0] || "/placeholder.svg"} 
          alt={listing.title} 
          className="w-full h-48 object-cover" 
        />
        {listing.is_featured && (
          <span className="absolute top-2 right-2 bg-syrian-gold text-white text-xs px-2 py-1 rounded">
            <span className="font-arabic">مميز</span>
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-2 text-right">
          <span className="font-arabic rtl">{listing.title}</span>
        </h3>
        <p className="text-right text-syrian-green font-bold">
          <span className="font-arabic rtl">{formatPrice(listing.price, listing.currency)}</span>
        </p>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center text-sm text-gray-500">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-arabic rtl">{formatDate(listing.created_at)}</span>
        </span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-arabic rtl">
            {listing.governorate?.name_ar || 'غير محدد'}
          </span>
        </span>
      </div>
    </div>
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
    default:
      return {
        title: 'جميع الفئات',
        count: count,
        icon: '📋',
      };
  }
};

export default Index;
