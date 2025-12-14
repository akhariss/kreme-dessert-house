import { supabase } from '../config/supabase';

export const orderService = {
  /**
   * Membuat Order Baru (Checkout)
   * @param {string} userId - ID User (UUID)
   * @param {Array} cartItems - Array item dari keranjang
   * @param {number} totalAmount - Total harga yang dibayar
   */
  createOrder: async (userId, cartItems, totalAmount) => {
    try {
      if (!cartItems || cartItems.length === 0) throw new Error("Cart is empty");

      // 1. Buat Record Order Utama
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: totalAmount,
          status: 'pending', // default status
          // payment_method: 'manual', // bisa ditambah nanti
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // 2. Siapkan data Order Items
      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price // Simpan harga saat beli (penting!)
      }));

      // 3. Insert Bulk Order Items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 4. (Opsional) Kosongkan Cart User setelah sukses
      await supabase
        .from('cart')
        .delete()
        .eq('user_id', userId);

      return { success: true, orderId };

    } catch (error) {
      console.error('Backend Error (Create Order):', error);
      throw error;
    }
  },

  /**
   * Mengambil Riwayat Order User
   */
  getUserOrders: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_amount,
          status,
          order_items (
            quantity,
            price_at_time,
            products (name, product_images (image_url))
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Backend Error (Get Orders):', error);
      throw error;
    }
  }
};
