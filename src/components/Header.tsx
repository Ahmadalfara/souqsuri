
import React from 'react';
import ArabicText from './ArabicText';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-arabic-blue/10">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-arabic-gold flex items-center justify-center">
          <span className="text-white font-bold">م</span>
        </div>
        <ArabicText text="مرحبا بك" className="ml-3 text-arabic-blue font-bold" size="large" />
      </div>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className="border-arabic-gold text-arabic-blue hover:bg-arabic-gold/10"
        >
          <ArabicText text="تسجيل الدخول" />
        </Button>
        <Button className="bg-arabic-gold hover:bg-arabic-gold/90 text-white">
          <ArabicText text="ابدأ الآن" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
