
import React, { useState } from 'react';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يكون حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح.",
  }),
  subject: z.string().min(5, {
    message: "الموضوع يجب أن يكون 5 أحرف على الأقل.",
  }),
  message: z.string().min(10, {
    message: "الرسالة يجب أن تكون 10 أحرف على الأقل.",
  }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
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
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 text-right">
        <ArabicText text="نموذج الاتصال" />
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <ArabicText text="الموضوع" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="موضوع رسالتك" {...field} />
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
  );
};

export default ContactForm;
