
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ArabicText from '../ArabicText';

interface AuthSheetProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const AuthSheet = ({ children, side = "right" }: AuthSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side={side} className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-right">
          <SheetTitle>
            <ArabicText text="تسجيل الدخول / إنشاء حساب" size="large" />
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                <ArabicText text="تسجيل الدخول" />
              </TabsTrigger>
              <TabsTrigger value="register">
                <ArabicText text="إنشاء حساب" />
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
