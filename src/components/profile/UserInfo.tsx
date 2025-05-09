
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
  profilePicture?: string;
}

interface UserInfoProps {
  userData: UserData | null;
}

const UserInfo = ({ userData }: UserInfoProps) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-syrian-green p-6 text-white text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
          <Avatar className="w-full h-full">
            {userData?.profilePicture ? (
              <AvatarImage src={userData.profilePicture} alt="Profile Picture" />
            ) : (
              <AvatarFallback className="w-full h-full bg-white text-syrian-green text-4xl flex items-center justify-center">
                {getInitials(userData?.name || currentUser?.user_metadata?.name || "U")}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <h2 className="text-xl font-bold">
          {language === 'ar' ? (
            <ArabicText text={userData?.name || currentUser?.user_metadata?.name || "مستخدم"} />
          ) : (
            <span>{userData?.name || currentUser?.user_metadata?.name || "User"}</span>
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
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => document.getElementById('profile-tab-trigger')?.click()}
          >
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
  );
};

export default UserInfo;
