
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArabicText from '../ArabicText';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
});

const LoginForm = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      // Success toast is handled in the AuthContext
    } catch (error) {
      // Error toast is handled in the AuthContext
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text="البريد الإلكتروني" />
                ) : (
                  "Email Address"
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text="كلمة المرور" />
                ) : (
                  "Password"
                )}
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-syrian-green hover:bg-syrian-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : null}
          {language === 'ar' ? (
            <ArabicText text="تسجيل الدخول" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
