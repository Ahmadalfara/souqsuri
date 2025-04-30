
import React, { useEffect } from 'react';
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

// هذا سيكون جزء من خدمة البحث الفعلية
const searchListings = async (query: string) => {
  // محاكاة تأخير الشبكة
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  // بيانات بحث وهمية للعرض
  return [
    { id: 1, title: 'هاتف آيفون مستعمل', category: 'إلكترونيات', price: '400', location: 'دمشق', imageUrl: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, title: 'شقة للإيجار في منطقة المزة', category: 'العقارات', price: '300', location: 'حلب', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 3, title: `سيارة مرسيدس 2020`, category: 'سيارات', price: '15000', location: 'حمص', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 4, title: `أريكة جلدية بحالة ممتازة`, category: 'أثاث', price: '250', location: 'اللاذقية', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 5, title: 'لابتوب ديل XPS جديد', category: 'إلكترونيات', price: '1200', location: 'دمشق', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' },
  ];
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!query) {
      navigate('/');
    }
  }, [query, navigate]);

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchListings(query),
    enabled: !!query,
    onError: () => {
      toast({
        title: "خطأ في البحث",
        description: "لم نتمكن من إتمام البحث، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-syrian-green/20">
              <h1 className="text-2xl font-bold text-syrian-dark mb-2 text-right">
                <ArabicText text={`نتائج البحث عن: "${query}"`} />
              </h1>
              <div className="flex items-center text-sm text-syrian-dark/70 justify-end">
                <ArabicText text={isLoading ? 'جاري البحث...' : results && results.length ? `تم العثور على ${results.length} نتيجة` : 'لم يتم العثور على نتائج'} />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all border border-syrian-green/10 hover:border-syrian-green/30">
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
                            <ArabicText text={item.category} />
                          </span>
                          <h3 className="font-bold text-right flex-grow ml-2">
                            <ArabicText text={item.title} />
                          </h3>
                        </div>
                        <p className="text-right text-syrian-dark/70 font-bold mt-2">
                          <ArabicText text={`${item.price} دولار`} />
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-sm text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-syrian-green" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <ArabicText text={item.location} />
                        </span>
                        <span className="text-xs text-gray-500">
                          <ArabicText text="منذ ساعتين" />
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="mx-auto w-24 h-24 mb-6 text-syrian-green/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <ArabicText text="لا توجد نتائج للبحث" size="large" className="block mb-4 font-bold" />
                  <ArabicText text="حاول البحث بكلمات مختلفة أو تصفح الفئات" className="text-gray-500" />
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
