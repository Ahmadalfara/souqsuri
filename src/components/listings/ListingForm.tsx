
import React, { useState, useEffect } from 'react';
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
import { Camera, X, Loader2, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { addListing } from '@/services/listingService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from '@/hooks/use-mobile';
import LocationSelector from './LocationSelector';

// Define the form schema with more relaxed validation
const formSchema = z.object({
  title: z.string().nonempty({
    message: "Title is required",
  }),
  description: z.string().optional(),
  price: z.string().nonempty({
    message: "Price is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  currency: z.string().default("SYP"),
  condition: z.enum(['new', 'used']).optional(),
  urgent: z.boolean().default(false),
});

const ListingForm = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [governorateId, setGovernorateId] = useState<string>("");
  const [districtId, setDistrictId] = useState<string>("");
  const [customArea, setCustomArea] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      currency: "SYP",
      condition: undefined,
      urgent: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (images.length >= 5) {
        toast({
          title: t('maxImages'),
          description: t('maxImagesDesc'),
          variant: "destructive"
        });
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImagePreview([...imagePreview, event.target.result as string]);
          setImages([...images, file]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreview(imagePreview.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Dispatch custom event to set submitting state in parent component
    document.dispatchEvent(new CustomEvent('set-submitting', { 
      detail: { submitting: true }
    }));
    
    setIsSubmitting(true);
    
    try {
      // Make sure the category is not empty
      if (!values.category) {
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' 
            ? "يرجى اختيار فئة للإعلان" 
            : "Please select a category for your listing",
          variant: "destructive"
        });
        setIsSubmitting(false);
        document.dispatchEvent(new CustomEvent('set-submitting', { 
          detail: { submitting: false }
        }));
        return;
      }
      
      // Check if location is selected
      if (!governorateId) {
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' 
            ? "يرجى اختيار المحافظة" 
            : "Please select a governorate",
          variant: "destructive"
        });
        setIsSubmitting(false);
        document.dispatchEvent(new CustomEvent('set-submitting', { 
          detail: { submitting: false }
        }));
        return;
      }
      
      const listingData = {
        title: values.title,
        description: values.description || " ", // Provide a space if empty
        price: Number(values.price), // Ensure price is a number
        currency: values.currency || "SYP", // Ensure currency has a default value
        governorate_id: governorateId || null,
        district_id: districtId || null,
        category: values.category,
        user_id: currentUser?.id || 'guest',
        condition: values.condition,
        status: 'active' as const,
        is_featured: values.urgent,
        images: []
      };
      
      console.log("Submitting listing data:", listingData);
      
      const listingId = await addListing(listingData, images);
      
      toast({
        title: language === 'ar' ? t('success') : t('success'),
        description: language === 'ar' 
          ? t('successfullyPublished')
          : t('successfullyPublished'),
      });
      
      // Reset form
      form.reset();
      setImages([]);
      setImagePreview([]);
      setGovernorateId("");
      setDistrictId("");
      setCustomArea("");
      
      // Close the sheet
      const closeEvent = new CustomEvent('close-sheet');
      document.dispatchEvent(closeEvent);
      
      // Navigate to the newly created listing
      if (listingId) {
        navigate(`/listing/${listingId}`);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: language === 'ar' ? t('error') : t('error'),
        description: language === 'ar' 
          ? t('errorPublishing')
          : t('errorPublishing'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      // Dispatch custom event to reset submitting state in parent component
      document.dispatchEvent(new CustomEvent('set-submitting', { 
        detail: { submitting: false }
      }));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text={t('listingTitle')} />
                ) : (
                  t('listingTitle')
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'ar' ? "مثال: شقة للإيجار في دمشق" : "Example: Apartment for rent in Damascus"}
                  {...field} 
                />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text={t('category')} />
                ) : (
                  t('category')
                )}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ar' ? "اختر فئة" : "Select category"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="real_estate">
                    {language === 'ar' ? t('realEstate') : t('realEstate')}
                  </SelectItem>
                  <SelectItem value="cars">
                    {language === 'ar' ? t('cars') : t('cars')}
                  </SelectItem>
                  <SelectItem value="electronics">
                    {language === 'ar' ? t('electronics') : t('electronics')}
                  </SelectItem>
                  <SelectItem value="furniture">
                    {language === 'ar' ? t('furniture') : t('furniture')}
                  </SelectItem>
                  <SelectItem value="jobs">
                    {language === 'ar' ? t('jobs') : t('jobs')}
                  </SelectItem>
                  <SelectItem value="services">
                    {language === 'ar' ? t('services') : t('services')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />
        
        {/* Location Selector */}
        <div dir={language === 'ar' ? "rtl" : "ltr"}>
          <FormLabel className="block mb-2">
            {language === 'ar' ? (
              <ArabicText text={t('location')} />
            ) : (
              t('location')
            )}
          </FormLabel>
          <LocationSelector
            onGovernorateChange={setGovernorateId}
            onDistrictChange={setDistrictId}
            onCustomAreaChange={setCustomArea}
          />
        </div>
        
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem dir={language === 'ar' ? "rtl" : "ltr"} className={isMobile ? "w-full" : "flex-1"}>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text={t('price')} />
                  ) : (
                    t('price')
                  )}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="500000" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className={language === 'ar' ? "rtl" : ""} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem dir={language === 'ar' ? "rtl" : "ltr"} className={isMobile ? "w-full" : "w-1/3"}>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text={t('currency')} />
                  ) : (
                    t('currency')
                  )}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "SYP"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SYP">
                      {language === 'ar' ? t('syrianPound') : t('syrianPound')}
                    </SelectItem>
                    <SelectItem value="USD">
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        USD
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className={language === 'ar' ? "rtl" : ""} />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
              <FormLabel>
                {language === 'ar' ? (
                  <ArabicText text={t('description')} />
                ) : (
                  t('description')
                )}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={language === 'ar' ? "أضف وصفاً مفصلاً للإعلان..." : "Add a detailed description..."} 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage className={language === 'ar' ? "rtl" : ""} />
            </FormItem>
          )}
        />

        <div className="space-y-4" dir={language === 'ar' ? "rtl" : "ltr"}>
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text={t('condition')} />
                  ) : (
                    t('condition')
                  )}
                </FormLabel>
                <div className="flex space-x-4">
                  <Select
                    onValueChange={(value) => field.onChange(value as 'new' | 'used')}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? "اختر الحالة" : "Select condition"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">
                        {language === 'ar' ? t('new') : t('new')}
                      </SelectItem>
                      <SelectItem value="used">
                        {language === 'ar' ? t('used') : t('used')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage className={language === 'ar' ? "rtl" : ""} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {language === 'ar' ? (
                      <ArabicText text={t('urgent')} />
                    ) : (
                      t('urgent')
                    )}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-2" dir={language === 'ar' ? "rtl" : "ltr"}>
          <FormLabel>
            {language === 'ar' ? (
              <ArabicText text={t('images')} />
            ) : (
              t('images')
            )}
          </FormLabel>
          
          <div className="grid grid-cols-3 gap-2">
            {imagePreview.map((img, index) => (
              <div key={index} className="relative h-24 bg-muted rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={language === 'ar' ? `صورة ${index + 1}` : `Image ${index + 1}`} 
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
            
            {imagePreview.length < 5 && (
              <label className="flex items-center justify-center h-24 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
                <div className="flex flex-col items-center">
                  <Camera className="h-6 w-6 text-syrian-green" />
                  <span className="text-xs mt-1">
                    {language === 'ar' ? (
                      <ArabicText text={t('addImage')} />
                    ) : (
                      t('addImage')
                    )}
                  </span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-syrian-green hover:bg-syrian-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              {language === 'ar' ? (
                <ArabicText text={t('publishing')} />
              ) : (
                t('publishing')
              )}
            </>
          ) : (
            language === 'ar' ? (
              <ArabicText text={t('publish')} />
            ) : (
              t('publish')
            )
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ListingForm;
