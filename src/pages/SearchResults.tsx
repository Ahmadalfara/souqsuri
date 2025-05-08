
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import SearchBar from '@/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrencyConverter } from '@/services/currencyService';
import { searchListings } from '@/services/listings/search';
import { getListingsByCategoryId } from '@/services/listings/categorySearch';
import ListingGrid from '@/components/listings/ListingGrid';
import LoadingState from '@/components/listings/LoadingState';
import EmptyState from '@/components/listings/EmptyState';

// Define the filters type to match our component's state
interface FilterState {
  query: string;
  category: string;
  governorate_id: string;
  district_id: string;
  priceMin: number | undefined;
  priceMax: number | undefined;
  condition: string[];
  sortBy: string;
  urgent: boolean;
  currency: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const { formatCurrency, convert, exchangeRate } = useCurrencyConverter();
  const [displayCurrency, setDisplayCurrency] = useState<'SYP' | 'USD'>(
    searchParams.get('currency') === 'USD' ? 'USD' : 'SYP'
  );
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    query: query,
    category: categoryParam,
    governorate_id: searchParams.get('governorate_id') || '',
    district_id: searchParams.get('district_id') || '',
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    condition: searchParams.getAll('condition') || [],
    sortBy: searchParams.get('sortBy') || 'newest',
    urgent: searchParams.get('urgent') === 'true',
    currency: searchParams.get('currency') || ''
  });

  useEffect(() => {
    if (!query && !categoryParam) {
      navigate('/');
    }
  }, [query, categoryParam, navigate]);

  // Use the appropriate search function based on whether we have a category or query
  const searchFunction = () => {
    if (categoryParam && !query) {
      return getListingsByCategoryId(categoryParam);
    } else {
      return searchListings(filters);
    }
  };

  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['search', filters],
    queryFn: searchFunction,
    enabled: !!(query || categoryParam),
    meta: {
      onError: () => {
        toast({
          title: language === 'ar' ? "خطأ في البحث" : "Search Error",
          description: language === 'ar' ? 
            "لم نتمكن من إتمام البحث، يرجى المحاولة مرة أخرى." : 
            "We couldn't complete your search, please try again.",
          variant: "destructive",
        });
      }
    }
  });

  // Handle search with updated params
  const handleSearch = (params: URLSearchParams) => {
    setSearchParams(params);
    
    // Update filters based on new params
    const newFilters: FilterState = {
      query: params.get('q') || '',
      category: params.get('category') || '',
      governorate_id: params.get('governorate_id') || '',
      district_id: params.get('district_id') || '',
      priceMin: params.get('priceMin') ? Number(params.get('priceMin')) : undefined,
      priceMax: params.get('priceMax') ? Number(params.get('priceMax')) : undefined,
      condition: params.getAll('condition') || [],
      sortBy: params.get('sortBy') || 'newest',
      urgent: params.get('urgent') === 'true',
      currency: params.get('currency') || ''
    };
    
    setFilters(newFilters);
    refetch();
  };

  // Toggle currency display
  const toggleCurrency = () => {
    setDisplayCurrency(prev => prev === 'SYP' ? 'USD' : 'SYP');
  };

  // Format price based on selected currency
  const formatPrice = (price: number, originalCurrency: string): string => {
    if (displayCurrency === originalCurrency) {
      return formatCurrency(price, displayCurrency);
    } else {
      // Convert price to display currency
      const convertedPrice = convert(
        price, 
        originalCurrency as 'SYP' | 'USD', 
        displayCurrency
      );
      return formatCurrency(convertedPrice, displayCurrency);
    }
  };

  // Get the category name in the correct language
  const getCategoryDisplayName = () => {
    if (!categoryParam) return '';
    
    // Map category IDs to display names
    const categoryNames: Record<string, { ar: string, en: string }> = {
      'real_estate': { ar: 'العقارات', en: 'Real Estate' },
      'vehicles': { ar: 'السيارات', en: 'Cars' },
      'electronics': { ar: 'الإلكترونيات', en: 'Electronics' },
      'furniture': { ar: 'الأثاث', en: 'Furniture' },
      'clothing': { ar: 'الملابس', en: 'Clothes' },
      'jobs': { ar: 'الوظائف', en: 'Jobs' },
      'services': { ar: 'الخدمات', en: 'Services' },
    };
    
    const category = categoryNames[categoryParam] || { ar: t(categoryParam), en: t(categoryParam) };
    return language === 'ar' ? category.ar : category.en;
  };

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light dark:bg-gray-900">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto px-4 pb-8">
          <div className="mb-6 mt-4 bg-white rounded-lg p-5 shadow-sm border border-syrian-green/20 dark:bg-gray-800 dark:border-gray-700">
            <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <h1 className={`text-2xl font-bold text-syrian-dark dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? (
                  <ArabicText text={query ? `نتائج البحث عن: "${query}"` : categoryParam ? `فئة: "${getCategoryDisplayName()}"` : 'نتائج البحث'} />
                ) : (
                  query ? `Search results for: "${query}"` : categoryParam ? `Category: "${getCategoryDisplayName()}"` : 'Search Results'
                )}
              </h1>
              <button 
                onClick={toggleCurrency}
                className="text-sm px-3 py-1 rounded-full bg-syrian-green/10 text-syrian-green hover:bg-syrian-green/20 transition-colors"
              >
                {language === 'ar' ? (
                  <ArabicText text={`عرض بـ: ${displayCurrency === 'USD' ? 'دولار' : 'ليرة سورية'}`} />
                ) : (
                  `Show in: ${displayCurrency}`
                )}
              </button>
            </div>

            <div className={`flex items-center text-sm text-syrian-dark/70 dark:text-gray-400 mt-2 ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
              {language === 'ar' ? (
                <ArabicText text={isLoading ? 'جاري البحث...' : results && results.length ? `تم العثور على ${results.length} نتيجة` : 'لم يتم العثور على نتائج'} />
              ) : (
                isLoading ? 'Searching...' : results && results.length ? `Found ${results.length} results` : 'No results found'
              )}
            </div>

            {!isLoading && exchangeRate && (
              <div className={`text-xs text-gray-500 dark:text-gray-500 mt-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? (
                  <ArabicText text={`سعر الصرف: 1 دولار = ${exchangeRate.toLocaleString()} ليرة سورية`} />
                ) : (
                  `Exchange rate: 1 USD = ${exchangeRate.toLocaleString()} SYP`
                )}
              </div>
            )}
          </div>

          {/* Improved Search Bar for inline filtering */}
          <div className="mb-6">
            <SearchBar 
              initialQuery={query} 
              onSearch={handleSearch} 
            />
          </div>

          {isLoading ? (
            <LoadingState count={6} />
          ) : (
            <>
              {results && results.length > 0 ? (
                <ListingGrid 
                  listings={results} 
                  displayCurrency={displayCurrency} 
                  formatPrice={formatPrice} 
                />
              ) : (
                <EmptyState
                  titleAr="لا توجد نتائج للبحث"
                  title="No results found"
                  descriptionAr="حاول البحث بكلمات مختلفة أو تصفح الفئات" 
                  description="Try searching with different keywords or browse categories"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              )}
            </>
          )}
        </main>
      </GeometricPattern>
      <Footer />
    </div>
  );
};

export default SearchResults;
