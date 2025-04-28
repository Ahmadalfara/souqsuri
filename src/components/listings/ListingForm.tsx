
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArabicText from '../ArabicText';
import { useToast } from '@/components/ui/use-toast';
import { Camera, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, {
    message: "العنوان يجب أن يكون 5 أحرف على الأقل.",
  }),
  description: z.string().min(20, {
    message: "الوصف يجب أن يكون 20 حرفاً على الأقل.",
  }),
  price: z.string().min(1, {
    message: "الرجاء إدخال السعر.",
  }),
  location: z.string().min(2, {
    message: "الرجاء تحديد الموقع.",
  }),
  category: z.string({
    required_error: "الرجاء اختيار فئة.",
  }),
});

const ListingForm = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
    },
  });

  const simulateImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, we would upload to a server or Supabase storage
      // For now, just create a data URL for demonstration
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImages([...images, event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, we would store this in a database via Supabase
    console.log({ ...values, images });
    toast({
      title: "تم إضافة الإعلان",
      description: "تم إضافة إعلانك بنجاح.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="عنوان الإعلان" /></FormLabel>
              <FormControl>
                <Input placeholder="مثال: شقة للإيجار في دمشق" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="الفئة" /></FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="real_estate">عقارات</SelectItem>
                  <SelectItem value="cars">سيارات</SelectItem>
                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                  <SelectItem value="furniture">أثاث</SelectItem>
                  <SelectItem value="jobs">وظائف</SelectItem>
                  <SelectItem value="services">خدمات</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="السعر (ل.س)" /></FormLabel>
              <FormControl>
                <Input type="number" placeholder="500000" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="وصف الإعلان" /></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="أضف وصفاً مفصلاً للإعلان..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem dir="rtl">
              <FormLabel><ArabicText text="الموقع" /></FormLabel>
              <FormControl>
                <Input placeholder="المدينة، المنطقة" {...field} />
              </FormControl>
              <FormMessage className="rtl" />
            </FormItem>
          )}
        />
        
        <div className="space-y-2" dir="rtl">
          <FormLabel><ArabicText text="صور الإعلان" /></FormLabel>
          
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative h-24 bg-muted rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={`صورة ${index + 1}`} 
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
            
            <label className="flex items-center justify-center h-24 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
              <div className="flex flex-col items-center">
                <Camera className="h-6 w-6 text-syrian-green" />
                <span className="text-xs mt-1"><ArabicText text="أضف صورة" /></span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={simulateImageUpload}
              />
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-syrian-green hover:bg-syrian-dark">
          <ArabicText text="نشر الإعلان" />
        </Button>
      </form>
    </Form>
  );
};

export default ListingForm;
