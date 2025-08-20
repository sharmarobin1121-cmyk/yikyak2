import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your-supabase-url' || 
    supabaseAnonKey === 'your-supabase-anon-key' ||
    supabaseUrl === 'https://placeholder-project-id.supabase.co' ||
    supabaseAnonKey === 'placeholder-anon-key' ||
    supabaseUrl.includes('placeholder') ||
    supabaseAnonKey.includes('placeholder')) {
  throw new Error(
    'Supabase environment variables are not properly configured. ' +
    'Please click the "Connect to Supabase" button in the top-right corner ' +
    'to set up your Supabase project, or manually update the ' +
    'EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY values ' +
    'in your .env file with your actual Supabase project credentials.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});