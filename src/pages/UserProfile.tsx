
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Edit, LogOut } from 'lucide-react';

const mockUserData = {
  name: "أحمد محمود",
  email: "ahmad@example.com",
  phone: "+963 912 345 678",
  joinedDate: "2022-01-10",
  location: "دمشق، سوريا",
  listings: [
    {
      id: 1,
      title: "شقة للإيجار في وسط دمشق",
      price: "750,000",
      category: "عقارات",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      active: true,
      views: 125
    },
    {
      id: 2,
      title: "سيارة هيونداي سوناتا 2018",
      price: "25,000,000",
      category: "سيارات",
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      active: true,
      views: 87
    },
    {
      id: 3,
      title: "لابتوب ديل XPS 15 بحالة ممتازة",
      price: "3,500,000",
      category: "إلكترونيات",
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      active: false,
      views: 53
    }
  ],
  favorites: [
    {
      id: 4,
      title: "طقم كنب حديث بحالة ممتازة",
      price: "1,800,000",
      category: "أثاث",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      seller: "سمير خالد"
    }
  ]
};

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="py-8 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* User Info Sidebar */}
              <div className="md:col-span-1">
                <Card className="overflow-hidden">
                  <div className="bg-syrian-green p-6 text-white text-center">
                    <div className="w-24 h-24 rounded-full bg-white text-syrian-green flex items-center justify-center mx-auto mb-4">
                      <User size={48} />
                    </div>
                    <h2 className="text-xl font-bold">
                      <ArabicText text={mockUserData.name} />
                    </h2>
                    <p className="text-sm opacity-90">
                      <ArabicText text={`عضو منذ ${mockUserData.joinedDate}`} />
                    </p>
                  </div>
                  
                  <div className="p-4 rtl">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <ArabicText text="البريد الإلكتروني" />
                        </p>
                        <p>{mockUserData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          <ArabicText text="رقم الهاتف" />
                        </p>
                        <p>{mockUserData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          <ArabicText text="الموقع" />
                        </p>
                        <p>
                          <ArabicText text={mockUserData.location} />
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings size={16} className="ml-2" />
                        <ArabicText text="إعدادات الحساب" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut size={16} className="ml-2" />
                        <ArabicText text="تسجيل الخروج" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <Tabs defaultValue="listings">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="listings">
                      <ArabicText text="إعلاناتي" />
                    </TabsTrigger>
                    <TabsTrigger value="favorites">
                      <ArabicText text="المفضلة" />
                    </TabsTrigger>
                    <TabsTrigger value="messages">
                      <ArabicText text="الرسائل" />
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="listings" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold rtl">
                        <ArabicText text="إعلاناتي" />
                      </h3>
                      <Button className="bg-syrian-green hover:bg-syrian-dark">
                        <ArabicText text="إضافة إعلان جديد" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {mockUserData.listings.map((listing) => (
                        <Card key={listing.id} className="overflow-hidden">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4">
                              <img 
                                src={listing.imageUrl} 
                                alt={listing.title} 
                                className="w-full h-48 sm:h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1 rtl">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold">
                                  <ArabicText text={listing.title} />
                                </h4>
                                <Badge className={listing.active ? "bg-green-500" : "bg-gray-500"}>
                                  <ArabicText text={listing.active ? "نشط" : "غير نشط"} />
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mb-2">
                                <Badge variant="outline" className="border-syrian-green text-syrian-green">
                                  <ArabicText text={listing.category} />
                                </Badge>
                                <span className="text-gray-500 text-sm">
                                  <ArabicText text={`${listing.views} مشاهدة`} />
                                </span>
                              </div>
                              <p className="text-lg font-bold text-syrian-green">{listing.price} ل.س</p>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit size={14} className="ml-1" />
                                  <ArabicText text="تعديل" size="small" />
                                </Button>
                                <Button variant="outline" size="sm" className={listing.active ? "text-red-600" : "text-green-600"}>
                                  <ArabicText text={listing.active ? "إيقاف" : "تنشيط"} size="small" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="favorites" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <h3 className="text-lg font-bold mb-4 rtl">
                      <ArabicText text="المفضلة" />
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockUserData.favorites.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="flex">
                            <div className="w-1/3">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-24 object-cover"
                              />
                            </div>
                            <div className="p-3 flex-1 rtl">
                              <h4 className="font-bold truncate">
                                <ArabicText text={item.title} />
                              </h4>
                              <p className="text-sm text-gray-600">
                                <ArabicText text={`البائع: ${item.seller}`} />
                              </p>
                              <p className="text-lg font-bold text-syrian-green">{item.price} ل.س</p>
                              <Badge variant="outline" className="mt-1 border-syrian-green text-syrian-green">
                                <ArabicText text={item.category} />
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="messages" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <h3 className="text-lg font-bold mb-4 rtl">
                      <ArabicText text="الرسائل" />
                    </h3>
                    
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        <ArabicText text="لا توجد رسائل حالياً" />
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </GeometricPattern>
      <Footer />
    </div>
  );
};

export default UserProfile;
