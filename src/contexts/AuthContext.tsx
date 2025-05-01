
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, phone: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {[key: string]: any}) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
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
  
  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Determine if login is using email or phone
      const isPhone = email.includes('@phone.user');
      
      let authResponse;
      if (isPhone) {
        // Extract phone from email format (phone@phone.user)
        const phone = email.split('@')[0];
        // Log in with phone number
        authResponse = await supabase.auth.signInWithPassword({
          phone: phone,
          password,
        });
      } else {
        // Log in with email
        authResponse = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }
      
      const { data, error } = authResponse;
      
      if (error) {
        let errorMessage = t('loginFailed');
        
        if (error.message.includes('Invalid login')) {
          errorMessage = t('wrongPassword');
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = t('emailNotConfirmed');
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
      
      return data.user;
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('loginFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string, phone: string): Promise<User> => {
    try {
      // Determine if registration is using email or phone
      const isPhoneRegistration = email.includes('@phone.user');
      
      let authResponse;
      if (isPhoneRegistration) {
        // Extract phone from email format
        const phoneNumber = email.split('@')[0];
        
        // Register with phone number
        authResponse = await supabase.auth.signUp({
          phone: phoneNumber,
          password,
          options: {
            data: {
              name,
              phone: phoneNumber
            }
          }
        });
      } else {
        // Register with email
        authResponse = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              phone
            }
          }
        });
      }
      
      const { data, error } = authResponse;
      
      if (error) {
        let errorMessage = t('registrationFailed');
        
        if (error.message.includes('already registered')) {
          errorMessage = t('emailInUse');
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
      
      toast({
        title: t('registrationSuccess'),
        description: t('accountCreated'),
      });
      
      return data.user;
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('registrationFailed'),
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
  
  // New password reset functionality
  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: t('error'),
          description: error.message || t('resetPasswordFailed'),
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: t('resetPasswordEmailSent'),
        description: t('checkEmailForInstructions'),
      });
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
    logout,
    updateUserProfile,
    resetPassword,
    updatePassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
