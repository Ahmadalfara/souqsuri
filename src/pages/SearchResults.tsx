
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import SearchBar from '@/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrencyConverter } from '@/services/currencyService';
import { searchListings } from '@/services/listings/search';

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
  const [filters, setFilters] = useState({
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

  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['search', filters],
    queryFn: () => searchListings(filters),
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
    const updatedFilters: Record<string, any> = { 
      query: params.get('q') || ''
    };
    
    for (const [key, value] of params.entries()) {
      if (key !== 'q') {
        if (key === 'condition') {
          if (!updatedFilters.condition) {
            updatedFilters.condition = [];
          }
          updatedFilters.condition.push(value);
        } else {
          updatedFilters[key] = value;
        }
      }
    }
    
    setFilters(updatedFilters);
    refetch();
  };

  // Toggle currency display
  const toggleCurrency = () => {
    setDisplayCurrency(prev => prev === 'SYP' ? 'USD' : 'SYP');
  };

  // Format price based on selected currency
  const formatPrice = (price: number, originalCurrency: string): string => {
    if (displayCurrency === originalCurrency) {
      return formatCurrency(price, displayCurrency as 'SYP' | 'USD');
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
  const getCategoryName = (item: any): string => {
    if (language === 'ar') {
      return item.category_ar || t(item.category);
    } else {
      return item.category_en || t(item.category);
    }
  };

  // Get the location name in the correct language
  const getLocationName = (item: any): string => {
    if (item.governorate) {
      return language === 'ar' ? 
        item.governorate.name_ar || item.location || '' : 
        item.governorate.name_en || item.location || '';
    }
    return language === 'ar' ? (item.location_ar || item.location || '') : (item.location || '');
  };

  // Get the listing title in the correct language
  const getListingTitle = (item: any): string => {
    if (language === 'ar') {
      return item.title || (item.title_ar || '');
    } else {
      return item.title_en || item.title || '';
    }
  };
  
  // Extract real-time relative date or use fixed
  const getRelativeTime = (item: any): string => {
    if (item.created_at) {
      // Add proper date formatting here
      return language === 'ar' ? "منذ ساعتين" : "2 hours ago";
    }
    return language === 'ar' ? "منذ ساعتين" : "2 hours ago";
  };

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light dark:bg-gray-900">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-4 px-4">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-syrian-green/20 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h1 className={`text-2xl font-bold text-syrian-dark dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? (
                    <ArabicText text={query ? `نتائج البحث عن: "${query}"` : categoryParam ? `فئة: "${t(categoryParam)}"` : 'نتائج البحث'} />
                  ) : (
                    query ? `Search results for: "${query}"` : categoryParam ? `Category: "${t(categoryParam)}"` : 'Search Results'
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
              <div className="flex items-center text-sm text-syrian-dark/70 dark:text-gray-400 mt-2 justify-end">
                {language === 'ar' ? (
                  <ArabicText text={isLoading ? 'جاري البحث...' : results && results.length ? `تم العثور على ${results.length} نتيجة` : 'لم يتم العثور على نتائج'} />
                ) : (
                  isLoading ? 'Searching...' : results && results.length ? `Found ${results.length} results` : 'No results found'
                )}
              </div>
              {!isLoading && exchangeRate && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {language === 'ar' ? (
                    <ArabicText text={`سعر الصرف: 1 دولار = ${exchangeRate.toLocaleString()} ليرة سورية`} />
                  ) : (
                    `Exchange rate: 1 USD = ${exchangeRate.toLocaleString()} SYP`
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Improved Search Bar for inline filtering */}
          <div className="mb-6">
            <SearchBar 
              initialQuery={query} 
              onSearch={handleSearch} 
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="p-0">
                    <Skeleton className="w-full h-48" />
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
              {results && results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all border border-syrian-green/10 hover:border-syrian-green/30 dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader className="p-0">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.svg'} 
                            alt={getListingTitle(item)} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-syrian-green/10 text-syrian-green px-2 py-1 rounded-full text-xs">
                            {getCategoryName(item)}
                          </span>
                          {item.is_featured && (
                            <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full text-xs">
                              {language === 'ar' ? 'مميز' : 'Featured'}
                            </span>
                          )}
                        </div>
                        <h3 className={`font-bold ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow ml-2 dark:text-white`}>
                          {language === 'ar' ? (
                            <ArabicText text={item.title} textAr={item.title} textEn={item.title_en} />
                          ) : (
                            item.title_en || item.title
                          )}
                        </h3>
                        <p className={`${language === 'ar' ? 'text-right' : 'text-left'} text-syrian-dark/70 font-bold mt-2 dark:text-gray-300`}>
                          {language === 'ar' ? (
                            <ArabicText text={formatPrice(item.price, item.currency || 'SYP')} />
                          ) : (
                            formatPrice(item.price, item.currency || 'SYP')
                          )}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'} text-syrian-green`} viewBox="0 0 20 20" fill="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {getLocationName(item)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? (
                            <ArabicText text={getRelativeTime(item)} />
                          ) : (
                            getRelativeTime(item)
                          )}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="mx-auto w-24 h-24 mb-6 text-syrian-green/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {language === 'ar' ? (
                    <ArabicText text="لا توجد نتائج للبحث" size="large" className="block mb-4 font-bold" />
                  ) : (
                    <h2 className="text-xl font-bold mb-4">No results found</h2>
                  )}
                  {language === 'ar' ? (
                    <ArabicText text="حاول البحث بكلمات مختلفة أو تصفح الفئات" className="text-gray-500" />
                  ) : (
                    <p className="text-gray-500">Try searching with different keywords or browse categories</p>
                  )}
                </div>
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
