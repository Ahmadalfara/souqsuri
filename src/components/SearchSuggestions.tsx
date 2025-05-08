
import React from 'react';
import { Search } from 'lucide-react';
import ArabicText from '@/components/ArabicText';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  language: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ 
  suggestions, 
  onSuggestionClick,
  language
}) => {
  return (
    <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-syrian-green/10 overflow-hidden">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li 
            key={index} 
            className={`px-4 py-2 hover:bg-syrian-green/10 cursor-pointer flex items-center 
                       ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}
            onClick={() => onSuggestionClick(suggestion)}
          >
            <Search size={16} className={`text-gray-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {language === 'ar' ? (
              <ArabicText text={suggestion} />
            ) : (
              <span>{suggestion}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
