import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOtpVerification } from './useOtpVerification';

export function useAuthActions() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { sendCustomOtp, verifyCustomOtp } = useOtpVerification();

  // Phone login now returns true if OTP verification is needed
  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      // Always use signInWithPassword for the initial authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });
      
      if (error) {
        let errorMessage = t('loginFailed');
        
        if (error.message.includes('Invalid login')) {
          errorMessage = t('wrongPassword');
        } else if (error.message.includes('not confirmed')) {
          errorMessage = t('phoneNotConfirmed');
        } else if (error.message.includes('User not found')) {
          errorMessage = t('userNotFound');
        }
        
        toast({
          title: t('error'),
          description: errorMessage,
          variant: "destructive"
        });
        throw error;
      }

      if (!data?.user?.phone_confirmed_at) {
        // If phone is not confirmed, use our custom OTP verification
        const otpSent = await sendCustomOtp(phone);
        
        if (!otpSent) {
          toast({
            title: t('error'),
            description: t('otpSendFailed'),
            variant: "destructive"
          });
          throw new Error('Failed to send OTP');
        }
        
        return true; // OTP verification needed
      }
      
      return false; // No OTP needed, login successful
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('loginFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Register with phone verification
  const register = async (name: string, phone: string, password: string, phoneForProfile: string): Promise<boolean> => {
    try {
      // Register with phone
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: {
            name,
            phone: phoneForProfile
          }
        }
      });
      
      if (error) {
        let errorMessage = t('registrationFailed');
        
        if (error.message.includes('already registered')) {
          errorMessage = t('phoneInUse');
        } else if (error.message.includes('weak password')) {
          errorMessage = t('weakPassword');
        }
        
        toast({
          title: t('error'),
          description: errorMessage,
          variant: "destructive"
        });
        throw error;
      }

      // If user was created but phone is not confirmed, use our custom OTP verification
      if (!data?.user?.phone_confirmed_at) {
        // Send custom OTP
        const otpSent = await sendCustomOtp(phone);
        
        if (!otpSent) {
          toast({
            title: t('error'),
            description: t('otpSendFailed'),
            variant: "destructive"
          });
          throw new Error('Failed to send OTP');
        }
        
        toast({
          title: t('registrationStarted'),
          description: t('pleaseVerifyPhone'),
        });
        
        return true; // OTP verification needed
      }
      
      toast({
        title: t('registrationSuccess'),
        description: t('accountCreated'),
      });
      
      return false; // No OTP needed, registration successful
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('registrationFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };

  // Verify OTP token
  const verifyOtp = async (phone: string, token: string): Promise<User> => {
    try {
      // First try our custom OTP verification
      const customVerified = await verifyCustomOtp(phone, token);
      
      if (customVerified) {
        // If custom verification succeeded, try to sign in again
        const { data, error } = await supabase.auth.signInWithPassword({
          phone,
          password: '', // We don't have the password here, but the verification should work if phone is confirmed
        });
        
        if (error) {
          // If we can't sign in automatically, throw an error
          // The user can try logging in manually
          throw error;
        }
        
        // Access user property correctly from UserResponse with optional chaining
        if (!data?.user) {
          throw new Error(t('userNotFound'));
        }
        
        return data.user;
      }
      
      // Fall back to Supabase OTP verification
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });
      
      if (error) {
        toast({
          title: t('error'),
          description: error.message || t('otpVerificationFailed'),
          variant: "destructive"
        });
        throw error;
      }

      // Access user property correctly here too with optional chaining
      if (!data?.user) {
        throw new Error(t('userNotFound'));
      }

      toast({
        title: t('success'),
        description: t('phoneVerified'),
      });
      
      return data.user;
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('otpVerificationFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      toast({
        title: t('error'),
        description: t('logoutFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateUserProfile = async (data: {[key: string]: any}): Promise<void> => {
    try {
      const { user } = await supabase.auth.getUser();
      if (!user) throw new Error(t('notLoggedIn'));
      
      // Update profile in our profiles table
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update auth metadata if name provided
      if (data.name) {
        await supabase.auth.updateUser({
          data: { name: data.name }
        });
      }
      
      toast({
        title: t('profileUpdated'),
        description: t('profileUpdateSuccess'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('profileUpdateFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };

  // For phone-only auth, resetPassword will need to be modified
  const resetPassword = async (email: string): Promise<void> => {
    try {
      // For phone auth, we should ideally use phone-based password reset
      // This is a placeholder until we implement phone-based reset
      toast({
        title: t('notSupported'),
        description: t('featureNotAvailable'),
        variant: "destructive"
      });
      throw new Error('Password reset via email not supported in phone-only auth');
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('resetPasswordFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Update password for authenticated users
  const updatePassword = async (newPassword: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        toast({
          title: t('error'),
          description: error.message || t('passwordUpdateFailed'),
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: t('success'),
        description: t('passwordUpdateSuccess'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('passwordUpdateFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    login,
    register,
    verifyOtp,
    logout,
    updateUserProfile,
    resetPassword,
    updatePassword,
    sendCustomOtp,
    verifyCustomOtp
  };
}
