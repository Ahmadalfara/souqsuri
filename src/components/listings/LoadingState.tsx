
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  count?: number;
}

const LoadingState = ({ count = 6 }: LoadingStateProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, i) => (
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
  );
};

export default LoadingState;
