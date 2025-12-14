import { supabase } from '../config/supabase';

export const cartService = {
  /**
   * Ambil cart user dari database
   */
  fetchCart: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          id,
          product_id,
          quantity,
          products (
            id,
            name,
            prices (price),
            product_images (image_url)
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      // Format data biar gampang dipakai di UI
      return data.map(item => ({
        id: item.products.id, // ID Produk (bukan ID record cart)
        cartId: item.id,      // ID record cart (buat hapus nanti)
        name: item.products.name,
        price: item.products.prices?.[0]?.price || 0,
        image: item.products.product_images?.[0]?.image_url,
        quantity: item.quantity
      }));
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Tambah item ke cart / Update quantity kalau sudah ada
   */
  addToCart: async (userId, product) => {
    try {
      // 1. Cek dulu barangnya sudah ada belum di cart user ini?
      const { data: existingItem, error: fetchError } = await supabase
        .from('cart')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('product_id', product.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // Ignore error "not found"

      if (existingItem) {
        // 2a. Kalau ada, UPDATE quantity + 1
        const { data, error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)
          .select();
        
        if (error) throw error;
      } else {
        // 2b. Kalau belum ada, INSERT baru
        const { data, error } = await supabase
          .from('cart')
          .insert({
            user_id: userId,
            product_id: product.id,
            quantity: 1
          })
          .select();

        if (error) throw error;
      }
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  /**
   * Kurangi quantity atau Hapus kalau sisa 1
   */
  removeFromCart: async (userId, productId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        // Kurangi 1
        await supabase
          .from('cart')
          .update({ quantity: currentQuantity - 1 })
          .eq('user_id', userId)
          .eq('product_id', productId);
      } else {
        // Hapus record
        await supabase
          .from('cart')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  /**
   * Clear seluruh cart user (misal setelah checkout)
   */
  clearCart: async (userId) => {
    try {
      await supabase
        .from('cart')
        .delete()
        .eq('user_id', userId);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};
