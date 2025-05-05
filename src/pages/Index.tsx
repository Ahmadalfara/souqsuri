import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryIcons from '@/components/CategoryIcons';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import FeaturedListings from '@/components/FeaturesSection';

const Index = () => {
  const location = useLocation();
  const isCategoryPage = location.pathname.startsWith('/category/');
  const categoryName = isCategoryPage ? location.pathname.split('/').pop() : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        {isCategoryPage ? (
          <CategoryView categoryName={categoryName} />
        ) : (
          <>
            <HeroSection />
            <CategoryIcons />
            <FeaturedSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

interface CategoryViewProps {
  categoryName: string | null;
}

// This component shows listings by category
const CategoryView = ({ categoryName }: CategoryViewProps) => {
  const categoryData = getCategoryData(categoryName);
  
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-4">{categoryData.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-syrian-dark text-right">
              <span className="font-arabic rtl">{categoryData.title}</span>
            </h1>
            <p className="text-gray-600 text-right">
              <span className="font-arabic rtl">{categoryData.count} إعلان</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-syrian-green/10 p-2 rounded text-syrian-green hover:bg-syrian-green/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          </button>
          <button className="bg-syrian-green/10 p-2 rounded text-syrian-green hover:bg-syrian-green/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryData.listings.map((item, index) => (
          <CategoryListingCard key={index} listing={item} />
        ))}
      </div>
    </section>
  );
};

interface ListingItem {
  title: string;
  price: string;
  location: string;
  imageUrl: string;
  isPromoted?: boolean;
  date: string;
}

