
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useOtpVerification() {
  const { toast } = useToast();
  const { t } = useLanguage();

  // Send OTP via Edge Function
  const sendCustomOtp = async (phone: string): Promise<boolean> => {
    try {
      // Format phone number to include +
      const formattedPhone = phone.startsWith('+') 
        ? phone 
        : `+${phone}`;
      
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone: formattedPhone },
      });
      
      if (error) {
        console.error('Error sending OTP:', error);
        toast({
          title: t('error'),
          description: error.message || t('otpSendFailed'),
          variant: "destructive"
        });
        return false;
      }
      
      if (!data.success) {
        console.error('OTP send failed:', data);
        toast({
          title: t('error'),
          description: data.error || t('otpSendFailed'),
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    } catch (error: any) {
      console.error('Error in sendCustomOtp:', error);
      toast({
        title: t('error'),
        description: error.message || t('otpSendFailed'),
        variant: "destructive"
      });
      return false;
    }
  };

  // Verify OTP via Edge Function
  const verifyCustomOtp = async (phone: string, code: string): Promise<boolean> => {
    try {
      // Format phone number to include +
      const formattedPhone = phone.startsWith('+') 
        ? phone 
        : `+${phone}`;
      
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone: formattedPhone, code },
      });
      
      if (error) {
        console.error('Error verifying OTP:', error);
        toast({
          title: t('error'),
          description: error.message || t('otpVerificationFailed'),
          variant: "destructive"
        });
        return false;
      }
      
      if (!data.success) {
        console.error('OTP verification failed:', data);
        
        let errorMessage = t('otpVerificationFailed');
        
        if (data.expired) {
          errorMessage = t('otpExpired');
        } else if (data.invalid) {
          errorMessage = t('invalidOtp');
        }
        
        toast({
          title: t('error'),
          description: data.error || errorMessage,
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: t('success'),
        description: t('phoneVerified'),
      });
      
      return true;
    } catch (error: any) {
      console.error('Error in verifyCustomOtp:', error);
      toast({
        title: t('error'),
        description: error.message || t('otpVerificationFailed'),
        variant: "destructive"
      });
      return false;
    }
  };

  return { sendCustomOtp, verifyCustomOtp };
}
