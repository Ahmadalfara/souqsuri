
import React from 'react';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="flex flex-col py-4 px-6 bg-syrian-green/10 border-b border-syrian-green/20">
      {/* Upper header with logo and auth buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-syrian-green flex items-center justify-center">
            <span className="text-white font-bold">س</span>
          </div>
          <ArabicText text="سوقنا" className="ml-3 text-syrian-green font-bold" size="large" />
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="border-syrian-gold text-syrian-dark hover:bg-syrian-gold/10"
          >
            <ArabicText text="تسجيل الدخول" />
          </Button>
          <Button className="bg-syrian-green hover:bg-syrian-dark text-white">
            <ArabicText text="إضافة إعلان" />
          </Button>
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
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="العقارات" />
        </a>
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="سيارات" />
        </a>
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="إلكترونيات" />
        </a>
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="أثاث" />
        </a>
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="وظائف" />
        </a>
        <a href="#" className="text-syrian-dark hover:text-syrian-green transition-colors">
          <ArabicText text="خدمات" />
        </a>
      </div>
    </header>
  );
};

export default Header;
