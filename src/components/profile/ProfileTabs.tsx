
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import UserListings from './UserListings';
import EmptyTabContent from './EmptyTabContent';
import { Listing } from '@/services/listingService';
import ArabicText from '@/components/ArabicText';

interface ProfileTabsProps {
  userListings: Listing[];
  setUserListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

const ProfileTabs = ({ userListings, setUserListings }: ProfileTabsProps) => {
  const { language } = useLanguage();

  return (
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
        <UserListings userListings={userListings} setUserListings={setUserListings} />
      </TabsContent>
      
      <TabsContent value="favorites" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
        <EmptyTabContent 
          title="المفضلة" 
          emptyMessage="لا توجد إعلانات مفضلة حالياً" 
        />
      </TabsContent>
      
      <TabsContent value="messages" className="p-4 bg-white rounded-b-lg shadow-md mt-2">
        <EmptyTabContent 
          title="الرسائل" 
          emptyMessage="لا توجد رسائل حالياً" 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
