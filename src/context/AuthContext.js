import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { supabase, setSupabaseAuth, clearSupabaseAuth } from '../config/supabase';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded: userLoaded } = useUser();
  const { getToken, signOut } = useAuth();
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Sync user dari Clerk ke Supabase
   */
  const syncUserToSupabase = async (clerkUser) => {
    if (!clerkUser) return null;

    try {
      // Get JWT token dari Clerk
      const token = await getToken({ template: 'supabase' });
      if (token) {
        setSupabaseAuth(token);
      }

      // Check if user exists di Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_user_id', clerkUser.id)
        .single();

      if (existingUser) {
        console.log('✅ User found in Supabase:', existingUser.email);
        setSupabaseUser(existingUser);
        return existingUser;
      }

      // User belum ada, create new
      const newUser = {
        clerk_user_id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress,
        full_name: clerkUser.fullName || '',
        avatar_url: clerkUser.imageUrl || '',
      };

      const { data: createdUser, error } = await supabase
        .from('users')
        .insert(newUser)
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating user in Supabase:', error);
        return null;
      }

      console.log('✅ User created in Supabase:', createdUser.email);
      setSupabaseUser(createdUser);
      return createdUser;
    } catch (error) {
      console.error('❌ Error syncing user to Supabase:', error);
      return null;
    }
  };

  /**
   * Effect: Sync user saat Clerk user berubah
   */
  useEffect(() => {
    const initAuth = async () => {
      if (!userLoaded) {
        setIsLoading(true);
        return;
      }

      if (user) {
        console.log('👤 Clerk user logged in:', user.primaryEmailAddress?.emailAddress);
        await syncUserToSupabase(user);
      } else {
        console.log('👋 No user logged in');
        setSupabaseUser(null);
        clearSupabaseAuth();
      }

      setIsLoading(false);
    };

    initAuth();
  }, [user, userLoaded]);

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      await signOut();
      setSupabaseUser(null);
      clearSupabaseAuth();
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Error logging out:', error);
    }
  };

  const value = {
    // Clerk user
    clerkUser: user,
    // Supabase user (dengan ID untuk queries)
    user: supabaseUser,
    // Loading state
    isLoading,
    isAuthenticated: !!user && !!supabaseUser,
    // Functions
    logout,
    syncUser: () => syncUserToSupabase(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
