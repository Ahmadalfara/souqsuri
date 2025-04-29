
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ArabicText from '../ArabicText';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthSheetProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const AuthSheet = ({ children, side = "right" }: AuthSheetProps) => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  // Close the sheet when a user logs in
  useEffect(() => {
    if (currentUser && open) {
      setOpen(false);
    }
  }, [currentUser, open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side={side} className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className={`text-${language === 'ar' ? 'right' : 'left'}`}>
          <SheetTitle>
            {language === 'ar' ? (
              <ArabicText text="تسجيل الدخول / إنشاء حساب" size="large" />
            ) : (
              "Sign In / Create Account"
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                {language === 'ar' ? (
                  <ArabicText text="تسجيل الدخول" />
                ) : (
                  "Sign In"
                )}
              </TabsTrigger>
              <TabsTrigger value="register">
                {language === 'ar' ? (
                  <ArabicText text="إنشاء حساب" />
                ) : (
                  "Sign Up"
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
