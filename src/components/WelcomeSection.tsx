
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import ArabicBorder from './ArabicBorder';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ListingItem = {
  id: number;
  title: string;
  price: string;
  location: string;
  category: string;
  imageUrl: string;
};

const FeaturedListing = ({ item }: { item: ListingItem }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardHeader className="pb-2 pt-4">
        <Badge className="w-fit bg-syrian-green text-white">{item.category}</Badge>
        <h3 className="font-bold text-xl rtl">
          {item.title}
        </h3>
      </CardHeader>
      <CardContent className="pb-2 rtl">
        <p className="text-2xl font-bold text-syrian-green">{item.price} ل.س</p>
        <p className="text-muted-foreground text-sm">{item.location}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/listing/${item.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-syrian-green text-syrian-green hover:bg-syrian-green hover:text-white"
          >
            <ArabicText text="عرض التفاصيل" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const WelcomeSection = () => {
  const featuredListings: ListingItem[] = [
    {
      id: 1,
      title: "شقة للإيجار في وسط دمشق",
      price: "750,000",
      location: "دمشق، سوريا",
      category: "عقارات",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "سيارة هيونداي سوناتا 2018",
      price: "25,000,000",
      location: "حلب، سوريا",
      category: "سيارات",
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "لابتوب ديل XPS 15 بحالة ممتازة",
      price: "3,500,000",
      location: "اللاذقية، سوريا",
      category: "إلكترونيات",
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "طقم كنب حديث بحالة ممتازة",
      price: "1,800,000",
      location: "حمص، سوريا",
      category: "أثاث",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <section className="flex flex-col items-center py-10 px-6 md:px-10">
      <div className="max-w-6xl w-full">
        <h1 className="mb-8 text-center">
          <ArabicText 
            text="إعلانات مميزة" 
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
            <ArabicText text="عرض المزيد من الإعلانات" size="normal" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
