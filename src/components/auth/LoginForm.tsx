
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArabicText from '../ArabicText';
import { useToast } from '@/components/ui/use-toast';

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, we'd connect to Supabase or another authentication service
    console.log(values);
    toast({
      title: "تم تسجيل الدخول",
      description: "تم تسجيل الدخول بنجاح.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button type="submit" className="w-full bg-syrian-green hover:bg-syrian-dark">
          <ArabicText text="تسجيل الدخول" />
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