const CategoryListingCard = ({ listing }: { listing: ListingItem }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-syrian-green/10 hover:shadow-md transition-all hover:border-syrian-green/30">
      <div className="relative">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover" />
        {listing.isPromoted && (
          <span className="absolute top-2 right-2 bg-syrian-gold text-white text-xs px-2 py-1 rounded">
            <span className="font-arabic">مميز</span>
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-2 text-right">
          <span className="font-arabic rtl">{listing.title}</span>
        </h3>
        <p className="text-right text-syrian-green font-bold">
          <span className="font-arabic rtl">{listing.price}</span>
        </p>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center text-sm text-gray-500">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-arabic rtl">{listing.date}</span>
        </span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-arabic rtl">{listing.location}</span>
        </span>
      </div>
    </div>
  );
};

const getCategoryData = (categoryName: string | null) => {
  // تخصيص الفئات
  switch(categoryName) {
    case 'real_estate':
      return {
        title: 'العقارات',
        count: 1250,
        icon: '🏠',
        listings: [
          {
            title: 'شقة للبيع في المزة',
            price: '٧٥٠,٠٠٠ ل.س',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ ساعتين'
          },
          {
            title: 'فيلا مفروشة للإيجار',
            price: '١,٥٠٠,٠٠٠ ل.س',
            location: 'اللاذقية',
            imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ يوم واحد'
          },
          {
            title: 'محل تجاري للبيع',
            price: '٥٠٠,٠٠٠ ل.س',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80',
            date: 'منذ 3 أيام'
          },
          {
            title: 'أرض للبيع بإطلالة بحرية',
            price: '١٠,٠٠٠,٠٠٠ ل.س',
            location: 'طرطوس',
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
            date: 'منذ أسبوع'
          },
          {
            title: 'مكتب فاخر للإيجار',
            price: '٣٥٠,٠٠٠ ل.س',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ أسبوع'
          },
          {
            title: 'شقة مفروشة للطلاب',
            price: '٢٥٠,٠٠٠ ل.س',
            location: 'حمص',
            imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ يومين'
          },
        ]
      };
    case 'cars':
      return {
        title: 'سيارات',
        count: 876,
        icon: '🚗',
        listings: [
          {
            title: 'مرسيدس E200 موديل 2019',
            price: '١٥,٠٠٠,٠٠٠ ل.س',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ ساعتين'
          },
          {
            title: 'كيا سيراتو 2020 كاملة المواصفات',
            price: '٨,٥٠٠,٠٠٠ ل.س',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ يوم واحد'
          },
          {
            title: 'هيونداي توسان 2018',
            price: '٧,٠٠٠,٠٠٠ ل.س',
            location: 'حمص',
            imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 3 أيام'
          },
          {
            title: 'فولكسفاغن باسات 2016',
            price: '٦,٥٠٠,٠٠٠ ل.س',
            location: 'اللاذقية',
            imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 5 أيام'
          },
        ]
      };
    case 'electronics':
      return {
        title: 'إلكترونيات',
        count: 980,
        icon: '💻',
        listings: [
          {
            title: 'ايفون 13 برو ماكس جديد',
            price: '٢,٥٠٠,٠٠٠ ل.س',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ ساعتين'
          },
          {
            title: 'لابتوب ماك بوك برو 2021',
            price: '٣,٠٠٠,٠٠٠ ل.س',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80',
            date: 'منذ يوم واحد'
          },
          {
            title: 'سماعات ايربودز برو أصلية',
            price: '٥٠٠,٠٠٠ ل.س',
            location: 'اللاذقية',
            imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 3 أيام'
          },
          {
            title: 'تلفزيون ذكي سامسونج 55 بوصة',
            price: '١,٢٠٠,٠٠٠ ل.س',
            location: 'حمص',
            imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 4 أيام'
          },
        ]
      };
    case 'furniture':
      return {
        title: 'أثاث',
        count: 543,
        icon: '🛋️',
        listings: [
          {
            title: 'طقم كنب مودرن جديد',
            price: '١,٨٠٠,٠٠٠ ل.س',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ ساعتين'
          },
          {
            title: 'طاولة طعام خشبية فاخرة',
            price: '٧٥٠,٠٠٠ ل.س',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1617104678098-de229db51175?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ يوم واحد'
          },
          {
            title: 'خزانة ملابس بتصميم عصري',
            price: '٥٠٠,٠٠٠ ل.س',
            location: 'طرطوس',
            imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
            date: 'منذ 3 أيام'
          },
        ]
      };
    case 'jobs':
      return {
        title: 'وظائف',
        count: 325,
        icon: '💼',
        listings: [
          {
            title: 'مطلوب مهندس برمجيات',
            price: 'الراتب حسب الخبرة',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
            date: 'منذ ساعتين'
          },
          {
            title: 'شاغر وظيفي محاسب',
            price: '٥٠٠,٠٠٠ ل.س',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
            isPromoted: true,
            date: 'منذ يوم واحد'
          },
          {
            title: 'مطلوب مدير مبيعات',
            price: '٧٠٠,٠٠٠ ل.س',
            location: 'اللاذقية',
            imageUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 3 أيام'
          },
        ]
      };
    case 'services':
      return {
        title: 'خدمات',
        count: 410,
        icon: '🔧',
        listings: [
          {
            title: 'خدمات تصميم وتطوير مواقع',
            price: 'حسب المشروع',
            location: 'دمشق',
            imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            isPromoted: true,
            date: 'منذ ساعتين'
          },
          {
            title: 'نقل أثاث وفك وتركيب',
            price: 'حسب المسافة',
            location: 'حلب',
            imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ يوم واحد'
          },
          {
            title: 'دروس خصوصية رياضيات وفيزياء',
            price: '١٠,٠٠٠ ل.س / ساعة',
            location: 'حمص',
            imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            date: 'منذ 3 أيام'
          },
        ]
      };
    default:
      return {
        title: 'جميع الفئات',
        count: 0,
        icon: '📋',
        listings: []
      };
  }
};

// New component for featured listings section
const FeaturedSection = () => {
  return (
    <section className="py-10 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <FeaturedListings />
      </div>
    </section>
  );
};

export default Index;
