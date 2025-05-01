
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrencyConverter } from '@/services/currencyService';

// This will be part of the actual search service
const searchListings = async (query: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  // Mock search data
  return [
    { id: 1, title: 'iPhone Used', category: 'Electronics', price: 400, location: 'Damascus', imageUrl: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', currency: 'USD' },
    { id: 2, title: 'Apartment for Rent in Mazzeh', category: 'Real Estate', price: 300, location: 'Aleppo', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', currency: 'USD' },
    { id: 3, title: 'Mercedes 2020', category: 'Cars', price: 15000, location: 'Homs', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', currency: 'USD' },
    { id: 4, title: 'Leather Sofa in Excellent Condition', category: 'Furniture', price: 250, location: 'Latakia', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', currency: 'USD' },
    { id: 5, title: 'Dell XPS Laptop New', category: 'Electronics', price: 1200, location: 'Damascus', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', currency: 'USD' },
  ];
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const { formatCurrency, convert, exchangeRate } = useCurrencyConverter();
  const [displayCurrency, setDisplayCurrency] = useState<'SYP' | 'USD'>(
    searchParams.get('currency') === 'USD' ? 'USD' : 'SYP'
  );

  useEffect(() => {
    if (!query) {
      navigate('/');
    }
  }, [query, navigate]);

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchListings(query),
    enabled: !!query,
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

  // Display error toast when an error occurs
  useEffect(() => {
    if (error) {
      toast({
        title: language === 'ar' ? "خطأ في البحث" : "Search Error",
        description: language === 'ar' ? 
          "لم نتمكن من إتمام البحث، يرجى المحاولة مرة أخرى." : 
          "We couldn't complete your search, please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast, language]);

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

  const toggleCurrency = () => {
    setDisplayCurrency(prev => prev === 'SYP' ? 'USD' : 'SYP');
  };

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light dark:bg-gray-900">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-syrian-green/20 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h1 className={`text-2xl font-bold text-syrian-dark dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? (
                    <ArabicText text={`نتائج البحث عن: "${query}"`} />
                  ) : (
                    `Search results for: "${query}"`
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
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-syrian-green/10 text-syrian-green px-2 py-1 rounded-full text-xs">
                            {language === 'ar' ? (
                              <ArabicText text={t(item.category.toLowerCase().replace(' ', ''))} />
                            ) : (
                              item.category
                            )}
                          </span>
                          <h3 className={`font-bold ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow ml-2 dark:text-white`}>
                            {language === 'ar' ? (
                              // We would translate the title in a real app
                              <ArabicText text={item.title} />
                            ) : (
                              item.title
                            )}
                          </h3>
                        </div>
                        <p className={`${language === 'ar' ? 'text-right' : 'text-left'} text-syrian-dark/70 font-bold mt-2 dark:text-gray-300`}>
                          {language === 'ar' ? (
                            <ArabicText text={formatPrice(item.price, item.currency)} />
                          ) : (
                            formatPrice(item.price, item.currency)
                          )}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'} text-syrian-green`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {language === 'ar' ? (
                            <ArabicText text={t(item.location.toLowerCase())} />
                          ) : (
                            item.location
                          )}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? (
                            <ArabicText text="منذ ساعتين" />
                          ) : (
                            "2 hours ago"
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
