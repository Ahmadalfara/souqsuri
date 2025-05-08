
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import { Loader2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import UserInfo from '@/components/profile/UserInfo';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const { userData, userListings, setUserListings, loading } = useUserProfile();
  const { currentUser } = useAuth();

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* User Info Sidebar */}
              <div className="md:col-span-1">
                <UserInfo userData={userData} />
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <ProfileTabs 
                  userListings={userListings} 
                  setUserListings={setUserListings} 
                />
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
