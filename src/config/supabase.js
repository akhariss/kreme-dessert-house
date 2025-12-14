import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * 
 * Menggunakan anon key untuk client-side access.
 * Row Level Security (RLS) policies akan handle authorization.
 */

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables missing!');
  console.error('EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('EXPO_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Tidak pakai Supabase auth, pakai Clerk
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Helper function untuk set Clerk JWT ke Supabase
 * Ini dipanggil setiap kali user login via Clerk
 */
export const setSupabaseAuth = (jwtToken) => {
  if (!jwtToken) {
    console.warn('⚠️ No JWT token provided to Supabase');
    return;
  }
  
  // Set JWT token dari Clerk ke Supabase client
  // Ini akan digunakan untuk RLS policies
  supabase.auth.setSession({
    access_token: jwtToken,
    refresh_token: '',
  });
};

/**
 * Helper function untuk clear auth
 */
export const clearSupabaseAuth = () => {
  supabase.auth.signOut();
};

export default supabase;
