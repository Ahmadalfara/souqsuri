
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Link to="/">
        <div className="w-16 h-16 flex items-center justify-center">
          <img 
            src="/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png" 
            alt="Syria Market" 
            className="w-16 h-16 object-contain" 
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
