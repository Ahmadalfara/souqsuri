
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

// Define the form schema with more relaxed validation
const formSchema = z.object({
  title: z.string().nonempty({
    message: "Title is required",
  }),
  description: z.string().optional(),
  price: z.string().nonempty({
    message: "Price is required",
  }),
  location: z.string().optional(),
  area: z.string().optional(),
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
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("");
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      area: "",
      category: "",
      currency: "SYP",
      condition: undefined,
      urgent: false,
    },
  });

  // Update areas when governorate changes
  useEffect(() => {
    if (selectedGovernorate) {
      // In a real app, this would come from an API or a more comprehensive dataset
      // Here we're just using some sample areas for different governorates
      const areasByGovernorate: Record<string, string[]> = {
        'damascus': ['cityCenter', 'easternArea', 'westernArea', 'southernArea', 'northernArea'],
        'damascusCountryside': ['douma', 'harasta', 'ghouta', 'zabadani', 'bludan'],
        'aleppo': ['cityCenter', 'azaz', 'afrin', 'jarabulus', 'albab'],
        'homs': ['cityCenter', 'talkalakh', 'qusayr', 'palmyra'],
        'hama': ['cityCenter', 'salamiyah', 'masyaf', 'mahardeh'],
        'latakia': ['cityCenter', 'jableh', 'qardaha', 'kasab'],
        'tartus': ['cityCenter', 'banyas', 'safita', 'arwad'],
      };
      
      // Set available areas based on governorate
      setAvailableAreas(areasByGovernorate[selectedGovernorate] || []);
      
      // Set the location field
      form.setValue('location', selectedGovernorate);
    } else {
      setAvailableAreas([]);
      form.setValue('location', '');
    }
    
    // Clear area field when governorate changes
    form.setValue('area', '');
  }, [selectedGovernorate, form]);

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
      
      // Build full location with area if available
      const fullLocation = values.area 
        ? `${values.location}${values.area ? ' - ' + t(values.area) : ''}`
        : values.location;
      
      const listingData = {
        title: values.title,
        description: values.description || " ", // Provide a space if empty
        price: values.price,
        currency: values.currency || "SYP", // Ensure currency has a default value
        location: fullLocation || " ", // Provide a space if empty
        category: values.category,
        userId: currentUser?.id || 'guest',
        userName: currentUser?.user_metadata?.name || "Guest User",
        condition: values.condition,
        urgent: values.urgent,
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
        
        {/* Location - Governorate selection */}
        <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
          <FormLabel>
            {language === 'ar' ? (
              <ArabicText text={t('location')} />
            ) : (
              t('location')
            )}
          </FormLabel>
          <Select
            value={selectedGovernorate}
            onValueChange={setSelectedGovernorate}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? "اختر المحافظة" : "Select governorate"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="damascus">
                {language === 'ar' ? t('damascus') : t('damascus')}
              </SelectItem>
              <SelectItem value="damascusCountryside">
                {language === 'ar' ? t('damascusCountryside') : t('damascusCountryside')}
              </SelectItem>
              <SelectItem value="aleppo">
                {language === 'ar' ? t('aleppo') : t('aleppo')}
              </SelectItem>
              <SelectItem value="homs">
                {language === 'ar' ? t('homs') : t('homs')}
              </SelectItem>
              <SelectItem value="hama">
                {language === 'ar' ? t('hama') : t('hama')}
              </SelectItem>
              <SelectItem value="latakia">
                {language === 'ar' ? t('latakia') : t('latakia')}
              </SelectItem>
              <SelectItem value="tartus">
                {language === 'ar' ? t('tartus') : t('tartus')}
              </SelectItem>
              <SelectItem value="idlib">
                {language === 'ar' ? t('idlib') : t('idlib')}
              </SelectItem>
              <SelectItem value="raqqa">
                {language === 'ar' ? t('raqqa') : t('raqqa')}
              </SelectItem>
              <SelectItem value="deirEzzor">
                {language === 'ar' ? t('deirEzzor') : t('deirEzzor')}
              </SelectItem>
              <SelectItem value="hasaka">
                {language === 'ar' ? t('hasaka') : t('hasaka')}
              </SelectItem>
              <SelectItem value="daraa">
                {language === 'ar' ? t('daraa') : t('daraa')}
              </SelectItem>
              <SelectItem value="sweida">
                {language === 'ar' ? t('sweida') : t('sweida')}
              </SelectItem>
              <SelectItem value="quneitra">
                {language === 'ar' ? t('quneitra') : t('quneitra')}
              </SelectItem>
              <SelectItem value="otherLocation">
                {language === 'ar' ? t('otherLocation') : t('otherLocation')}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Area selection - only show if governorate is selected */}
        {selectedGovernorate && availableAreas.length > 0 && (
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem dir={language === 'ar' ? "rtl" : "ltr"}>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text={t('selectArea')} />
                  ) : (
                    t('selectArea')
                  )}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? "اختر المنطقة" : "Select area"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableAreas.map(area => (
                      <SelectItem key={area} value={area}>
                        {language === 'ar' ? t(area) : t(area)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={language === 'ar' ? "rtl" : ""} />
              </FormItem>
            )}
          />
        )}
        
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
