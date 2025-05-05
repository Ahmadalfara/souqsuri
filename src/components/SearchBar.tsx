
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from './ArabicText';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (query) searchParams.append('query', query);
    if (category) searchParams.append('category', category);
    if (location) searchParams.append('location', location);
    
    navigate(`/search?${searchParams.toString()}`);
  };
  
  const locations = [
    { id: 'damascus', name: language === 'ar' ? 'دمشق' : 'Damascus' },
    { id: 'aleppo', name: language === 'ar' ? 'حلب' : 'Aleppo' },
    { id: 'homs', name: language === 'ar' ? 'حمص' : 'Homs' },
    { id: 'latakia', name: language === 'ar' ? 'اللاذقية' : 'Latakia' },
    { id: 'tartus', name: language === 'ar' ? 'طرطوس' : 'Tartus' },
  ];
  
  const categories = [
    { id: '', name: language === 'ar' ? 'كل الفئات' : 'All categories' },
    { id: 'vehicles', name: language === 'ar' ? 'سيارات' : 'Vehicles' },
    { id: 'property', name: language === 'ar' ? 'عقارات' : 'Property' },
    { id: 'electronics', name: language === 'ar' ? 'إلكترونيات' : 'Electronics' },
    { id: 'furniture', name: language === 'ar' ? 'أثاث' : 'Furniture' },
    { id: 'kids', name: language === 'ar' ? 'للأطفال' : 'Kids\' Items' },
    { id: 'clothing', name: language === 'ar' ? 'ملابس' : 'Clothing' },
    { id: 'jobs', name: language === 'ar' ? 'وظائف' : 'Jobs' },
    { id: 'services', name: language === 'ar' ? 'خدمات' : 'Services' },
    { id: 'hobbies', name: language === 'ar' ? 'هوايات' : 'Hobbies' },
    { id: 'refurbished', name: language === 'ar' ? 'مُجدد' : 'Refurbished' }
  ];

  return (
    <form onSubmit={handleSearch} className={`${className} w-full`}>
      <div className={`flex flex-col md:flex-row md:items-center gap-2 ${language === 'ar' ? 'rtl' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-syrian-green`} size={20} />
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ماذا تبحث عنه؟' : 'What are you looking for?'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-full border-2 border-syrian-green focus:ring-0 focus:border-syrian-green ${language === 'ar' ? 'text-right pr-10 pl-4' : ''}`}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center justify-between border-2 border-gray-200 rounded-full px-4 py-3 hover:border-syrian-green/50"
                type="button"
              >
                <MapPin className="mr-2" size={18} />
                <span className="mx-1">
                  {location ? (locations.find(loc => loc.id === location)?.name || '') : (language === 'ar' ? 'المكان' : 'Location')}
                </span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="py-2">
                <div className="p-2 font-bold border-b">
                  {language === 'ar' ? <ArabicText text="اختر المكان" /> : "Select Location"}
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {locations.map((loc) => (
                    <div 
                      key={loc.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setLocation(loc.id);
                        document.body.click(); // Close popover
                      }}
                    >
                      {loc.name}
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t text-syrian-green hover:bg-gray-100 cursor-pointer font-medium">
                    {language === 'ar' ? <ArabicText text="+ أضف منطقة" /> : "+ Add Area"}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-2 border-gray-200 rounded-full px-4 py-3 hover:border-syrian-green/50">
              <SelectValue placeholder={language === 'ar' ? "كل الفئات" : "All categories"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            type="submit" 
            className="bg-syrian-green hover:bg-syrian-dark text-white rounded-full px-6"
          >
            {language === 'ar' ? <ArabicText text="بحث" /> : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
