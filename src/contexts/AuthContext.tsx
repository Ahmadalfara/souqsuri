
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<boolean>; // Returns true if OTP is needed
  register: (name: string, phone: string, password: string, phoneForProfile: string) => Promise<boolean>; // Returns true if OTP is needed
  verifyOtp: (phone: string, token: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {[key: string]: any}) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  sendCustomOtp: (phone: string) => Promise<boolean>; // New function for custom OTP
  verifyCustomOtp: (phone: string, code: string) => Promise<boolean>; // New function to verify custom OTP
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setCurrentUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: t('loginSuccess'),
            description: t('welcomeBack'),
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: t('logoutSuccess'),
            description: t('comeBackSoon'),
          });
        }

        if (event === 'USER_UPDATED') {
          toast({
            title: t('profileUpdated'),
            description: t('profileUpdateSuccess'),
          });
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setCurrentUser(currentSession?.user ?? null);
      setLoading(false);
    });
    
    return () => subscription.unsubscribe();
  }, [toast, t]);
  
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

      if (!data.user?.phone_confirmed_at) {
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
      if (!data.user?.phone_confirmed_at) {
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

  // Send custom OTP via our Edge Function
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

  // Verify custom OTP via our Edge Function
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
      
      // If verification successful, update Supabase auth
      // Fix: Use correct property from Supabase user attributes
      const { error: updateError } = await supabase.auth.updateUser({
        data: { phone_confirmed: true }
      });
      
      if (updateError) {
        console.error('Error updating user phone confirmation:', updateError);
        // Continue anyway as the verification was successful
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
    if (!currentUser) throw new Error(t('notLoggedIn'));
    
    try {
      // Update profile in our profiles table
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', currentUser.id);
      
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
  
  const value = {
    currentUser,
    session,
    loading,
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
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
