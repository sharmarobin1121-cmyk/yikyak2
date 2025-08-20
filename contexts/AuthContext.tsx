import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  phoneNumber: string;
  displayName?: string;
  avatarUrl?: string;
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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      } else if (profile) {
        setUser({
          id: profile.id,
          phoneNumber: profile.phone_number,
          displayName: profile.display_name,
          avatarUrl: profile.avatar_url,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Check if Supabase is properly configured
      try {
        await supabase.from('verification_codes').select('count', { count: 'exact', head: true });
      } catch (configError) {
        console.error('Supabase configuration error:', configError);
        return false;
      }

      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store verification code in database
      const { error: insertError } = await supabase
        .from('verification_codes')
        .insert({
          phone_number: phoneNumber,
          code: code,
          expires_at: expiresAt.toISOString(),
          verified: false,
        });

      if (insertError) {
        console.error('Error storing verification code:', insertError.message);
        return false;
      }

      // Send SMS via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          phoneNumber: phoneNumber,
          code: code,
        },
      });

      if (error) {
        console.error('Error sending SMS:', error.message);
        return false;
      }

      return data?.success === true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending verification code:', errorMessage);
      return false;
    }
  };

  const login = async (phoneNumber: string, code: string): Promise<boolean> => {
    try {
      // Clean phone number
      const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

      // Verify the code
      const { data: verificationData, error: verificationError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('code', code)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (verificationError || !verificationData) {
        console.error('Invalid or expired verification code');
        return false;
      }

      // Mark code as verified
      await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', verificationData.id);

      // Try to sign in with phone number (if user exists)
      let authResult = await supabase.auth.signInWithOtp({
        phone: `+1${cleanPhoneNumber}`,
        token: code,
      });

      // If user doesn't exist, create new user
      if (authResult.error) {
        // Sign up new user
        authResult = await supabase.auth.signUp({
          phone: `+1${cleanPhoneNumber}`,
          password: code, // Temporary password, will be replaced by OTP
        });

        if (authResult.error || !authResult.data.user) {
          console.error('Error creating user:', authResult.error);
          return false;
        }

        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authResult.data.user.id,
            phone_number: phoneNumber,
            display_name: null,
            avatar_url: null,
            is_active: true,
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
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