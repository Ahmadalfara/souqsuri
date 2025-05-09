
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/userService';

const UserMenu = () => {
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['userProfile', currentUser?.id],
    queryFn: () => currentUser ? getUserProfile(currentUser.id) : null,
    enabled: !!currentUser,
  });

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

  // Get name from user metadata or fallback to email
  const displayName = currentUser?.user_metadata?.name || 
                      currentUser?.user_metadata?.full_name || 
                      (currentUser?.email ? currentUser.email.split('@')[0] : 'User');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full w-10 h-10 p-0">
          <Avatar>
            {profile?.profile_picture ? (
              <AvatarImage src={profile.profile_picture} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-syrian-green text-white">
                {getInitials(displayName)}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'ar' ? "start" : "end"} className={`w-56 ${language === 'ar' ? 'rtl' : ''}`}>
        <DropdownMenuLabel>
          {language === 'ar' ? (
            <ArabicText text="حسابي" />
          ) : (
            "My Account"
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {language === 'ar' ? (
            <ArabicText text="الملف الشخصي" />
          ) : (
            "Profile"
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {language === 'ar' ? (
            <ArabicText text="تسجيل الخروج" />
          ) : (
            "Logout"
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
