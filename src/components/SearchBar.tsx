
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ArabicText from './ArabicText';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center space-x-2 w-full ${className}`}>
      <div className="relative flex-1">
        <Input
          className="pl-10 py-6 bg-white"
          placeholder="ابحث عن منتجات أو خدمات..."
          dir="rtl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-syrian-green/60" />
      </div>
      <Button type="submit" className="bg-syrian-green hover:bg-syrian-dark text-white py-6 px-8">
        <ArabicText text="بحث" />
      </Button>
    </form>
  );
};

export default SearchBar;
