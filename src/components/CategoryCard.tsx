
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ArabicText from './ArabicText';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  count: number;
  slug: string;
}

const CategoryCard = ({ icon: Icon, name, count, slug }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="p-6 hover:shadow-md transition-all hover:border-syrian-green/50 border border-syrian-green/20">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 bg-syrian-green/10 rounded-full flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-syrian-green" />
          </div>
          <h3 className="font-bold text-lg mb-1">
            <ArabicText text={name} />
          </h3>
          <p className="text-sm text-syrian-dark/60">
            <ArabicText text={`${count} إعلان`} />
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
