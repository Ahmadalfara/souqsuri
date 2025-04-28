
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AuthSheet from './auth/AuthSheet';
import CreateListingSheet from './listings/CreateListingSheet';

const Header = () => {
  return (
    <header className="flex flex-col py-4 px-6 bg-syrian-green/10 border-b border-syrian-green/20">
      {/* Upper header with logo and auth buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="w-10 h-10 rounded-full bg-syrian-green flex items-center justify-center">
              <span className="text-white font-bold">س</span>
            </div>
          </Link>
          <Link to="/">
            <ArabicText text="سوقنا" className="ml-3 text-syrian-green font-bold" size="large" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <AuthSheet>
            <Button 
              variant="outline" 
              className="border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
            >
              <User className="ml-1 h-4 w-4" />
              <ArabicText text="تسجيل الدخول" />
            </Button>
          </AuthSheet>
          
          <CreateListingSheet>
            <Button className="bg-syrian-green hover:bg-syrian-dark text-white">
              <ArabicText text="إضافة إعلان" />
            </Button>
          </CreateListingSheet>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="flex items-center space-x-2 w-full max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Input
            className="pl-10 py-6 bg-white"
            placeholder="ابحث عن منتجات أو خدمات..."
            dir="rtl"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-syrian-green/60" />
        </div>
        <Button className="bg-syrian-green hover:bg-syrian-dark text-white py-6 px-8">
          <ArabicText text="بحث" />
        </Button>
      </div>
      
      {/* Categories menu */}
      <div className="flex justify-center mt-4 space-x-6 rtl">
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="العقارات" />
        </Link>
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="سيارات" />
        </Link>
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="إلكترونيات" />
        </Link>
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="أثاث" />
        </Link>
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="وظائف" />
        </Link>
        <Link to="/" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="خدمات" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
