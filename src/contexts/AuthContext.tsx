import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { useAuthActions } from "@/hooks/useAuthActions";

// Define the auth context type
interface AuthContextType {
  currentUser: User | null;
  userLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (name: string, phone: string, password: string, phoneForProfile: string) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyOtp: (phone: string, token: string) => Promise<User>;
  updateUserProfile: (data: {[key: string]: any}) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  sendCustomOtp: (phone: string) => Promise<boolean>;
  verifyCustomOtp: (phone: string, code: string) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  
  const { 
    login, 
    register, 
    verifyOtp, 
    logout,
    updateUserProfile,
    resetPassword,
    updatePassword,
    sendCustomOtp,
    verifyCustomOtp
  } = useAuthActions();

  useEffect(() => {
    const getSession = async () => {
      setUserLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      setCurrentUser(session?.user ?? null);
      setUserLoading(false);
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });
  }, []);

  // Return the provider
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userLoading,
        login,
        register,
        logout,
        verifyOtp,
        updateUserProfile,
        resetPassword,
        updatePassword,
        sendCustomOtp,
        verifyCustomOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
