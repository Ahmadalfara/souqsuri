
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import { Loader2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import UserInfo from '@/components/profile/UserInfo';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProfileForm from '@/components/profile/EditProfileForm';
import ChangePasswordForm from '@/components/profile/ChangePasswordForm';
import ArabicText from '@/components/ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const UserProfile = () => {
  const { userData, userListings, setUserListings, loading } = useUserProfile();
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("listings");

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/" />;
  }

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
            <h1 className="text-2xl font-bold mb-6 text-center">
              {language === 'ar' ? (
                <ArabicText text="صفحتي الشخصية" />
              ) : (
                "My Profile"
              )}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* User Info Sidebar */}
              <div className="md:col-span-1">
                <UserInfo userData={userData} />
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <Tabs defaultValue="listings" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="listings">
                      {language === 'ar' ? (
                        <ArabicText text="إعلاناتي" />
                      ) : (
                        "My Listings"
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="profile">
                      {language === 'ar' ? (
                        <ArabicText text="تعديل الملف" />
                      ) : (
                        "Edit Profile"
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="password">
                      {language === 'ar' ? (
                        <ArabicText text="تغيير كلمة المرور" />
                      ) : (
                        "Change Password"
                      )}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="listings">
                    <ProfileTabs 
                      userListings={userListings} 
                      setUserListings={setUserListings} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="profile">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        {language === 'ar' ? (
                          <ArabicText text="تعديل الملف الشخصي" />
                        ) : (
                          "Edit Profile"
                        )}
                      </h2>
                      {userData && (
                        <EditProfileForm 
                          initialData={{
                            name: userData.name || '',
                            phone: userData.phone || '',
                            location: userData.location || '',
                            profilePicture: userData.profilePicture || '',
                          }} 
                        />
                      )}
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="password">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        {language === 'ar' ? (
                          <ArabicText text="تغيير كلمة المرور" />
                        ) : (
                          "Change Password"
                        )}
                      </h2>
                      <ChangePasswordForm />
                    </Card>
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
