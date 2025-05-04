
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import ArabicText from '../ArabicText';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Mail } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface AuthSheetProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const AuthSheet = ({ children, side = "right" }: AuthSheetProps) => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    google: false,
    facebook: false
  });

  // Close the sheet when a user logs in
  useEffect(() => {
    if (currentUser && open) {
      setOpen(false);
    }
  }, [currentUser, open]);

  const handleForgotPassword = () => {
    setActiveTab("reset");
  };

  const handleBackToLogin = () => {
    setActiveTab("login");
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
        },
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

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
          {activeTab === "reset" ? (
            <div>
              <ResetPasswordForm />
              <div className="mt-4 text-center">
                <Button variant="link" onClick={handleBackToLogin}>
                  {language === 'ar' ? (
                    <ArabicText text="العودة إلى تسجيل الدخول" />
                  ) : (
                    "Back to Login"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <LoginForm onForgotPassword={handleForgotPassword} />
                </TabsContent>
                <TabsContent value="register" className="mt-4">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
              
              {/* Move social logins below with a separator */}
              <div className="relative mt-6 mb-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {language === 'ar' ? (
                      <ArabicText text="أو متابعة باستخدام" />
                    ) : (
                      "Or continue with"
                    )}
                  </span>
                </div>
              </div>
              
              {/* Social Login Buttons - new design */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading.google}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {language === 'ar' ? (
                    <ArabicText text="جوجل" />
                  ) : (
                    "Google"
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full" 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading.facebook}
                >
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  {language === 'ar' ? (
                    <ArabicText text="فيسبوك" />
                  ) : (
                    "Facebook"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
