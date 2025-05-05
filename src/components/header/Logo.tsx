
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo = () => {
  const { language } = useLanguage();
  
  return (
    <Link to="/" className="flex items-center">
      {language === 'ar' ? (
        <h1 className="text-2xl font-bold text-red-600 font-arabic">سوق سوريا</h1>
      ) : (
        <h1 className="text-2xl font-bold text-red-600">Syria Market</h1>
      )}
    </Link>
  );
};

export default Logo;
