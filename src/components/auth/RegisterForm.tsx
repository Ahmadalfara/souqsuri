
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ArabicText from '../ArabicText';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يكون حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف غير صالح.",
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على الشروط والأحكام.",
  }),
});

const RegisterForm = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await register(values.name, values.email, values.password, values.phone);
      // Success toast is handled in the AuthContext
    } catch (error) {
      // Error toast is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text="الاسم الكامل" />
                ) : (
                  "Full Name"
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder={language === 'ar' ? "محمد أحمد" : "John Doe"} {...field} />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text="رقم الهاتف" />
                ) : (
                  "Phone Number"
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder={language === 'ar' ? "+963 912 345 678" : "+1 234 567 8900"} {...field} />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className={`flex flex-row items-start space-x-3 space-y-0 ${language === 'ar' ? "rtl space-x-reverse" : ""}`}>
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text="أوافق على الشروط والأحكام" />
                  ) : (
                    "I agree to the terms and conditions"
                  )}
                </FormLabel>
                <FormMessage className={language === 'ar' ? "rtl" : ""} />
              </div>
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
            <ArabicText text="إنشاء حساب" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
