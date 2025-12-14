import { supabase } from '../config/supabase';

export const productService = {
  /**
   * Upload Image to Supabase Storage
   * Returns Public URL
   */
  uploadProductImage: async (imageUri) => {
    try {
      if (!imageUri) return null;

      // 1. Fetch image as ArrayBuffer (Modern Way)
      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();

      // 2. Generate unique filename
      const fileName = `product_${Date.now()}.png`;

      // 3. Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, arrayBuffer, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) throw error;

      // 4. Get Public URL
      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);

      return urlData.publicUrl;

    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  },
  /**
   * Fetch all products with prices and images
   */
  getAllProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, category, is_available, prices(price, currency), product_images(image_url)')
        .eq('is_available', true);

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      // DEBUG: Cek apakah prices/images ada isinya atau array kosong
      console.log('DEBUG First Product:', JSON.stringify(data?.[0], null, 2));

      // Format data untuk memudahkan konsumsi di frontend
      return data.map(product => {
        // Handle Price (Bisa Array atau Object)
        let priceData = null;
        if (Array.isArray(product.prices)) {
          priceData = product.prices.length > 0 ? product.prices[0] : null;
        } else if (product.prices) {
          priceData = product.prices;
        }
        
        const price = priceData ? priceData.price : 0;
        const currency = priceData ? priceData.currency : 'USD';

        // Handle Image (Bisa Array atau Object)
        let imageData = null;
        if (Array.isArray(product.product_images)) {
          imageData = product.product_images.length > 0 ? product.product_images[0] : null;
        } else if (product.product_images) {
          imageData = product.product_images;
        }

        let imageSource;
        if (imageData && imageData.image_url) {
          imageSource = { uri: imageData.image_url };
        } else {
          imageSource = require('../../assets/images/rose-macaron.png');
        }

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          price: price,
          currency: currency,
          image: imageSource,
          originalImage: imageData ? imageData.image_url : null
        };
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Fetch product details by ID
   */
  getProductById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          prices (price, currency),
          product_images (image_url),
          product_details (allergen_information, storage_care, ingredients)
        `)
        .eq('id', id)
        .maybeSingle(); // Pakai maybeSingle biar gak error kalau null

      if (error) throw error;
      if (!data) return null; // Return null santai, jangan throw error
      
      return data;
    } catch (error) {
      console.error('Error fetching product detail:', error);
      throw error;
    }
  },

  /**
   * Fetch products by category
   */
  /**
   * Fetch products by category
   */
  getProductsByCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          prices (price)
        `)
        .eq('category', category)
        .eq('is_available', true);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  /**
   * DELETE Product (Cascade will handle child tables)
   */
  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Delete failed:', error);
      return { success: false, error };
    }
  },

  /**
   * CREATE Product (Multi-table insert)
   */
  createProduct: async (productData) => {
    try {
      // 1. Insert ke tabel PRODUCTS
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          is_available: true
        })
        .select()
        .single();

      if (prodError) throw prodError;
      const newId = prodData.id;

      // 2. Insert ke tabel PRICES
      if (productData.price) {
        await supabase.from('prices').insert({
          product_id: newId,
          price: parseFloat(productData.price),
          currency: 'USD'
        });
      }

      // 3. Insert ke tabel PRODUCT_DETAILS
      await supabase.from('product_details').insert({
        product_id: newId,
        ingredients: productData.ingredients || '',
        allergen_information: productData.allergens || '',
        storage_care: productData.storage || ''
      });

      // 4. Insert ke tabel PRODUCT_IMAGES
      if (productData.imageUrl) {
        await supabase.from('product_images').insert({
          product_id: newId,
          image_url: productData.imageUrl
        });
      }

      return { success: true, data: prodData };
    } catch (error) {
      console.error('Create failed:', error);
      return { success: false, error };
    }
  },

  /**
   * UPDATE Product (Multi-table update)
   */
  updateProduct: async (id, productData) => {
    try {
      // 1. Update PRODUCTS
      const { error: prodError } = await supabase
        .from('products')
        .update({
          name: productData.name,
          description: productData.description,
          category: productData.category,
        })
        .eq('id', id);

      if (prodError) throw prodError;

      // 2. Update PRICES (Upsert: Insert if not exist, Update if exist)
      // Karena keterbatasan upsert tanpa unique constraint conflict simpel, 
      // kita pakai update biasa. Jika belum ada (migrasi data lama), insert manual.
      // Sederhananya: Kita cek dulu atau langsung hajar update.
      
      // Ambil ID price dulu
      const { data: priceData } = await supabase.from('prices').select('id').eq('product_id', id).single();
      
      if (priceData) {
        await supabase.from('prices').update({ price: parseFloat(productData.price) }).eq('product_id', id);
      } else {
        await supabase.from('prices').insert({ product_id: id, price: parseFloat(productData.price), currency: 'USD' });
      }

      // 3. Update DETAILS
      const { data: detailData } = await supabase.from('product_details').select('id').eq('product_id', id).single();
      const detailPayload = {
        ingredients: productData.ingredients,
        allergen_information: productData.allergens,
        storage_care: productData.storage
      };
      
      if (detailData) {
        await supabase.from('product_details').update(detailPayload).eq('product_id', id);
      } else {
        await supabase.from('product_details').insert({ product_id: id, ...detailPayload });
      }

      // 4. Update IMAGES
      if (productData.imageUrl) {
        const { data: imageData } = await supabase.from('product_images').select('id').eq('product_id', id).single();
        if (imageData) {
          await supabase.from('product_images').update({ image_url: productData.imageUrl }).eq('product_id', id);
        } else {
          await supabase.from('product_images').insert({ product_id: id, image_url: productData.imageUrl });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Update failed:', error);
      return { success: false, error };
    }
  }
};
