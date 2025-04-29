
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import AuthSheet from './auth/AuthSheet';
import CreateListingSheet from './listings/CreateListingSheet';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="flex flex-col py-4 px-6 bg-syrian-green/10 border-b border-syrian-green/20">
      {/* Upper header with logo and auth buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png" 
                alt="سوقنا" 
                className="w-12 h-12 object-contain" 
              />
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
      <SearchBar className="max-w-4xl mx-auto" />
      
      {/* Categories menu */}
      <div className="flex justify-center mt-4 space-x-6 rtl">
        <Link to="/category/real-estate" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="العقارات" />
        </Link>
        <Link to="/category/cars" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="سيارات" />
        </Link>
        <Link to="/category/electronics" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="إلكترونيات" />
        </Link>
        <Link to="/category/furniture" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="أثاث" />
        </Link>
        <Link to="/category/jobs" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="وظائف" />
        </Link>
        <Link to="/category/services" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="خدمات" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
