import { supabase } from '../config/supabase';

/**
 * Service untuk menangani logika backend Profile
 * Menghubungkan Clerk Auth dan Supabase Database
 */
export const profileService = {
  
  /**
   * Update Profile User (Nama)
   * Mengupdate data di Clerk (Auth) DAN Supabase (Database) agar sinkron
   */
  updateProfile: async (clerkUser, supabaseUserId, newName) => {
    try {
      const parts = newName.trim().split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');

      // 1. Update di Clerk (Source of Truth untuk Auth)
      await clerkUser.update({
        firstName,
        lastName,
      });

      // 2. Update di Supabase (Source of Truth untuk Relasi Data)
      // Kita update full_name di tabel users
      const { data, error } = await supabase
        .from('users')
        .update({ 
          full_name: newName,
          // Bisa tambah field lain user jika ada (misal phone, address)
        })
        .eq('id', supabaseUserId) // ID UUID Supabase
        .select();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Backend Error (Update Profile):', error);
      throw error;
    }
  },

  /**
   * Update Password User
   * Password HANYA disimpan di Clerk, Supabase tidak simpan password
   */
  updatePassword: async (clerkUser, newPassword) => {
    try {
      await clerkUser.updatePassword({
        newPassword: newPassword,
      });
      return { success: true };
    } catch (error) {
      console.error('Backend Error (Update Password):', error);
      throw error;
    }
  }
};
