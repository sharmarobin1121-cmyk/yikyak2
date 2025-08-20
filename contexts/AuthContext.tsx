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
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      let data: any = null;
      try {
        data = await response.clone().json();
      } catch {
        // Response wasn't JSON (likely HTML error page)
        const text = await response.text();
        console.error('Unexpected response when sending code:', text);
        return false;
      }

      if (response.ok && data.success) {
        return true;
      } else {
        console.error('Failed to send verification code:', data.error || 'Unknown error');
        return false;
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      return false;
    }
  };

  const login = async (phoneNumber: string, code: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, code }),
      });

      let data: any = null;
      try {
        data = await response.clone().json();
      } catch {
        const text = await response.text();
        console.error('Unexpected response when verifying code:', text);
        return false;
      }

      if (response.ok && data.success && data.verified) {
        const userData: User = data.user;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      } else {
        console.error('Verification failed:', data.error || 'Unknown error');
        return false;
      }
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
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, sendVerificationCode }}>
      {children}
    </AuthContext.Provider>
  );
};