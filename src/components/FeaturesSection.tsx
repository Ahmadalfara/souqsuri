
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent } from '@/components/ui/card';
import CreateListingSheet from './listings/CreateListingSheet';
import { Button } from './ui/button';
import { Car, Home, Laptop, Sofa, Baby, Shirt, Briefcase, Wrench, TennisBall, RefreshCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type CategoryProps = {
  title: string;
  icon: React.ReactNode;
  count: number;
  slug: string;
};

const CategoryCard = ({ title, icon, count, slug }: CategoryProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="bg-white hover:shadow-md transition-all border-syrian-green/20 hover:border-syrian-green">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="text-4xl mb-3 w-16 h-16 bg-syrian-green/10 rounded-full flex items-center justify-center text-syrian-green">
            {icon}
          </div>
          <h3 className="text-center mb-1">
            <ArabicText text={title} size="normal" className="font-bold text-syrian-dark" />
          </h3>
          <p className="text-center text-sm">
            <ArabicText text={`${count} إعلان`} size="small" className="text-gray-600" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

const FeaturesSection = () => {
  const { language } = useLanguage();

  const categories = [
    {
      title: language === 'ar' ? "سيارات" : "Vehicles",
      icon: <Car size={28} />,
      count: 876,
      slug: "vehicles"
    },
    {
      title: language === 'ar' ? "عقارات" : "Property",
      icon: <Home size={28} />,
      count: 1250,
      slug: "property"
    },
    {
      title: language === 'ar' ? "إلكترونيات" : "Electronics",
      icon: <Laptop size={28} />,
      count: 980,
      slug: "electronics"
    },
    {
      title: language === 'ar' ? "أثاث منزلي" : "Furniture",
      icon: <Sofa size={28} />,
      count: 543,
      slug: "furniture"
    },
    {
      title: language === 'ar' ? "للأطفال" : "Kids' Items",
      icon: <Baby size={28} />,
      count: 218,
      slug: "kids"
    },
    {
      title: language === 'ar' ? "ملابس" : "Clothing",
      icon: <Shirt size={28} />,
      count: 392,
      slug: "clothing"
    },
    {
      title: language === 'ar' ? "وظائف" : "Jobs",
      icon: <Briefcase size={28} />,
      count: 325,
      slug: "jobs"
    },
    {
      title: language === 'ar' ? "خدمات" : "Services",
      icon: <Wrench size={28} />,
      count: 410,
      slug: "services"
    },
    {
      title: language === 'ar' ? "هوايات" : "Hobbies",
      icon: <TennisBall size={28} />,
      count: 287,
      slug: "hobbies"
    },
    {
      title: language === 'ar' ? "أجهزة مُجددة" : "Refurbished",
      icon: <RefreshCcw size={28} />,
      count: 156,
      slug: "refurbished"
    }
  ];

  return (
    <section className="py-10 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-8">
          <ArabicText 
            text={language === 'ar' ? "تصفح حسب الفئة" : "Browse by Category"} 
            size="2xl" 
            className="font-bold text-syrian-dark" 
          />
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              title={category.title} 
              icon={category.icon}
              count={category.count}
              slug={category.slug}
            />
          ))}
        </div>
        
        <div className="mt-12 mb-4">
          <Card className="bg-syrian-light border-syrian-green p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 text-center md:text-right">
                <h3 className="mb-4">
                  <ArabicText 
                    text={language === 'ar' ? "هل تريد بيع شيء ما؟" : "Want to sell something?"} 
                    size="xl" 
                    className="font-bold text-syrian-dark"
                  />
                </h3>
                <p>
                  <ArabicText 
                    text={language === 'ar' 
                      ? "انضم إلى آلاف الأشخاص الذين يبيعون منتجاتهم بنجاح على سوقنا. أضف إعلانك مجانًا اليوم!"
                      : "Join thousands of people successfully selling their items on our marketplace. Add your listing for free today!"
                    }
                    size="normal" 
                    className="text-gray-600"
                  />
                </p>
              </div>
              <div>
                <CreateListingSheet>
                  <Button className="bg-syrian-green text-white px-8 py-3 rounded-md hover:bg-syrian-dark transition-colors">
                    <ArabicText text={language === 'ar' ? "أضف إعلانك الآن" : "Post Your Ad Now"} size="large" />
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
