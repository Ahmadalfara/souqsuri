
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { Toaster } from '@/components/ui/toaster';

const Index = lazy(() => import('./pages/Index'));
const FeaturedListings = lazy(() => import('./pages/FeaturedListings'));

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:categoryName" element={<Index />} />
              <Route path="/featured-listings" element={<FeaturedListings />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
