
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent } from '@/components/ui/card';
import CreateListingSheet from './listings/CreateListingSheet';
import { Button } from './ui/button';

type CategoryProps = {
  title: string;
  icon: string;
  count: number;
};

const CategoryCard = ({ title, icon, count }: CategoryProps) => {
  return (
    <Link to={`/category/${title}`}>
      <Card className="bg-white hover:shadow-md transition-shadow border-syrian-green/20 hover:border-syrian-green">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-center mb-2">
            <ArabicText text={title} size="large" className="font-bold text-syrian-green" />
          </h3>
          <p className="text-center">
            <ArabicText text={`${count} إعلان`} size="normal" className="text-gray-600" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

const FeaturesSection = () => {
  const categories = [
    {
      title: "عقارات",
      icon: "🏠",
      count: 1250
    },
    {
      title: "سيارات",
      icon: "🚗",
      count: 876
    },
    {
      title: "إلكترونيات",
      icon: "💻",
      count: 980
    },
    {
      title: "أثاث منزلي",
      icon: "🛋️",
      count: 543
    },
    {
      title: "وظائف",
      icon: "💼",
      count: 325
    },
    {
      title: "خدمات",
      icon: "🔧",
      count: 410
    }
  ];

  return (
    <section className="py-16 px-6 syrian-pattern">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-12">
          <ArabicText text="تصفح حسب الفئة" size="2xl" className="font-bold text-syrian-dark" />
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              title={category.title} 
              icon={category.icon}
              count={category.count}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <Card className="bg-syrian-light border-syrian-green p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 text-center md:text-right">
                <h3 className="mb-4">
                  <ArabicText 
                    text="هل تريد بيع شيء ما؟" 
                    size="xl" 
                    className="font-bold text-syrian-dark"
                  />
                </h3>
                <p>
                  <ArabicText 
                    text="انضم إلى آلاف الأشخاص الذين يبيعون منتجاتهم بنجاح على سوقنا. أضف إعلانك مجانًا اليوم!" 
                    size="normal" 
                    className="text-gray-600"
                  />
                </p>
              </div>
              <div>
                <CreateListingSheet>
                  <Button className="bg-syrian-green text-white px-8 py-3 rounded-md hover:bg-syrian-dark transition-colors">
                    <ArabicText text="أضف إعلانك الآن" size="large" />
                  </Button>
                </CreateListingSheet>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
