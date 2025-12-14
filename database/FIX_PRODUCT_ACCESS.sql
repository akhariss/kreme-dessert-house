-- ============================================================
-- FIX ACCESS: PUBLIC READ FOR PRODUCTS
-- Jalankan ini agar aplikasi bisa menampilkan produk tanpa login
-- ============================================================

-- 1. Enable RLS (Pastikan RLS aktif)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

-- 2. Hapus Policy Lama (jika ada, biar bersih)
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Anyone can view prices" ON prices;
DROP POLICY IF EXISTS "Anyone can view product images" ON product_images;
DROP POLICY IF EXISTS "Anyone can view product details" ON product_details;

-- 3. Buat Policy Baru (Public Read = TRUE)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view prices" ON prices
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product images" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product details" ON product_details
  FOR SELECT USING (true);

-- 4. Cek apakah ada data di prices? (Optional Debug)
-- SELECT * FROM prices;
