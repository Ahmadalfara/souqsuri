
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo = () => {
  const { language } = useLanguage();
  
  return (
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
        {language === 'ar' ? (
          <ArabicText text="سوقنا" className="ml-3 text-syrian-green font-bold" size="large" />
        ) : (
          <span className="ml-3 text-syrian-green font-bold text-lg">Souqna</span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
