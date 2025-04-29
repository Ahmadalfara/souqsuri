
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Edit, LogOut, Loader2, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { getUserListings, Listing, toggleListingStatus, deleteListing } from '@/services/listingService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import CreateListingSheet from '@/components/listings/CreateListingSheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Get user data
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }

        // Get user listings
        const listings = await getUserListings(currentUser.uid);
        setUserListings(listings);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: t('error'),
          description: t('errorLoadingProfile'),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, toast, t]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleToggleListingStatus = async (listingId: string, currentStatus: boolean) => {
    try {
      await toggleListingStatus(listingId, !currentStatus);
      setUserListings(prevListings => 
        prevListings.map(listing => 
          listing.id === listingId ? { ...listing, active: !currentStatus } : listing
        )
      );
      toast({
        title: !currentStatus ? t('listingActivated') : t('listingDeactivated'),
        description: !currentStatus ? t('listingNowVisible') : t('listingNowHidden'),
      });
    } catch (error) {
      console.error("Error toggling listing status:", error);
      toast({
        title: t('error'),
        description: t('errorUpdatingListing'),
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (listingId: string) => {
    setDeletingListingId(listingId);
    setIsDialogOpen(true);
  };

  const handleDeleteListing = async () => {
    if (!deletingListingId) return;
    
    try {
      await deleteListing(deletingListingId);
      setUserListings(prevListings => 
        prevListings.filter(listing => listing.id !== deletingListingId)
      );
      toast({
        title: t('listingDeleted'),
        description: t('listingPermanentlyRemoved'),
      });
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: t('error'),
        description: t('errorDeletingListing'),
        variant: "destructive",
      });
    } finally {
      setDeletingListingId(null);
      setIsDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-syrian-light">
        <GeometricPattern className="flex-grow">
          <Header />
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8 text-syrian-green" />
          </div>
        </GeometricPattern>
        <Footer />
      </div>
    );
  }

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
                      {language === 'ar' ? (
                        <ArabicText text={userData?.name || currentUser?.displayName || "مستخدم"} />
                      ) : (
                        <span>{userData?.name || currentUser?.displayName || "User"}</span>
                      )}
                    </h2>
                    <p className="text-sm opacity-90">
                      {language === 'ar' ? (
                        <ArabicText text={`عضو منذ ${
                          userData?.createdAt 
                            ? new Date(userData.createdAt).toLocaleDateString() 
                            : new Date().toLocaleDateString()
                        }`} />
                      ) : (
                        <span>Member since {
                          userData?.createdAt 
                            ? new Date(userData.createdAt).toLocaleDateString() 
                            : new Date().toLocaleDateString()
                        }</span>
                      )}
                    </p>
                  </div>
                  
                  <div className={`p-4 ${language === 'ar' ? 'rtl' : ''}`}>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === 'ar' ? (
                            <ArabicText text="البريد الإلكتروني" />
                          ) : (
                            "Email"
                          )}
                        </p>
                        <p>{userData?.email || currentUser?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === 'ar' ? (
                            <ArabicText text="رقم الهاتف" />
                          ) : (
                            "Phone"
                          )}
                        </p>
                        <p>{userData?.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === 'ar' ? (
                            <ArabicText text="الموقع" />
                          ) : (
                            "Location"
                          )}
                        </p>
                        <p>
                          {language === 'ar' ? (
                            <ArabicText text={userData?.location || "غير محدد"} />
                          ) : (
                            <span>{userData?.location || "Not specified"}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? (
                          <ArabicText text="إعدادات الحساب" />
                        ) : (
                          "Account Settings"
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? (
                          <ArabicText text="تسجيل الخروج" />
                        ) : (
                          "Logout"
                        )}
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
                      {language === 'ar' ? (
                        <ArabicText text="إعلاناتي" />
                      ) : (
                        "My Listings"
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="favorites">
                      {language === 'ar' ? (
                        <ArabicText text="المفضلة" />
                      ) : (
                        "Favorites"
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="messages">
                      {language === 'ar' ? (
                        <ArabicText text="الرسائل" />
                      ) : (
                        "Messages"
                      )}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="listings" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-lg font-bold ${language === 'ar' ? 'rtl' : ''}`}>
                        {language === 'ar' ? (
                          <ArabicText text="إعلاناتي" />
                        ) : (
                          "My Listings"
                        )}
                      </h3>
                      <CreateListingSheet>
                        <Button className="bg-syrian-green hover:bg-syrian-dark">
                          {language === 'ar' ? (
                            <ArabicText text="إضافة إعلان جديد" />
                          ) : (
                            "Add New Listing"
                          )}
                        </Button>
                      </CreateListingSheet>
                    </div>
                    
                    {userListings.length > 0 ? (
                      <div className="space-y-4">
                        {userListings.map((listing) => (
                          <Card key={listing.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-1/4">
                                <img 
                                  src={listing.images[0] || "/placeholder.svg"} 
                                  alt={listing.title} 
                                  className="w-full h-48 sm:h-full object-cover"
                                />
                              </div>
                              <div className={`p-4 flex-1 ${language === 'ar' ? 'rtl' : ''}`}>
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold">
                                    {language === 'ar' ? (
                                      <ArabicText text={listing.title} />
                                    ) : (
                                      listing.title
                                    )}
                                  </h4>
                                  <Badge className={listing.active ? "bg-green-500" : "bg-gray-500"}>
                                    {language === 'ar' ? (
                                      <ArabicText text={listing.active ? "نشط" : "غير نشط"} />
                                    ) : (
                                      listing.active ? "Active" : "Inactive"
                                    )}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mb-2">
                                  <Badge variant="outline" className="border-syrian-green text-syrian-green">
                                    {language === 'ar' ? (
                                      <ArabicText text={t(listing.category)} />
                                    ) : (
                                      t(listing.category)
                                    )}
                                  </Badge>
                                  <span className="text-gray-500 text-sm">
                                    {language === 'ar' ? (
                                      <ArabicText text={`${listing.views} مشاهدة`} />
                                    ) : (
                                      `${listing.views} views`
                                    )}
                                  </span>
                                </div>
                                <p className="text-lg font-bold text-syrian-green">{listing.price} {language === 'ar' ? 'ل.س' : 'SYP'}</p>
                                <div className="mt-4 flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => navigate(`/listing/${listing.id}`)}
                                  >
                                    <Edit size={14} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                    {language === 'ar' ? (
                                      <ArabicText text="عرض" size="small" />
                                    ) : (
                                      "View"
                                    )}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className={listing.active ? "text-red-600" : "text-green-600"}
                                    onClick={() => handleToggleListingStatus(listing.id!, listing.active)}
                                  >
                                    {language === 'ar' ? (
                                      <ArabicText text={listing.active ? "إيقاف" : "تنشيط"} size="small" />
                                    ) : (
                                      listing.active ? "Deactivate" : "Activate"
                                    )}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => confirmDelete(listing.id!)}
                                  >
                                    <Trash2 size={14} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                    {language === 'ar' ? (
                                      <ArabicText text="حذف" size="small" />
                                    ) : (
                                      "Delete"
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          {language === 'ar' ? (
                            <ArabicText text="لا توجد إعلانات حالياً" />
                          ) : (
                            "No listings yet"
                          )}
                        </p>
                        <CreateListingSheet>
                          <Button className="mt-4 bg-syrian-green hover:bg-syrian-dark">
                            {language === 'ar' ? (
                              <ArabicText text="أضف إعلانك الأول" />
                            ) : (
                              "Add Your First Listing"
                            )}
                          </Button>
                        </CreateListingSheet>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="favorites" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <h3 className={`text-lg font-bold mb-4 ${language === 'ar' ? 'rtl' : ''}`}>
                      {language === 'ar' ? (
                        <ArabicText text="المفضلة" />
                      ) : (
                        "Favorites"
                      )}
                    </h3>
                    
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {language === 'ar' ? (
                          <ArabicText text="لا توجد إعلانات مفضلة حالياً" />
                        ) : (
                          "No favorite listings yet"
                        )}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="messages" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
                    <h3 className={`text-lg font-bold mb-4 ${language === 'ar' ? 'rtl' : ''}`}>
                      {language === 'ar' ? (
                        <ArabicText text="الرسائل" />
                      ) : (
                        "Messages"
                      )}
                    </h3>
                    
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {language === 'ar' ? (
                          <ArabicText text="لا توجد رسائل حالياً" />
                        ) : (
                          "No messages yet"
                        )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ar' ? (
                <ArabicText text="حذف الإعلان" />
              ) : (
                "Delete Listing"
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' ? (
                <ArabicText text="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الإعلان نهائياً." />
              ) : (
                "This action cannot be undone. The listing will be permanently deleted."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'ar' ? (
                <ArabicText text="إلغاء" />
              ) : (
                "Cancel"
              )}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteListing} className="bg-red-600 hover:bg-red-700">
              {language === 'ar' ? (
                <ArabicText text="حذف" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;
