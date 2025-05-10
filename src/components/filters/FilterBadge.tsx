
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove }) => {
  return (
    <Badge 
      variant="outline" 
      className="flex items-center gap-1 px-3 py-1 bg-syrian-green/10 border-syrian-green/20 dark:bg-syrian-green/20 dark:border-syrian-green/30"
    >
      <span className="dark:text-white">{label}</span>
      <button 
        onClick={onRemove}
        className="text-syrian-dark/60 hover:text-syrian-dark dark:text-white/60 dark:hover:text-white"
        aria-label="Remove filter"
      >
        <X size={14} />
      </button>
    </Badge>
  );
};

export default FilterBadge;
