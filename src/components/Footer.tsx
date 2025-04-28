
import React from 'react';
import ArabicText from './ArabicText';

const Footer = () => {
  return (
    <footer className="bg-arabic-blue text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <ArabicText text="موقع مرحبا ٢٠٢٥" size="normal" className="font-bold" />
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <a href="#" className="hover:text-arabic-gold transition-colors">
            <ArabicText text="الرئيسية" />
          </a>
          <a href="#" className="hover:text-arabic-gold transition-colors">
            <ArabicText text="من نحن" />
          </a>
          <a href="#" className="hover:text-arabic-gold transition-colors">
            <ArabicText text="خدماتنا" />
          </a>
          <a href="#" className="hover:text-arabic-gold transition-colors">
            <ArabicText text="تواصل معنا" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
