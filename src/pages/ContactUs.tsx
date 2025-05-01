
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يكون حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح.",
  }),
  message: z.string().min(10, {
    message: "الرسالة يجب أن تكون 10 أحرف على الأقل.",
  }),
});

const ContactUs = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم إرسال رسالتك",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="اتصل بنا" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="هل لديك سؤال أو اقتراح؟ نحن هنا للمساعدة" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 order-2 md:order-1">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold mb-6 text-right">
                  <ArabicText text="معلومات الاتصال" />
                </h2>
                
                <div className="space-y-6">
                  <div className="text-right">
                    <div className="text-syrian-dark/70 mb-1">
                      <ArabicText text="العنوان:" />
                    </div>
                    <div className="font-medium">
                      <ArabicText text="دمشق، سوريا، شارع النصر، بناء رقم 23" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-syrian-dark/70 mb-1">
                      <ArabicText text="البريد الإلكتروني:" />
                    </div>
                    <div className="font-medium">
                      <ArabicText text="info@example.com" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-syrian-dark/70 mb-1">
                      <ArabicText text="الهاتف:" />
                    </div>
                    <div className="font-medium">
                      <ArabicText text="+963 11 123 4567" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-syrian-dark/70 mb-1">
                      <ArabicText text="ساعات العمل:" />
                    </div>
                    <div className="font-medium">
                      <ArabicText text="من الأحد إلى الخميس: ٩ صباحاً - ٥ مساءً" />
                    </div>
                  </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="mt-6 bg-gray-200 h-48 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">
                    <ArabicText text="خريطة الموقع" />
                  </p>
                </div>
              </Card>
            </div>

            <div className="md:col-span-2 order-1 md:order-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 text-right">
                  <ArabicText text="أرسل لنا رسالة" />
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <ArabicText text="الاسم" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="محمد عبدالله" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <ArabicText text="البريد الإلكتروني" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <ArabicText text="الرسالة" />
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اكتب رسالتك هنا..." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-syrian-green hover:bg-syrian-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 ml-2" />
                          <ArabicText text="جاري الإرسال..." />
                        </>
                      ) : (
                        <ArabicText text="إرسال" />
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default ContactUs;
