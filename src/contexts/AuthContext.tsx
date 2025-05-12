
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';
import { useAuthActions } from '@/hooks/useAuthActions';

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (name: string, phone: string, password: string, phoneForProfile: string) => Promise<boolean>;
  verifyOtp: (phone: string, token: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {[key: string]: any}) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  sendCustomOtp: (phone: string) => Promise<boolean>;
  verifyCustomOtp: (phone: string, code: string) => Promise<boolean>;
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
  
  // Get auth actions from our custom hook
  const authActions = useAuthActions();
  
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
  
  const value: AuthContextType = {
    currentUser,
    session,
    loading,
    ...authActions
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
