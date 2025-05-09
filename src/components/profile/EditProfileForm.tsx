
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Upload, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '@/components/ArabicText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { uploadProfilePicture } from '@/services/userService';

// Define the form schema with Zod
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileFormProps {
  initialData: {
    name: string;
    phone?: string;
    location?: string;
    profilePicture?: string;
  };
  onSuccess?: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ initialData, onSuccess }) => {
  const { updateUserProfile, currentUser } = useAuth();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.profilePicture || null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialData.name || '',
      phone: initialData.phone || '',
      location: initialData.location || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !currentUser) return null;
    
    setUploadingImage(true);
    try {
      const imageUrl = await uploadProfilePicture(currentUser.id, imageFile);
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadingImage(false);
      throw error;
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      let profileData: any = {
        full_name: data.name,
        location: data.location || null,
        phone: data.phone || null,
      };

      // Upload image if a new one was selected
      if (imageFile) {
        const imageUrl = await uploadImage();
        if (imageUrl) {
          profileData.profile_picture = imageUrl;
        }
      }

      await updateUserProfile(profileData);
      
      toast({
        title: t('success'),
        description: t('profileUpdateSuccess'),
      });
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('profileUpdateFailed'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar className="h-24 w-24 cursor-pointer">
            {imagePreview ? (
              <AvatarImage src={imagePreview} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-syrian-green text-white text-xl">
                {getInitials(initialData.name)}
              </AvatarFallback>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </Avatar>
          <Input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profileImage"
            className="text-center text-sm text-muted-foreground mt-2 block cursor-pointer"
          >
            {language === 'ar' ? (
              <ArabicText text="تغيير الصورة" />
            ) : (
              "Change Picture"
            )}
          </label>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text="الاسم الكامل" />
                  ) : (
                    "Full Name"
                  )}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('enterYourName')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text="رقم الهاتف" />
                  ) : (
                    "Phone Number"
                  )}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('enterYourPhone')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'ar' ? (
                    <ArabicText text="الموقع" />
                  ) : (
                    "Location"
                  )}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('enterYourLocation')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-syrian-green hover:bg-syrian-dark"
            disabled={isLoading || uploadingImage}
          >
            {(isLoading || uploadingImage) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {language === 'ar' ? (
              <ArabicText text="حفظ التغييرات" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
