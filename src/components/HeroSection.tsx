
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from './ArabicText';
import SearchBar from './SearchBar';

const HeroSection = () => {
  const { language } = useLanguage();
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-syrian-green/90 to-syrian-dark py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 syrian-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <ArabicText 
              text={language === 'ar' 
                ? "أكبر سوق للبيع والشراء في سوريا" 
                : "Syria's Largest Marketplace"
              }
              size="3xl"
            />
          </h1>
          <p className="text-white/90 text-lg md:text-xl">
            <ArabicText 
              text={language === 'ar' 
                ? "ابحث عن أي شيء تريده، أو أضف إعلانك مجانًا الآن" 
                : "Find anything you need, or post your ad for free today"
              }
              size="large"
            />
          </p>
        </div>
        
        <div className="bg-white/95 rounded-xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
