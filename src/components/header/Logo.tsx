
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Link to="/">
        <div className="w-12 h-12 flex items-center justify-center">
          <img 
            src="/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png" 
            alt="Syria Market" 
            className="w-12 h-12 object-contain" 
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
