
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ListingDetails from "./pages/ListingDetails";
import UserProfile from "./pages/UserProfile";
import SearchResults from "./pages/SearchResults";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HowToSell from "./pages/HowToSell";
import FeaturedListings from "./pages/FeaturedListings";
import CustomerSupport from "./pages/CustomerSupport";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LoadingScreen from "./components/LoadingScreen";
import AIChatWidget from "./components/chat/AIChatWidget";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/category/:categoryName" element={<Index />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* New Pages */}
        <Route path="/how-to-sell" element={<HowToSell />} />
        <Route path="/featured-listings" element={<FeaturedListings />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatWidget />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
