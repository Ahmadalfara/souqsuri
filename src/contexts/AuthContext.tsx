
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, phone: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {[key: string]: any}) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: t('loginSuccess'),
        description: t('welcomeBack'),
      });
      return result.user;
    } catch (error: any) {
      let errorMessage = t('loginFailed');
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = t('userNotFound');
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = t('wrongPassword');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('invalidEmail');
      }
      
      toast({
        title: t('error'),
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string, phone: string): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(result.user, {
        displayName: name
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
        location: "",
      });
      
      toast({
        title: t('registrationSuccess'),
        description: t('accountCreated'),
      });
      
      return result.user;
    } catch (error: any) {
      let errorMessage = t('registrationFailed');
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('emailInUse');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('invalidEmail');
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('weakPassword');
      }
      
      toast({
        title: t('error'),
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      toast({
        title: t('logoutSuccess'),
        description: t('comeBackSoon'),
      });
    } catch (error) {
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
      // Update in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, data, { merge: true });
      
      // Update display name if provided
      if (data.name) {
        await updateProfile(currentUser, {
          displayName: data.name
        });
      }
      
      toast({
        title: t('profileUpdated'),
        description: t('profileUpdateSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('profileUpdateFailed'),
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

