
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArabicText from '@/components/ArabicText';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, Phone, MessageSquare, Share } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeometricPattern from '@/components/GeometricPattern';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const mockListingData = {
  id: 1,
  title: "شقة للإيجار في وسط دمشق",
  price: "750,000",
  location: "دمشق، سوريا",
  category: "عقارات",
  description: "شقة جميلة في وسط دمشق، تتكون من 3 غرف نوم وصالة كبيرة ومطبخ حديث. الشقة مفروشة بالكامل وجاهزة للسكن الفوري. تقع في منطقة هادئة وقريبة من الخدمات. مناسبة للعائلات.",
  createdAt: "2023-04-15",
  sellerName: "أحمد محمود",
  sellerPhone: "+963 912 345 678",
  sellerJoined: "2022-01-10",
  sellerId: "seller-123", // Added mock seller ID for messaging
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  ]
};

const ListingDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the listing details based on the ID
  const listing = mockListingData;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [phoneVisible, setPhoneVisible] = useState(false);
  
  // Function to handle showing the phone number
  const handleShowPhone = () => {
    setPhoneVisible(true);
    toast({
      title: language === 'ar' ? "تم إظهار رقم الهاتف" : "Phone number revealed",
      description: language === 'ar' ? "يمكنك الآن التواصل مع البائع" : "You can now contact the seller",
    });
  };
  
  // Function to handle messaging the seller
  const handleMessageSeller = () => {
    if (!currentUser) {
      toast({
        title: language === 'ar' ? "يرجى تسجيل الدخول" : "Please login",
        description: language === 'ar' ? "يجب عليك تسجيل الدخول لمراسلة البائع" : "You need to login to message the seller",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to the chat page or open a chat modal
    // Here we're just showing a toast for demonstration
    toast({
      title: language === 'ar' ? "إرسال رسالة" : "Send message",
      description: language === 'ar' ? "سيتم الانتقال إلى صفحة المحادثة قريباً" : "You'll be redirected to the conversation page soon",
    });
    
    // In a real app, you would navigate to the chat page with the seller ID and listing ID
    // navigate(`/messages/${listing.sellerId}?listing=${listing.id}`);
  };
  
  // Function to handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `${listing.title} - ${listing.price} ل.س`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: language === 'ar' ? "تمت المشاركة بنجاح" : "Successfully shared",
          description: "",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: language === 'ar' ? "تم نسخ الرابط" : "Link copied",
          description: language === 'ar' ? "تم نسخ الرابط إلى الحافظة" : "Link copied to clipboard",
        });
      });
    }
  };
  
  // Function to change the active image
  const changeImage = (index) => {
    setActiveImageIndex(index);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="py-6 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-4 text-sm rtl">
              <a href="/" className="text-syrian-green hover:underline">
                <ArabicText text="الرئيسية" />
              </a>
              <span className="mx-2">/</span>
              <a href="#" className="text-syrian-green hover:underline">
                <ArabicText text={listing.category} />
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-600">
                <ArabicText text={listing.title} />
              </span>
            </div>
            
            {/* Listing Title & Price */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl md:text-3xl font-bold rtl">
                  <ArabicText text={listing.title} />
                </h1>
                <div className="mt-2 md:mt-0">
                  <Badge className="bg-syrian-green text-white">{listing.category}</Badge>
                </div>
              </div>
              <div className="mt-2 text-3xl font-bold text-syrian-green rtl">
                {listing.price} ل.س
              </div>
              <div className="mt-2 flex items-center rtl">
                <MapPin className="h-4 w-4 ml-1 text-gray-600" />
                <span className="text-gray-600">
                  <ArabicText text={listing.location} />
                </span>
                <span className="mx-4">•</span>
                <Calendar className="h-4 w-4 ml-1 text-gray-600" />
                <span className="text-gray-600">
                  <ArabicText text={`تاريخ النشر: ${listing.createdAt}`} />
                </span>
              </div>
            </div>
            
            {/* Images & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Images */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <AspectRatio ratio={16/9} className="bg-muted">
                      <img 
                        src={listing.images[activeImageIndex]} 
                        alt={listing.title} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {listing.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`aspect-square overflow-hidden rounded-md cursor-pointer border-2 ${activeImageIndex === idx ? 'border-syrian-green' : 'border-transparent'}`}
                        onClick={() => changeImage(idx)}
                      >
                        <img 
                          src={img} 
                          alt={`${listing.title} ${idx + 1}`} 
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Description */}
                <div className="mt-6">
                  <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="description">
                        <ArabicText text="الوصف" />
                      </TabsTrigger>
                      <TabsTrigger value="details">
                        <ArabicText text="تفاصيل" />
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="p-4 bg-white rounded-b-lg shadow-md rtl">
                      <p className="whitespace-pre-line">
                        <ArabicText text={listing.description} />
                      </p>
                    </TabsContent>
                    <TabsContent value="details" className="p-4 bg-white rounded-b-lg shadow-md rtl">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="font-bold ml-2">
                            <ArabicText text="الفئة:" />
                          </span>
                          <span>
                            <ArabicText text={listing.category} />
                          </span>
                        </li>
                        <li className="flex items-center">
                          <span className="font-bold ml-2">
                            <ArabicText text="الموقع:" />
                          </span>
                          <span>
                            <ArabicText text={listing.location} />
                          </span>
                        </li>
                        <li className="flex items-center">
                          <span className="font-bold ml-2">
                            <ArabicText text="تاريخ النشر:" />
                          </span>
                          <span>
                            <ArabicText text={listing.createdAt} />
                          </span>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Seller Info */}
              <div>
                <Card className="p-4 shadow-md rtl">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2">
                    <ArabicText text="معلومات البائع" />
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 ml-2 text-syrian-green" />
                      <span className="font-medium">
                        <ArabicText text={listing.sellerName} />
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 ml-2 text-syrian-green" />
                      <span>
                        <ArabicText text={`عضو منذ ${listing.sellerJoined}`} />
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-syrian-green text-syrian-green hover:bg-syrian-green hover:text-white"
                      onClick={handleShowPhone}
                    >
                      <Phone className="ml-2 h-4 w-4" />
                      <ArabicText text={phoneVisible ? listing.sellerPhone : "إظهار رقم الهاتف"} />
                    </Button>
                    <Button 
                      className="w-full bg-syrian-green hover:bg-syrian-dark"
                      onClick={handleMessageSeller}
                    >
                      <MessageSquare className="ml-2 h-4 w-4" />
                      <ArabicText text="راسل البائع" />
                    </Button>
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleShare}
                      >
                        <Share className="ml-1 h-4 w-4" />
                        <ArabicText text="مشاركة" size="small" />
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 shadow-md mt-4 rtl">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2">
                    <ArabicText text="نصائح للأمان" />
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>
                      <ArabicText text="تحقق من البائع قبل الشراء." />
                    </li>
                    <li>
                      <ArabicText text="لا ترسل أموالًا دون معاينة السلعة." />
                    </li>
                    <li>
                      <ArabicText text="تأكد من جودة السلعة قبل الدفع." />
                    </li>
                    <li>
                      <ArabicText text="لا تشارك معلوماتك الشخصية بسهولة." />
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
            
            {/* Similar Listings */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 rtl">
                <ArabicText text="إعلانات مشابهة" />
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow" onClick={() => navigate(`/listing/${i + 1}`)}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8${i*2}%7C%7CYXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
                        alt="عقار مشابه" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold rtl truncate">
                        <ArabicText text={`شقة للإيجار ${i}`} />
                      </h3>
                      <p className="text-lg font-bold text-syrian-green rtl">{500000 + i*50000} ل.س</p>
                      <p className="text-sm text-gray-600 rtl truncate">
                        <ArabicText text={`دمشق، سوريا`} />
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </GeometricPattern>
      <Footer />
    </div>
  );
};

export default ListingDetails;
