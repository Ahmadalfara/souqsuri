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
import { Loader2, Phone } from 'lucide-react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';

// Define validation schema
const formSchema = z.object({
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
});

// Define OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "الرمز غير صالح.",
  }),
});

interface LoginFormProps {
  onForgotPassword?: () => void;
}

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const { toast } = useToast();
  const { login, verifyCustomOtp } = useAuth();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Regular login form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // OTP verification form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Format phone number to include +
      const formattedPhone = values.phone.startsWith('+') 
        ? values.phone 
        : `+${values.phone}`;
      
      setPhoneNumber(formattedPhone);
      setPassword(values.password);
      
      // Login will either complete the login or set up for OTP verification
      const needsOtp = await login(formattedPhone, values.password);
      
      if (needsOtp) {
        setShowOtpForm(true);
        toast({
          title: language === 'ar' ? 'تم إرسال رمز التحقق' : 'Verification code sent',
          description: language === 'ar' 
            ? 'تم إرسال رمز التحقق إلى هاتفك. يرجى إدخاله لتسجيل الدخول.'
            : 'A verification code has been sent to your phone. Please enter it to continue.',
        });
      }
      // Success toast for completed login is handled in the AuthContext
    } catch (error) {
      // Error toast is handled in the AuthContext
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    try {
      // First verify the OTP with our custom service
      const verified = await verifyCustomOtp(phoneNumber, values.otp);
      
      if (verified) {
        // If verified, try to log in again with the saved credentials
        await login(phoneNumber, password);
        // Success toast is handled in the AuthContext
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!showOtpForm ? (
        // Regular Login Form
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder={language === 'ar' ? "+963 912 345 678" : "+1 234 567 8900"} 
                        {...field} 
                      />
                    </div>
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
                  {onForgotPassword && (
                    <div className="text-right">
                      <Button 
                        type="button" 
                        variant="link" 
                        className="p-0 h-auto font-normal text-sm"
                        onClick={onForgotPassword}
                      >
                        {language === 'ar' ? (
                          <ArabicText text="نسيت كلمة المرور؟" />
                        ) : (
                          "Forgot password?"
                        )}
                      </Button>
                    </div>
                  )}
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
      ) : (
        // OTP Verification Form
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">
                {language === 'ar' ? (
                  <ArabicText text="التحقق من رقم الهاتف" />
                ) : (
                  "Phone Verification"
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'ar' ? (
                  <ArabicText text={`تم إرسال رمز التحقق إلى ${phoneNumber}`} />
                ) : (
                  `A verification code has been sent to ${phoneNumber}`
                )}
              </p>
            </div>
            
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'ar' ? (
                      <ArabicText text="رمز التحقق" />
                    ) : (
                      "Verification Code"
                    )}
                  </FormLabel>
                  <FormControl>
                    <InputOTP 
                      maxLength={6} 
                      value={field.value} 
                      onChange={field.onChange}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2 justify-center">
                          {slots.map((slot, i) => (
                            <InputOTPSlot key={i} {...slot} index={i} className="border-syrian-green focus:border-syrian-dark" />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-syrian-green hover:bg-syrian-dark"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : null}
                {language === 'ar' ? (
                  <ArabicText text="تأكيد" />
                ) : (
                  "Verify"
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setShowOtpForm(false)}
              >
                {language === 'ar' ? (
                  <ArabicText text="العودة" />
                ) : (
                  "Go Back"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
