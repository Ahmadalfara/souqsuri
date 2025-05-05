
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

type ListingItem = {
  id: number;
  title: string;
  titleEn: string;
  price: string;
  location: string;
  locationEn: string;
  category: string;
  categoryEn: string;
  imageUrl: string;
};

const FeaturedListing = ({ item }: { item: ListingItem }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={language === 'ar' ? item.title : item.titleEn} 
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardHeader className="pb-2 pt-4">
        <Badge className="w-fit bg-syrian-green text-white">
          {language === 'ar' ? item.category : item.categoryEn}
        </Badge>
        <h3 className={`font-bold text-xl ${language === 'ar' ? 'rtl' : ''}`}>
          {language === 'ar' ? item.title : item.titleEn}
        </h3>
      </CardHeader>
      <CardContent className={`pb-2 ${language === 'ar' ? 'rtl' : ''}`}>
        <p className="text-2xl font-bold text-syrian-green">
          {item.price} {language === 'ar' ? 'ل.س' : 'SYP'}
        </p>
        <p className="text-muted-foreground text-sm">
          {language === 'ar' ? item.location : item.locationEn}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/listing/${item.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-syrian-green text-syrian-green hover:bg-syrian-green hover:text-white"
          >
            <ArabicText 
              text={language === 'ar' ? "عرض التفاصيل" : "View Details"} 
            />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const WelcomeSection = () => {
  const { language } = useLanguage();
  
  const featuredListings: ListingItem[] = [
    {
      id: 1,
      title: "شقة للإيجار في وسط دمشق",
      titleEn: "Apartment for rent in central Damascus",
      price: "750,000",
      location: "دمشق، سوريا",
      locationEn: "Damascus, Syria",
      category: "عقارات",
      categoryEn: "Property",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "سيارة هيونداي سوناتا 2018",
      titleEn: "Hyundai Sonata 2018",
      price: "25,000,000",
      location: "حلب، سوريا",
      locationEn: "Aleppo, Syria",
      category: "سيارات",
      categoryEn: "Vehicles",
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "لابتوب ديل XPS 15 بحالة ممتازة",
      titleEn: "Dell XPS 15 in excellent condition",
      price: "3,500,000",
      location: "اللاذقية، سوريا",
      locationEn: "Latakia, Syria",
      category: "إلكترونيات",
      categoryEn: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "طقم كنب حديث بحالة ممتازة",
      titleEn: "Modern sofa set in excellent condition",
      price: "1,800,000",
      location: "حمص، سوريا",
      locationEn: "Homs, Syria",
      category: "أثاث",
      categoryEn: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <section className="flex flex-col items-center py-10 px-6 md:px-10 bg-white">
      <div className="max-w-6xl w-full">
        <h1 className="mb-8 text-center">
          <ArabicText 
            text={language === 'ar' ? "إعلانات مميزة" : "Featured Listings"} 
            size="2xl" 
            className="font-bold text-syrian-green"
          />
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((item) => (
            <FeaturedListing key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button className="bg-syrian-green hover:bg-syrian-dark text-white px-8 py-6">
            <ArabicText 
              text={language === 'ar' ? "عرض المزيد من الإعلانات" : "View More Listings"} 
              size="normal" 
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
