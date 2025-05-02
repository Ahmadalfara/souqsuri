
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getUserListings, Listing } from '@/services/listingService';
import { getUserProfile } from '@/services/userService';
import { Profile } from '@/types/supabase';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
  profilePicture?: string;
}

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Get user data from Supabase profiles table
        const profileData = await getUserProfile(currentUser.id);
          
        if (profileData) {
          // Map the Supabase profile data to our UserData interface
          setUserData({
            name: profileData.full_name || profileData.username || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            location: profileData.location || '',
            createdAt: profileData.created_at || '',
            profilePicture: profileData.profile_picture || profileData.avatar_url || ''
          });
        }

        // Get user listings
        const listings = await getUserListings(currentUser.id);
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

  return { userData, userListings, setUserListings, loading };
};
