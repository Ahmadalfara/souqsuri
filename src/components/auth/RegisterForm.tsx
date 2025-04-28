
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ArabicText from '../ArabicText';
import { useToast } from '@/components/ui/use-toast';

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, we'd connect to Supabase or another authentication service
    console.log(values);
    toast({
      title: "تم إنشاء الحساب",
      description: "تم إنشاء حسابك بنجاح.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="الاسم الكامل" /></FormLabel>
              <FormControl>
                <Input placeholder="محمد أحمد" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="البريد الإلكتروني" /></FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="كلمة المرور" /></FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="رقم الهاتف" /></FormLabel>
              <FormControl>
                <Input placeholder="+963 912 345 678" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl space-x-reverse">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  <ArabicText text="أوافق على الشروط والأحكام" />
                </FormLabel>
                <FormMessage className="rtl" />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-syrian-green hover:bg-syrian-dark">
          <ArabicText text="إنشاء حساب" />
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
