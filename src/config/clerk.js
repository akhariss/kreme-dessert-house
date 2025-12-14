import * as SecureStore from 'expo-secure-store';

/**
 * Clerk Configuration
 * 
 * Token cache untuk persist login menggunakan expo-secure-store
 */

const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error('Error getting token from SecureStore:', err);
      return null;
    }
  },
  
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Error saving token to SecureStore:', err);
    }
  },
};

export { tokenCache };

// Clerk publishable key
export const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Validate
if (!clerkPublishableKey) {
  console.error('❌ Clerk publishable key missing!');
  console.error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to .env file');
}
