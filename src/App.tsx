
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

const Index = lazy(() => import('./pages/Index'));
const FeaturedListings = lazy(() => import('./pages/FeaturedListings'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const ListingDetails = lazy(() => import('./pages/ListingDetails'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const FAQ = lazy(() => import('./pages/FAQ'));
const HowToSell = lazy(() => import('./pages/HowToSell'));
const CustomerSupport = lazy(() => import('./pages/CustomerSupport'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:categoryName" element={<Index />} />
                <Route path="/featured-listings" element={<FeaturedListings />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/listing/:listingId" element={<ListingDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/how-to-sell" element={<HowToSell />} />
                <Route path="/customer-support" element={<CustomerSupport />} />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
