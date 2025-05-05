
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchBar from './SearchBar';
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import ArabicText from './ArabicText';

const HeroSection = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="relative">
      {/* Hero background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src="/lovable-uploads/c3056c89-0555-4881-9356-28458329b48e.png" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Search content */}
      <div className="relative py-16 md:py-24 px-4 max-w-7xl mx-auto z-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {language === 'ar' ? (
              <ArabicText text="ابحث" />
            ) : (
              "Search"
            )}
          </h2>
          
          <div className="space-y-4">
            {/* Search input */}
            <div>
              <SearchBar variant="minimal" className="w-full" />
            </div>
            
            {/* Location selector */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <MapPin size={16} />
                <span className="text-sm font-medium">
                  {language === 'ar' ? (
                    <ArabicText text="اختر المكان" />
                  ) : (
                    "Select location"
                  )}
                </span>
              </div>
              
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'ar' ? "كل سوريا" : "All Syria"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? "كل سوريا" : "All Syria"}
                  </SelectItem>
                  <SelectItem value="damascus">
                    {language === 'ar' ? "دمشق" : "Damascus"}
                  </SelectItem>
                  <SelectItem value="aleppo">
                    {language === 'ar' ? "حلب" : "Aleppo"}
                  </SelectItem>
                  <SelectItem value="homs">
                    {language === 'ar' ? "حمص" : "Homs"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Shipping option */}
            <div className="flex items-center space-x-2">
              <Checkbox id="shipping" />
              <Label htmlFor="shipping" className="text-sm">
                {language === 'ar' ? (
                  <ArabicText text="عرض الإعلانات مع خدمة التوصيل فقط" />
                ) : (
                  "Show only ads with shipping option"
                )}
              </Label>
            </div>
            
            {/* Search button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              {language === 'ar' ? (
                <ArabicText text="ابحث عن الإعلانات" />
              ) : (
                "Find Ads"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
