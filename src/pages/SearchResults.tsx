
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// This would typically come from your API
const mockSearchResults = (query: string) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'هاتف آيفون مستعمل', category: 'إلكترونيات', price: '400', location: 'دمشق' },
        { id: 2, title: 'شقة للإيجار', category: 'العقارات', price: '300', location: 'حلب' },
        { id: 3, title: `نتائج متعلقة بـ "${query}"`, category: 'متنوعات', price: '150', location: 'حمص' },
      ]);
    }, 500);
  });
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => mockSearchResults(query),
    enabled: !!query,
  });

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-6 text-right">
            <h1 className="text-2xl font-bold text-syrian-dark mb-2">
              <ArabicText text={`نتائج البحث عن: ${query}`} />
            </h1>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
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
              {results && (results as any[]).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(results as any[]).map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-48 bg-syrian-green/20 flex items-center justify-center">
                          <ArabicText text="صورة الإعلان" className="text-syrian-green/50" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 text-right">
                          <ArabicText text={item.title} />
                        </h3>
                        <p className="text-right text-syrian-dark/70">
                          <ArabicText text={`${item.price} دولار`} />
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <span className="text-syrian-gold">
                          <ArabicText text={item.category} />
                        </span>
                        <span className="text-gray-500">
                          <ArabicText text={item.location} />
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ArabicText text="لا توجد نتائج للبحث" size="large" className="block mb-4" />
                  <ArabicText text="حاول البحث بكلمات مختلفة" className="text-gray-500" />
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
