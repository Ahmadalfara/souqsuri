
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
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrencyConverter } from '@/services/currencyService';
import { MAX_PRICE } from '@/components/filters/FilterPriceRange';
import { searchNormalizedAds } from '@/services/normalizedAds';
import { SearchParams } from '@/types/normalized';
import ListingGrid from '@/components/listings/ListingGrid';
import LoadingState from '@/components/listings/LoadingState';
import EmptyState from '@/components/listings/EmptyState';

// تعريف نوع بيانات الفلاتر ليتناسب مع حالة المكون
interface FilterState extends SearchParams {
  query: string;
  searchWithin?: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { formatCurrency, convert, exchangeRate } = useCurrencyConverter();
  const [displayCurrency, setDisplayCurrency] = useState<'SYP' | 'USD'>(
    searchParams.get('currency') === 'USD' ? 'USD' : 'SYP'
  );
  
  // حالات الفلاتر
  const [filters, setFilters] = useState<FilterState>({
    query: query,
    search_query: query,
    category_id: searchParams.get('category') || '',
    location_id: searchParams.get('location') || '',
    currency_id: searchParams.get('currency_id') || '',
    min_price: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : 0,
    max_price: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : MAX_PRICE,
    sort_field: (searchParams.get('sortBy') === 'price_asc' || searchParams.get('sortBy') === 'price_desc') ? 'price' : 'created_at',
    sort_direction: searchParams.get('sortBy') === 'price_asc' || searchParams.get('sortBy') === 'oldest' ? 'asc' : 'desc',
    with_images_only: searchParams.get('withImagesOnly') === 'true',
    show_promoted_only: searchParams.get('promotedOnly') === 'true',
    searchWithin: searchParams.get('searchWithin') || '',
  });

  useEffect(() => {
    if (!query && !categoryParam) {
      navigate('/');
    }
  }, [query, categoryParam, navigate]);

  // استخدام وظيفة البحث المناسبة بناءً على معلمات البحث
  const searchFunction = async () => {
    try {
      console.log('Searching with filters:', filters);
      
      const searchParams: SearchParams = {
        search_query: filters.query || filters.search_query,
        category_id: filters.category_id,
        location_id: filters.location_id,
        currency_id: filters.currency_id,
        min_price: filters.min_price !== undefined ? filters.min_price : null,
        max_price: filters.max_price !== undefined && filters.max_price < MAX_PRICE ? filters.max_price : null,
        sort_field: filters.sort_field,
        sort_direction: filters.sort_direction,
        with_images_only: filters.with_images_only,
        show_promoted_only: filters.show_promoted_only,
        search_within: filters.searchWithin
      };
      
      return searchNormalizedAds(searchParams);
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };

  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['search', filters],
    queryFn: searchFunction,
    enabled: !!(query || categoryParam || Object.values(filters).some(v => v !== undefined && v !== '' && v !== false)),
    meta: {
      onError: (error) => {
        console.error('Search query error:', error);
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

  // التعامل مع البحث بمعلمات محدثة
  const handleSearch = (params: URLSearchParams) => {
    setSearchParams(params);
    
    // تحديث الفلاتر بناءً على المعلمات الجديدة
    const newFilters: FilterState = {
      query: params.get('q') || '',
      search_query: params.get('q') || '',
      category_id: params.get('category') || '',
      location_id: params.get('location') || '',
      currency_id: params.get('currency_id') || '',
      min_price: params.get('priceMin') ? Number(params.get('priceMin')) : 0,
      max_price: params.get('priceMax') ? Number(params.get('priceMax')) : MAX_PRICE,
      sort_field: (params.get('sortBy') === 'price_asc' || params.get('sortBy') === 'price_desc') ? 'price' : 'created_at',
      sort_direction: params.get('sortBy') === 'price_asc' || params.get('sortBy') === 'oldest' ? 'asc' : 'desc',
      with_images_only: params.get('withImagesOnly') === 'true',
      show_promoted_only: params.get('promotedOnly') === 'true',
      searchWithin: params.get('searchWithin') || '',
    };
    
    setFilters(newFilters);
    refetch();
  };

  // تبديل عرض العملة
  const toggleCurrency = () => {
    setDisplayCurrency(prev => prev === 'SYP' ? 'USD' : 'SYP');
  };

  // تنسيق السعر بناءً على العملة المختارة
  const formatPrice = (price: number, originalCurrency: string): string => {
    if (displayCurrency === originalCurrency) {
      return formatCurrency(price, displayCurrency);
    } else {
      // تحويل السعر إلى العملة المعروضة
      const convertedPrice = convert(
        price, 
        originalCurrency as 'SYP' | 'USD', 
        displayCurrency
      );
      return formatCurrency(convertedPrice, displayCurrency);
    }
  };

  // الحصول على اسم الفئة باللغة الصحيحة
  const getCategoryDisplayName = () => {
    if (!categoryParam) return '';
    
    // تخطيط معرفات الفئات إلى أسماء العرض
    const categoryNames: Record<string, { ar: string, en: string }> = {
      'real_estate': { ar: 'العقارات', en: 'Real Estate' },
      'cars': { ar: 'السيارات', en: 'Cars' },
      'electronics': { ar: 'الإلكترونيات', en: 'Electronics' },
      'furniture': { ar: 'الأثاث', en: 'Furniture' },
      'clothes': { ar: 'الملابس', en: 'Clothes' },
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
          <div className="mb-6 mt-4 bg-white rounded-lg p-5 shadow-sm border border-syrian-green/20 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
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
                className="text-sm px-3 py-1 rounded-full bg-syrian-green/10 text-syrian-green hover:bg-syrian-green/20 transition-colors dark:bg-syrian-green/20 dark:hover:bg-syrian-green/30"
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
              onFilterChange={(newFilters) => {
                const updatedFilters = {...filters, ...newFilters};
                setFilters(updatedFilters);
                refetch();
              }}
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
