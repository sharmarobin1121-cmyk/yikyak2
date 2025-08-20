import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  phoneNumber: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phoneNumber: string, code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  sendVerificationCode: (phoneNumber: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Sending verification code to ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('Error sending verification code:', error);
      return false;
    }
  };

  const login = async (phoneNumber: string, code: string): Promise<boolean> => {
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      if (code.length === 6) {
        const userData: User = {
          id: `user_${Date.now()}`,
          phoneNumber,
          isAuthenticated: true,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, sendVerificationCode }}>
      {children}
    </AuthContext.Provider>
  );
};