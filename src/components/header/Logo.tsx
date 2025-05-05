
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo = () => {
  const { language } = useLanguage();
  
  return (
    <Link to="/" className="flex items-center">
      <div className="w-[120px] h-10 flex items-center">
        <img 
          src="/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png" 
          alt="Syria Market" 
          className="h-10 object-contain" 
        />
        <span className={`ml-2 text-xl font-bold text-syrian-green hidden sm:inline-block ${language === 'ar' ? 'mr-2 ml-0' : ''}`}>
          {language === 'ar' ? 'سوق سوريا' : 'SouqSuri'}
        </span>
      </div>
    </Link>
  );
};

export default Logo;
