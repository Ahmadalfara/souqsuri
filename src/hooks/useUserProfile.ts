
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getUserListings, Listing } from '@/services/listingService';
import { supabase } from '@/integrations/supabase/client';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
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
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id) // Changed from uid to id
          .single();
          
        if (error) throw error;
        
        if (profileData) {
          setUserData(profileData as UserData);
        }

        // Get user listings
        const listings = await getUserListings(currentUser.id); // Changed from uid to id
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
